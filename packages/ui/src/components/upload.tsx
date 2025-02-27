import {
  type Awaitable,
  byFileGenerateURL,
  checkFileSize,
  checkFileType,
  isBoolean,
  randomIdWithAny,
  safeArray,
  stringToHash,
  useDebounceCallback,
  useEvent,
  useMergedState
} from "@novelist/utils"
import { Slot } from "@radix-ui/react-slot"
import {
  type ChangeEvent,
  type ComponentProps,
  type Dispatch,
  type DragEvent,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react"
import { cn } from "../lib/utils"

export type UploadFileStatus = "ready" | "fail"

export type UploadError = {
  type: "minSize" | "maxSize" | "accept" | "custom"
  message: string
  file?: UploadFile
}

export interface UploadFile {
  uid: string
  name: string
  url: string
  raw: File
  size?: number
  status?: UploadFileStatus
  check?: "minSize" | "maxSize" | "accept" | "custom"
}

interface UploadState {
  files: UploadFile[]
  setFiles: Dispatch<SetStateAction<UploadFile[]>>
  remove: (file: UploadFile | string) => void
  accept?: string | string[]
  multiple?: boolean
  drag?: boolean
  minSize?: number | ((file: File) => boolean)
  maxSize?: number | ((file: File) => boolean)
  onChange?: (file: UploadFile[]) => void
  onError?: (error: UploadError[]) => void
  onBeforeSelect?: (file: FileList) => Awaitable<File[] | FileList | boolean>
  validator?: (file: File) => Awaitable<boolean>
}

function transformToUploadFile(file: File, status: UploadFileStatus = "ready", type?: UploadFile["check"]) {
  return {
    uid: randomIdWithAny(stringToHash(file.name).slice(0, 10)),
    name: file.name,
    size: file.size,
    raw: file,
    url: byFileGenerateURL(file),
    type,
    status
  }
}

function transformToUploadFiles(
  fileList: FileList | File[],
  status: UploadFile["status"] = "ready",
  type?: UploadFile["check"]
): UploadFile[] {
  return Array.from(fileList).map((file) => transformToUploadFile(file, status, type))
}

function generatorUploadError(type: UploadError["type"], message: string, file: File) {
  return {
    type,
    message,
    file: transformToUploadFile(file, "fail", type)
  }
}

function generatorUploadErrors(type: UploadError["type"], message: string, files: File[]) {
  return Array.from(files).map((file) => generatorUploadError(type, message, file))
}

async function validFile(
  fileList: FileList | File[],
  options: Pick<UploadProps, "accept" | "minSize" | "maxSize" | "validator">
) {
  const { accept, maxSize, minSize, validator } = options
  let resultFiles: File[] = []
  const errorFiles: UploadError[] = []

  if (accept) {
    const typeResult = checkFileType(accept, fileList)
    resultFiles = typeResult.validFiles
    errorFiles.push(...generatorUploadErrors("accept", "File type is not match.", typeResult.failFiles))
  }

  if (minSize) {
    const minSizeResult = checkFileSize(minSize, resultFiles)
    resultFiles = minSizeResult.validFiles
    errorFiles.push(...generatorUploadErrors("minSize", "File size lt upload min size.", minSizeResult.failFiles))
  }

  if (maxSize) {
    const { validFiles, failFiles } = checkFileSize(maxSize, resultFiles)
    resultFiles = validFiles
    errorFiles.push(...generatorUploadErrors("maxSize", "File size gt upload max size.", failFiles))
  }

  if (validator) {
    const validatedFiles: File[] = []
    for (const file of resultFiles) {
      if (!(await validator(file))) {
        errorFiles.push(generatorUploadError("custom", "Custom validator error.", file))
      } else {
        validatedFiles.push(file)
      }
    }
    resultFiles = validatedFiles
  }

  return {
    resultFiles,
    errorFiles
  }
}

const UploadContext = createContext<UploadState | undefined>(undefined)

export function useUploadContext() {
  const context = useContext(UploadContext)

  if (!context) {
    throw new Error("useUpload must be used within Upload")
  }

  return context
}

export interface UploadProps extends Omit<UploadState, "files" | "setFiles" | "remove"> {
  fileList?: UploadFile[]
  className?: string
  asChild?: boolean
}

export function Upload({
  fileList,
  asChild,
  children,
  accept = "*",
  multiple = false,
  drag = true,
  minSize,
  maxSize,
  onChange,
  onError,
  className,
  validator,
  onBeforeSelect
}: PropsWithChildren<UploadProps>) {
  const [files, setFiles] = useMergedState<UploadFile[]>([], {
    value: fileList,
    onChange(value) {
      onChange?.(value)
    }
  })

  const filesRef = useRef(files)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  const remove = useCallback(
    (file: UploadFile | string) => {
      const uid = typeof file === "string" ? file : file.uid
      setFiles((pre) => pre.filter((item) => item.uid !== uid))
    },
    [setFiles]
  )

  const state = useMemo<UploadState>(() => {
    return {
      files,
      setFiles,
      remove,
      accept,
      multiple,
      drag,
      minSize,
      maxSize,
      onChange,
      onError,
      validator,
      onBeforeSelect
    }
  }, [files, setFiles, remove, accept, multiple, drag, minSize, maxSize, onChange, onError, validator, onBeforeSelect])

  const Com = asChild ? Slot : "div"

  return (
    <UploadContext.Provider value={state}>
      <Com className={cn("relative", className)}>{children}</Com>
    </UploadContext.Provider>
  )
}

export interface UploadTriggerProps extends Omit<ComponentProps<"input">, "type" | "accept" | "multiple"> {}

export function UploadTrigger({ children, className, ...restProps }: PropsWithChildren<UploadTriggerProps>) {
  const context = useUploadContext()

  const { setFiles, multiple, maxSize, minSize, onError, validator, onBeforeSelect } = context

  const accept = useMemo(() => {
    return safeArray(context.accept).join(",")
  }, [context.accept])

  const validateAndProcessFiles = useEvent(async (fileList: FileList | File[]): Promise<UploadFile[]> => {
    const { resultFiles, errorFiles } = await validFile(fileList, {
      accept: context.accept,
      maxSize: maxSize,
      minSize: minSize,
      validator: validator
    })

    if (errorFiles.length) {
      onError?.(errorFiles)
    }

    const returnErrorFile = errorFiles
      .map((error) => {
        if (!error.file) {
          return null
        }
        return error.file
      })
      .filter((item) => item) as UploadFile[]

    return [...transformToUploadFiles(resultFiles), ...returnErrorFile]
  })

  const handleFiles = useEvent(async (fileList: FileList) => {
    if (!fileList.length) {
      return
    }

    let validFiles: UploadFile[] = []
    if (onBeforeSelect) {
      const val = await onBeforeSelect?.(fileList)
      if (!val) {
        return
      }
      validFiles = await validateAndProcessFiles(isBoolean(val) ? fileList : val)
    } else {
      validFiles = await validateAndProcessFiles(fileList)
    }

    if (multiple) {
      setFiles((pre) => [...pre, ...validFiles])
    } else {
      setFiles(validFiles.slice(0, 1))
    }
  })

  const handleDrop = useDebounceCallback(async (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    await handleFiles(ev.dataTransfer.files)
  }, 300)

  const handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      await handleFiles(ev.target.files)
    }
  }

  return (
    <div
      className={cn("relative rounded-xl shadow-sm border-border border-2", className)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        accept={accept}
        multiple={multiple}
        aria-label="Choose file"
        role="button"
        {...restProps}
        onChange={handleChange}
      />
      {children}
    </div>
  )
}

export interface UploadPreviewProps {
  asChild?: boolean
  className?: string
  renderItem: (
    file: UploadFile,
    actions: {
      remove: UploadState["remove"]
    }
  ) => React.ReactNode
}

export function UploadPreview({ asChild, renderItem, className }: UploadPreviewProps) {
  const Com = asChild ? Slot : "div"
  const { files, remove } = useUploadContext()

  return (
    <Com className={cn("relative", className)}>
      {files.map((file) =>
        renderItem(file, {
          remove
        })
      )}
    </Com>
  )
}

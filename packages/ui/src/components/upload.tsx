import { safeArray } from "@novelist/utils"
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
  useRef,
  useState
} from "react"
import { cn } from "../lib/utils"

export interface UploadFile {
  name: string
  raw: File
  size: number
}

interface UploadState {
  files: UploadFile[]
  setFiles: Dispatch<SetStateAction<UploadFile[]>>
  accept?: string | string[]
  multiple?: boolean
  drag?: boolean
  maxSize?: number | ((file: UploadFile) => boolean)
  onChange?: (file: UploadFile[]) => void
  onError?: (error: Error) => void
}

const UploadContext = createContext<UploadState | undefined>(undefined)

export function useUploadContext() {
  const context = useContext(UploadContext)

  if (!context) {
    throw new Error("useUpload must be used within Upload")
  }

  return context
}

export interface UploadProps extends Omit<UploadState, "files" | "setFiles"> {
  className?: string
  asChild?: boolean
}

export function Upload({
  asChild,
  children,
  accept = "*",
  multiple = false,
  drag = true,
  maxSize = 1024 * 1024,
  onChange,
  onError,
  className
}: PropsWithChildren<UploadProps>) {
  const [files, setFiles] = useState<UploadFile[]>([])

  const filesRef = useRef(files)
  useEffect(() => {
    filesRef.current = files
  }, [files])

  const setFilesAction = useCallback<Dispatch<SetStateAction<UploadFile[]>>>(
    (fileList) => {
      const newFiles = typeof fileList === "function" ? fileList(filesRef.current) : fileList
      onChange?.(newFiles)
      setFiles(fileList)
    },
    [onChange]
  )

  const state = useMemo<UploadState>(() => {
    return {
      files,
      setFiles: setFilesAction,
      accept,
      multiple,
      drag,
      maxSize,
      onChange,
      onError
    }
  }, [files, setFilesAction, accept, multiple, drag, maxSize, onChange, onError])

  const Com = asChild ? Slot : "div"

  return (
    <UploadContext.Provider value={state}>
      <Com className={cn("relative", className)}>{children}</Com>
    </UploadContext.Provider>
  )
}

export interface UploadTriggerProps extends Omit<ComponentProps<"input">, "type" | "accept" | "multiple"> {
  asChild?: boolean
}

export function UploadTrigger({ asChild, children, ...restProps }: PropsWithChildren<UploadTriggerProps>) {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error("UploadTrigger must be used within Upload")
  }

  const { setFiles, multiple, maxSize, onError } = context

  const accept = useMemo(() => {
    return safeArray(context.accept).join(",")
  }, [context.accept])

  const validateAndProcessFiles = useCallback(
    (fileList: FileList): UploadFile[] => {
      if (accept) {
        const { validFiles, errorFiles } = checkFileType(accept, fileList)
        if (errorFiles.length > 0) {
          onError?.(new Error("Upload file invalid error."))
          return transformToUploadFile(validFiles)
        }
      }

      if (maxSize) {
      }

      return transformToUploadFile(fileList)
    },
    [maxSize, accept, onError]
  )

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const processedFiles = validateAndProcessFiles(fileList)

      if (multiple) {
        setFiles((pre) => [...pre, ...processedFiles])
      } else {
        setFiles(processedFiles.slice(0, 1))
      }
    },
    [multiple, setFiles, validateAndProcessFiles]
  )

  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    handleFiles(ev.dataTransfer.files)
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      handleFiles(ev.target.files)
    }
  }

  return (
    <div
      className="relative rounded-xl shadow-sm border-border border-2"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        accept={accept}
        multiple={multiple}
        {...restProps}
        onChange={handleChange}
      />
      {children}
    </div>
  )
}

function checkFileType(accept: string, files: FileList) {
  const allowedTypes = accept.split(",")
  const validFiles: File[] = []
  const errorFiles: File[] = []

  for (const file of Array.from(files)) {
    const fileType = file.type
    if (allowedTypes.some((type) => fileType.match(new RegExp(type.replace("*", ".*"))))) {
      validFiles.push(file)
    } else {
      errorFiles.push(file)
    }
  }

  return {
    validFiles,
    errorFiles
  }
}

function checkFileSize(size: UploadProps["maxSize"], files: FileList) {
  const validFiles: File[] = []
  const errorFiles: File[] = []

  const isFunction = typeof size === "function"

  for (const file of Array.from(files)) {
    if (isFunction) {
    }
  }

  return {
    validFiles,
    errorFiles
  }
}

function transformToUploadFile(fileList: FileList | File[]): UploadFile[] {
  return Array.from(fileList).map((file) => {
    return {
      name: file.name,
      size: file.size,
      raw: file
    }
  })
}

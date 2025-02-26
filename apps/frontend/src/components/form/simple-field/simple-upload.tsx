import {
  type ChangeEvent,
  type ComponentProps,
  type DragEvent,
  type PropsWithChildren,
  type ReactNode,
  useState
} from "react"

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

export interface SimpleUploadProps extends Omit<ComponentProps<"input">, "onInput" | "onDrop" | "onError"> {
  preview?: boolean
  previewRender?: (file: File[]) => ReactNode
  maxCount?: number
  onDrop?: (ev: DragEvent<HTMLDivElement>) => void
  onUploadChange?: (fileList: File[], errorFile: File[]) => void
}

export function SimpleUpload({
  children,
  maxCount = 1,
  preview,
  previewRender,
  onUploadChange,
  onChange,
  onDrop,
  ...restProps
}: PropsWithChildren<SimpleUploadProps>) {
  const [fileList, setFileList] = useState<File[]>([])
  const [errorFiles, setErrorFile] = useState<File[]>([])

  const innerChange = (files: FileList | null) => {
    if (!files?.length) {
      return
    }
    if (files.length > 1 && !restProps.multiple) {
      return
    }
    const finalFiles: File[] = []
    const errorFiles: File[] = []
    if (restProps.accept) {
      const { validFiles, errorFiles } = checkFileType(restProps.accept, files)
      finalFiles.push(...validFiles)
      errorFiles.push(...errorFiles)
    } else {
      finalFiles.push(...files)
    }
    const newFileList = [...fileList, ...finalFiles].slice(-maxCount)
    setFileList(() => [...newFileList])
    setErrorFile(errorFiles)
    onUploadChange?.(newFileList, errorFiles)
    return {
      fileList: newFileList,
      errorFiles
    }
  }

  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    const files = ev.dataTransfer.files
    innerChange(files)
    onDrop?.(ev)
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files
    innerChange(files)
    onChange?.(ev)
  }

  return (
    <div className="flex flex-col">
      <div
        className="relative rounded-xl shadow-sm border-border border-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          {...restProps}
          onChange={handleChange}
        />
        {children ? (
          children
        ) : (
          <div className="p-3 text-center text-gray-500 rounded-xl">Click or drag files to upload</div>
        )}
      </div>
      {preview && <div className="mt-3">{previewRender ? previewRender(fileList) : <div />}</div>}
    </div>
  )
}

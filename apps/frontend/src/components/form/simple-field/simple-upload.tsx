import { IconButton, Upload, UploadPreview, type UploadProps, UploadTrigger, cn } from "@novelist/ui"

export interface SimpleUploadProps extends UploadProps {
  multiple?: boolean
}

export function SimpleUpload({ multiple = false, ...restProps }: SimpleUploadProps) {
  return (
    <Upload
      multiple={multiple}
      maxSize={5 * 1024 * 1024}
      className="relative"
      {...restProps}
    >
      <UploadTrigger className="border-none">
        <IconButton
          className="w-full"
          iconName="upload"
        >
          Upload file
        </IconButton>
      </UploadTrigger>
      <UploadPreview
        className={cn(
          "pointer-events-none",
          multiple ? "flex flex-col  gap-y-1" : "absolute top-0 left-0 right-0 bottom-0"
        )}
        renderItem={(file, { remove }) => {
          return (
            <div
              key={file.uid}
              className={cn(
                "relative bg-background flex items-center py-1 px-3 border-2 rounded-lg shadow-sm pointer-events-none",
                file.status === "fail" ? "border-red-700" : "border-primary"
              )}
            >
              {file.name}
              <IconButton
                className="ml-auto pointer-events-auto"
                iconName="x"
                size={"icon"}
                variant={"outline"}
                onClick={() => remove(file.uid)}
              />
            </div>
          )
        }}
      />
    </Upload>
  )
}

export function SimpleUploadImage({ multiple = false, ...restProps }: SimpleUploadProps) {
  return (
    <Upload
      accept="image/*"
      multiple={multiple}
      maxSize={5 * 1024 * 1024} // 5MB max file size
      {...restProps}
    >
      <UploadTrigger>
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-lg font-medium text-gray-600">点击或拖拽上传图片{multiple && "(可多选)"}</span>
          <span className="mt-2 text-sm text-gray-500">支持jpg、png等格式，大小不超过5MB</span>
        </div>
      </UploadTrigger>
      <UploadPreview
        className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-4"
        renderItem={(file, { remove }) => {
          return (
            <div
              key={file.uid}
              className="relative aspect-square"
            >
              <img
                src={file.url}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => URL.revokeObjectURL(file.url)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button
                  onClick={() => remove(file.uid)}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          )
        }}
      />
    </Upload>
  )
}

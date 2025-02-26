import { IconButton, Input, cn } from "@novelist/ui"
import { safeArray } from "@novelist/utils"
import { type HTMLAttributes, useEffect, useMemo, useState } from "react"
import SortableList from "~/components/sortable"

export interface CustomOptionCreateProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> {
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  onError?: (e: Error) => void
}

interface Item {
  id: string
  value: string
}

export function CustomOptionCreate({
  value = [],
  onChange,
  className,
  onBlur,
  onError,
  placeholder,
  ...restProps
}: CustomOptionCreateProps) {
  const [inputValue, setInputValue] = useState<string>("")
  const [internal, setInternal] = useState<string[]>(value)

  const items = useMemo<Item[]>(
    () =>
      safeArray(internal).map((item) => ({
        id: item,
        value: item
      })),
    [internal]
  )

  const handleChange = (values: Item[]) => {
    const updateValues = values.map((item) => item.value)
    onChange?.(updateValues)
    setInternal(updateValues)
  }

  useEffect(() => {
    setInternal(() => safeArray(value))
  }, [value])

  return (
    <div
      {...restProps}
      className={cn("size-full relative overflow-hidden flex flex-col p-1", className)}
    >
      <Input
        className="w-full h-[32px] flex-[32px]"
        value={inputValue}
        onBlur={onBlur}
        placeholder={placeholder}
        onValueInput={(value) => {
          console.log(value)
          setInputValue(value)
        }}
        onEnter={(value, e) => {
          e.preventDefault()
          console.log(internal)
          if (internal.includes(value)) {
            const msg = `${value} is exists.`
            onError?.(new Error(msg))
            return
          }
          const newData = [...internal, value]
          onChange?.(newData)
          setInternal(() => [...newData])
          setInputValue("")
        }}
      />
      <SortableList
        items={items}
        onChange={handleChange}
        wrapperClass="overflow-y-auto p-1 space-y-1"
        renderItem={(item) => {
          return (
            <SortableList.Item
              id={item.id}
              className="shadow-sm rounded-sm"
            >
              <div className="flex items-center gap-x-3">
                <SortableList.DragHandle size={16} />
                <p>{item.value}</p>
                <IconButton
                  className="size-4 ml-auto opacity-30 hover:opacity-100"
                  size="icon"
                  variant={"outline"}
                  iconName="circle-x"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    const newData = internal.filter((data) => data !== item.id)
                    onChange?.(newData)
                    setInternal(() => [...newData])
                  }}
                />
              </div>
            </SortableList.Item>
          )
        }}
      />
    </div>
  )
}

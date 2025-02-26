import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@novelist/ui"
import type { PropsWithChildren } from "react"
import { useFormContext } from "react-hook-form"

export interface SimpleFormItemProps {
  name: string
  label: string
  description?: string
  message?: boolean
}

export function SimpleFormItem({
  name,
  label,
  description,
  message = true,
  children
}: PropsWithChildren<SimpleFormItemProps>) {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl
              {...field}
              onChange={(e) => {
                if (errors) {
                  clearErrors(field.name)
                }
                field.onChange(e)
              }}
              onError={(e) => {
                setError(field.name, {
                  type: "manual",
                  message: (e as unknown as Error).message
                })
              }}
            >
              {children}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {message && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}

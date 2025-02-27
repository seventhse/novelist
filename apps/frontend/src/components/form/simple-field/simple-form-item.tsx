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
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl {...field}>{children}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {message && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}

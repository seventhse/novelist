import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@novelist/ui"
import type { ComponentPropsWithoutRef } from "react"

export interface Option {
  label: string
  value: string
}

interface SelectBaseProps extends ComponentPropsWithoutRef<typeof Select> {
  placeholder?: string
  cleanable?: boolean
}

export interface SimpleSelectProps extends SelectBaseProps {
  options?: Option[]
}

export interface SimpleSelectGroupProps extends SelectBaseProps {
  options?: Array<{
    label: string
    options: Option[]
  }>
}

export function SimpleSelect({ options = [], cleanable, placeholder, ...restProps }: SimpleSelectProps) {
  return (
    <Select {...restProps}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
          >
            {item.label || item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function SimpleSelectGroup({ options = [], placeholder, ...restProps }: SimpleSelectGroupProps) {
  return (
    <Select {...restProps}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.options.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label || item.value}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

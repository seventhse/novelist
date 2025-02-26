import * as React from "react"
import { Button, type ButtonProps } from "../common/button"
import { Icon, type IconName, type IconProps } from "../common/icon"
import { cn } from "../lib/utils"

export interface IconButtonProps extends ButtonProps {
  iconName?: IconName
  icon?: Omit<IconProps, "name"> & {
    after?: boolean
    before?: boolean
  }
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon = {}, iconName, children, ...restProps }, ref) => {
    const { before = true, after, ...restIconProps } = icon || {}
    return (
      <Button
        {...restProps}
        ref={ref}
      >
        {!!iconName && before && (
          <Icon
            name={iconName}
            size={10}
            {...restIconProps}
          />
        )}
        {children}
        {!!iconName && after && (
          <Icon
            name={iconName}
            size={10}
            {...restIconProps}
          />
        )}
      </Button>
    )
  }
)

export interface LoadingButtonProps extends IconButtonProps {
  loading?: boolean
}

const LoadingButton = ({
  loading = false,
  className,
  disabled,
  children,
  iconName,
  icon,
  ...restProps
}: LoadingButtonProps) => {
  return (
    <IconButton
      {...restProps}
      disabled={loading || disabled}
      className={cn(className, "relative", loading && "pointer-events-none")}
      iconName={loading ? "loader-circle" : iconName}
      icon={{
        ...(icon || {}),
        className: cn(icon?.className, loading && "animate-spin")
      }}
    >
      {children}
    </IconButton>
  )
}

export { IconButton, LoadingButton }

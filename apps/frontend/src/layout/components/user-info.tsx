import { Avatar, AvatarFallback, AvatarImage } from "@novelist/ui"
import { useMemo } from "react"

import { useUser } from "@clerk/clerk-react"
import { useTranslation } from "@novelist/locales"

export default function UserInfo() {
  const { user } = useUser()
  const { t } = useTranslation()
  const name = useMemo(() => user?.fullName || user?.username || t("language.local"), [user, t])
  const fallbackName = useMemo(() => name.slice(0, 1), [name])

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={user?.imageUrl}
          alt={name}
        />
        <AvatarFallback className="rounded-lg">{fallbackName}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
        <span className="truncate text-xs">{user?.username}</span>
      </div>
    </>
  )
}

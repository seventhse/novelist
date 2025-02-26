import { SignIn } from "@clerk/clerk-react"

export function Login() {
  return (
    <div className="w-svw h-svh flex items-center justify-center">
      <SignIn />
    </div>
  )
}

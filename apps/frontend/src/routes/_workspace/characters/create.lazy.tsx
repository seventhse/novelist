import { createLazyFileRoute } from "@tanstack/react-router"
import CharacterCreate from "~/features/workspace/characters/character-create"

export const Route = createLazyFileRoute("/_workspace/characters/create")({
  component: CharacterCreate
})

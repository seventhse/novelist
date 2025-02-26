import { createFileRoute } from "@tanstack/react-router"
import CharacterEdit from "~/features/workspace/characters/character-update"

export const Route = createFileRoute("/_workspace/characters/update/$id")({
  component: CharacterEdit
})

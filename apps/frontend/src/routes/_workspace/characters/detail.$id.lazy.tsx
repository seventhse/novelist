import { createLazyFileRoute } from "@tanstack/react-router"
import CharacterDetail from "~/features/workspace/characters/character-detail"

export const Route = createLazyFileRoute("/_workspace/characters/detail/$id")({
  component: CharacterDetail
})

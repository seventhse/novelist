import { createLazyFileRoute } from "@tanstack/react-router"
import CharactersList from "~/features/workspace/characters/character-list"

export const Route = createLazyFileRoute("/_workspace/characters/")({
  component: CharactersList
})

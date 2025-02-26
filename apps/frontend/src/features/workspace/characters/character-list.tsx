import { useTranslation } from "@novelist/locales"
import type { QueryCharacterDto } from "@novelist/models"
import { Button, GridContainer, Input, Skeleton } from "@novelist/ui"
import { useDebounceCallback } from "@novelist/utils"
import { Link } from "@tanstack/react-router"
import { Suspense, useState } from "react"
import { CharactersGrid } from "./components/characters-grid"

const skeletonData = Array.from({ length: 12 })
  .fill(0)
  .map((_item) => Math.random().toString(36).slice(7))

export function CharactersSkeleton() {
  return (
    <GridContainer>
      {skeletonData.map((item) => (
        <Skeleton
          key={`skeleton-${item}`}
          className="bg-muted h-[300px]"
        />
      ))}
    </GridContainer>
  )
}

export default function CharactersList() {
  const { t } = useTranslation()
  const [search, setSearch] = useState<QueryCharacterDto>({ name: "" })
  const [name, setName] = useState<string>("")

  const updateSearchDebounced = useDebounceCallback((value: string) => {
    setSearch(() => ({ name: value }))
  }, 500)

  function handleReset() {
    setName("")
    setSearch(() => ({ name: "" }))
  }

  return (
    <div className="size-full overflow-y-auto flex flex-col gap-y-3 p-3">
      <div className="container mx-auto flex gap-x-3 transition-all">
        <Input
          className="max-w-[260px]"
          placeholder="Please input your character name..."
          value={name}
          onValueInput={(value) => {
            setName(value)
            updateSearchDebounced(value)
          }}
          onEnter={(value) => {
            setSearch(() => ({ name: value }))
          }}
        />
        <Button
          className="ml-1"
          variant="outline"
          onClick={handleReset}
          disabled={!name}
        >
          {t("common.reset")}
        </Button>

        <Button asChild>
          <Link to="/characters/create">Create Character</Link>
        </Button>
      </div>

      <Suspense fallback={<CharactersSkeleton />}>
        <CharactersGrid search={search} />
      </Suspense>
    </div>
  )
}

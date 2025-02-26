import { Api } from "@novelist/endpoint"
import type { Character, QueryCharacterDto } from "@novelist/models"
import { Empty, GridContainer } from "@novelist/ui"
import { useSuspenseQuery } from "@tanstack/react-query"

function CharacterItem({ character }: { character: Character }) {
  return <div />
}

export function CharactersGrid({ search }: { search: QueryCharacterDto }) {
  const { isPending, data = [] } = useSuspenseQuery({
    queryKey: ["characterList", search] as const,
    queryFn: async ({ queryKey }) => {
      const res = await Api.findCharacterList(queryKey[1])
      return res.data
    }
  })

  return (
    <Empty isEmpty={!data.length}>
      <GridContainer>
        {data.map((item) => (
          <CharacterItem
            key={item.characterId}
            character={item}
          />
        ))}
      </GridContainer>
    </Empty>
  )
}

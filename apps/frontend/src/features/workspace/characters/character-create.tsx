import CharacterForm from "./components/character-form"

export default function CharacterCreate() {
  return (
    <div className="size-full flex flex-col">
      <CharacterForm
        defaultValues={{
          name: "Undefined"
        }}
      />
    </div>
  )
}

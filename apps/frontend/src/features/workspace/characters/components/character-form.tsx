import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Form,
  Icon,
  Input,
  LoadingButton
} from "@novelist/ui"
import { useRouter } from "@tanstack/react-router"

import type { CreateCharacterDto, UpdateCharacterDto } from "@novelist/models"
import { useState } from "react"
import { DynamicFormFieldCreate, DynamicSortableExtendFields, SimpleFormItem, SimpleUpload } from "~/components/form"
import { useCharacterForm } from "../hooks/use-character-form"

export interface CharacterFormProps<T extends boolean = false> {
  isEdit?: T
  defaultValues?: T extends false ? CreateCharacterDto : UpdateCharacterDto
  onSubmit?: (values: T extends false ? CreateCharacterDto : UpdateCharacterDto) => void
}

export default function CharacterForm(props: CharacterFormProps) {
  const { isEdit = false } = props

  const { history } = useRouter()

  // Form state
  const {
    form,
    fields,
    watchName,
    fieldArray: { remove, swap, append }
  } = useCharacterForm()

  // Dialog
  const [openDynamicFieldDialog, setOpenDynamicFieldDialog] = useState(false)

  const handleReset = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        className="size-full m-1 overflow-auto p-3"
        onSubmit={form.handleSubmit((values) => {
          console.log("form values:", values)
        })}
      >
        <header className="sticky top-0 flex items-center justify-center p-2 shadow rounded-2xl bg-background">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => history.back()}
            >
              <Icon name={"arrow-left"} />
            </Button>
            <div className="ml-3">
              <Input
                className="w-[320px] text-lg focus-visible:ring-transparent outline-none rounded-none shadow-none border-0 border-b-2 focus:border-primary"
                value={watchName}
              />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end space-x-3">
            <LoadingButton
              variant={"outline"}
              type="button"
              iconName="plus"
              onClick={() => setOpenDynamicFieldDialog(true)}
            >
              Add New Field
            </LoadingButton>
            <LoadingButton
              type="button"
              variant={"outline"}
              iconName="rotate-ccw"
              onClick={handleReset}
            >
              Reset
            </LoadingButton>
            <LoadingButton iconName="save-all">{isEdit ? "Update" : "Create"}</LoadingButton>
          </div>
        </header>

        <main className="flex-auto flex mt-3 px-2 gap-x-3">
          <div className="flex-1 space-y-3">
            <SimpleFormItem
              name="avatar"
              label="Character Photo"
            >
              <SimpleUpload
                onError={(e) => {
                  form.setError("avatar", e[0]?.message || "")
                }}
              />
            </SimpleFormItem>
          </div>
          <div className="flex-1 flex flex-col gap-y-3">
            <SimpleFormItem
              name="name"
              label="Character Name"
            >
              <Input placeholder="Please input your character name..." />
            </SimpleFormItem>
            <DynamicSortableExtendFields
              fields={fields}
              onSwap={swap}
              onRemove={remove}
            />
          </div>
        </main>
      </form>

      <Dialog
        open={openDynamicFieldDialog}
        onOpenChange={setOpenDynamicFieldDialog}
      >
        <DialogContent className="max-w-[768px]">
          <DialogTitle>Add new field</DialogTitle>
          <DialogDescription>Add you want to save new field.</DialogDescription>
          <DynamicFormFieldCreate
            buttonNode={
              <DialogClose asChild>
                <Button variant={"outline"}>Close</Button>
              </DialogClose>
            }
            onSubmit={(values) => {
              append(values)
              setOpenDynamicFieldDialog(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </Form>
  )
}

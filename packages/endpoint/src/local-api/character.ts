import type {
  Character,
  CharacterHistory,
  CreateCharacterAvatarDto,
  CreateCharacterDto,
  PaginationDto,
  QueryCharacterDto,
  QueryPageCharacterDto,
  UpdateCharacterDto
} from "@novelist/models"
import { Response } from "@novelist/models"
import { nanoid } from "nanoid"

import { getLocalDb, paginateIndexedDB, queryIndexedDB, withTransaction } from "../local-db"
import { generateCurrentDateTime, generatorCommon } from "./common"

function createCharacterHistory(character: Character & { changeDesc?: string }): CharacterHistory {
  return {
    historyId: nanoid(),
    characterId: character.characterId,
    version: character.version,
    name: character.name,
    extendField: character.extendField,
    modifiedAt: generateCurrentDateTime(),
    desc: character.changeDesc || "",
    modifiedBy: "User"
  }
}

export async function findCharacterList(params?: QueryCharacterDto) {
  try {
    const db = await getLocalDb()
    const models = await queryIndexedDB(db, "characters", {
      where: {
        deletedAt: null,
        ...(params || {})
      },
      sortBy: "createdAt",
      sortOrder: "desc"
    })
    return Response.success(models)
  } catch (e) {
    throw new Error("Find all character error!")
  }
}

export async function findCharacterPage(params?: QueryPageCharacterDto) {
  try {
    const db = await getLocalDb()
    const models = await paginateIndexedDB(db, "characters", {
      where: {
        deletedAt: null,
        name: params?.name,
        desc: params?.desc
      },
      pageOn: params?.pageOn,
      pageSize: params?.pageSize
    })
    return Response.page(models)
  } catch (e) {
    throw new Error("Find page character error!")
  }
}

export async function findCharacterById(characterId: string) {
  const db = await getLocalDb()
  const model = await db.get("characters", characterId)

  if (!model || model.deletedAt) {
    return Response.success(null)
  }

  return Response.success(model)
}

export async function createCharacter(character: CreateCharacterDto) {
  const db = await getLocalDb()

  const characterId = nanoid()

  const newCharacter: Character = {
    ...character,
    ...generatorCommon(),
    characterId: characterId,
    version: 0
  }

  try {
    await withTransaction(db, ["characters", "characterHistory"], async (tx) => {
      await tx.objectStore("characters").add(newCharacter)
      await tx.objectStore("characterHistory").add(
        createCharacterHistory({
          ...newCharacter,
          changeDesc: "Initialization"
        })
      )
    })
    return Response.success()
  } catch (e) {
    throw new Error("Create character error!")
  }
}

export async function updateCharacter(character: UpdateCharacterDto) {
  try {
    const db = await getLocalDb()
    await withTransaction(db, ["characters", "characterHistory", "characterAvatars"], async (tx) => {
      const charactersStore = tx.objectStore("characters")
      const model = await charactersStore.get(character.characterId)

      if (!model) {
        throw new Error("Not found characters.")
      }

      // 添加版本检查
      if (character.version !== undefined && character.version !== model.version) {
        throw new Error("Character has been modified by others.")
      }

      const newCharacter = {
        ...model,
        ...character,
        version: model.version + 1,
        updatedAt: generateCurrentDateTime()
      }

      // 更新角色
      await charactersStore.put(newCharacter)
      await tx.objectStore("characterHistory").add(createCharacterHistory(newCharacter))

      const avatarsStore = tx.objectStore("characterAvatars")
      const avatars = await queryIndexedDB(db, "characterAvatars", {
        where: {
          characterId: character.characterId,
          version: model.version,
          deletedAt: null
        }
      })

      await Promise.all(
        avatars.map(async (avatar) => {
          await avatarsStore.put({
            ...avatar,
            version: newCharacter.version
          })
        })
      )
    })
    return Response.success()
  } catch (e) {
    throw new Error("Update characters error!")
  }
}

export async function deleteCharacter(characterId: string) {
  try {
    const db = await getLocalDb()

    await withTransaction(db, ["characters", "characterAvatars"], async (tx) => {
      const charactersStore = tx.objectStore("characters")
      const model = await charactersStore.get(characterId)

      if (!model) {
        throw new Error("Not found characters.")
      }

      const currentDateTime = generateCurrentDateTime()

      // 删除角色（软删除）
      await charactersStore.put({
        ...model,
        deletedAt: currentDateTime
      })

      // 删除关联的头像（软删除）
      const avatarsStore = tx.objectStore("characterAvatars")
      const avatars = await queryIndexedDB(db, "characterAvatars", {
        where: {
          characterId: characterId,
          deletedAt: null
        }
      })

      for (const avatar of avatars) {
        await avatarsStore.put({
          ...avatar,
          deletedAt: currentDateTime
        })
      }
    })

    return Response.success()
  } catch (e) {
    throw new Error("Delete character error!")
  }
}

export async function findCharacterHistoryList() {
  try {
    const db = await getLocalDb()
    const models = await queryIndexedDB(db, "characterHistory", {
      sortBy: "modifiedAt",
      sortOrder: "desc"
    })
    return Response.success(models)
  } catch (e) {
    throw new Error("Find character history list error!")
  }
}

export async function findCharacterHistoryPage(params?: PaginationDto) {
  try {
    const db = await getLocalDb()
    const models = await paginateIndexedDB(db, "characterHistory", {
      ...(params || {})
    })
    return Response.page(models)
  } catch (e) {
    throw new Error("Find character history pagination error!")
  }
}

export async function findCharacterAvatarListByCharacterId(characterId: string) {
  const model = await findCharacterById(characterId)

  if (!model.data) {
    throw new Error("Not found character!")
  }

  const db = await getLocalDb()

  const models = await queryIndexedDB(db, "characterAvatars", {
    where: {
      characterId: characterId,
      version: model.data.version,
      deletedAt: null
    }
  })

  return Response.success(models)
}

export async function createCharacterAvatar({ characterId, ...characterAvatar }: CreateCharacterAvatarDto) {
  const db = await getLocalDb()

  const character = await findCharacterById(characterId)

  if (!character.data) {
    throw new Error("Not found character.")
  }

  await db.add("characterAvatars", {
    ...generatorCommon(),
    ...characterAvatar,
    version: character.data.version,
    characterId: characterId,
    characterAvatarId: nanoid()
  })

  return Response.success()
}

export async function deleteCharacterAvatar(characterAvatarId: string) {
  const db = await getLocalDb()

  const model = await db.get("characterAvatars", characterAvatarId)

  if (!model) {
    throw new Error("Not found character avatar.")
  }

  await db.put(
    "characterAvatars",
    {
      ...model,
      deletedAt: generateCurrentDateTime()
    },
    characterAvatarId
  )

  return Response.success()
}

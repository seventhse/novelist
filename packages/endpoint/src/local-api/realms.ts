import { getLocalDb } from "../local-db"

export const getRealmList = async () => {
  const db = await getLocalDb()
  return await db.getAll("realm")
}

export const getRealmPage = async () => {}

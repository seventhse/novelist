import type { NovelistDatabase } from "./type"

export async function upgrade(db: NovelistDatabase, oldVersion: number, _newVersion: null | number) {
  if (oldVersion <= 0) {
    initDatabase(db)
  }
  // TODO: Wait
}

// Default init database
function initDatabase(db: NovelistDatabase) {
  // Table: characters
  if (!db.objectStoreNames.contains("characters")) {
    const store = db.createObjectStore("characters", { keyPath: "characterId" })
    store.createIndex("name", "name", { unique: false })
    store.createIndex("syncStatus", "syncStatus", { unique: false })
  }

  // Table: characterAvatars
  if (!db.objectStoreNames.contains("characterAvatars")) {
    const store = db.createObjectStore("characterAvatars", { keyPath: "characterAvatarId" })
    store.createIndex("characterId", "characterId", { unique: false })
    store.createIndex("version", "version", { unique: false })
  }

  // Table: characterHistory
  if (!db.objectStoreNames.contains("characterHistory")) {
    const store = db.createObjectStore("characterHistory", { keyPath: "historyId" })
    store.createIndex("characterId", "characterId", { unique: false })
    store.createIndex("version", "version", { unique: false })
  }

  // Table: collection
  if (!db.objectStoreNames.contains("collection")) {
    const store = db.createObjectStore("collection", { keyPath: "collectionId" })
    store.createIndex("name", "name", { unique: false })
  }

  // Table: realm
  if (!db.objectStoreNames.contains("realm")) {
    const store = db.createObjectStore("realm", { keyPath: "realmId" })
    store.createIndex("name", "name", { unique: false })
    store.createIndex("syncStatus", "syncStatus", { unique: false })
  }

  // Table: realmHistory
  if (!db.objectStoreNames.contains("realmHistory")) {
    const store = db.createObjectStore("realmHistory", { keyPath: "historyId" })
    store.createIndex("realmId", "realmId", { unique: false })
    store.createIndex("version", "version", { unique: false })
  }

  // Table: realmTimeline
  if (!db.objectStoreNames.contains("realmTimeline")) {
    const store = db.createObjectStore("realmTimeline", { keyPath: "timelineId" })
    store.createIndex("realmId", "realmId", { unique: false })
    store.createIndex("name", "name", { unique: false })
  }

  // Table: realmTimelineHistory
  if (!db.objectStoreNames.contains("realmTimelineHistory")) {
    const store = db.createObjectStore("realmTimelineHistory", { keyPath: "historyId" })
    store.createIndex("timelineId", "timelineId", { unique: false })
    store.createIndex("version", "version", { unique: false })
  }

  // Table: realmTimePoint
  if (!db.objectStoreNames.contains("realmTimePoint")) {
    const store = db.createObjectStore("realmTimePoint", { keyPath: "timePointId" })
    store.createIndex("timelineId", "timelineId", { unique: false })
    store.createIndex("date", "date", { unique: false })
  }

  // Table: realmTimePointCharacter
  if (!db.objectStoreNames.contains("realmTimePointCharacter")) {
    const store = db.createObjectStore("realmTimePointCharacter", { keyPath: "timePointCharacterId" })
    store.createIndex("realmTimePointCharacter", "realmTimePointCharacter", { unique: false })
    store.createIndex("characterId", "characterId", { unique: false })
    store.createIndex("realmTimePointId", "realmTimePointId", { unique: false })
  }
}

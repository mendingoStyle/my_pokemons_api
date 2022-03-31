import { EntityTarget, getConnection, getManager } from 'typeorm'

export async function truncate(entities: EntityTarget<any>[]) {
  for (const entity of entities) {
    await getManager().clear(entity)
  }
}

export async function revertMigrations() {
  for (const _ in getConnection().migrations) {
    await getConnection().undoLastMigration()
  }
}

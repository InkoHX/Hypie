import './extensions'
import 'reflect-metadata'

import { MetadataStorage } from './metadata/MetadataStorage'

export * from './Client'
export * from './structures'
export * from './registries'
export * from './entities'
export * from './common'
export * from './decorators'
export * from './metadata'

export function getMetadataStorage (): MetadataStorage {
  if (global.metadataStorage instanceof MetadataStorage) return global.metadataStorage

  global.metadataStorage = new MetadataStorage()

  return global.metadataStorage
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      metadataStorage: MetadataStorage
    }
  }
}

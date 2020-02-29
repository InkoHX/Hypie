import { Command } from 'src/structures'

import { MetaKeys } from '../MetaKeys'
import { ParameterMetadata } from './Arguments'
import { ResolveType } from './types'

export type OptionalMetadata = ParameterMetadata

export function Optional (type: ResolveType): Function {
  return (target: Command, propKey: string, paramIndex: number): void => {
    const indexArray: OptionalMetadata[] = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey) ?? []
    indexArray.push({
      mode: 'optional',
      index: paramIndex,
      type
    })

    Reflect.defineMetadata(MetaKeys.COMMAND_RUN_PARAMS, indexArray, target, propKey)
  }
}

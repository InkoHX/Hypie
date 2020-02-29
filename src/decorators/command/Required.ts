import { Command } from '@lib'

import { MetaKeys } from '..'
import { ParameterMetadata } from './Arguments'
import { Types } from './types'

export type RequiredMetadata = ParameterMetadata

export function Required (type: Types = 'string'): Function {
  return (target: Command, propKey: string, paramIndex: number): void => {
    const indexArray: RequiredMetadata[] = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey) ?? []
    indexArray.push({
      mode: 'required',
      index: paramIndex,
      type
    })

    Reflect.defineMetadata(MetaKeys.COMMAND_RUN_PARAMS, indexArray, target, propKey)
  }
}

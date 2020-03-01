import { MetaKeys } from '..'
import { ParameterMetadata } from './Arguments'
import { ArgumentType } from './types'

export type RequiredMetadata = ParameterMetadata

export function Required (type: ArgumentType): Function {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propKey: string, paramIndex: number): void => {
    const indexArray: RequiredMetadata[] = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey) ?? []
    indexArray.push({
      mode: 'required',
      index: paramIndex,
      type
    })

    Reflect.defineMetadata(MetaKeys.COMMAND_RUN_PARAMS, indexArray, target, propKey)
  }
}

import { MetaKeys } from '../MetaKeys'
import { ParameterMetadata } from './Arguments'
import { ArgumentType } from './types'

export type OptionalMetadata = ParameterMetadata

export function Optional (type: ArgumentType): Function {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propKey: string, paramIndex: number): void => {
    const indexArray: OptionalMetadata[] = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey) ?? []
    indexArray.push({
      mode: 'optional',
      index: paramIndex,
      type
    })

    Reflect.defineMetadata(MetaKeys.COMMAND_RUN_PARAMS, indexArray, target, propKey)
  }
}

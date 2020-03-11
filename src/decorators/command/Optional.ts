import { ArgumentType, ParameterMetadata } from '.'
import { MetaKeys } from '../MetaKeys'
import { getMetadataStorage } from '../..'

export type OptionalMetadata = ParameterMetadata

export function Optional (type: ArgumentType): Function {
  return (target: Object, propKey: string, paramIndex: number): void => {
    const indexArray: OptionalMetadata[] = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey) ?? []
    const data: ParameterMetadata = {
      mode: 'optional',
      index: paramIndex,
      type
    }

    indexArray.push(data)
    getMetadataStorage().optionalParams.push({ ...data, target })
    Reflect.defineMetadata(MetaKeys.COMMAND_RUN_PARAMS, indexArray, target, propKey)
  }
}

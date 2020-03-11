import { ParameterMetadata } from '.'
import { ArgumentType, MetaKeys } from '..'
import { getMetadataStorage } from '../..'

export type RequiredMetadata = ParameterMetadata

export function Required (type: ArgumentType): Function {
  return (target: Object, propKey: string, paramIndex: number): void => {
    const indexArray: RequiredMetadata[] = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey) ?? []
    const data: ParameterMetadata = {
      mode: 'required',
      index: paramIndex,
      type
    }

    indexArray.push(data)
    getMetadataStorage().requiredParams.push({ ...data, target })
    Reflect.defineMetadata(MetaKeys.COMMAND_RUN_PARAMS, indexArray, target, propKey)
  }
}

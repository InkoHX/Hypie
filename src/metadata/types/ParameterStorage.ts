import { ArgumentType, ParameterMode } from '../../decorators'

interface ParameterStorage {
  target: Object,
  index: number,
  mode: ParameterMode,
  type: ArgumentType
}

export type OptionalStorage = ParameterStorage

export type RequiredStorage = ParameterStorage

import { ArgumentType, ParameterMode } from '../../decorators'

interface ParameterStorage {
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  index: number,
  mode: ParameterMode,
  type: ArgumentType
}

export type OptionalStorage = ParameterStorage

export type RequiredStorage = ParameterStorage

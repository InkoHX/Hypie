import { OptionalStorage, RequiredStorage } from './types'

export class MetadataStorage {
  public readonly optionalParams: OptionalStorage[] = []

  public readonly requiredParams: RequiredStorage[] = []
}

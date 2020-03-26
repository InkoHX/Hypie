import { Message, Permissions, PermissionString } from 'discord.js'

import { Client, getMetadataStorage, LanguageData } from '..'
import Structure from './Structure'

export type FilterType = 'textOnly' | 'dmOnly'

export interface BaseCommandOptions {
  filter: FilterType,
  requiredBotPermissions: PermissionString[],
  requiredUserPermissions: PermissionString[],
  description: (language: LanguageData) => string,
  usage: string,
  nsfw: boolean,
  ownerOnly: boolean
}

export type CommandOptions = Readonly<BaseCommandOptions>

export abstract class Command extends Structure {
  public readonly name: string

  public readonly filter?: FilterType

  public readonly requiredBotPermission: Permissions

  public readonly requiredUserPermission: Permissions

  public readonly description?: (language: LanguageData) => string

  public readonly usage?: string

  public readonly nsfw: boolean

  public readonly ownerOnly: boolean

  public flags?: Record<string, unknown>

  public constructor (client: Client, name: string, options?: Partial<CommandOptions>) {
    super(client)

    this.name = name.toLowerCase()

    this.filter = options?.filter

    this.requiredBotPermission = new Permissions(options?.requiredBotPermissions)

    this.requiredUserPermission = new Permissions(options?.requiredUserPermissions)

    this.description = options?.description

    this.usage = options?.usage

    this.nsfw = options?.nsfw ?? false

    this.ownerOnly = options?.ownerOnly ?? false
  }

  public abstract run (message: Message, ...args: unknown[]): Promise<Message | Message[]>

  /**
   * Create usages from metadata.
   * NOTE: It is not complete, so if usage is set, it is returned with priority.
   */
  public getUsage (): string {
    if (this.usage) return this.usage

    const metadataStorage = getMetadataStorage()
    const usage = [...metadataStorage.requiredParams, ...metadataStorage.optionalParams]
      .filter(value => value.target === Object.getPrototypeOf(this))
      .sort((a, b) => a.index - b.index)
      .map(value => value.mode === 'required' ? `<${value.type}>` : `[${value.type}]`)
      .join(' ')

    return usage
  }
}

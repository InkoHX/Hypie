/* eslint-disable no-confusing-arrow */
import { Message, Permissions, PermissionString } from 'discord.js'

import { Client, LanguageData, getMetadataStorage } from '..'
import Structure from './Structure'

export type FilterType = 'textOnly' | 'dmOnly'

export interface BaseCommandOptions {
  filter: FilterType,
  requiredPermissions: PermissionString[],
  description: (language: LanguageData) => string,
  usage: string,
  nsfw: boolean
}

export type CommandOptions = Readonly<BaseCommandOptions>

export abstract class Command extends Structure {
  public readonly name: string

  public readonly filter?: FilterType

  public readonly requiredPermission: Permissions

  public readonly description?: (language: LanguageData) => string

  public readonly usage?: string

  public readonly nsfw: boolean

  public constructor (client: Client, name: string, options?: Partial<CommandOptions>) {
    super(client)

    this.name = name.toLowerCase()

    this.filter = options?.filter

    this.requiredPermission = new Permissions(options?.requiredPermissions)

    this.description = options?.description

    this.usage = options?.usage

    this.nsfw = options?.nsfw ?? false
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

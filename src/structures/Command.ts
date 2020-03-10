import { Message, Permissions, PermissionString } from 'discord.js'

import { Client, LanguageData } from '..'
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
}

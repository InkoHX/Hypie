import { Message, Permissions, PermissionString } from 'discord.js'

import { Client } from '..'
import Structure from './Structure'

export type FilterType = 'textOnly' | 'dmOnly'

export interface BaseCommandOptions {
  filter: FilterType,
  requiredPermissions: PermissionString[]
}

export type CommandOptions = Readonly<BaseCommandOptions>

export abstract class Command extends Structure {
  public readonly name: string

  public readonly filter?: FilterType

  public readonly requiredPermission: Permissions

  public constructor (client: Client, name: string, options?: Partial<CommandOptions>) {
    super(client)

    this.name = name.toLowerCase()

    this.filter = options?.filter

    this.requiredPermission = new Permissions(options?.requiredPermissions)
  }

  public abstract run (message: Message, ...args: unknown[]): Promise<Message | Message[]>
}

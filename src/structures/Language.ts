import { MessageEmbed, PermissionString } from 'discord.js'
import { DeepPartial, DeepReadonly } from 'utility-types'

import { Client, Command } from '..'
import Structure from './Structure'

interface PartialLanguageOptions {
  default?: false,
  code: string,
  data: DeepPartial<LanguageData>
}

interface RequiredLanguageOptions {
  default: true,
  code: string,
  data: LanguageData
}

export type LanguageOptions = PartialLanguageOptions | RequiredLanguageOptions

export class Language extends Structure {
  public readonly code: string

  public readonly data: DeepPartial<LanguageData>

  public readonly default: boolean

  public constructor (client: Client, options: LanguageOptions) {
    super(client)

    this.code = options.code

    this.data = options.data

    this.default = options.default ?? false
  }
}

export interface BaseLanguageData {
  command: {
    help: {
      description: string,
      commandInfo: (commandName: string, usage: string, description: string) => string,
      noDescription: string
    },
    language: {
      description: string,
      settingCompleted: (langCode: string) => string
    },
    prefix: {
      description: string,
      samePrefix: string,
      notOwner: string,
      settingCompleted: (prefix: string) => string
    },
    ping: {
      description: string
    }
  },
  error: {
    command: {
      errorEmbed: (command: Command, error: Error) => MessageEmbed,
      missingArguments: (paramIndex: number) => string
    },
    resolver: {
      boolean: (paramIndex: number) => string,
      number: (paramIndex: number) => string,
      language: (paramIndex: number, codes: string[]) => string,
      command: (paramIndex: number, commands: string[]) => string,
      guild: (paramIndex: number) => string,
      user: (paramIndex: number) => string,
      textChannel: (paramIndex: number) => string,
      dmChannel: (paramIndex: number) => string
    }
  },
  inhibitor: {
    missingBotPermission: (permissions: PermissionString[]) => string,
    missingUserPermission: (permissions: PermissionString[]) => string,
    channelFilter: {
      dm: string,
      text: string
    },
    nsfw: string,
    ownerOnly: string
  }
}

export type LanguageData = DeepReadonly<BaseLanguageData>

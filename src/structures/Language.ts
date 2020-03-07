import { MessageEmbed } from 'discord.js'
import { DeepPartial, DeepReadonly } from 'utility-types'

import { Client, Command } from '..'
import Structure from './Structure'

export class Language extends Structure {
  public readonly code: string

  public readonly data: DeepPartial<LanguageData>

  public constructor (client: Client, code: string, data: DeepPartial<LanguageData>) {
    super(client)

    this.code = code

    this.data = data
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
      command: (paramIndex: number, commands: string[]) => string
    }
  }
}

export type LanguageData = DeepReadonly<BaseLanguageData>

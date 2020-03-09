import { Message } from 'discord.js'

import { Client } from '../Client'
import { Command } from './Command'
import { BaseLanguageData } from './Language'
import Structure from './Structure'

export abstract class Inhibitor extends Structure {
  public readonly name: string

  public constructor (client: Client, name: string) {
    super(client)

    this.name = name
  }

  public abstract run (message: Message, command: Command, language: BaseLanguageData): Promise<void> | void
}

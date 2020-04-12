import { Message } from 'discord.js'

import { Client } from '../Client'
import { Command } from './Command'
import { LanguageData } from './Language'
import Structure from './Structure'

export abstract class Finalizer extends Structure {
  public readonly name: string

  public constructor (client: Client, name: string) {
    super(client)

    this.name = name
  }

  public abstract run (message: Message, command: Command, language: LanguageData): Promise<void> | void
}

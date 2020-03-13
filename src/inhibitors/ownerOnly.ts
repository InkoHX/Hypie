import { Message } from 'discord.js'

import { Client } from '../Client'
import { Command, Inhibitor, LanguageData } from '../structures'

export default class extends Inhibitor {
  public constructor (client: Client) {
    super(client, 'ownerOnly')
  }

  public async run (message: Message, command: Command, language: LanguageData): Promise<void> {
    const application = await this.client.fetchApplication()

    if (command.ownerOnly && application.owner?.id !== message.author.id) throw new Error(language.inhibitor.ownerOnly)
  }
}

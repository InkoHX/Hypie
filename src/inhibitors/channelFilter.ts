import { Message } from 'discord.js'

import { Client } from '../Client'
import { LanguageData, Command, Inhibitor } from '../structures'

export default class extends Inhibitor {
  public constructor (client: Client) {
    super(client, 'channelFilter')
  }

  public run (message: Message, command: Command, language: LanguageData): void {
    const channel = message.channel

    if (command.filter === 'dmOnly' && channel.type !== 'dm') throw new Error(language.inhibitor.channelFilter.dm)
    if (command.filter === 'textOnly' && channel.type !== 'text') throw new Error(language.inhibitor.channelFilter.text)
  }
}

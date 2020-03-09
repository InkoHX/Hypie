import { Message, TextChannel } from 'discord.js'

import { Client } from '../Client'
import { Command, Inhibitor, LanguageData } from '../structures'

export default class extends Inhibitor {
  public constructor (client: Client) {
    super(client, 'nsfw')
  }

  public run (message: Message, command: Command, language: LanguageData): void {
    if (!(message.channel instanceof TextChannel)) return
    if (!message.channel.nsfw && command.nsfw) throw new Error(language.inhibitor.nsfw)
  }
}

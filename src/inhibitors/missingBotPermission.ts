import { Message, TextChannel } from 'discord.js'

import { Client } from '../Client'
import { LanguageData, Command, Inhibitor } from '../structures'

export default class extends Inhibitor {
  public constructor (client: Client) {
    super(client, 'missingBotPermission')
  }

  public run (message: Message, command: Command, language: LanguageData): void {
    if (!this.client.user) throw new TypeError('user property is null.')
    if (!(message.channel instanceof TextChannel)) return

    const missing = message.channel.permissionsFor(this.client.user)?.missing(command.requiredBotPermission, false)

    if (missing?.length) throw new Error(language.inhibitor.missingBotPermission(missing))
  }
}

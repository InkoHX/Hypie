import { Message, TextChannel } from 'discord.js'

import { Client } from '../Client'
import { BaseLanguageData, Command, Inhibitor } from '../structures'

export default class extends Inhibitor {
  public constructor (client: Client) {
    super(client, 'missingBotPermissions')
  }

  public run (message: Message, command: Command, language: BaseLanguageData): void {
    if (!this.client.user) throw new TypeError('user property is null.')
    if (!(message.channel instanceof TextChannel)) return

    const missing = message.channel.permissionsFor(this.client.user)?.missing(command.requiredPermission, false)

    if (missing?.length) throw new Error(language.inhibitor.missingBotPermissions(missing))
  }
}

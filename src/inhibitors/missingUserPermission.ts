import { Message, TextChannel } from 'discord.js'

import { Client } from '../Client'
import { Command, Inhibitor, LanguageData } from '../structures'

export default class extends Inhibitor {
  public constructor (client: Client) {
    super(client, 'missingUserPermission')
  }

  public run (message: Message, command: Command, language: LanguageData): void {
    const member = message.member
    if (!member) return
    if (!(message.channel instanceof TextChannel)) return

    const missing = message.channel.permissionsFor(member)?.missing(command.requiredUserPermission, false)

    if (missing?.length) throw new Error(language.inhibitor.missingUserPermission(missing))
  }
}

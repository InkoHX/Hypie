import { Guild, Message } from 'discord.js'

import { Arguments, Client, Command, Required } from '..'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'prefix', {
      description: language => language.command.prefix.description,
      filter: 'textOnly'
    })
  }

  @Arguments
  public async run (message: Message, @Required('string') prefix: string): Promise<Message> {
    const guild = message.guild
    const language = await message.getLanguageData()

    if (!(guild instanceof Guild)) throw new Error('This command is guild only.')
    if (message.author.id !== guild.ownerID) return message.reply(language.command.prefix.notOwner)

    const settings = await guild.getSettings()
    if (settings.prefix === prefix) return message.reply(language.command.prefix.samePrefix)

    settings.prefix = prefix
    await settings.save()

    return message.reply(language.command.prefix.settingCompleted(settings.prefix))
  }
}

import { Message } from 'discord.js'

import { Arguments, Client, Command, Language, Required } from '..'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'language', {
      description: (language) => language.command.language.description
    })
  }

  @Arguments
  public async run (message: Message, @Required('language') langObj: Language): Promise<Message> {
    const settings = await message.author.getSettings()

    settings.langCode = langObj.code
    await settings.save()

    const language = await message.getLanguageData()

    return message.channel.send(language.command.language.settingCompleted(settings.langCode))
  }
}

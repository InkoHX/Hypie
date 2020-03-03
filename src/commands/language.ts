/* eslint-disable new-cap */
import { Arguments, Client, Command, Required } from '..'
import { Message } from 'discord.js'
import { Language } from 'src/structures'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'language')
  }

  @Arguments
  public async run (message: Message, @Required('language') langObj: Language): Promise<Message> {
    const settings = await message.author.getSettings()

    settings.langCode = langObj.code
    await settings.save()

    const language = await message.getLanguageData()

    return message.channel.send(language.command.language.run.done(settings.langCode))
  }
}

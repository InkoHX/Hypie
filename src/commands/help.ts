/* eslint-disable new-cap */
import { Message } from 'discord.js'

import { Arguments, Client, Command, Optional } from '..'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'help', {
      description: language => language.command.help.description,
      usage: '[commandName]'
    })
  }

  @Arguments
  public async run (message: Message, @Optional('command') command?: Command): Promise<Message> {
    if (!command) return message.channel.send(this.client.commands.keyArray().join(', '), { code: true })

    const guildSettings = await message.guild?.getSettings()
    const language = await message.getLanguageData()
    const prefix = guildSettings?.prefix || this.client.prefix
    const commandName = command.name
    const description = command.description && command.description(language)
    const usage = command.usage ? `${prefix + commandName} ${command.usage}` : prefix + commandName
    
    return message.channel.send(language.command.help.commandInfo(commandName, usage, description || language.command.help.noDescription))
  }
}

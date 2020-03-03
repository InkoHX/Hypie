import { Message } from 'discord.js'

import { Client, Command, Event, Events } from '../..'

export default class CommandError extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: Events.COMMAND_ERROR,
      name: 'CommandError'
    })
  }

  public async run (message: Message, command: Command, error: Error): Promise<void> {
    this.client.logger.error(error)

    const language = await message.getLanguageData()

    message.channel.send(language.error.command.errorEmbed(command, error))
      .catch(error => this.client.logger.error(error))
  }
}

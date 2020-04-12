import { Message } from 'discord.js'

import { Client, Command, Event, Events } from '../..'

export default class CommandError extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: Events.COMMAND_ERROR,
      name: 'CommandError'
    })
  }

  public async run (error: unknown, message: Message, command: Command): Promise<void> {
    try {
      if (!(error instanceof Error)) throw error

      const language = await message.getLanguageData()

      await message.channel.send(language.error.command.errorEmbed(command, error))
      this.client.logger.error(error)
    } catch (error) {
      this.client.logger.error(error)
      process.exit(1)
    }
  }
}

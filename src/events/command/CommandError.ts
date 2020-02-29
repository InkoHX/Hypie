import { Client, Event, Events, Command, makeCommandErrorEmbed } from '@lib'
import { Message } from 'discord.js'

export default class CommandError extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: Events.COMMAND_ERROR,
      name: 'CommandError'
    })
  }

  public run (message: Message, command: Command, error: Error): void {
    this.client.logger.error(error)

    message.channel.send(makeCommandErrorEmbed(command, error))
      .catch(error => this.client.logger.error(error))
  }
}

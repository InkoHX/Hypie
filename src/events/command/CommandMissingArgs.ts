import { Client, Event, Events } from '@lib'
import { Message } from 'discord.js'

export default class CommandMissingArgs extends Event {
  public constructor (client: Client) {
    super(client, {
      name: 'CommandMissingArgs',
      eventName: Events.COMMAND_MISSING_ARGS
    })
  }

  public run (message: Message, error: Error): void {
    message.reply(error.message)
      .catch(error => this.client.logger.error(error))
  }
}

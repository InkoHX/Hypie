/* eslint-disable new-cap */
import { Command, Client } from '..'
import { Message } from 'discord.js'

export default class HelpCommand extends Command {
  public constructor (client: Client) {
    super(client, 'help')
  }

  public run (message: Message): Promise<Message> {
    return message.channel.send(this.client.commands.keyArray().join(', '), { code: true })
  }
}

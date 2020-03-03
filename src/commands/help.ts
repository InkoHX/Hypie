/* eslint-disable new-cap */
import { Message } from 'discord.js'

import { Client, Command } from '..'

export default class HelpCommand extends Command {
  public constructor (client: Client) {
    super(client, 'help')
  }

  public run (message: Message): Promise<Message> {
    return message.channel.send(this.client.commands.keyArray().join(', '), { code: true })
  }
}

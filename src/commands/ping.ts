import { Message } from 'discord.js'

import { Client, Command } from '..'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'ping', {
      description: (language) => language.command.ping.description
    })
  }

  public async run (message: Message): Promise<Message> {
    return message.channel.send(`Pong! ${Math.round(this.client.ws.ping)}ms`)
  }
}

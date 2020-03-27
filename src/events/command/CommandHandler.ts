import { Message } from 'discord.js'
import parse, { Arguments } from 'yargs-parser'

import { Client, Event, Events } from '../..'

export default class CommandHandler extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'message',
      name: 'CommandHandler'
    })
  }

  public async run (message: Message): Promise<void> {
    const prefix = (await message.guild?.getSettings())?.prefix ?? this.client.prefix

    if (message.system || message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    const parsed = this.parseArguments(message.content.replace(prefix, ''))
    const args = parsed._
      .map(value => typeof value === 'string' ? value.replace(/^(?<quote>['"])(?<output>.*)\1$/u, '$2') : value)

    const command = this.client.commands.get(args[0])

    if (!command) return

    command.flags = parsed

    try {
      const language = await message.getLanguageData()

      await Promise.all(this.client.inhibitors.map(value => value.run(message, command, language)))

      try {
        await command.run(message, ...args.slice(1))
      } catch (error) {
        this.client.emit(Events.COMMAND_ERROR, message, command, error)
      }
    } catch (error) {
      this.client.emit(Events.COMMAND_INHIBITOR, message, error)
    }
  }

  private parseArguments (str: string): Arguments {
    return parse(str)
  }
}

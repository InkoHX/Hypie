import { Message } from 'discord.js'

import { Client } from '../../Client'
import { Events } from '../../common'
import { Event } from '../../structures'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      name: 'commandInhibitor',
      eventName: Events.COMMAND_INHIBITOR_ERROR
    })
  }

  public async run (error: unknown, message: Message): Promise<void> {
    try {
      if (!(error instanceof Error)) throw error

      await message.reply(error.message)
    } catch (error) {
      this.client.logger.error(error)
      process.exit(1)
    }
  }
}

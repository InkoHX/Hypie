import { Client } from '../../Client'
import { Event } from '../../structures'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'debug',
      name: 'clientDebug'
    })
  }

  public run (info: string): void {
    this.client.logger.debug(info)
  }
}

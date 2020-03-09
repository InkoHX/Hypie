import { Client } from '../../Client'
import { Event } from '../../structures'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'warn',
      name: 'clientWarn'
    })
  }

  public run (info: string): void {
    this.client.logger.warn(info)
  }
}

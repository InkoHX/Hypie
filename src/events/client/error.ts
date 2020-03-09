import { Client } from '../../Client'
import { Event } from '../../structures'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'error',
      name: 'clientError'
    })
  }

  public run (error: Error): void {
    this.client.logger.error(error)
  }
}

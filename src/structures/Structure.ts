import { Client } from '..'

export class Structure {
  public readonly client: Client

  public constructor (client: Client) {
    this.client = client
  }
}

import { Client, Language } from '..'

export default class extends Language {
  public constructor (client: Client) {
    super(client, 'en-US', {
      error: {
        command: {
          missingArguments: (paramIndex: number): string => `The ${paramIndex} argument is missing.`
        }
      }
    })
  }
}

import { Client as DjsClient, ClientOptions } from 'discord.js'
import { Logger } from 'parrot-logger'
import path from 'path'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'

import { CommandRegistry, EventRegistry, LanguageRegistry, InhibitorRegistry } from './registries'

declare module 'discord.js' {
  interface Client {
    readonly events: EventRegistry,
    readonly commands: CommandRegistry,
    readonly languages: LanguageRegistry,
    readonly inhibitors: InhibitorRegistry,
    readonly path: string,
    readonly prefix: string,
    readonly logger: Logger
  }
}

export class Client extends DjsClient {
  public readonly events: EventRegistry

  public readonly commands: CommandRegistry

  public readonly languages: LanguageRegistry

  public readonly inhibitors: InhibitorRegistry

  public readonly path: string

  public readonly prefix: string

  public readonly logger: Logger

  public constructor (options?: ClientOptions) {
    super(options)

    this.events = new EventRegistry(this)

    this.commands = new CommandRegistry(this)

    this.languages = new LanguageRegistry(this)

    this.inhibitors = new InhibitorRegistry(this)

    this.logger = new Logger({
      file: {
        logging: true
      }
    })

    this.path = require.main?.filename
      ? path.dirname(require.main.filename)
      : process.cwd()

    this.prefix = '!!'
  }

  public async login (token?: string): Promise<string> {
    await Promise.all([
      this.connectDatabase(),
      this.events.registerAll(),
      this.commands.registerAll(),
      this.languages.registerAll(),
      this.inhibitors.registerAll()
    ])
      .catch(error => this.logger.error(error))

    return super.login(token)
  }

  private async connectDatabase (): Promise<Connection> {
    const target = await getConnectionOptions()
    const source = {
      entities: [
        path.join(__dirname, 'entities', '*.{js,ts}')
      ],
      migrations: [
        path.join(__dirname, 'migrations', '*.{js,ts}')
      ]
    }

    return createConnection(Object.assign(target, source))
  }
}

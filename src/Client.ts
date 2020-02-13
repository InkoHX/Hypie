import './extensions/index'

import { Client } from 'discord.js'
import { createConnection, Connection } from 'typeorm'
import path from 'path'

export default class extends Client {
  public async login (token?: string): Promise<string> {
    await this.connectDatabase()
      .catch(console.error)

    return super.login(token)
  }

  private connectDatabase (): Promise<Connection> {
    return createConnection({
      type: 'sqlite',
      database: path.join(process.cwd(), 'db.sqlite3'),
      entities: [
        path.join(__dirname, 'entities', '*.{js,ts}')
      ],
      migrations: [
        path.join(__dirname, 'migrations', '*.ts{js,ts}')
      ]
    })
  }
}

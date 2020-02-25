/* eslint-disable new-cap */
import { User } from 'discord.js'
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UserSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  public constructor (user?: User) {
    super()

    if (user) {
      this.id = user.id
    }
  }
}

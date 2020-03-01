/* eslint-disable new-cap */
import { User } from 'discord.js'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UserSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column()
  public langCode: string = 'ja-JP'

  public constructor (user?: User) {
    super()

    if (user) {
      this.id = user.id
    }
  }
}

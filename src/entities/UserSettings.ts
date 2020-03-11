import { User } from 'discord.js'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UserSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  @Column()
  public langCode?: string

  public constructor (user?: User) {
    super()

    if (user) {
      this.id = user.id
    }
  }
}

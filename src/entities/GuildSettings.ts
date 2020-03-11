import { Guild } from 'discord.js'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class GuildSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  @Column()
  public prefix?: string

  public constructor (guild?: Guild) {
    super()

    if (guild) {
      this.id = guild.id
    }
  }
}

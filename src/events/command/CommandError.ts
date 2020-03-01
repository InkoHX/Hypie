import { Client, Command, Event, Events } from '@lib'
import { Message, MessageEmbed } from 'discord.js'

const makeEmbed = (command: Command, error: Error): MessageEmbed => new MessageEmbed()
  .setColor('RED')
  .setTitle(`${command.name}コマンドを実行中にエラーが発生しました。`)
  .addFields([
    {
      name: 'エラーネーム',
      value: error.name
    },
    {
      name: 'エラーメッセージ',
      value: error.message
    }
  ])
  .setTimestamp()

export default class CommandError extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: Events.COMMAND_ERROR,
      name: 'CommandError'
    })
  }

  public run (message: Message, command: Command, error: Error): void {
    this.client.logger.error(error)

    message.channel.send(makeEmbed(command, error))
      .catch(error => this.client.logger.error(error))
  }
}

import { Command } from '@lib'
import { MessageEmbed } from 'discord.js'

export function makeCommandErrorEmbed (command: Command, error: Error): MessageEmbed {
  return new MessageEmbed()
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
}

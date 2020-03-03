import { Language, Client, Command } from '@lib'
import { MessageEmbed } from 'discord.js'

export default class extends Language {
  public constructor (client: Client) {
    super(client, 'ja-JP', {
      command: {
        language: {
          run: {
            done: (code: string): string => `言語を${code}に設定しました。`
          }
        }
      },
      error: {
        command: {
          errorEmbed: (command: Command, error: Error): MessageEmbed => {
            return new MessageEmbed()
              .setColor('RED')
              .setTitle(`${command.name}コマンドを実行中にエラーが発生しました。`)
              .addField('エラーネーム', error.name)
              .addField('エラーメッセージ', error.message)
              .setTimestamp()
          },
          missingArguments: (paramIndex): string => `第${paramIndex}引数が不足しています。`
        },
        resolver: {
          boolean: (paramIndex: number): string => `第${paramIndex}引数は"true"または"false"を指定する必要があります。`,
          number: (paramIndex: number): string => `第${paramIndex}引数は整数にする必要があります。`,
          language: (paramIndex: number, codes: string[]): string => [
            `第${paramIndex}引数には下記の文字列のどれかを選択する必要があります。`,
            '',
            '```ts',
            codes.join(', '),
            '```'
          ].join('\n')
        }
      }
    })
  }
}

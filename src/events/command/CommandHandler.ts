import { Client, Command, Event, Events } from '@lib'
import { DMChannel, Message, PermissionString, TextChannel } from 'discord.js'

const missingMessage = (permissions: PermissionString[]): string => [
  'このコマンドを実行するには下記の権限が必要です。',
  '',
  '```',
  permissions.join(', '),
  '```'
].join('\n')

export default class CommandHandler extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'message',
      name: 'CommandHandler'
    })
  }

  public run (message: Message): void {
    if (message.system || message.author.bot) return
    if (!message.content.startsWith(this.client.prefix)) return

    const args = message.content
      .replace(this.client.prefix, '')
      .split(' ')
    const command = this.client.commands.get(args[0])

    if (!command) return
    const channel = message.channel

    if (this.isNotAllowChannel(channel, command)) return
    if (this.isMissingPermission(channel, command)) return

    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      command.run(message, ...args.slice(1))
    } catch (error) {
      this.client.emit(Events.COMMAND_ERROR, message, command, error)
    }
  }

  private isNotAllowChannel (channel: TextChannel | DMChannel, command: Command): boolean {
    if (command.filter === 'textOnly' && channel.type !== 'text') {
      channel.send('このコマンドはテキストチャンネルでしか使用できません。')
        .catch((error) => this.client.logger.error(error))

      return true
    }
    if (command.filter === 'dmOnly' && channel.type !== 'dm') {
      channel.send('このコマンドはダイレクトメッセージでしか使用できません。')
        .catch((error) => this.client.logger.error(error))

      return true
    }

    return false
  }

  private isMissingPermission (channel: TextChannel | DMChannel, command: Command): boolean {
    if (!this.client.user) return false
    if (!(channel instanceof TextChannel)) return false
    const missing = channel.permissionsFor(this.client.user)?.missing(command.requiredPermission, false)

    if (missing?.length) {
      channel.send(missingMessage(missing))
        .catch(error => this.client.logger.error(error))

      return true
    }

    return false
  }
}
import { Message } from 'discord.js'

import { LanguageData } from '../../..'
import toBoolean from './Boolean'
import toCommand from './Command'
import toGuild from './Guild'
import toLanguage from './Language'
import toNumber from './Number'
import toString from './String'
import toUser from './User'

export type ArgumentResolverFunction = (data: unknown, paramIndex: number, language: LanguageData, message: Message) => unknown

export type ArgumentType = 'string' |
'number' |
'boolean' |
'language' |
'command' |
'guild' |
'user'

const resolvers: Record<ArgumentType, ArgumentResolverFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean,
  language: toLanguage,
  command: toCommand,
  guild: toGuild,
  user: toUser
}

export default resolvers

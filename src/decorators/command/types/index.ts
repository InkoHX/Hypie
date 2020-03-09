import { Message } from 'discord.js'

import { LanguageData } from '../../..'
import toBoolean from './Boolean'
import toCommand from './Command'
import toLanguage from './Language'
import toNumber from './Number'
import toString from './String'
import toGuild from './Guild'

export type ArgumentResolverFunction = (data: unknown, paramIndex: number, language: LanguageData, message: Message) => unknown

export type ArgumentType = 'string' |
'number' |
'boolean' |
'language' |
'command' |
'guild'

const resolvers: Record<ArgumentType, ArgumentResolverFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean,
  language: toLanguage,
  command: toCommand,
  guild: toGuild
}

export default resolvers

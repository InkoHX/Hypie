import { Message } from 'discord.js'

import { LanguageData } from '../../..'
import toBoolean from './Boolean'
import toLanguage from './Language'
import toNumber from './Number'
import toString from './String'

export type ArgumentResolverFunction = (data: unknown, paramIndex: number, language: LanguageData, message: Message) => unknown

export type ArgumentType = 'string' |
'number' |
'boolean' |
'language'

const resolvers: Record<ArgumentType, ArgumentResolverFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean,
  language: toLanguage
}

export default resolvers

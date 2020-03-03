import { Message } from 'discord.js'
import { BaseLanguageData } from '../../..'

import toBoolean from './Boolean'
import toNumber from './Number'
import toString from './String'
import toLanguage from './Language'

export type ArgumentResolverFunction = (data: unknown, paramIndex: number, language: BaseLanguageData, message: Message) => unknown

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

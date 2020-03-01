import { ArgumentResolverFunction } from '.'
import { BaseLanguageData, Language } from '@lib'
import { Message } from 'discord.js'

const toLanguage: ArgumentResolverFunction = (data: unknown, paramIndex: number, language: BaseLanguageData, message: Message): Language => {
  const client = message.client
  const str = String(data)
  const langObj = client.languages.get(str)

  if (!langObj) throw new Error(language.error.resolver.language(paramIndex, client.languages.keyArray()))

  return langObj
}

export default toLanguage

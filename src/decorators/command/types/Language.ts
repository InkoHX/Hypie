import { ArgumentResolverFunction } from '.'
import { Language } from '../../..'

const toLanguage: ArgumentResolverFunction = (data, paramIndex, language, message): Language => {
  const client = message.client
  const str = String(data)
  const langObj = client.languages.get(str)

  if (!langObj) throw new Error(language.error.resolver.language(paramIndex, client.languages.keyArray()))

  return langObj
}

export default toLanguage

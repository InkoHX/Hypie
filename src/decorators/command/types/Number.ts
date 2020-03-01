import { ArgumentResolverFunction } from '.'
import { BaseLanguageData } from 'src/structures'

const toNumber: ArgumentResolverFunction = (data: unknown, paramIndex: number, language: BaseLanguageData): number => {
  const number = parseInt(String(data))

  if (!Number.isInteger(number)) throw new Error(language.error.resolver.number(paramIndex))

  return number
}

export default toNumber

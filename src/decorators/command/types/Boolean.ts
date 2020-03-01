import { BaseLanguageData } from '@lib'

import { ArgumentResolverFunction } from '.'

const toBoolean: ArgumentResolverFunction = (data: unknown, paramIndex: number, language: BaseLanguageData): boolean => {
  const str = String(data).toLowerCase()

  if (str === 'true') return true
  if (str === 'false') return false

  throw new Error(language.error.resolver.boolean(paramIndex))
}

export default toBoolean

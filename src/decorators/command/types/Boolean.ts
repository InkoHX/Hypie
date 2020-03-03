import { ArgumentResolverFunction } from '.'

const toBoolean: ArgumentResolverFunction = (data, paramIndex, language): boolean => {
  const str = String(data).toLowerCase()

  if (str === 'true') return true
  if (str === 'false') return false

  throw new Error(language.error.resolver.boolean(paramIndex))
}

export default toBoolean

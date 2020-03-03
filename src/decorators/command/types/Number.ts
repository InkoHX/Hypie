import { ArgumentResolverFunction } from '.'

const toNumber: ArgumentResolverFunction = (data, paramIndex, language): number => {
  const number = parseInt(String(data))

  if (!Number.isInteger(number)) throw new Error(language.error.resolver.number(paramIndex))

  return number
}

export default toNumber

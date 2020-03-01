import toBoolean from './Boolean'
import toNumber from './Number'
import toString from './String'

export type ArgumentResolverFunction = (data: unknown, paramIndex: number) => unknown

export type ArgumentType = 'string' |
'number' |
'boolean'

const resolvers: Record<ArgumentType, ArgumentResolverFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean
}

export default resolvers

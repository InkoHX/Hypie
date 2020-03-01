import toBoolean from './Boolean'
import toNumber from './Number'
import toString from './String'

export type ResolverFunction = (data: unknown, paramIndex: number) => unknown

export type ResolveType = 'string' |
'number' |
'boolean'

const resolvers: Record<ResolveType, ResolverFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean
}

export default resolvers

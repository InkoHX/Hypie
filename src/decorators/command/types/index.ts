import toBoolean from './Boolean'
import toNumber from './Number'
import toString from './String'

export type ResolveFunction = (data: unknown, paramIndex: number) => unknown

export type ResolveType = 'string' |
'number' |
'boolean'

const resolvers: Record<ResolveType, ResolveFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean
}

export default resolvers

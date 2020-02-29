import toNumber from './Number'
import toString from './String'

export type ResolveFunction = (data: unknown, paramIndex: number) => unknown

export type ResolveType = 'string' |
'number'

const resolvers: Record<ResolveType, ResolveFunction> = {
  string: toString,
  number: toNumber
}

export default resolvers

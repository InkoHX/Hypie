import toNumber from './Number'
import toString from './String'

export type TypeFunction = (data: unknown, paramIndex: number) => unknown

export type Types = 'string' |
'number'

const resolvers: Record<Types, TypeFunction> = {
  string: toString,
  number: toNumber
}

export default resolvers

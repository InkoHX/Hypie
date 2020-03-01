import { ResolverFunction } from '.'

const toString: ResolverFunction = (data: unknown): string => String(data)

export default toString

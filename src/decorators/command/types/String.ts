import { ArgumentResolverFunction } from '.'

const toString: ArgumentResolverFunction = (data: unknown): string => String(data)

export default toString

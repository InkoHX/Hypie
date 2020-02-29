import { ResolveFunction } from '.'

const toString: ResolveFunction = (data: unknown): string => String(data)

export default toString

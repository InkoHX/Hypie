import { ResolverFunction } from '.'

const toNumber: ResolverFunction = (data: unknown, paramIndex: number): number => {
  const number = parseInt(String(data))

  if (!Number.isInteger(number)) throw new Error(`第${paramIndex}引数は整数にする必要があります。`)

  return number
}

export default toNumber

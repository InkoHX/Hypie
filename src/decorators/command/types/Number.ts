import { ResolveFunction } from '.'

const toNumber: ResolveFunction = (data: unknown, paramIndex: number): number => {
  if (typeof data !== 'string') throw new Error(`第${paramIndex}引数はデータが文字列ではありません。`)
  const number = parseInt(data)

  if (!Number.isInteger(number)) throw new Error(`第${paramIndex}引数は整数にする必要があります。`)

  return number
}

export default toNumber

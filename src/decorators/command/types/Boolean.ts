import { ArgumentResolverFunction } from '.'

const toBoolean: ArgumentResolverFunction = (data: unknown, paramIndex: number): boolean => {
  const str = String(data).toLowerCase()

  if (str === 'true') return true
  if (str === 'false') return false

  throw new Error(`第${paramIndex}引数は"true"または"false"を指定する必要があります。`)
}

export default toBoolean

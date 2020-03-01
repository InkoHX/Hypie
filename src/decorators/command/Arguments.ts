import { Command, Events } from '@lib'
import { Message } from 'discord.js'

import { MetaKeys } from '..'
import resolvers, { ResolveType } from './types'

export type ParameterMode = 'required' | 'optional'

export interface ParameterMetadata {
  readonly mode: ParameterMode,
  readonly index: number,
  readonly type: ResolveType
}

export function Arguments (target: Command, propKey: string, desc: PropertyDescriptor): void {
  const init = desc.value

  desc.value = (...args: unknown[]): void => {
    const paramIndex: ParameterMetadata[] | undefined = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey)

    if (!paramIndex) return Reflect.apply(init, null, args)

    try {
      paramIndex.forEach((value) => {
        const type = value.type
        const mode = value.mode
        const index = value.index
        const arg = args[index]

        switch (mode) {
          case 'required':
            if (typeof arg !== 'string') throw new Error(`第${index}引数が不足しています。`)

            args[index] = resolvers[type](arg, index)
            break
          case 'optional':
            if (!arg) return

            args[index] = resolvers[type](arg, index)
        }
      })

      return Reflect.apply(init, null, args)
    } catch (error) {
      const message = args[0]
      if (!(message instanceof Message)) throw error
      
      message.client.emit(Events.COMMAND_MISSING_ARGS, message, error)
    }
  }
}

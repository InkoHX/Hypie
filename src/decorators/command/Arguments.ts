import { Message } from 'discord.js'

import { MetaKeys } from '..'
import { Events } from '../..'
import resolvers, { ArgumentType } from './types'

export type ParameterMode = 'required' | 'optional'

export interface ParameterMetadata {
  readonly mode: ParameterMode,
  readonly index: number,
  readonly type: ArgumentType
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function Arguments (this: unknown, target: Object, propKey: string, desc: PropertyDescriptor): PropertyDescriptor {
  return {
    ...desc,
    value: async (...args: unknown[]): Promise<void> => {
      const message = args[0]
      const paramIndex: ParameterMetadata[] | undefined = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey)

      if (!(message instanceof Message)) throw new Error('The first argument must be a "Message" object.')
      if (!paramIndex) return

      const language = await message.getLanguageData()

      try {
        paramIndex.forEach((value) => {
          const type = value.type
          const mode = value.mode
          const index = value.index
          const arg = args[index]

          switch (mode) {
            case 'required':
              if (typeof arg !== 'string') throw new Error(language.error.command.missingArguments(index))

              args[index] = resolvers[type](arg, index, language, message)
              break
            case 'optional':
              if (!arg) return

              args[index] = resolvers[type](arg, index, language, message)
          }
        })

        /**
         * 問題あり
         */
        return desc.value.apply(this, args)
      } catch (error) {
        message.client.emit(Events.COMMAND_MISSING_ARGS, message, error)
      }
    }
  }
}

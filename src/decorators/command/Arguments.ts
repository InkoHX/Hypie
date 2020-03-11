/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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

export function Arguments (target: Object, propKey: string, desc: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = desc.value
  const paramIndex: ParameterMetadata[] | undefined = Reflect.getOwnMetadata(MetaKeys.COMMAND_RUN_PARAMS, target, propKey)

  return {
    ...desc,
    async value (...args: unknown[]): Promise<void> {
      const message = args[0]

      if (!(message instanceof Message)) throw new Error('The first argument must be a "Message" object.')
      if (!paramIndex) return originalMethod.apply(this, args)

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

        return originalMethod.apply(this, args)
      } catch (error) {
        message.client.emit(Events.COMMAND_MISSING_ARGS, message, error)
      }
    }
  }
}

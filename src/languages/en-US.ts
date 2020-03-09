import { DeepPartial } from 'utility-types'

import { Client, Language } from '..'
import { LanguageData } from '../structures'

const data: DeepPartial<LanguageData> = {
  error: {
    command: {
      missingArguments: (paramIndex: number): string => `The ${paramIndex} argument is missing.`
    }
  }
}

export default class extends Language {
  public constructor (client: Client) {
    super(client, {
      code: 'en-US',
      data
    })
  }
}

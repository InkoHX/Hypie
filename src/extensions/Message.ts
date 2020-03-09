import mergeObject from 'deepmerge'
import { Structures } from 'discord.js'

import { LanguageData } from '..'

declare module 'discord.js' {
  interface Message {
    getLanguageData(): Promise<LanguageData>
  }
}

export default Structures.extend('Message', BaseClass => class extends BaseClass {
  public async getLanguageData (): Promise<LanguageData> {
    const langCode = (await this.author.getSettings()).langCode
    const baseData = this.client.languages.getDefaultLanguage()?.data

    if (!langCode) {
      if (!baseData) throw new Error('There is no default language.')

      return baseData as LanguageData
    }

    const data = this.client.languages.get(langCode)?.data

    if (!data || !baseData) throw new Error(`Key(${langCode}) does not exist.`)

    return mergeObject(baseData, data) as unknown as LanguageData
  }
})

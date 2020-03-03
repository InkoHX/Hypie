import mergeObject from 'deepmerge'
import { Structures } from 'discord.js'

import { BaseLanguageData } from '..'

declare module 'discord.js' {
  interface Message {
    getLanguageData(): Promise<BaseLanguageData>
  }
}

export default Structures.extend('Message', BaseClass => class extends BaseClass {
  public async getLanguageData (): Promise<BaseLanguageData> {
    const langCode = (await this.author.getSettings()).langCode
    const data = this.client.languages.get(langCode)?.data
    const baseData = this.client.languages.get(this.client.defaultLanguageCode)?.data

    if (!data || !baseData) throw new Error(`Key(${langCode}) does not exist.`)

    return mergeObject(baseData, data) as unknown as BaseLanguageData
  }
})

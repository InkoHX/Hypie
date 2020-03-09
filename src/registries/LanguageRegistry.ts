import { Language, RegisterData } from '..'
import { Registry } from './Registry'


export class LanguageRegistry extends Registry<string, Language> {
  public register (data: RegisterData<string, Language>): Language {
    const value = data.value

    if (value.default) {
      const hasDefaultLanguage = this.filter(value => value.default).size

      if (hasDefaultLanguage) throw new Error('The default language is already set.')
    }

    return super.register(data)
  }

  public async registerAll (): Promise<Language[]> {
    const modules = (await this.scanFiles('languages/**/*.{js,ts}'))
      .map((file) => this.loadModule(file))

    const result = (await Promise.all(modules))
      .filter<Language>((value): value is Language => value instanceof Language)
      .map<RegisterData<string, Language>>((language) => this.toRegisterData(language))

    return super.registerAll(result)
  }

  public getDefaultLanguage (): Language | undefined {
    return this.find(value => value.default)
  }

  private toRegisterData (language: Language): RegisterData<string, Language> {
    return {
      key: language.code,
      value: language
    }
  }
}

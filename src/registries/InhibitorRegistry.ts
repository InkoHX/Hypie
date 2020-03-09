import { Inhibitor, RegisterData } from '..'
import { Registry } from './Registry'

export class InhibitorRegistry extends Registry<string, Inhibitor> {
  public async registerAll (): Promise<Inhibitor[]> {
    const modules = (await this.scanFiles('inhibitors/**/*.{js,ts}'))
      .map((file) => this.loadModule(file))

    const result = (await Promise.all(modules))
      .filter<Inhibitor>((value): value is Inhibitor => value instanceof Inhibitor)
      .map<RegisterData<string, Inhibitor>>((inhibitor) => this.toRegisterData(inhibitor))

    return super.registerAll(result)
  }

  private toRegisterData (inhibitor: Inhibitor): RegisterData<string, Inhibitor> {
    return {
      key: inhibitor.name,
      value: inhibitor
    }
  }
}

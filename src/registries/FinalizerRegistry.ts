import { Finalizer } from '../structures/Finalizer'
import { RegisterData, Registry } from './Registry'

export class FinalizerRegistry extends Registry<string, Finalizer> {
  public async registerAll (): Promise<Finalizer[]> {
    const modules = (await this.scanFiles('finalizers/**/*.{js,ts}'))
      .map((file) => this.loadModule(file))

    const result = (await Promise.all(modules))
      .filter<Finalizer>((value): value is Finalizer => value instanceof Finalizer)
      .map<RegisterData<string, Finalizer>>((finalizer) => this.toRegisterData(finalizer))

    return super.registerAll(result)
  }

  private toRegisterData (finalizer: Finalizer): RegisterData<string, Finalizer> {
    return {
      key: finalizer.name,
      value: finalizer
    }
  }
}

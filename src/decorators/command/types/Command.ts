import { ArgumentResolverFunction } from '.'

const toCommand: ArgumentResolverFunction = (data, paramIndex, language, message) => {
  const str = String(data).toLowerCase()
  const client = message.client
  const command = client.commands.get(str)

  if (!command) throw new Error(language.error.resolver.command(paramIndex, client.commands.keyArray()))

  return command
}

export default toCommand

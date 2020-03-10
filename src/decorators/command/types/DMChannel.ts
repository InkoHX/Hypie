import { DMChannel } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const toDMChannel: ArgumentResolverFunction = (data, paramIndex, language, message): DMChannel => {
  const client = message.client
  const dmChannel = client.channels.resolve(String(data))

  if (!dmChannel || !(dmChannel instanceof DMChannel)) throw new Error(language.error.resolver.dmChannel(paramIndex))

  return dmChannel
}

export default toDMChannel

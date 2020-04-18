import { DMChannel } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const toDMChannel: ArgumentResolverFunction = async (data, paramIndex, language, message): Promise<DMChannel> => {
  const client = message.client
  const channel = await client.channels.fetch(String(data))
    .catch(() => null)

  if (!channel || !(channel instanceof DMChannel)) throw new Error(language.error.resolver.dmChannel(paramIndex))

  return channel
}

export default toDMChannel

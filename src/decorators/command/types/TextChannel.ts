import { TextChannel } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const toTextChannel: ArgumentResolverFunction = (data, paramIndex, language, message): TextChannel => {
  const client = message.client
  const textChannel = client.channels.resolve(String(data))
  
  if (!textChannel || !(textChannel instanceof TextChannel)) throw new Error(language.error.resolver.textChannel(paramIndex))

  return textChannel
}

export default toTextChannel

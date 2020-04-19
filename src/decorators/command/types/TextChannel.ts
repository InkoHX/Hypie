import { TextChannel } from 'discord.js'

import { ArgumentResolverFunction } from '.'
import MentionRegex from '../../../common/MentionRegex'

const toTextChannel: ArgumentResolverFunction = async (data, paramIndex, language, message): Promise<TextChannel> => {
  const id = MentionRegex.CHANNELS_PATTERN.exec(String(data))?.groups?.id ?? String(data)
  const client = message.client
  const textChannel = await client.channels.fetch(id)
    .catch(() => null)
  
  if (!textChannel || !(textChannel instanceof TextChannel)) throw new Error(language.error.resolver.textChannel(paramIndex))

  return textChannel
}

export default toTextChannel

import { Guild } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const toGuild: ArgumentResolverFunction = (data, paramIndex, language, message): Guild => {
  const client = message.client
  const guild = client.guilds.resolve(String(data))

  if (!guild) throw new Error(language.error.resolver.guild(paramIndex))

  return guild
}

export default toGuild

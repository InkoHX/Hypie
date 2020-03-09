import { User } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const toUser: ArgumentResolverFunction = (data, paramIndex, language, message): User => {
  const client = message.client
  const user = client.users.resolve(String(data))

  if (!user) throw new Error(language.error.resolver.user(paramIndex))

  return user
}

export default toUser

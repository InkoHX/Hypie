import { User } from 'discord.js'

import { ArgumentResolverFunction } from '.'
import MentionRegex from '../../../common/MentionRegex'

const toUser: ArgumentResolverFunction = async (data, paramIndex, language, message): Promise<User> => {
  const id = MentionRegex.USERS_PATTERN.exec(String(data))?.groups?.id

  if (!id) throw new Error(language.error.resolver.user(paramIndex))

  const client = message.client
  const user = await client.users.fetch(id)
    .catch(() => null)

  if (!user) throw new Error(language.error.resolver.user(paramIndex))

  return user
}

export default toUser

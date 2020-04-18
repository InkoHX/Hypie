export interface MentionRegex {
  USERS_PATTERN: RegExp,
  ROLES_PATTERN: RegExp,
  CHANNELS_PATTERN: RegExp
}

const regex: MentionRegex = {
  USERS_PATTERN: /<@!?(?<id>\d{17,19})>/gu,
  ROLES_PATTERN: /<@&(?<id>\d{17,19})>/gu,
  CHANNELS_PATTERN: /<#(?<id>\d{17,19})>/gu
}

export default regex

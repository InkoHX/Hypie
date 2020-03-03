import { Client } from '.'

const bot = new Client()

bot.login()
  .catch(error => bot.logger.error(error))

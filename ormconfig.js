/* eslint-disable */
const path = require('path')

module.exports = {
  type: 'sqlite',
  database: path.join(process.cwd(), 'db.sqlite3'),
  entities: [
    path.resolve(path.join(__dirname, 'src', 'entities', '*.ts'))
  ],
  migrations: [
    path.resolve(path.join(__dirname, 'src', 'migrations', '*.ts'))
  ],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities"
  }
}

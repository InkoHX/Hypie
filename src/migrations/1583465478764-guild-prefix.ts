import {MigrationInterface, QueryRunner} from "typeorm";

export class guildPrefix1583465478764 implements MigrationInterface {
    name = 'guildPrefix1583465478764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_guild_settings" ("id" varchar PRIMARY KEY NOT NULL, "prefix" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_guild_settings"("id") SELECT "id" FROM "guild_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "guild_settings"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_guild_settings" RENAME TO "guild_settings"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_settings" RENAME TO "temporary_guild_settings"`, undefined);
        await queryRunner.query(`CREATE TABLE "guild_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "guild_settings"("id") SELECT "id" FROM "temporary_guild_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_guild_settings"`, undefined);
    }

}

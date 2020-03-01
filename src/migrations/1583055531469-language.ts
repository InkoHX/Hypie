import {MigrationInterface, QueryRunner} from "typeorm";

export class language1583055531469 implements MigrationInterface {
    name = 'language1583055531469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user_settings" ("id" varchar PRIMARY KEY NOT NULL, "langCode" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user_settings"("id") SELECT "id" FROM "user_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "user_settings"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user_settings" RENAME TO "user_settings"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_settings" RENAME TO "temporary_user_settings"`, undefined);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "user_settings"("id") SELECT "id" FROM "temporary_user_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user_settings"`, undefined);
    }

}

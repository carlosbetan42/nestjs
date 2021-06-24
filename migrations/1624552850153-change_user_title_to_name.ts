import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserTitleToName1624552850153 implements MigrationInterface {
    name = 'changeUserTitleToName1624552850153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "title"`);
    }

}

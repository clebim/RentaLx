import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAvatarUrlColumn1641307392151 implements MigrationInterface {
  name = 'addAvatarUrlColumn1641307392151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
  }
}

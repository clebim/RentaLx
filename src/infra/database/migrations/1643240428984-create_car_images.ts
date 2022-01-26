import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCarImages1643240428984 implements MigrationInterface {
  name = 'createCarImages1643240428984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "car_id" uuid NOT NULL, "image_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f7870496c0b0f5a8894cab2bde3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_images" ADD CONSTRAINT "FK_b656953875307b25131f0d9af94" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_images" DROP CONSTRAINT "FK_b656953875307b25131f0d9af94"`,
    );
    await queryRunner.query(`DROP TABLE "car_images"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCarSpecification1643159663553 implements MigrationInterface {
  name = 'createCarSpecification1643159663553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "specifications_cars" ("car_id" uuid NOT NULL, "specification_id" uuid NOT NULL, CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e" PRIMARY KEY ("car_id", "specification_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a9606be942c7a7983466a0aa30" ON "specifications_cars" ("car_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06812f537c06afbf37a9938f35" ON "specifications_cars" ("specification_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_a9606be942c7a7983466a0aa300" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_06812f537c06afbf37a9938f352" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_06812f537c06afbf37a9938f352"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_a9606be942c7a7983466a0aa300"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06812f537c06afbf37a9938f35"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a9606be942c7a7983466a0aa30"`,
    );
    await queryRunner.query(`DROP TABLE "specifications_cars"`);
  }
}

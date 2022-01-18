import {MigrationInterface, QueryRunner} from "typeorm";

export class createCars1642526099480 implements MigrationInterface {
    name = 'createCars1642526099480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" numeric NOT NULL, "available" boolean NOT NULL DEFAULT true, "license_plate" character varying NOT NULL, "fine_amount" numeric(13,2) NOT NULL, "brand" character varying NOT NULL, "category_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9b6410d2f4eabb985524faae074" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9b6410d2f4eabb985524faae074"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}

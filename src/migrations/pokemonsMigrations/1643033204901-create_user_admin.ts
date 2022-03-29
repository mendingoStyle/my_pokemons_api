import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserAdmin1643033204901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
            INSERT INTO users (user, password, email)
            VALUES ('admin', 'admin', 'admin@admin.com');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

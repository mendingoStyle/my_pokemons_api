import { MigrationInterface, QueryRunner } from "typeorm";

export class alterRegisterAdminTeste1643054105312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
            UPDATE users
            SET password = '$2a$12$.3mjebvhQBEjI6WZEc6ziulWvrfsXKp8yu0XTHXSBQHW0xDln0nS2'
            WHERE user='admin';
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}



import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersTable1643026820582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
            CREATE TABLE  users (
                id int NOT NULL AUTO_INCREMENT,
                password varchar(255) NOT NULL,
                user varchar(255) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                name VARCHAR(150),
                cpf VARCHAR(150),
                createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                deletedAt datetime(6) DEFAULT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY UK_USERS (user)
            )ENGINE=InnoDB CHARSET=utf8;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

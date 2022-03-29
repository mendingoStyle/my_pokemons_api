import {MigrationInterface, QueryRunner} from "typeorm";

export class createPokemons1648584474224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
        CREATE TABLE POKEMONS (
            id INT NOT NULL AUTO_INCREMENT,
            row int NOT NULL,
            name VARCHAR(255) NOT NULL,
            img_name VARCHAR(255) NOT NULL,
            generations INT DEFAULT 1,
            evolution_stage INT DEFAULT 0,
            evolved BIT DEFAULT 0,
            familyId INT DEFAULT NULL,
            cross_gen BIT DEFAULT 0,
            type_1 VARCHAR(100) DEFAULT NULL,
            type_2 VARCHAR(100) DEFAULT NULL,
            weather_1 VARCHAR(100) DEFAULT NULL,
            weather_2 VARCHAR(100) DEFAULT NULL,
            status_total INT DEFAULT 0,
            atk INT DEFAULT 0,
            def INT DEFAULT 0,
            sta int DEFAULT 0,
            legendary BIT DEFAULT 0,
            aquireable BIT DEFAULT 1,
            spaws BIT DEFAULT 1,
            regional BIT DEFAULT 0,
            raidable TINYINT DEFAULT 0,
            hatchble TINYINT DEFAULT 0,
            shiny BIT DEFAULT 0,
            nest BIT DEFAULT 1,
            new BIT DEFAULT 0,
            not_gettable BIT DEFAULT 0,
            future_evolve BIT DEFAULT 0,
            max_cp_40 INT DEFAULT 0,
            max_cp_39 INT DEFAULT 0,
            createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            deletedAt datetime(6) DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY UK_NAME (name)
        )ENGINE=InnoDB CHARSET=utf8;
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

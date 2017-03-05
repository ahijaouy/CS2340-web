CREATE TABLE IF NOT EXISTS `source_reports`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(45),
    `water_type` VARCHAR(45),
    `water_condition` VARCHAR(45),
    `date_modified` DATE,
    `user_modified` VARCHAR(255),
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `purity_reports`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `source_id` int(11) NOT NULL,
    `overall_condition` VARCHAR(45),
    `virus_ppm` INT,
    `contaminant_ppm` INT,
    `date_modified` DATE,
    `user_modified` VARCHAR(255),
    CONSTRAINT `fk_source_id` FOREIGN KEY(`source_id`) REFERENCES `source_reports`(`id`),
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS 'logs'(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO source_reports (location,water_type,water_condition,date_modified, user_modified)
VALUES ('Atlanta, GA', 'Bottled', 'Potable', NOW(), 'Andre');
INSERT INTO purity_reports (source_id, overall_condition, virus_ppm, contaminant_ppm, date_modified, user_modified)
VALUES ('1', 'Safe', '100', '230', NOW(), 'Andre');
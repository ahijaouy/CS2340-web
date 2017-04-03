CREATE TABLE IF NOT EXISTS `source_reports`(
    `source_report_id` int(11) NOT NULL AUTO_INCREMENT,
    `longitude` VARCHAR(45),
    `latitude` VARCHAR(45),
    `water_type` VARCHAR(45),
    `water_condition` VARCHAR(45),
    `date_modified` DATE,
    `user_modified` VARCHAR(255),
    PRIMARY KEY(`source_report_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `purity_reports`(
    `purity_report_id` int(11) NOT NULL AUTO_INCREMENT,
    `source_id` int(11) NOT NULL,
    `overall_condition` VARCHAR(45),
    `virus_ppm` INT,
    `contaminant_ppm` INT,
    `date_modified` DATE,
    `user_modified` VARCHAR(255),
    CONSTRAINT `fk_source_id` FOREIGN KEY(`source_id`) REFERENCES `source_reports`(`source_report_id`),
    PRIMARY KEY(`purity_report_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS 'logs'(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

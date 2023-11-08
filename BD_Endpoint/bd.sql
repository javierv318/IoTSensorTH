CREATE SCHEMA `parcial3` ;

USE `parcial3`;

CREATE TABLE `parcial3`.`datos_criadero` (
  `timestamp` INT(12) NOT NULL,
  `sensorId` INT(2) NOT NULL,
  `temperature` FLOAT NOT NULL,
  `humidity` FLOAT NOT NULL,
  `thermalSensation` FLOAT NOT NULL,
  `criadero` TINYINT NOT NULL,
  PRIMARY KEY (`timestamp`));
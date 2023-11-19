CREATE SCHEMA `parcial3` ;

USE `parcial3`;

CREATE TABLE `parcial3`.`datos_criadero` (
  `id` INT(11) AUTO_INCREMENT,
  `timestamp` INT(14) NOT NULL,
  `sensorId` INT(5) NOT NULL,
  `temperature` FLOAT NOT NULL,
  `humidity` FLOAT NOT NULL,
  `thermalSensation` FLOAT NOT NULL,
  `criadero` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `parcial3`.`usuarios` (
  `id` INT(11) AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `nodo` INT(5) NOT NULL,
  PRIMARY KEY (`id`)
);
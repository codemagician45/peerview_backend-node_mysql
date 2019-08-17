ALTER TABLE `peersview`.`user` 
ADD COLUMN `email_send_date` DATETIME NULL AFTER `campusId`;

ALTER TABLE `peersview`.`user` 
ADD COLUMN `last_logging_time` DATETIME NULL AFTER `email_send_date`;

ALTER TABLE `peersview`.`user` 
ADD COLUMN `email_verify_code` VARCHAR(45) NULL AFTER `last_logging_time`;
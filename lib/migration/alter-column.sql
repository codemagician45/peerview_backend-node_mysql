ALTER TABLE message
ADD COLUMN isRead TINYINT(1) AFTER detail;

ALTER TABLE `attachment` 
ADD COLUMN `replyId` INT(10) UNSIGNED NULL AFTER `eventPostId`;

ALTER TABLE `attachment` 
ADD CONSTRAINT `attachment_ibfk_7`
  FOREIGN KEY (`replyId`)
  REFERENCES `reply` (`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `user` 
CHANGE COLUMN `aboutMe` `aboutMe` TEXT CHARACTER SET 'utf8' NULL DEFAULT NULL ;

ALTER TABLE `campus_user` 
ADD UNIQUE INDEX `campusEmail_UNIQUE` (`campusEmail` ASC)

ALTER TABLE `job` 
CHANGE COLUMN `price` `price` DOUBLE NULL DEFAULT NULL ;

ALTER TABLE message
ADD COLUMN isRead TINYINT(1) AFTER detail;

ALTER TABLE `attachment` 
ADD COLUMN `replyId` INT(10) UNSIGNED NULL AFTER `eventPostId`;

ALTER TABLE `attachment` 
ADD CONSTRAINT `attachment_ibfk_7`
  FOREIGN KEY (`replyId`)
  REFERENCES `reply` (`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;
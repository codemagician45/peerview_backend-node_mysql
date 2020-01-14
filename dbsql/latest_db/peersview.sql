-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: peersview
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usage` enum('image','poster','video') COLLATE utf8_unicode_ci DEFAULT NULL,
  `cloudinaryPublicId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `campusMarketplaceId` int(10) unsigned DEFAULT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `postv1Id` (`postv1Id`),
  KEY `campusMarketplaceId` (`campusMarketplaceId`),
  KEY `campusPostId` (`campusPostId`),
  KEY `communityPostId` (`communityPostId`),
  KEY `eventPostId` (`eventPostId`),
  CONSTRAINT `attachment_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `attachment_ibfk_2` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `attachment_ibfk_3` FOREIGN KEY (`campusMarketplaceId`) REFERENCES `campus_marketplace` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `attachment_ibfk_4` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `attachment_ibfk_5` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `attachment_ibfk_6` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachment`
--

LOCK TABLES `attachment` WRITE;
/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
INSERT INTO `attachment` VALUES (1,'image','hnMh9GS9y6paZuFwqscpZuNYer6TCdS7/cv8amtfrqryfyv1xpwkg','2019-01-13 23:38:35','2019-01-13 23:38:35',6,NULL,NULL,NULL,NULL,NULL),(2,'image','hnMh9GS9y6paZuFwqscpZuNYer6TCdS7/uyagd7kflyxzarqv7oo6','2019-01-16 20:56:49','2019-01-16 20:56:49',9,NULL,NULL,NULL,NULL,NULL),(3,'image','hnMh9GS9y6paZuFwqscpZuNYer6TCdS7/yzpughrmyks1uohu35da','2019-01-16 21:03:26','2019-01-16 21:03:26',10,NULL,NULL,NULL,NULL,NULL),(4,'image','YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/lkz1a3qwsnutfaoi8ehg','2019-01-17 12:00:33','2019-01-17 12:00:33',16,NULL,NULL,NULL,NULL,NULL),(5,'image','YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/wfhawyqtaxlxywo9i6uv','2019-01-17 12:00:33','2019-01-17 12:00:33',16,NULL,NULL,NULL,NULL,NULL),(6,'image','YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/l7xpkfnbh9ykyw7sfb2q','2019-01-17 13:56:45','2019-01-17 13:56:45',22,NULL,NULL,NULL,NULL,NULL),(7,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/zw2i3hj7ftkzlo3v344j','2019-01-17 14:27:44','2019-01-17 14:27:44',25,NULL,NULL,NULL,NULL,NULL),(8,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/kz0rssaydm5zm4f40ham','2019-01-17 14:27:44','2019-01-17 14:27:44',25,NULL,NULL,NULL,NULL,NULL),(9,'image','LNXqmFQhqc7VmBcCedFbXcJMZVJQHFgj/y9oq2iwunccqtveg7orv','2019-01-23 15:50:16','2019-01-23 15:50:16',32,NULL,NULL,NULL,NULL,NULL),(10,'image','lUWbl6c6yPI0aKDTUB2jgIm2cnlK1bdH/izxjczckgrqzqr8s4jy9','2019-01-25 12:24:45','2019-01-25 12:24:45',36,NULL,NULL,NULL,NULL,NULL),(11,'image','lUWbl6c6yPI0aKDTUB2jgIm2cnlK1bdH/rr7gnxdpogionkbas3kt','2019-01-25 12:24:45','2019-01-25 12:24:45',36,NULL,NULL,NULL,NULL,NULL),(12,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/yowbc11ny3hozceteuv3','2019-02-03 02:43:17','2019-02-03 02:43:17',40,NULL,NULL,NULL,NULL,NULL),(13,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/y3jtnj3if5td7uuenhbm','2019-02-10 09:22:41','2019-02-10 09:22:41',46,NULL,NULL,NULL,NULL,NULL),(14,'image','LNXqmFQhqc7VmBcCedFbXcJMZVJQHFgj/kejvnmdh4e5ildyexxay','2019-02-10 09:28:43','2019-02-10 09:28:43',48,NULL,NULL,NULL,NULL,NULL),(15,'image','LNXqmFQhqc7VmBcCedFbXcJMZVJQHFgj/a6hmz1m3hnhhihwsgexu','2019-02-10 09:28:43','2019-02-10 09:28:43',48,NULL,NULL,NULL,NULL,NULL),(16,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/gz2r8hi09dfwnxjjlf8u','2019-03-07 07:08:47','2019-03-07 07:08:47',NULL,NULL,3,NULL,NULL,NULL),(17,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/a7jmzwt2ksbu6em1uict','2019-03-07 07:11:42','2019-03-07 07:11:42',NULL,NULL,4,NULL,NULL,NULL),(18,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/jgogrch2avepmgt8mxkk','2019-03-07 07:13:32','2019-03-07 07:13:32',NULL,NULL,5,NULL,NULL,NULL),(19,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/vhq4rg5wigmsxdnivqa4','2019-03-07 07:15:49','2019-03-07 07:15:49',NULL,NULL,6,NULL,NULL,NULL),(20,'image','lUWbl6c6yPI0aKDTUB2jgIm2cnlK1bdH/xpg17jftprzziayifbk5','2019-03-12 08:37:40','2019-03-12 08:37:40',57,NULL,NULL,NULL,NULL,NULL),(21,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/g7a6nyqihz46tjico38i','2019-03-14 17:27:24','2019-03-14 17:27:24',59,NULL,NULL,NULL,NULL,NULL),(22,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/wfzepcdwirayqfxuccpv','2019-03-15 20:20:02','2019-03-15 20:20:02',60,NULL,NULL,NULL,NULL,NULL),(23,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/ha1hsuqeq4looucdvqe7','2019-03-22 15:37:27','2019-03-22 15:37:27',64,NULL,NULL,NULL,NULL,NULL),(24,'image','YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/bsuyrjjdmvzwpywevahq','2019-03-22 17:25:32','2019-03-22 17:25:32',65,NULL,NULL,NULL,NULL,NULL),(25,'image','YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/cjcdbojyldl7smomzqov','2019-03-22 18:30:53','2019-03-22 18:30:53',67,NULL,NULL,NULL,NULL,NULL),(26,'image','YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/f5qwzqdudyrrq4v92rcf','2019-03-24 22:05:25','2019-03-24 22:05:25',70,NULL,NULL,NULL,NULL,NULL),(27,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/gwnelulfkmoonbis2vcj','2019-03-26 23:41:35','2019-03-26 23:41:35',73,NULL,NULL,NULL,NULL,NULL),(28,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/rdiapjpmll9zlou9pigx','2019-04-01 23:10:19','2019-04-01 23:10:19',75,NULL,NULL,NULL,NULL,NULL),(29,'image','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/llt4ed8orfti173ar9wa','2019-04-08 21:30:55','2019-04-08 21:30:55',76,NULL,NULL,NULL,NULL,NULL),(30,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/cjfmjygocxf5sagmvwbo','2019-04-11 19:50:35','2019-04-11 19:50:35',77,NULL,NULL,NULL,NULL,NULL),(31,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/pwkrkopygjgisvoxnydk','2019-04-11 19:50:35','2019-04-11 19:50:35',77,NULL,NULL,NULL,NULL,NULL),(32,'image','73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/tgsm5nufdtnlghq9kiqw','2019-04-11 19:50:35','2019-04-11 19:50:35',77,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES (1,'Peersview Campus','peersview@peersview.com','0ee0646c1c77d8131cc8f4ee65c7673b','2019-01-12 09:05:12','2019-01-12 09:05:12');
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_course`
--

DROP TABLE IF EXISTS `campus_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  KEY `campusId` (`campusId`),
  CONSTRAINT `campus_course_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_course_ibfk_2` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_course`
--

LOCK TABLES `campus_course` WRITE;
/*!40000 ALTER TABLE `campus_course` DISABLE KEYS */;
INSERT INTO `campus_course` VALUES (1,'2019-01-12 09:05:16','2019-01-12 09:05:16',1,1),(2,'2019-01-12 09:05:16','2019-01-12 09:05:16',2,1),(3,'2019-01-12 09:05:16','2019-01-12 09:05:16',3,1),(4,'2019-01-12 09:05:16','2019-01-12 09:05:16',4,1);
/*!40000 ALTER TABLE `campus_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_course_class`
--

DROP TABLE IF EXISTS `campus_course_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_course_class` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusCourseId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusCourseId` (`campusCourseId`),
  CONSTRAINT `campus_course_class_ibfk_1` FOREIGN KEY (`campusCourseId`) REFERENCES `campus_course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_course_class`
--

LOCK TABLES `campus_course_class` WRITE;
/*!40000 ALTER TABLE `campus_course_class` DISABLE KEYS */;
INSERT INTO `campus_course_class` VALUES (1,'Mathematics','2019-01-12 09:05:16','2019-01-12 09:05:16',1);
/*!40000 ALTER TABLE `campus_course_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_freshers_feed`
--

DROP TABLE IF EXISTS `campus_freshers_feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_freshers_feed` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `schoolYearStart` datetime DEFAULT NULL,
  `schoolYearEnd` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusId` (`campusId`),
  CONSTRAINT `campus_freshers_feed_ibfk_1` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_freshers_feed`
--

LOCK TABLES `campus_freshers_feed` WRITE;
/*!40000 ALTER TABLE `campus_freshers_feed` DISABLE KEYS */;
INSERT INTO `campus_freshers_feed` VALUES (1,'2013/14 Academic Year','2013-01-01 00:00:00','2014-01-01 00:00:00','2019-01-12 09:05:12','2019-01-12 09:05:12',1);
/*!40000 ALTER TABLE `campus_freshers_feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_job`
--

DROP TABLE IF EXISTS `campus_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_job` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hoursPerWeek` int(11) DEFAULT NULL,
  `pricePerHour` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusJobTypeId` int(10) unsigned DEFAULT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusJobTypeId` (`campusJobTypeId`),
  KEY `campusId` (`campusId`),
  CONSTRAINT `campus_job_ibfk_1` FOREIGN KEY (`campusJobTypeId`) REFERENCES `campus_job_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_job_ibfk_2` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_job`
--

LOCK TABLES `campus_job` WRITE;
/*!40000 ALTER TABLE `campus_job` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_job_type`
--

DROP TABLE IF EXISTS `campus_job_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_job_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_job_type`
--

LOCK TABLES `campus_job_type` WRITE;
/*!40000 ALTER TABLE `campus_job_type` DISABLE KEYS */;
INSERT INTO `campus_job_type` VALUES (1,'contract','Contractual','2019-01-12 09:05:14','2019-01-12 09:05:14'),(2,'parttime','Partime Job','2019-01-12 09:05:14','2019-01-12 09:05:14'),(3,'fulltime','Full Time Job','2019-01-12 09:05:14','2019-01-12 09:05:14');
/*!40000 ALTER TABLE `campus_job_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_marketplace`
--

DROP TABLE IF EXISTS `campus_marketplace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_marketplace` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `author` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `edition` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` float DEFAULT NULL,
  `isConfirm` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusId` (`campusId`),
  KEY `userId` (`userId`),
  CONSTRAINT `campus_marketplace_ibfk_1` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_marketplace_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_marketplace`
--

LOCK TABLES `campus_marketplace` WRITE;
/*!40000 ALTER TABLE `campus_marketplace` DISABLE KEYS */;
INSERT INTO `campus_marketplace` VALUES (1,'New Book','peersview@outlook.com','I love this Book','7084734116','Lagos','N/A','N/A',30,0,'2019-01-25 07:21:32','2019-01-25 07:21:32',1,3),(2,'Summer Sublease','peersview@outlook.com','\nHi everyone,\n\nI am subleasing a furnished bedroom in a 2 bedroom apartment from May-August. The apartment is located in NoMa-Bloomingdale, within walking distance to the NoMa and Shaw metro stations. Also walking distance from the Capitol and multiple bu','6432168061','Toronto','N/A','N/A',1200,0,'2019-03-07 07:06:44','2019-03-07 07:06:44',1,3),(3,'Renting spare room','peersview@outlook.com','Renting my spare room already furniture with queen bed chest tv desk walk-in closet private bath High speed Internet cable for a professional . Free of drugs pets smoke or alcohol. $900 plus security deposit everything in included. Available now.','7082734116','Lagos','N/A','N/A',900,0,'2019-03-07 07:08:47','2019-03-07 07:08:47',1,3),(4,'2007 FORD ESCAPE','peersview@outlook.com','Not much','7082734116','Lagos','N/A','N/A',2600,0,'2019-03-07 07:11:42','2019-03-07 07:11:42',1,3),(5,'English Basement / Glover Park - Towncenter','peersview@outlook.com','nOTHING','7082734116','Lagos','N/A','N/A',1600,0,'2019-03-07 07:13:32','2019-03-07 07:13:32',1,3),(6,'Gabinetes. Chicos','peersview@outlook.com','Nothing','7082734116','Lagos','N/A','N/A',10,0,'2019-03-07 07:15:49','2019-03-07 07:15:49',1,3);
/*!40000 ALTER TABLE `campus_marketplace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post`
--

DROP TABLE IF EXISTS `campus_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8_unicode_ci,
  `question` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusFreshersFeedId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  `campusCourseClassId` int(10) unsigned DEFAULT NULL,
  `campusSocietyClubId` int(10) unsigned DEFAULT NULL,
  `campusStudentGroupId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusFreshersFeedId` (`campusFreshersFeedId`),
  KEY `userId` (`userId`),
  KEY `campusId` (`campusId`),
  KEY `courseId` (`courseId`),
  KEY `campusCourseClassId` (`campusCourseClassId`),
  KEY `campusSocietyClubId` (`campusSocietyClubId`),
  KEY `campusStudentGroupId` (`campusStudentGroupId`),
  CONSTRAINT `campus_post_ibfk_1` FOREIGN KEY (`campusFreshersFeedId`) REFERENCES `campus_freshers_feed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_ibfk_3` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_ibfk_4` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_ibfk_5` FOREIGN KEY (`campusCourseClassId`) REFERENCES `campus_course_class` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_ibfk_6` FOREIGN KEY (`campusSocietyClubId`) REFERENCES `campus_society_club` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_ibfk_7` FOREIGN KEY (`campusStudentGroupId`) REFERENCES `campus_student_group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post`
--

LOCK TABLES `campus_post` WRITE;
/*!40000 ALTER TABLE `campus_post` DISABLE KEYS */;
INSERT INTO `campus_post` VALUES (1,'\n\nTrudeau v Trump: Corruption Within Normal Parameters:\nhttps://medium.com/@benfreeland/trudeau-v-trump-corruption-within-normal-parameters-bdbd5f610dc3',NULL,NULL,'2019-03-07 06:27:19','2019-03-07 06:27:19',NULL,3,1,NULL,NULL,NULL,NULL),(2,'Hi guys, what time does the Learning open close on Saturday and Sundays',NULL,NULL,'2019-03-07 06:42:33','2019-03-07 06:42:33',NULL,3,1,NULL,NULL,NULL,NULL),(3,'Looking to gain experience in psychology-related sectors?\n\nSLV.Global will be in Room E59, Richmond Building on Friday to tell you more about how you can gain hands-on mental health experience in Bali & Sri Lanka.\n\nLook forward to seeing you there!',NULL,NULL,'2019-03-07 06:52:18','2019-03-07 06:52:18',NULL,16,1,NULL,NULL,NULL,NULL),(4,'I need your help guys! Has anyone figured out how to solve the Linear Algebra assignment? ',NULL,NULL,'2019-03-07 07:26:04','2019-03-07 07:26:04',1,3,1,NULL,NULL,NULL,NULL),(5,'Hi guys, what time does the Learning open close on Saturday and Sundays?',NULL,NULL,'2019-03-07 07:29:11','2019-03-07 07:29:11',1,3,1,NULL,NULL,NULL,NULL),(6,'Does the Art galleria open on weekends?',NULL,NULL,'2019-03-07 07:35:16','2019-03-07 07:35:16',1,16,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `campus_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_like`
--

DROP TABLE IF EXISTS `campus_post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostId` (`campusPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `campus_post_like_ibfk_1` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_like`
--

LOCK TABLES `campus_post_like` WRITE;
/*!40000 ALTER TABLE `campus_post_like` DISABLE KEYS */;
INSERT INTO `campus_post_like` VALUES (1,'2019-03-07 06:45:22','2019-03-07 06:45:22',2,3),(2,'2019-03-07 06:52:45','2019-03-07 06:52:45',3,16),(3,'2019-03-07 06:52:46','2019-03-07 06:52:46',3,16),(4,'2019-03-07 06:52:50','2019-03-07 06:52:50',3,3);
/*!40000 ALTER TABLE `campus_post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_pageview`
--

DROP TABLE IF EXISTS `campus_post_pageview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_pageview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostId` (`campusPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `campus_post_pageview_ibfk_1` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_pageview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_pageview`
--

LOCK TABLES `campus_post_pageview` WRITE;
/*!40000 ALTER TABLE `campus_post_pageview` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_post_pageview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_poll_option`
--

DROP TABLE IF EXISTS `campus_post_poll_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_poll_option` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostId` (`campusPostId`),
  CONSTRAINT `campus_post_poll_option_ibfk_1` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_poll_option`
--

LOCK TABLES `campus_post_poll_option` WRITE;
/*!40000 ALTER TABLE `campus_post_poll_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_post_poll_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_poll_option_summary`
--

DROP TABLE IF EXISTS `campus_post_poll_option_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_poll_option_summary` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostPollOptionId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostPollOptionId` (`campusPostPollOptionId`),
  CONSTRAINT `campus_post_poll_option_summary_ibfk_1` FOREIGN KEY (`campusPostPollOptionId`) REFERENCES `campus_post_poll_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_poll_option_summary`
--

LOCK TABLES `campus_post_poll_option_summary` WRITE;
/*!40000 ALTER TABLE `campus_post_poll_option_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_post_poll_option_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_rating`
--

DROP TABLE IF EXISTS `campus_post_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostId` (`campusPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `campus_post_rating_ibfk_1` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_rating_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_rating`
--

LOCK TABLES `campus_post_rating` WRITE;
/*!40000 ALTER TABLE `campus_post_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_post_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_reply`
--

DROP TABLE IF EXISTS `campus_post_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hideComment` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `campusPostPollOptionId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostId` (`campusPostId`),
  KEY `userId` (`userId`),
  KEY `campusPostPollOptionId` (`campusPostPollOptionId`),
  CONSTRAINT `campus_post_reply_ibfk_1` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_reply_ibfk_3` FOREIGN KEY (`campusPostPollOptionId`) REFERENCES `campus_post_poll_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_reply`
--

LOCK TABLES `campus_post_reply` WRITE;
/*!40000 ALTER TABLE `campus_post_reply` DISABLE KEYS */;
INSERT INTO `campus_post_reply` VALUES (1,'I don\'t know',NULL,'2019-03-07 06:43:07','2019-03-07 06:43:07',2,3,NULL),(2,'I think 3 PM',NULL,'2019-03-07 06:43:32','2019-03-07 06:43:32',2,3,NULL),(3,'I\'m not sure tbh',NULL,'2019-03-07 06:43:55','2019-03-07 06:43:55',2,3,NULL),(4,'I like it',NULL,'2019-03-07 06:54:05','2019-03-07 06:54:05',3,3,NULL),(5,'I might check it out ',NULL,'2019-03-07 06:54:19','2019-03-07 06:54:19',3,3,NULL),(6,'Yeahhh',NULL,'2019-03-07 07:26:14','2019-03-07 07:26:14',4,3,NULL),(7,'LOL',NULL,'2019-03-07 07:26:26','2019-03-07 07:26:26',4,3,NULL),(8,'LOOOOOOL',NULL,'2019-03-07 07:26:32','2019-03-07 07:26:32',4,3,NULL),(9,'3pm',NULL,'2019-03-07 07:31:51','2019-03-07 07:31:51',5,3,NULL),(10,'On saturdays not sure',NULL,'2019-03-07 07:32:05','2019-03-07 07:32:05',5,3,NULL),(11,'Probably Sundays',NULL,'2019-03-07 07:32:15','2019-03-07 07:32:15',5,3,NULL),(12,'im not sure buddy',NULL,'2019-03-07 07:32:49','2019-03-07 07:32:49',5,3,NULL);
/*!40000 ALTER TABLE `campus_post_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_post_report`
--

DROP TABLE IF EXISTS `campus_post_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_post_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusPostId` int(10) unsigned DEFAULT NULL,
  `reportedBy` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusPostId` (`campusPostId`),
  KEY `reportedBy` (`reportedBy`),
  CONSTRAINT `campus_post_report_ibfk_1` FOREIGN KEY (`campusPostId`) REFERENCES `campus_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_post_report_ibfk_2` FOREIGN KEY (`reportedBy`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_post_report`
--

LOCK TABLES `campus_post_report` WRITE;
/*!40000 ALTER TABLE `campus_post_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_post_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_privacy`
--

DROP TABLE IF EXISTS `campus_privacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_privacy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_privacy`
--

LOCK TABLES `campus_privacy` WRITE;
/*!40000 ALTER TABLE `campus_privacy` DISABLE KEYS */;
INSERT INTO `campus_privacy` VALUES (1,'public','Visible to everyone','2019-01-12 09:05:13','2019-01-12 09:05:13'),(2,'private','User must request to join group','2019-01-12 09:05:13','2019-01-12 09:05:13'),(3,'secret','User must receive invite before they can join','2019-01-12 09:05:13','2019-01-12 09:05:13');
/*!40000 ALTER TABLE `campus_privacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_society_club`
--

DROP TABLE IF EXISTS `campus_society_club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_society_club` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isConfirm` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `campusId` (`campusId`),
  CONSTRAINT `campus_society_club_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_society_club_ibfk_2` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_society_club`
--

LOCK TABLES `campus_society_club` WRITE;
/*!40000 ALTER TABLE `campus_society_club` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_society_club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_student_group`
--

DROP TABLE IF EXISTS `campus_student_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_student_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `adminEmail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isConfirm` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  `campusPrivacyId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `campusId` (`campusId`),
  KEY `campusPrivacyId` (`campusPrivacyId`),
  CONSTRAINT `campus_student_group_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_student_group_ibfk_2` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_student_group_ibfk_3` FOREIGN KEY (`campusPrivacyId`) REFERENCES `campus_privacy` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_student_group`
--

LOCK TABLES `campus_student_group` WRITE;
/*!40000 ALTER TABLE `campus_student_group` DISABLE KEYS */;
INSERT INTO `campus_student_group` VALUES (1,'New Group','New nation group','peersview@outlook.com',NULL,0,'2019-01-25 07:23:13','2019-01-25 07:23:13',3,1,1),(2,'The students society of Boys','Latest gossips','peersview@outlook.com','Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK/eggxojten3ow7eq5xvoh',0,'2019-01-25 08:03:01','2019-01-25 08:03:01',3,1,1);
/*!40000 ALTER TABLE `campus_student_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_student_group_user`
--

DROP TABLE IF EXISTS `campus_student_group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_student_group_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `campusStudentGroupId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `campusStudentGroupId` (`campusStudentGroupId`),
  CONSTRAINT `campus_student_group_user_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_student_group_user_ibfk_2` FOREIGN KEY (`campusStudentGroupId`) REFERENCES `campus_student_group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_student_group_user`
--

LOCK TABLES `campus_student_group_user` WRITE;
/*!40000 ALTER TABLE `campus_student_group_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_student_group_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_user_course_class`
--

DROP TABLE IF EXISTS `campus_user_course_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_user_course_class` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `campusCourseClassId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `campusCourseClassId` (`campusCourseClassId`),
  CONSTRAINT `campus_user_course_class_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `campus_user_course_class_ibfk_2` FOREIGN KEY (`campusCourseClassId`) REFERENCES `campus_course_class` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_user_course_class`
--

LOCK TABLES `campus_user_course_class` WRITE;
/*!40000 ALTER TABLE `campus_user_course_class` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_user_course_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `countryCode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `countryCode` (`countryCode`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`countryCode`) REFERENCES `country` (`code`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'TORONTO','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(2,'GUELPH','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(3,'VANCOUVER','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(4,'MONTREAL','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(5,'OTTAWA','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(6,'LONDON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(7,'HALIFAX','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(8,'VICTORIA','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(9,'WATERLOO','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(10,'WINDSOR','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(11,'KINGSTON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(12,'QUEBEC CITY','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(13,'KELOWNA','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(14,'WINNIPEG','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(15,'MONCTON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(16,'ABBOTSFORD','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(17,'CALGARY','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(18,'FREDERICTON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(19,'BURNABY','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(20,'HAMILTON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(21,'SASKATOON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(22,'ST. CATHERINES','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(23,'REGINA','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(24,'EDMONTON','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(25,'MISSISSAUGA','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(26,'SHERBROOKE','2019-01-12 09:05:14','2019-01-12 09:05:14','CA'),(27,'THUNDERBAY','2019-01-12 09:05:14','2019-01-12 09:05:14','CA');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institutionName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post`
--

DROP TABLE IF EXISTS `community_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8_unicode_ci,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `userTypeId` int(10) unsigned DEFAULT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  `communityId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `userTypeId` (`userTypeId`),
  KEY `courseId` (`courseId`),
  KEY `communityId` (`communityId`),
  CONSTRAINT `community_post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_ibfk_2` FOREIGN KEY (`userTypeId`) REFERENCES `user_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_ibfk_3` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_ibfk_4` FOREIGN KEY (`communityId`) REFERENCES `community` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post`
--

LOCK TABLES `community_post` WRITE;
/*!40000 ALTER TABLE `community_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_follow`
--

DROP TABLE IF EXISTS `community_post_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_follow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `community_post_follow_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_follow_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_follow`
--

LOCK TABLES `community_post_follow` WRITE;
/*!40000 ALTER TABLE `community_post_follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_follow_cron_queue`
--

DROP TABLE IF EXISTS `community_post_follow_cron_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_follow_cron_queue` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  CONSTRAINT `community_post_follow_cron_queue_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_follow_cron_queue`
--

LOCK TABLES `community_post_follow_cron_queue` WRITE;
/*!40000 ALTER TABLE `community_post_follow_cron_queue` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_follow_cron_queue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_like`
--

DROP TABLE IF EXISTS `community_post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `community_post_like_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_like`
--

LOCK TABLES `community_post_like` WRITE;
/*!40000 ALTER TABLE `community_post_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_pageview`
--

DROP TABLE IF EXISTS `community_post_pageview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_pageview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `community_post_pageview_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_pageview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_pageview`
--

LOCK TABLES `community_post_pageview` WRITE;
/*!40000 ALTER TABLE `community_post_pageview` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_pageview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_poll_option`
--

DROP TABLE IF EXISTS `community_post_poll_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_poll_option` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  CONSTRAINT `community_post_poll_option_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_poll_option`
--

LOCK TABLES `community_post_poll_option` WRITE;
/*!40000 ALTER TABLE `community_post_poll_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_poll_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_rating`
--

DROP TABLE IF EXISTS `community_post_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `community_post_rating_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_rating_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_rating`
--

LOCK TABLES `community_post_rating` WRITE;
/*!40000 ALTER TABLE `community_post_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_reply`
--

DROP TABLE IF EXISTS `community_post_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hideComment` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `communityPostPollOptionId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  KEY `userId` (`userId`),
  KEY `communityPostPollOptionId` (`communityPostPollOptionId`),
  CONSTRAINT `community_post_reply_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_reply_ibfk_3` FOREIGN KEY (`communityPostPollOptionId`) REFERENCES `community_post_poll_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_reply`
--

LOCK TABLES `community_post_reply` WRITE;
/*!40000 ALTER TABLE `community_post_reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_post_report`
--

DROP TABLE IF EXISTS `community_post_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_post_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityPostId` int(10) unsigned DEFAULT NULL,
  `reportedBy` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityPostId` (`communityPostId`),
  KEY `reportedBy` (`reportedBy`),
  CONSTRAINT `community_post_report_ibfk_1` FOREIGN KEY (`communityPostId`) REFERENCES `community_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_post_report_ibfk_2` FOREIGN KEY (`reportedBy`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_post_report`
--

LOCK TABLES `community_post_report` WRITE;
/*!40000 ALTER TABLE `community_post_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_post_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_users`
--

DROP TABLE IF EXISTS `community_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'pending',
  `institutionName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isCreator` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `communityId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `communityId` (`communityId`),
  KEY `userId` (`userId`),
  CONSTRAINT `community_users_ibfk_1` FOREIGN KEY (`communityId`) REFERENCES `community` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `community_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_users`
--

LOCK TABLES `community_users` WRITE;
/*!40000 ALTER TABLE `community_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('CA','CANADA','2019-01-12 09:05:13','2019-01-12 09:05:13');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cloudinaryPublicId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `cloudinaryPublicId` (`cloudinaryPublicId`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'accountingAndFinance','Accounting and Finance',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(2,'agricultureAndForestry','Agriculture &amp; Forestry',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(3,'anatomyAndPhysiology','Anatomy &amp; Physiology',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(4,'anthropology','Anthropology',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(5,'architectureAndBuildEnvironment','Architecture &amp; The built environment',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(6,'astronomy','Astronomy',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(7,'biologicalScience','Biological science',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(8,'businessAndManagement','Business &amp; Management',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(9,'chemistry','Chemistry',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(10,'classicAndAncientHistory','Classics &amp; Ancient History',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(11,'communicationAndMediaStudies','Communication and Media studies',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(12,'computerScienceAndInformationSystems','Computer Science and Information Systems',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(13,'creativeArts','Creative Arts',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(14,'dentistry','Dentistry',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(15,'developmentStudies','Development Studies',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(16,'earthAndMarineScience','Earth &amp; Marine Science',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(17,'economics','Economics',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(18,'educationAndTraining','Education &amp; Training',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(19,'engineeringAeronautical','Engineering- Aeronautical',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(20,'engineeringCivilAndStructural','Engineering- Civil &amp; Structural',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(21,'engineeringComputerAndNetwork','Engineering- Computer &amp; Network',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(22,'engineeringElectrical','Engineering- Electrical',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(23,'engineeringMineralAndMining','Engineering- Mineral &amp; Mining',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(24,'engineeringChemical','Engineering- Chemical',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(25,'engineeringMechanical','Engineering- Mechanical',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(26,'englishLanguageAndLiterature','English Language &amp; Literature',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(27,'ethnicityGenderAndDiversity','Ethnicity, Gender &amp; Diversity',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(28,'finance','Finance',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(29,'geography','Geography',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(30,'hospitalityAndLeisureManagement','Hospitality &amp; Leisure Management',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(31,'humanResourceManagement','Human Resource Management',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(32,'internationalRelations','International Relations',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(33,'journalism','Journalism',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(34,'lawAndLegalStudies','Law and Legal Studies',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(35,'libraryAndInformationManagement','Library &amp; Information Management',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(36,'lifeSciences','Life Sciences',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(37,'linguistics','Linguistics',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(38,'logicsticsAndSupplyChainManagement','Logistics &amp; Supply Chain Management',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(39,'marketing','Marketing',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(40,'materialScience','Material Science',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(41,'mathematics','Mathematics',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(42,'medicine','Medicine',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(43,'modernLanguage','Modern Language',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(44,'nursing','Nursing',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(45,'optometry','Optometry',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(46,'performingArts','Performing Arts',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(47,'pharmacology','Pharmacology',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(48,'pharmacy','Pharmacy',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(49,'philosophy','Philosophy',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(50,'productdesign','Product Design',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(51,'psychology','Psychology',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(52,'publicpolicy','Public Policy',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(53,'socialAndPoliticalScience','Social &amp; Political science',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(54,'socialwork','Social Work',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(55,'sociology','Sociology',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(56,'sports','Sports',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(57,'sportScience','Sports Science',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(58,'statisticsAndOperations','Statistics and Operations',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(59,'theologyDivinityAndReligiousStudies','Theology, Divinity and Religious Studies',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(60,'urbanPlanning','Urban Planning',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(61,'veterinaryScience','Veterinary Science',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(62,'zoology','Zoology',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14'),(63,'others','Others',NULL,NULL,'2019-01-12 09:05:14','2019-01-12 09:05:14');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `salesCloseDate` datetime DEFAULT NULL,
  `ticketSalesEndDate` datetime DEFAULT NULL,
  `venueAddress` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ticketPrice` float DEFAULT NULL,
  `institutionName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `organizerBankAccount` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `organizerContactDetails` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cityId` int(10) unsigned DEFAULT NULL,
  `eventDressCodeId` int(10) unsigned DEFAULT NULL,
  `eventTypeId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cityId` (`cityId`),
  KEY `eventDressCodeId` (`eventDressCodeId`),
  KEY `eventTypeId` (`eventTypeId`),
  KEY `userId` (`userId`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`eventDressCodeId`) REFERENCES `event_dress_code` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_3` FOREIGN KEY (`eventTypeId`) REFERENCES `event_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_attachment`
--

DROP TABLE IF EXISTS `event_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usage` enum('image','poster','video') COLLATE utf8_unicode_ci DEFAULT NULL,
  `cloudinaryPublicId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `event_attachment_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_attachment`
--

LOCK TABLES `event_attachment` WRITE;
/*!40000 ALTER TABLE `event_attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_dress_code`
--

DROP TABLE IF EXISTS `event_dress_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_dress_code` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_dress_code`
--

LOCK TABLES `event_dress_code` WRITE;
/*!40000 ALTER TABLE `event_dress_code` DISABLE KEYS */;
INSERT INTO `event_dress_code` VALUES (1,'smart','2019-01-12 09:05:13','2019-01-12 09:05:13'),(2,'casual','2019-01-12 09:05:13','2019-01-12 09:05:13'),(3,'fancy','2019-01-12 09:05:13','2019-01-12 09:05:13'),(4,'smart casual','2019-01-12 09:05:13','2019-01-12 09:05:13');
/*!40000 ALTER TABLE `event_dress_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_guest_list`
--

DROP TABLE IF EXISTS `event_guest_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_guest_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `isCreator` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`),
  KEY `userId` (`userId`),
  CONSTRAINT `event_guest_list_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_guest_list_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_guest_list`
--

LOCK TABLES `event_guest_list` WRITE;
/*!40000 ALTER TABLE `event_guest_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_guest_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post`
--

DROP TABLE IF EXISTS `event_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `eventId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `event_post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post`
--

LOCK TABLES `event_post` WRITE;
/*!40000 ALTER TABLE `event_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post_like`
--

DROP TABLE IF EXISTS `event_post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post_like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventPostId` (`eventPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `event_post_like_ibfk_1` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post_like`
--

LOCK TABLES `event_post_like` WRITE;
/*!40000 ALTER TABLE `event_post_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post_pageview`
--

DROP TABLE IF EXISTS `event_post_pageview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post_pageview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventPostId` (`eventPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `event_post_pageview_ibfk_1` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_pageview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post_pageview`
--

LOCK TABLES `event_post_pageview` WRITE;
/*!40000 ALTER TABLE `event_post_pageview` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post_pageview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post_poll_option`
--

DROP TABLE IF EXISTS `event_post_poll_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post_poll_option` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventPostId` (`eventPostId`),
  CONSTRAINT `event_post_poll_option_ibfk_1` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post_poll_option`
--

LOCK TABLES `event_post_poll_option` WRITE;
/*!40000 ALTER TABLE `event_post_poll_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post_poll_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post_rating`
--

DROP TABLE IF EXISTS `event_post_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventPostId` (`eventPostId`),
  KEY `userId` (`userId`),
  CONSTRAINT `event_post_rating_ibfk_1` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_rating_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post_rating`
--

LOCK TABLES `event_post_rating` WRITE;
/*!40000 ALTER TABLE `event_post_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post_reply`
--

DROP TABLE IF EXISTS `event_post_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hideComment` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `eventPostPollOptionId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventPostId` (`eventPostId`),
  KEY `userId` (`userId`),
  KEY `eventPostPollOptionId` (`eventPostPollOptionId`),
  CONSTRAINT `event_post_reply_ibfk_1` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_reply_ibfk_3` FOREIGN KEY (`eventPostPollOptionId`) REFERENCES `event_post_poll_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post_reply`
--

LOCK TABLES `event_post_reply` WRITE;
/*!40000 ALTER TABLE `event_post_reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_post_report`
--

DROP TABLE IF EXISTS `event_post_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_post_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventPostId` int(10) unsigned DEFAULT NULL,
  `reportedBy` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventPostId` (`eventPostId`),
  KEY `reportedBy` (`reportedBy`),
  CONSTRAINT `event_post_report_ibfk_1` FOREIGN KEY (`eventPostId`) REFERENCES `event_post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_post_report_ibfk_2` FOREIGN KEY (`reportedBy`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_post_report`
--

LOCK TABLES `event_post_report` WRITE;
/*!40000 ALTER TABLE `event_post_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_post_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_type`
--

DROP TABLE IF EXISTS `event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` VALUES (1,'Featured Event','2019-01-12 09:05:13','2019-01-12 09:05:13'),(2,'Standard Event','2019-01-12 09:05:13','2019-01-12 09:05:13');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_vip`
--

DROP TABLE IF EXISTS `event_vip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_vip` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phoneNumberOrEmail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventId` int(10) unsigned DEFAULT NULL,
  `senderId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`),
  KEY `senderId` (`senderId`),
  CONSTRAINT `event_VIP_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_VIP_ibfk_2` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_vip`
--

LOCK TABLES `event_vip` WRITE;
/*!40000 ALTER TABLE `event_vip` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_vip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_post`
--

DROP TABLE IF EXISTS `follow_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follow_post` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  `postv1Id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`postv1Id`,`userId`),
  KEY `courseId` (`courseId`),
  KEY `userId` (`userId`),
  CONSTRAINT `follow_post_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `follow_post_ibfk_2` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_post_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_post`
--

LOCK TABLES `follow_post` WRITE;
/*!40000 ALTER TABLE `follow_post` DISABLE KEYS */;
INSERT INTO `follow_post` VALUES ('2019-02-19 20:16:14','2019-02-19 20:16:14',3,37,48),('2019-03-18 00:32:38','2019-03-18 00:32:38',8,84,65),('2019-03-18 00:32:38','2019-03-18 00:32:38',8,85,65),('2019-03-18 00:32:36','2019-03-18 00:32:36',8,86,65),('2019-03-18 00:32:34','2019-03-18 00:32:34',8,87,65),('2019-03-18 00:32:33','2019-03-18 00:32:33',8,88,65),('2019-03-18 00:32:31','2019-03-18 00:32:31',8,89,65),('2019-01-15 22:38:19','2019-01-15 22:38:19',34,166,11),('2019-01-27 01:08:54','2019-01-27 01:08:54',25,264,42),('2019-01-24 14:45:14','2019-01-24 14:45:14',30,309,36),('2019-02-01 22:06:05','2019-02-01 22:06:05',51,493,44),('2019-02-01 22:13:33','2019-02-01 22:13:33',51,499,44),('2019-08-14 15:02:36','2019-08-14 15:02:36',3,596,78);
/*!40000 ALTER TABLE `follow_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inbox`
--

DROP TABLE IF EXISTS `inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inbox` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `senderName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isSeen` tinyint(1) DEFAULT NULL,
  `relationId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `inbox_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbox`
--

LOCK TABLES `inbox` WRITE;
/*!40000 ALTER TABLE `inbox` DISABLE KEYS */;
/*!40000 ALTER TABLE `inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest`
--

DROP TABLE IF EXISTS `interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interest` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `interestCategoryId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `interestCategoryId` (`interestCategoryId`),
  CONSTRAINT `interest_ibfk_1` FOREIGN KEY (`interestCategoryId`) REFERENCES `interest_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=419 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest`
--

LOCK TABLES `interest` WRITE;
/*!40000 ALTER TABLE `interest` DISABLE KEYS */;
INSERT INTO `interest` VALUES (1,'Artificial intelligence','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(2,'Algorithms','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(3,'Computer Science','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(4,'Security','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(5,'Wearable Tech','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(6,'Electronics','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(7,'Information Technology','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(8,'Web development','2019-01-12 09:05:15','2019-01-12 09:05:15',1),(9,'Biology','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(10,'Chemistry','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(11,'Physics','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(12,'Computer Science','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(13,'Archaeology','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(14,'Zoology','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(15,'Pharmaceutical','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(16,'Meta- physics','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(17,'Nature','2019-01-12 09:05:15','2019-01-12 09:05:15',2),(18,'International Law','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(19,'IP & Patents','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(20,'Vic Law','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(21,'US Law','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(22,'Canadian Law','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(23,'Contracts','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(24,'Corporate Law','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(25,'Cyber Law','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(26,'Top Law Firms','2019-01-12 09:05:15','2019-01-12 09:05:15',3),(27,'Stock Market','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(28,'Interest Rates','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(29,'E-commerce','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(30,'Business Strategy','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(31,'Knowledge Management','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(32,'Social Media Marketing','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(33,'Start Ups-\r\nLean startups','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(34,'Internet Advertising','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(35,'Investing','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(36,'Borrowing','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(37,'E-commerce','2019-01-12 09:05:15','2019-01-12 09:05:15',4),(38,'Dieting','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(39,'Healthy Recipes','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(40,'Yoga','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(41,'Healthy Eating','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(42,'Cross Fitness','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(43,'Calories','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(44,'Eating Disorder','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(45,'Exercise','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(46,'Obesity','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(47,'Low Carb diet','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(48,'Transfat','2019-01-12 09:05:15','2019-01-12 09:05:15',5),(49,'Information Technology','2019-01-12 09:05:15','2019-01-12 09:05:15',6),(50,'Intelligence Quotient','2019-01-12 09:05:15','2019-01-12 09:05:15',6),(51,'Theology','2019-01-12 09:05:15','2019-01-12 09:05:15',6),(52,'GDP','2019-01-12 09:05:15','2019-01-12 09:05:15',7),(53,'Inflation','2019-01-12 09:05:15','2019-01-12 09:05:15',7),(54,'Interest Rates','2019-01-12 09:05:15','2019-01-12 09:05:15',7),(55,'Economy Blogs','2019-01-12 09:05:15','2019-01-12 09:05:15',7),(56,'Currencies','2019-01-12 09:05:15','2019-01-12 09:05:15',7),(57,'Price:\r\nOil Prices','2019-01-12 09:05:15','2019-01-12 09:05:15',7),(58,'Barclays Premier League','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(59,'Champions League','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(60,'NFL','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(61,'NBA','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(62,'ICC','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(63,'Tennis','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(64,'Boxing','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(65,'MMA','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(66,'Nascar','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(67,'Ice Hockey','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(68,'MLB','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(69,'Snow Barbing','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(70,'F 1','2019-01-12 09:05:15','2019-01-12 09:05:15',9),(71,'Motors','2019-01-12 09:05:15','2019-01-12 09:05:15',10),(72,'Architecture','2019-01-12 09:05:15','2019-01-12 09:05:15',10),(73,'Home Doctor','2019-01-12 09:05:15','2019-01-12 09:05:15',10),(74,'Interior Designs','2019-01-12 09:05:15','2019-01-12 09:05:15',10),(75,'Designs','2019-01-12 09:05:15','2019-01-12 09:05:15',10),(76,'Accountancy','2019-01-12 09:05:15','2019-01-12 09:05:15',11),(77,'ACCA','2019-01-12 09:05:15','2019-01-12 09:05:15',11),(78,'Big Four','2019-01-12 09:05:15','2019-01-12 09:05:15',11),(79,'COMA','2019-01-12 09:05:15','2019-01-12 09:05:15',11),(80,'COMA','2019-01-12 09:05:15','2019-01-12 09:05:15',11),(81,'C','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(82,'C++','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(83,'Node JS','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(84,'Php','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(85,'Java','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(86,'Java Script','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(87,'Phython','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(88,'K','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(89,'C#','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(90,'Scala','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(91,'Django','2019-01-12 09:05:15','2019-01-12 09:05:15',13),(92,'Media & Advertising','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(93,'Social Media Marketing','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(94,'S E O','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(95,'Athlete Marketing','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(96,'Tele Marketing','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(97,'Mobile Marketing','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(98,'Professional Course','2019-01-12 09:05:15','2019-01-12 09:05:15',14),(99,'Investment Banking','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(100,'Flotation/IPOâ€™S','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(101,'Mergers & Acquisition Private Equity','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(102,'Venture Capital','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(103,'Bonds','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(104,'Stock Markets','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(105,'Hedge Funds','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(106,'Banking','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(107,'Personal Finance','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(108,'Currencies','2019-01-12 09:05:15','2019-01-12 09:05:15',15),(109,'Hair','2019-01-12 09:05:15','2019-01-12 09:05:15',16),(110,'Make Up','2019-01-12 09:05:15','2019-01-12 09:05:15',16),(111,'Clothing & Apparel','2019-01-12 09:05:15','2019-01-12 09:05:15',16),(112,'Fashion Weeks','2019-01-12 09:05:15','2019-01-12 09:05:15',16),(113,'Womenâ€™s fashion','2019-01-12 09:05:15','2019-01-12 09:05:15',16),(114,'Suits','2019-01-12 09:05:15','2019-01-12 09:05:15',16),(115,'Environment','2019-01-12 09:05:15','2019-01-12 09:05:15',19),(116,'Natural Disasters','2019-01-12 09:05:15','2019-01-12 09:05:15',19),(117,'War & Terrorism','2019-01-12 09:05:15','2019-01-12 09:05:15',19),(118,'Severe Weather Events','2019-01-12 09:05:15','2019-01-12 09:05:15',19),(119,'Comedy','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(120,'Celebrity','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(121,'X Factor','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(122,'Series','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(123,'Britain got talent','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(124,'Gambling','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(125,'Gaming','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(126,'Reality Television','2019-01-12 09:05:15','2019-01-12 09:05:15',21),(127,'Games of Throne','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(128,'The Saturday Night live','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(129,'House of Cards','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(130,'Orange is the New','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(131,'Black Power','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(132,'Black Suits','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(133,'The Simpsons','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(134,'Friends','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(135,'Homeland','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(136,'Prison Break','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(137,'Two and a half men','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(138,'Greys Anatomy','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(139,'Tyrant','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(140,'Veep','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(141,'The Walking Dead','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(142,'Dr Who','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(143,'Netflix Series','2019-01-12 09:05:15','2019-01-12 09:05:15',25),(144,'Menâ€™s fashion','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(145,'Make up','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(146,'Womenâ€™s fashion','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(147,'Women apparel','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(148,'Menâ€™s apparel','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(149,'Menâ€™s Suit','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(150,'Womenâ€™s Hairstyles','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(151,'Menâ€™s Hairstyles','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(152,'Hair extensions','2019-01-12 09:05:15','2019-01-12 09:05:15',26),(153,'Anaheim Ducks','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(154,'Arizona Coyotes','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(155,'Boston Bruins','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(156,'Buffalo Sabres','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(157,'Calgary Flames','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(158,'Carolina Hurricanes','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(159,'Chicago Blackhawks','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(160,'Colorado Avalanche','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(161,'Columbus Blue Jackets','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(162,'Dallas Stars','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(163,'Detroit Red Wings','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(164,'Los Angeles Kings','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(165,'Minnesota Wilds','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(166,'Edmonton Oilers','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(167,'Montreal Canadiens','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(168,'Florida Panthers','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(169,'Nashville Predators','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(170,'New Jersey Devils','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(171,'New York Islanders','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(172,'New York Rangers','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(173,'Ottawa Senators','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(174,'Philadelphia Flyers','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(175,'Pittsburgh Penguins','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(176,'San Jose Sharks','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(177,'St. Louis Blues','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(178,'Tampa Bay Lightning','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(179,'Toronto Maple Leafs','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(180,'Vancouver Canucks','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(181,'Washington Capitals','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(182,'Winnipeg Jets','2019-01-12 09:05:15','2019-01-12 09:05:15',27),(183,'Atlanta Hawks','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(184,'Boston Celtics','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(185,'Brooklyn Nets','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(186,'Charlotte Hornets','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(187,'Chicago Bulls','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(188,'Cleveland Cavaliers','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(189,'Dallas Mavericks','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(190,'Denver Nuggets','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(191,'Detroit Pistons','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(192,'Golden State Warriors','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(193,'Houston Rockets','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(194,'New Orleans Pelicans','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(195,'New York Knicks','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(196,'Indiana Pacers','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(197,'LA Clippers','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(198,'Los Angeles Lakers','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(199,'Memphis Grizzlies','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(200,'Miami Heat','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(201,'Oklahoma City Thunder','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(202,'Milwaukee Bucks','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(203,'Orlando Magic','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(204,'Philadelphia 76ers','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(205,'Phoenix Suns','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(206,'Portland Trail Blazers','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(207,'Sacramento Kings','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(208,'San Antonio Spurs','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(209,'Toronto Raptors','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(210,'Utah Jazz','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(211,'Minnesota Timberwolves','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(212,'Washington Wizards','2019-01-12 09:05:15','2019-01-12 09:05:15',28),(213,'Celebrity Gossip','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(214,'Ciara','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(215,'BeyoncÃ©','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(216,'Rihanna','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(217,'Katy Perry','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(218,'Drake','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(219,'Jay-Y','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(220,'The Weekend','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(221,'Future','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(222,'Kylie Jenner','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(223,'Kanye West','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(224,'Kim Kardashian','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(225,'Lebron James','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(226,'Cristiano Ronaldo','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(227,'Roger Federer','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(228,'Lionel Messi','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(229,'Nicki Minaj','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(230,'Barack Obama','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(231,'Justin Bieber','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(232,'Selena Gomez','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(233,'Jenifer Lopez','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(234,'Taylor Swift','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(235,'Stephen Curry','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(236,'Kevin Durant','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(237,'Michael Jordan','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(238,'2pac','2019-01-12 09:05:15','2019-01-12 09:05:15',29),(239,'Artificial intelligence','2019-01-12 09:05:15','2019-01-12 09:05:15',30),(240,'Wearable Tech','2019-01-12 09:05:15','2019-01-12 09:05:15',30),(241,'Apple watch','2019-01-12 09:05:15','2019-01-12 09:05:15',30),(242,'Iphones','2019-01-12 09:05:15','2019-01-12 09:05:15',30),(243,'Driverless Cars','2019-01-12 09:05:15','2019-01-12 09:05:15',30),(244,'Arsenal','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(245,'Chelsea','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(246,'Manchester United','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(247,'Liverpool','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(248,'Manchester City','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(249,'Everton','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(250,'Totenham Hotspurs','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(251,'Westham','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(252,'Southampton','2019-01-12 09:05:15','2019-01-12 09:05:15',31),(253,'Arizona Cardinals','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(254,'Atlanta Falcons','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(255,'Baltimore Ravens','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(256,'Buffalo Bills','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(257,'Carolina Panthers','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(258,'Chicago Bears','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(259,'Cincinnati Bengals','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(260,'Cleveland Browns','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(261,'Dallas Cowboy','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(262,'Denver Broncos','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(263,'Detroit Lions','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(264,'Minnesota Vikings','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(265,'Green Bay Packers','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(266,'Houston Texans','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(267,'Indianapolis Colts','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(268,'Jacksonville Jaguars','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(269,'Kansas City Chiefs','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(270,'Los Angeles Rams','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(271,'Los Angeles Chargers','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(272,'Miami Dolphin','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(273,'New England Patriots','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(274,'New Orleans Saints','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(275,'New York Giants','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(276,'New York Jets','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(277,'Oakland Raiders','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(278,'Philadelphia Eagles','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(279,'Pittsburgh Steelers','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(280,'San Francisco 49ers','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(281,'Seattle Seahawks','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(282,'Tampa Bay Buccaneers','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(283,'Tennessee Titans','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(284,'Washington Redskins','2019-01-12 09:05:15','2019-01-12 09:05:15',33),(285,'Apple','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(286,'Samsung','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(287,'Microsoft','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(288,'Google','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(289,'Sony','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(290,'LG','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(291,'Panasonic','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(292,'Uber','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(293,'Facebook','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(294,'Amazon','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(295,'Acer','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(296,'HP','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(297,'IBM','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(298,'Yahoo','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(299,'DELL','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(300,'Lenovo','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(301,'Blackberry','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(302,'Adobe','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(303,'Intell','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(304,'Toshiba','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(305,'Bitcoin','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(306,'Netflix','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(307,'AirBnB','2019-01-12 09:05:15','2019-01-12 09:05:15',34),(308,'Airlines','2019-01-12 09:05:15','2019-01-12 09:05:15',35),(309,'Boeing','2019-01-12 09:05:15','2019-01-12 09:05:15',35),(310,'Aerospace Engineering','2019-01-12 09:05:15','2019-01-12 09:05:15',35),(311,'Christianity','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(312,'Islamism','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(313,'Hinduism','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(314,'Theology','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(315,'Atheist','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(316,'Buddhism','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(317,'Scientology','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(318,'Sikhism','2019-01-12 09:05:15','2019-01-12 09:05:15',36),(319,'Cruise Holiday','2019-01-12 09:05:15','2019-01-12 09:05:15',37),(320,'Travel','2019-01-12 09:05:15','2019-01-12 09:05:15',37),(321,'Barcelona','2019-01-12 09:05:15','2019-01-12 09:05:15',38),(322,'Real Madrid','2019-01-12 09:05:15','2019-01-12 09:05:15',38),(323,'Atletico Madrid','2019-01-12 09:05:15','2019-01-12 09:05:15',38),(324,'Valencia','2019-01-12 09:05:15','2019-01-12 09:05:15',38),(325,'Seville','2019-01-12 09:05:15','2019-01-12 09:05:15',38),(326,'Stephen King','2019-01-12 09:05:15','2019-01-12 09:05:15',39),(327,'J. K. Rowling','2019-01-12 09:05:15','2019-01-12 09:05:15',39),(328,'Dan Brown','2019-01-12 09:05:15','2019-01-12 09:05:15',39),(329,'David Baldacci','2019-01-12 09:05:15','2019-01-12 09:05:15',39),(330,'John Grisham','2019-01-12 09:05:15','2019-01-12 09:05:15',39),(331,'Marriage','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(332,'Social work','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(333,'Sex','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(334,'LGBT','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(335,'Weddings','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(336,'Relationships','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(337,'Kids and Parenting','2019-01-12 09:05:15','2019-01-12 09:05:15',40),(338,'Dieting','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(339,'Chinese Cuisine','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(340,'African Cuisine','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(341,'Nutrition','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(342,'Healthy Recipes','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(343,'Low carb diets','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(344,'Recipes','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(345,'Grilling Recipes','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(346,'Desserts','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(347,'Healthy diets','2019-01-12 09:05:15','2019-01-12 09:05:15',41),(348,'Microsoft Xbox 360','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(349,'Bingo','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(350,'PC Games','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(351,'FIFA','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(352,'Pro Evolution Soccer','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(353,'Call Of Duty','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(354,'Nintendo Wii U','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(355,'Sony PlayStation Ps 4','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(356,'Assassin Creed','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(357,'Pokemon','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(358,'Halo','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(359,'Batman','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(360,'Far Cry','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(361,'Battlefield','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(362,'Bioshock','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(363,'Destiny','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(364,'Football Manager','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(365,'Need For Speed','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(366,'Dragon Age','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(367,'Final Fantasy','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(368,'Lego','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(369,'Mario','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(370,'Elder Scrolls','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(371,'Tomb Raider','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(372,'Meta Gear','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(373,'Pokemon Go','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(374,'Fallout','2019-01-12 09:05:15','2019-01-12 09:05:15',42),(375,'Science & Fiction','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(376,'Biography','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(377,'History','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(378,'Romance','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(379,'Marvel Comics','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(380,'Love Quotes','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(381,'Funny Quotes','2019-01-12 09:05:15','2019-01-12 09:05:15',43),(382,'Atlanta Braves','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(383,'Florida Marlins','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(384,'New York Mets','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(385,'Philadelphia Phillies','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(386,'Washington','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(387,'Nationals Central','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(388,'Chicago Cubs','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(389,'Cincinnati Reds','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(390,'Houston Astros','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(391,'Milwaukee Brewers','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(392,'Pittsburgh Pirates','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(393,'St. Louis Cardinals West Arizona','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(394,'Orioles Boston Red Sox New York','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(395,'Yankees Tampa Bay`','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(396,'Diamondbacks','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(397,'Colorado Rockies','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(398,'Los Angeles Dodgers','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(399,'San Diego Padres','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(400,'San Francisco Giants','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(401,'American League','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(402,'East Baltimore','2019-01-12 09:05:15','2019-01-12 09:05:15',45),(403,'Electronic','2019-01-20 16:32:41','2019-01-20 16:32:41',1),(404,'Quality management ','2019-01-27 01:08:01','2019-01-27 01:08:01',2),(405,'Sidney Sheldon','2019-02-20 18:28:29','2019-02-20 18:28:29',39),(406,'Laura Ingalls Wilder','2019-02-20 18:28:45','2019-02-20 18:28:45',39),(407,'IZombie ','2019-02-20 18:30:03','2019-02-20 18:30:03',25),(408,'MARVEL\'S THE GIFTED ','2019-02-20 18:30:20','2019-02-20 18:30:20',25),(409,'Big bang Theory','2019-02-20 18:30:44','2019-02-20 18:30:44',25),(410,'Writing my book soon','2019-03-07 09:30:52','2019-03-07 09:30:52',43),(411,'Visiting new countries ','2019-03-07 09:30:56','2019-03-07 09:30:56',37),(412,'Lovely designers not too expensive ','2019-03-07 09:31:24','2019-03-07 09:31:24',16),(413,'New inventory....','2019-03-07 09:32:04','2019-03-07 09:32:04',2),(414,'Environmental management ','2019-03-07 20:16:22','2019-03-07 20:16:22',2),(415,'Psychology','2019-03-10 08:46:06','2019-03-10 08:46:06',43),(416,'Bodybuilding','2019-03-10 08:46:41','2019-03-10 08:46:41',9),(417,'good','2019-03-18 00:28:49','2019-03-18 00:28:49',1),(418,'test','2019-03-18 00:29:05','2019-03-18 00:29:05',1);
/*!40000 ALTER TABLE `interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest_category`
--

DROP TABLE IF EXISTS `interest_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interest_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cloudinaryPublicId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest_category`
--

LOCK TABLES `interest_category` WRITE;
/*!40000 ALTER TABLE `interest_category` DISABLE KEYS */;
INSERT INTO `interest_category` VALUES (1,'Technology','aerospace','2019-01-12 09:05:15','2019-01-12 09:05:15'),(2,'Science','science','2019-01-12 09:05:15','2019-01-12 09:05:15'),(3,'Law','law','2019-01-12 09:05:15','2019-01-12 09:05:15'),(4,'Business','business','2019-01-12 09:05:15','2019-01-12 09:05:15'),(5,'Fitness & Health','fitnessAndHealth','2019-01-12 09:05:15','2019-01-12 09:05:15'),(6,'Education','education','2019-01-12 09:05:15','2019-01-12 09:05:15'),(7,'Economics','economics','2019-01-12 09:05:15','2019-01-12 09:05:15'),(9,'Sports','sports','2019-01-12 09:05:15','2019-01-12 09:05:15'),(10,'Photography','photography','2019-01-12 09:05:15','2019-01-12 09:05:15'),(11,'Accounting','accounting','2019-01-12 09:05:15','2019-01-12 09:05:15'),(13,'Computer Programming','computerProgramming','2019-01-12 09:05:15','2019-01-12 09:05:15'),(14,'Marketing','marketing','2019-01-12 09:05:15','2019-01-12 09:05:15'),(15,'Finance','finance','2019-01-12 09:05:15','2019-01-12 09:05:15'),(16,'Fashion & Style','fashionAndStyle','2019-01-12 09:05:15','2019-01-12 09:05:15'),(19,'Current Affairs\r\nTelevision Service','currentAffairsAndTelevisionService','2019-01-12 09:05:15','2019-01-12 09:05:15'),(21,'Entertainment','entertainment','2019-01-12 09:05:15','2019-01-12 09:05:15'),(25,'TV SERIES','tvSeries','2019-01-12 09:05:15','2019-01-12 09:05:15'),(26,'Beauty','beauty','2019-01-12 09:05:15','2019-01-12 09:05:15'),(27,'NHL','nhl','2019-01-12 09:05:15','2019-01-12 09:05:15'),(28,'NBA','nba','2019-01-12 09:05:15','2019-01-12 09:05:15'),(29,'CELEBRITY','celebrity','2019-01-12 09:05:15','2019-01-12 09:05:15'),(30,'TECHNOLOGY PRODUCTS','technologyProducts','2019-01-12 09:05:15','2019-01-12 09:05:15'),(31,'ENGLISH PREMIER LEAGUE','englishPremierLeague','2019-01-12 09:05:15','2019-01-12 09:05:15'),(33,'NFL','nfl','2019-01-12 09:05:15','2019-01-12 09:05:15'),(34,'TECHNOLOGY BRANDS','technologyBrands','2019-01-12 09:05:15','2019-01-12 09:05:15'),(35,'AEROSPACE','aerospace','2019-01-12 09:05:15','2019-01-12 09:05:15'),(36,'RELIGION','religion','2019-01-12 09:05:15','2019-01-12 09:05:15'),(37,'TRAVEL & HOLIDAY','travelAndHoliday','2019-01-12 09:05:15','2019-01-12 09:05:15'),(38,'SPANISH LA LIGA','spanishLaLiga','2019-01-12 09:05:15','2019-01-12 09:05:15'),(39,'BOOK AUTHORS','bookAuthors','2019-01-12 09:05:15','2019-01-12 09:05:15'),(40,'FAMILY & LIFE',NULL,'2019-01-12 09:05:15','2019-01-12 09:05:15'),(41,'Food','food','2019-01-12 09:05:15','2019-01-12 09:05:15'),(42,'Gaming','gaming','2019-01-12 09:05:15','2019-01-12 09:05:15'),(43,'Books','books','2019-01-12 09:05:15','2019-01-12 09:05:15'),(45,'MBL','mlb','2019-01-12 09:05:15','2019-01-12 09:05:15');
/*!40000 ALTER TABLE `interest_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `replyId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postv1Id` (`postv1Id`),
  KEY `userId` (`userId`),
  KEY `replyId` (`replyId`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `like_ibfk_3` FOREIGN KEY (`replyId`) REFERENCES `reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'2019-01-19 11:36:31','2019-01-19 11:36:31',NULL,19,NULL),(2,'2019-02-20 06:04:46','2019-02-20 06:04:46',NULL,48,6),(3,'2019-02-20 06:04:49','2019-02-20 06:04:49',NULL,48,6),(4,'2019-02-20 06:05:19','2019-02-20 06:05:19',NULL,48,6),(5,'2019-03-28 09:53:21','2019-03-28 09:53:21',NULL,69,8);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor`
--

DROP TABLE IF EXISTS `mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mentor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `topic` blob,
  `tellUsWhy` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campusId` (`campusId`),
  CONSTRAINT `mentor_ibfk_1` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor`
--

LOCK TABLES `mentor` WRITE;
/*!40000 ALTER TABLE `mentor` DISABLE KEYS */;
/*!40000 ALTER TABLE `mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `detail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fromId` int(10) unsigned DEFAULT NULL,
  `toId` int(10) unsigned DEFAULT NULL,
  `parentId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fromId` (`fromId`),
  KEY `toId` (`toId`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`fromId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`toId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_3` FOREIGN KEY (`parentId`) REFERENCES `message` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,NULL,'Hello there ',0,'2019-02-19 23:11:30','2019-02-19 23:11:30',16,3,NULL),(2,NULL,'Hi',0,'2019-02-20 17:35:15','2019-02-20 17:35:15',48,48,NULL),(3,NULL,'Hello',0,'2019-02-20 17:35:48','2019-02-20 17:35:48',48,18,NULL);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `isRead` tinyint(1) DEFAULT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `area` enum('home','campus','community') COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` enum('newFollower','postLike','postReply','postShare','communityQuestionPost','communityQuestionFollow','communityQuestionReply','replyLike','replyViaFollowPost','replyViaReply') COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `subjectId` int(10) unsigned DEFAULT NULL,
  `recipientId` int(10) unsigned DEFAULT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  `replyId` int(10) unsigned DEFAULT NULL,
  `postReplyId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subjectId` (`subjectId`),
  KEY `recipientId` (`recipientId`),
  KEY `postv1Id` (`postv1Id`),
  KEY `postId` (`postId`),
  KEY `courseId` (`courseId`),
  KEY `replyId` (`replyId`),
  KEY `postReplyId` (`postReplyId`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`recipientId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_4` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_5` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_6` FOREIGN KEY (`replyId`) REFERENCES `reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_7` FOREIGN KEY (`postReplyId`) REFERENCES `post_reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,0,'liked','home','postLike','2019-01-12 09:07:03','2019-01-12 09:07:03',1,1,NULL,NULL,NULL,NULL,NULL),(2,0,'replied to','community','communityQuestionFollow','2019-01-12 09:51:33','2019-01-12 09:51:33',1,1,NULL,NULL,12,NULL,NULL),(3,1,'liked','home','postLike','2019-01-12 10:37:33','2019-05-19 22:55:33',3,3,NULL,NULL,NULL,NULL,NULL),(4,1,'Commented on','home','postReply','2019-01-12 10:46:08','2019-05-19 22:55:33',3,NULL,NULL,NULL,NULL,NULL,NULL),(5,0,'Commented on','home','postReply','2019-01-12 14:30:28','2019-01-12 14:30:28',5,3,NULL,NULL,NULL,NULL,NULL),(6,0,'liked','home','postLike','2019-01-12 14:45:41','2019-01-12 14:45:41',5,3,NULL,NULL,NULL,NULL,NULL),(7,0,'Commented on','home','postReply','2019-01-13 06:54:50','2019-01-13 06:54:50',5,3,NULL,5,NULL,NULL,NULL),(8,0,'liked','home','postLike','2019-01-14 14:59:50','2019-01-14 14:59:50',9,5,NULL,3,NULL,NULL,NULL),(9,0,'liked','home','postLike','2019-01-14 15:00:12','2019-01-14 15:00:12',9,3,NULL,NULL,NULL,NULL,NULL),(10,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:33:44','2019-05-19 22:55:33',3,9,7,NULL,1,NULL,NULL),(11,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:34:02','2019-05-19 22:55:33',3,9,8,NULL,1,NULL,NULL),(12,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:34:25','2019-05-19 22:55:33',3,9,9,NULL,1,NULL,NULL),(13,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:34:42','2019-05-19 22:55:33',3,9,10,NULL,1,NULL,NULL),(14,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:35:00','2019-05-19 22:55:33',3,9,11,NULL,1,NULL,NULL),(15,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:35:15','2019-05-19 22:55:33',3,9,12,NULL,1,NULL,NULL),(16,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:35:33','2019-05-19 22:55:33',3,9,13,NULL,1,NULL,NULL),(17,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:35:58','2019-05-19 22:55:33',3,9,14,NULL,1,NULL,NULL),(18,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:36:10','2019-05-19 22:55:33',3,9,15,NULL,1,NULL,NULL),(19,1,'was posted in the','community','communityQuestionPost','2019-01-15 17:36:53','2019-05-19 22:55:33',3,9,16,NULL,1,NULL,NULL),(20,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:13:41','2019-05-19 22:55:33',3,1,122,NULL,12,NULL,NULL),(21,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:14:24','2019-05-19 22:55:33',3,1,123,NULL,12,NULL,NULL),(22,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:14:54','2019-05-19 22:55:33',3,1,124,NULL,12,NULL,NULL),(23,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:15:32','2019-05-19 22:55:33',3,1,125,NULL,12,NULL,NULL),(24,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:16:01','2019-05-19 22:55:33',3,1,126,NULL,12,NULL,NULL),(25,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:16:31','2019-05-19 22:55:33',3,1,127,NULL,12,NULL,NULL),(26,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:17:00','2019-05-19 22:55:33',3,1,128,NULL,12,NULL,NULL),(27,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:17:36','2019-05-19 22:55:33',3,1,129,NULL,12,NULL,NULL),(28,1,'was posted in the','community','communityQuestionPost','2019-01-15 19:18:06','2019-05-19 22:55:33',3,1,130,NULL,12,NULL,NULL),(29,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:14:36','2019-05-19 22:55:33',3,5,179,NULL,17,NULL,NULL),(30,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:15:56','2019-05-19 22:55:33',3,5,180,NULL,17,NULL,NULL),(31,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:16:35','2019-05-19 22:55:33',3,5,181,NULL,17,NULL,NULL),(32,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:17:04','2019-05-19 22:55:33',3,5,182,NULL,17,NULL,NULL),(33,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:17:31','2019-05-19 22:55:33',3,5,183,NULL,17,NULL,NULL),(34,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:18:02','2019-05-19 22:55:33',3,5,184,NULL,17,NULL,NULL),(35,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:18:34','2019-05-19 22:55:33',3,5,185,NULL,17,NULL,NULL),(36,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:19:16','2019-05-19 22:55:33',3,5,186,NULL,17,NULL,NULL),(37,1,'was posted in the','community','communityQuestionPost','2019-01-15 20:19:49','2019-05-19 22:55:33',3,5,187,NULL,17,NULL,NULL),(38,0,'replied to','community','communityQuestionFollow','2019-01-15 22:38:19','2019-01-15 22:38:19',11,3,166,NULL,34,NULL,NULL),(39,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:50:39','2019-05-19 22:55:33',3,8,285,NULL,28,NULL,NULL),(40,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:50:52','2019-05-19 22:55:33',3,8,286,NULL,28,NULL,NULL),(41,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:51:12','2019-05-19 22:55:33',3,8,287,NULL,28,NULL,NULL),(42,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:51:30','2019-05-19 22:55:33',3,8,288,NULL,28,NULL,NULL),(43,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:51:56','2019-05-19 22:55:33',3,8,289,NULL,28,NULL,NULL),(44,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:52:11','2019-05-19 22:55:33',3,8,290,NULL,28,NULL,NULL),(45,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:52:29','2019-05-19 22:55:33',3,8,291,NULL,28,NULL,NULL),(46,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:52:42','2019-05-19 22:55:33',3,8,292,NULL,28,NULL,NULL),(47,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:52:55','2019-05-19 22:55:33',3,8,293,NULL,28,NULL,NULL),(48,1,'was posted in the','community','communityQuestionPost','2019-01-15 22:53:15','2019-05-19 22:55:33',3,8,294,NULL,28,NULL,NULL),(49,1,'followed you.',NULL,'newFollower','2019-01-16 00:24:43','2019-05-19 22:55:33',3,1,NULL,NULL,NULL,NULL,NULL),(50,1,'followed you.',NULL,'newFollower','2019-01-16 00:24:48','2019-05-19 22:55:33',3,2,NULL,NULL,NULL,NULL,NULL),(51,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:29:05','2019-05-19 22:55:33',3,7,556,NULL,60,NULL,NULL),(52,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:29:32','2019-05-19 22:55:33',3,7,557,NULL,60,NULL,NULL),(53,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:29:47','2019-05-19 22:55:33',3,7,558,NULL,60,NULL,NULL),(54,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:30:01','2019-05-19 22:55:33',3,7,559,NULL,60,NULL,NULL),(55,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:30:28','2019-05-19 22:55:33',3,7,560,NULL,60,NULL,NULL),(56,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:30:41','2019-05-19 22:55:33',3,7,561,NULL,60,NULL,NULL),(57,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:31:46','2019-05-19 22:55:33',3,7,562,NULL,60,NULL,NULL),(58,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:32:18','2019-05-19 22:55:33',3,7,563,NULL,60,NULL,NULL),(59,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:33:19','2019-05-19 22:55:33',3,7,564,NULL,60,NULL,NULL),(60,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:33:47','2019-05-19 22:55:33',3,7,565,NULL,60,NULL,NULL),(61,1,'was posted in the','community','communityQuestionPost','2019-01-16 08:34:28','2019-05-19 22:55:33',3,7,NULL,NULL,60,NULL,NULL),(62,0,'liked','home','postLike','2019-01-16 21:13:03','2019-01-16 21:13:03',9,9,NULL,8,NULL,NULL,NULL),(63,0,'liked','home','postLike','2019-01-16 21:13:29','2019-01-16 21:13:29',9,9,NULL,9,NULL,NULL,NULL),(64,0,'liked','home','postLike','2019-01-16 21:13:41','2019-01-16 21:13:41',9,3,NULL,11,NULL,NULL,NULL),(65,0,'liked','home','postLike','2019-01-16 21:14:24','2019-01-16 21:14:24',9,9,NULL,7,NULL,NULL,NULL),(66,1,'followed you.',NULL,'newFollower','2019-01-17 07:28:00','2019-05-19 22:55:33',3,6,NULL,NULL,NULL,NULL,NULL),(67,1,'followed you.',NULL,'newFollower','2019-01-17 07:28:13','2019-05-19 22:55:33',3,4,NULL,NULL,NULL,NULL,NULL),(68,0,'liked','home','postLike','2019-01-17 07:54:21','2019-01-17 07:54:21',15,3,NULL,15,NULL,NULL,NULL),(69,0,'liked','home','postLike','2019-01-17 08:42:11','2019-01-17 08:42:11',17,3,NULL,15,NULL,NULL,NULL),(70,0,'followed you.',NULL,'newFollower','2019-01-17 18:03:26','2019-01-17 18:03:26',16,11,NULL,NULL,NULL,NULL,NULL),(71,1,'Commented on','home','postReply','2019-01-19 08:39:05','2019-05-19 22:55:33',3,15,NULL,27,NULL,NULL,NULL),(72,1,'Commented on','home','postReply','2019-01-19 08:50:13','2019-05-19 22:55:33',3,NULL,NULL,27,NULL,NULL,NULL),(73,0,'answered to','community','communityQuestionReply','2019-01-19 11:36:23','2019-01-19 11:36:23',19,3,8,NULL,1,NULL,NULL),(74,0,'answered to','community','communityQuestionReply','2019-01-19 12:26:32','2019-01-19 12:26:32',19,3,100,NULL,9,NULL,NULL),(75,0,'replied to','community','communityQuestionFollow','2019-01-19 12:32:27','2019-01-19 12:32:27',19,3,16,NULL,1,NULL,NULL),(76,0,'answered to','community','communityQuestionReply','2019-01-19 12:33:35','2019-01-19 12:33:35',21,3,100,NULL,9,NULL,NULL),(77,0,'liked','home','postLike','2019-01-19 14:13:58','2019-01-19 14:13:58',22,15,NULL,27,NULL,NULL,NULL),(78,0,'liked','home','postLike','2019-01-19 14:16:03','2019-01-19 14:16:03',22,15,NULL,27,NULL,NULL,NULL),(79,0,'liked','home','postLike','2019-01-20 16:33:03','2019-01-20 16:33:03',25,17,NULL,30,NULL,NULL,NULL),(80,0,'liked','home','postLike','2019-01-20 16:38:55','2019-01-20 16:38:55',25,17,NULL,30,NULL,NULL,NULL),(81,1,'liked','home','postLike','2019-01-20 18:14:44','2019-05-19 22:55:33',3,17,NULL,29,NULL,NULL,NULL),(82,1,'liked','home','postLike','2019-01-21 06:39:36','2019-05-19 22:55:33',3,27,NULL,31,NULL,NULL,NULL),(83,1,'liked','home','postLike','2019-01-21 06:39:47','2019-05-19 22:55:33',3,27,NULL,31,NULL,NULL,NULL),(84,1,'followed you.',NULL,'newFollower','2019-01-21 06:40:41','2019-05-19 22:55:33',3,27,NULL,NULL,NULL,NULL,NULL),(85,0,'Commented on','home','postReply','2019-01-22 22:32:34','2019-01-22 22:32:34',17,27,NULL,31,NULL,NULL,NULL),(86,0,'liked','home','postLike','2019-01-23 07:46:54','2019-01-23 07:46:54',32,18,NULL,16,NULL,NULL,NULL),(87,0,'liked','home','postLike','2019-01-23 07:46:57','2019-01-23 07:46:57',32,18,NULL,21,NULL,NULL,NULL),(88,0,'liked','home','postLike','2019-01-23 07:47:02','2019-01-23 07:47:02',32,18,NULL,21,NULL,NULL,NULL),(89,0,'liked','home','postLike','2019-01-23 21:32:19','2019-01-23 21:32:19',34,3,NULL,15,NULL,NULL,NULL),(90,1,'followed you.',NULL,'newFollower','2019-01-24 13:30:00','2019-05-19 22:55:33',3,35,NULL,NULL,NULL,NULL,NULL),(91,1,'liked','home','postLike','2019-01-24 13:30:44','2019-05-19 22:55:33',3,17,NULL,30,NULL,NULL,NULL),(92,0,'replied to','community','communityQuestionFollow','2019-01-24 14:45:14','2019-01-24 14:45:14',36,3,309,NULL,30,NULL,NULL),(93,0,'liked','home','postLike','2019-01-25 16:08:46','2019-01-25 16:08:46',38,16,NULL,36,NULL,NULL,NULL),(94,0,'replied to','community','communityQuestionFollow','2019-01-27 01:08:54','2019-01-27 01:08:54',42,3,264,NULL,25,NULL,NULL),(95,0,'replied to','community','communityQuestionFollow','2019-02-01 22:05:40','2019-02-01 22:05:40',44,3,500,NULL,51,NULL,NULL),(96,0,'replied to','community','communityQuestionFollow','2019-02-01 22:06:05','2019-02-01 22:06:05',44,3,493,NULL,51,NULL,NULL),(97,0,'replied to','community','communityQuestionFollow','2019-02-01 22:13:33','2019-02-01 22:13:33',44,3,499,NULL,51,NULL,NULL),(98,0,'answered to','community','communityQuestionReply','2019-02-09 08:38:23','2019-02-09 08:38:23',16,3,531,NULL,57,NULL,NULL),(99,0,'liked','home','postLike','2019-02-10 09:25:34','2019-02-10 09:25:34',17,15,NULL,46,NULL,NULL,NULL),(100,0,'Commented on','home','postReply','2019-02-17 05:57:23','2019-02-17 05:57:23',48,16,NULL,51,NULL,NULL,NULL),(101,0,'Commented on','home','postReply','2019-02-17 05:58:12','2019-02-17 05:58:12',48,17,NULL,49,NULL,NULL,NULL),(102,0,'Commented on','home','postReply','2019-02-17 06:05:00','2019-02-17 06:05:00',48,16,NULL,51,NULL,NULL,NULL),(103,0,'answered to','community','communityQuestionReply','2019-02-18 17:14:47','2019-02-18 17:14:47',48,3,16,NULL,1,NULL,NULL),(104,0,'liked','home','postLike','2019-02-19 06:17:50','2019-02-19 06:17:50',48,16,NULL,51,NULL,NULL,NULL),(105,0,'liked','home','postLike','2019-02-19 06:17:56','2019-02-19 06:17:56',48,16,NULL,51,NULL,NULL,NULL),(106,0,'liked','home','postLike','2019-02-19 06:18:01','2019-02-19 06:18:01',48,16,NULL,51,NULL,NULL,NULL),(107,0,'liked','home','postLike','2019-02-19 06:18:04','2019-02-19 06:18:04',48,16,NULL,51,NULL,NULL,NULL),(108,0,'liked','home','postLike','2019-02-19 06:18:07','2019-02-19 06:18:07',48,16,NULL,51,NULL,NULL,NULL),(109,0,'liked','home','postLike','2019-02-19 06:18:12','2019-02-19 06:18:12',48,16,NULL,51,NULL,NULL,NULL),(110,0,'liked','home','postLike','2019-02-19 06:18:21','2019-02-19 06:18:21',48,16,NULL,51,NULL,NULL,NULL),(111,0,'liked','home','postLike','2019-02-19 06:18:24','2019-02-19 06:18:24',48,16,NULL,51,NULL,NULL,NULL),(112,0,'liked','home','postLike','2019-02-19 14:49:22','2019-02-19 14:49:22',48,16,NULL,51,NULL,NULL,NULL),(113,0,'liked','home','postLike','2019-02-19 14:49:26','2019-02-19 14:49:26',48,16,NULL,51,NULL,NULL,NULL),(114,0,'liked','home','postLike','2019-02-19 14:50:34','2019-02-19 14:50:34',48,16,NULL,51,NULL,NULL,NULL),(115,0,'liked','home','postLike','2019-02-19 14:50:37','2019-02-19 14:50:37',48,16,NULL,51,NULL,NULL,NULL),(116,0,'liked','home','postLike','2019-02-19 14:50:41','2019-02-19 14:50:41',48,16,NULL,51,NULL,NULL,NULL),(117,0,'liked','home','postLike','2019-02-19 14:51:14','2019-02-19 14:51:14',48,16,NULL,51,NULL,NULL,NULL),(118,0,'followed you.',NULL,'newFollower','2019-02-19 17:34:40','2019-02-19 17:34:40',48,1,NULL,NULL,NULL,NULL,NULL),(119,0,'followed you.',NULL,'newFollower','2019-02-19 17:34:43','2019-02-19 17:34:43',48,2,NULL,NULL,NULL,NULL,NULL),(120,0,'followed you.',NULL,'newFollower','2019-02-19 17:34:45','2019-02-19 17:34:45',48,4,NULL,NULL,NULL,NULL,NULL),(121,0,'replied to','community','communityQuestionFollow','2019-02-19 20:16:14','2019-02-19 20:16:14',48,3,37,NULL,3,NULL,NULL),(122,0,'answered to','community','communityQuestionReply','2019-02-20 06:05:12','2019-02-20 06:05:12',48,3,16,NULL,1,NULL,NULL),(123,0,'liked','home','postLike','2019-02-20 14:50:32','2019-02-20 14:50:32',48,16,NULL,51,NULL,NULL,NULL),(124,0,'liked','home','postLike','2019-02-20 14:53:07','2019-02-20 14:53:07',48,16,NULL,50,NULL,NULL,NULL),(125,0,'liked','home','postLike','2019-02-20 14:53:18','2019-02-20 14:53:18',48,16,NULL,50,NULL,NULL,NULL),(126,0,'liked','home','postLike','2019-02-20 14:53:26','2019-02-20 14:53:26',48,16,NULL,50,NULL,NULL,NULL),(127,0,'liked','home','postLike','2019-02-20 14:53:31','2019-02-20 14:53:31',48,16,NULL,50,NULL,NULL,NULL),(128,0,'liked','home','postLike','2019-02-20 14:54:57','2019-02-20 14:54:57',48,16,NULL,50,NULL,NULL,NULL),(129,0,'liked','home','postLike','2019-02-20 14:55:01','2019-02-20 14:55:01',48,16,NULL,50,NULL,NULL,NULL),(130,0,'liked','home','postLike','2019-03-06 15:30:38','2019-03-06 15:30:38',16,16,NULL,NULL,NULL,NULL,NULL),(131,0,'liked','home','postLike','2019-03-06 15:30:39','2019-03-06 15:30:39',16,16,NULL,NULL,NULL,NULL,NULL),(132,0,'liked','home','postLike','2019-03-06 15:36:31','2019-03-06 15:36:31',16,16,NULL,51,NULL,NULL,NULL),(133,0,'liked','home','postLike','2019-03-06 15:48:08','2019-03-06 15:48:08',48,16,NULL,NULL,NULL,NULL,NULL),(134,0,'liked','home','postLike','2019-03-06 15:48:21','2019-03-06 15:48:21',48,16,NULL,NULL,NULL,NULL,NULL),(135,0,'liked','home','postLike','2019-03-06 15:48:26','2019-03-06 15:48:26',48,16,NULL,NULL,NULL,NULL,NULL),(136,0,'liked','home','postLike','2019-03-06 15:48:29','2019-03-06 15:48:29',48,16,NULL,NULL,NULL,NULL,NULL),(137,0,'liked','home','postLike','2019-03-06 15:48:33','2019-03-06 15:48:33',48,16,NULL,NULL,NULL,NULL,NULL),(138,0,'liked','home','postLike','2019-03-06 16:12:27','2019-03-06 16:12:27',48,16,NULL,NULL,NULL,NULL,NULL),(139,1,'liked','home','postLike','2019-03-06 16:27:35','2019-05-19 22:55:33',3,17,NULL,49,NULL,NULL,NULL),(140,1,'liked','home','postLike','2019-03-06 16:27:36','2019-05-19 22:55:33',3,17,NULL,49,NULL,NULL,NULL),(141,1,'liked','home','postLike','2019-03-06 16:27:36','2019-05-19 22:55:33',3,17,NULL,49,NULL,NULL,NULL),(142,1,'followed you.',NULL,'newFollower','2019-03-07 06:53:25','2019-05-19 22:55:33',3,9,NULL,NULL,NULL,NULL,NULL),(143,0,'liked','home','postLike','2019-03-07 08:53:24','2019-03-07 08:53:24',16,17,NULL,48,NULL,NULL,NULL),(144,0,'Commented on','home','postReply','2019-03-07 21:20:17','2019-03-07 21:20:17',17,18,NULL,55,NULL,NULL,NULL),(145,0,'liked','home','postLike','2019-03-07 23:25:11','2019-03-07 23:25:11',11,15,NULL,54,NULL,NULL,NULL),(146,0,'liked','home','postLike','2019-03-07 23:27:36','2019-03-07 23:27:36',11,16,NULL,50,NULL,NULL,NULL),(147,1,'liked','home','postLike','2019-03-15 13:38:01','2019-05-19 22:55:33',3,3,NULL,59,NULL,NULL,NULL),(148,0,'replied to','community','communityQuestionFollow','2019-03-18 00:32:31','2019-03-18 00:32:31',65,3,89,NULL,8,NULL,NULL),(149,0,'replied to','community','communityQuestionFollow','2019-03-18 00:32:33','2019-03-18 00:32:33',65,3,88,NULL,8,NULL,NULL),(150,0,'replied to','community','communityQuestionFollow','2019-03-18 00:32:34','2019-03-18 00:32:34',65,3,87,NULL,8,NULL,NULL),(151,0,'replied to','community','communityQuestionFollow','2019-03-18 00:32:36','2019-03-18 00:32:36',65,3,86,NULL,8,NULL,NULL),(152,0,'replied to','community','communityQuestionFollow','2019-03-18 00:32:38','2019-03-18 00:32:38',65,3,85,NULL,8,NULL,NULL),(153,0,'replied to','community','communityQuestionFollow','2019-03-18 00:32:38','2019-03-18 00:32:38',65,3,84,NULL,8,NULL,NULL),(154,0,'liked','home','postLike','2019-03-21 23:50:35','2019-03-21 23:50:35',17,17,NULL,63,NULL,NULL,NULL),(155,0,'liked','home','postLike','2019-03-21 23:50:43','2019-03-21 23:50:43',17,17,NULL,61,NULL,NULL,NULL),(156,0,'liked','home','postLike','2019-03-21 23:50:44','2019-03-21 23:50:44',17,3,NULL,60,NULL,NULL,NULL),(157,0,'liked','home','postLike','2019-03-21 23:50:49','2019-03-21 23:50:49',17,3,NULL,58,NULL,NULL,NULL),(158,0,'liked','home','postLike','2019-03-21 23:50:52','2019-03-21 23:50:52',17,16,NULL,57,NULL,NULL,NULL),(159,0,'liked','home','postLike','2019-03-21 23:50:56','2019-03-21 23:50:56',17,18,NULL,55,NULL,NULL,NULL),(160,0,'liked','home','postLike','2019-03-21 23:51:07','2019-03-21 23:51:07',17,17,NULL,62,NULL,NULL,NULL),(161,1,'liked','home','postLike','2019-03-22 14:29:28','2019-05-19 22:55:33',3,17,NULL,63,NULL,NULL,NULL),(162,1,'was posted in the','community','communityQuestionPost','2019-03-22 15:30:39','2019-05-19 22:55:33',3,22,NULL,NULL,3,NULL,NULL),(163,1,'was posted in the','community','communityQuestionPost','2019-03-22 15:30:39','2019-05-19 22:55:33',3,48,NULL,NULL,3,NULL,NULL),(164,1,'was posted in the','community','communityQuestionPost','2019-03-22 15:39:42','2019-05-19 22:55:33',3,22,NULL,NULL,3,NULL,NULL),(165,1,'was posted in the','community','communityQuestionPost','2019-03-22 15:39:42','2019-05-19 22:55:33',3,48,NULL,NULL,3,NULL,NULL),(166,1,'was posted in the','community','communityQuestionPost','2019-03-22 16:16:11','2019-05-19 22:55:33',3,22,590,NULL,3,NULL,NULL),(167,1,'was posted in the','community','communityQuestionPost','2019-03-22 16:16:11','2019-05-19 22:55:33',3,48,590,NULL,3,NULL,NULL),(168,0,'liked','home','postLike','2019-03-23 11:24:51','2019-03-23 11:24:51',16,18,NULL,67,NULL,NULL,NULL),(169,0,'liked','home','postLike','2019-03-23 11:24:54','2019-03-23 11:24:54',16,18,NULL,65,NULL,NULL,NULL),(170,0,'liked','home','postLike','2019-03-23 11:25:01','2019-03-23 11:25:01',16,15,NULL,64,NULL,NULL,NULL),(171,0,'liked','home','postLike','2019-03-23 11:27:21','2019-03-23 11:27:21',17,16,NULL,68,NULL,NULL,NULL),(172,0,'liked','home','postLike','2019-03-23 11:27:24','2019-03-23 11:27:24',17,18,NULL,67,NULL,NULL,NULL),(173,0,'liked','home','postLike','2019-03-23 11:27:28','2019-03-23 11:27:28',17,18,NULL,65,NULL,NULL,NULL),(174,0,'liked','home','postLike','2019-03-23 11:27:43','2019-03-23 11:27:43',17,15,NULL,64,NULL,NULL,NULL),(175,0,'liked','home','postLike','2019-03-26 23:43:08','2019-03-26 23:43:08',15,17,NULL,69,NULL,NULL,NULL),(176,0,'liked','home','postLike','2019-03-26 23:43:14','2019-03-26 23:43:14',15,18,NULL,70,NULL,NULL,NULL),(177,0,'liked','home','postLike','2019-03-26 23:43:19','2019-03-26 23:43:19',15,17,NULL,71,NULL,NULL,NULL),(178,0,'liked','home','postLike','2019-03-26 23:43:22','2019-03-26 23:43:22',15,17,NULL,72,NULL,NULL,NULL),(179,0,'liked','home','postLike','2019-03-26 23:43:27','2019-03-26 23:43:27',15,15,NULL,73,NULL,NULL,NULL),(180,0,'followed you.',NULL,'newFollower','2019-03-28 09:52:24','2019-03-28 09:52:24',69,18,NULL,NULL,NULL,NULL,NULL),(181,0,'followed you.',NULL,'newFollower','2019-03-28 09:52:28','2019-03-28 09:52:28',69,18,NULL,NULL,NULL,NULL,NULL),(182,0,'was posted in the','community','communityQuestionPost','2019-03-28 09:53:11','2019-03-28 09:53:11',69,66,591,NULL,5,NULL,NULL),(183,0,'shared','home','postShare','2019-04-15 06:01:23','2019-04-15 06:01:23',70,3,NULL,76,NULL,NULL,NULL),(184,0,'shared','home','postShare','2019-04-15 06:02:37','2019-04-15 06:02:37',70,18,NULL,70,NULL,NULL,NULL),(185,0,'liked','home','postLike','2019-05-20 22:12:29','2019-05-20 22:12:29',3,3,NULL,NULL,NULL,NULL,NULL),(186,0,'followed you.',NULL,'newFollower','2019-05-20 22:13:31','2019-05-20 22:13:31',3,12,NULL,NULL,NULL,NULL,NULL),(187,0,'answered to','community','communityQuestionReply','2019-05-24 16:03:19','2019-05-24 16:03:19',48,3,67,NULL,6,NULL,NULL),(188,0,'liked','home','postLike','2019-05-29 06:20:40','2019-05-29 06:20:40',3,15,NULL,73,NULL,NULL,NULL),(189,1,'liked','home','postLike','2019-06-07 05:21:16','2019-06-11 05:18:06',75,3,NULL,86,NULL,NULL,NULL),(215,1,'liked','home','postLike','2019-06-10 07:51:30','2019-06-11 06:08:50',76,75,NULL,90,NULL,NULL,NULL),(216,1,'liked','home','postLike','2019-06-11 05:35:19','2019-06-11 06:08:50',76,75,NULL,91,NULL,NULL,NULL),(217,0,'was posted in the','community','communityQuestionPost','2019-06-26 09:58:04','2019-06-26 09:58:04',75,12,592,NULL,8,NULL,NULL),(218,0,'was posted in the','community','communityQuestionPost','2019-06-26 09:58:04','2019-06-26 09:58:04',75,23,592,NULL,8,NULL,NULL),(219,0,'was posted in the','community','communityQuestionPost','2019-06-26 09:58:04','2019-06-26 09:58:04',75,34,592,NULL,8,NULL,NULL),(220,0,'was posted in the','community','communityQuestionPost','2019-06-26 09:58:04','2019-06-26 09:58:04',75,65,592,NULL,8,NULL,NULL),(221,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,9,593,NULL,1,NULL,NULL),(222,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,19,593,NULL,1,NULL,NULL),(223,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,32,593,NULL,1,NULL,NULL),(224,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,53,593,NULL,1,NULL,NULL),(225,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,56,593,NULL,1,NULL,NULL),(226,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,67,593,NULL,1,NULL,NULL),(227,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:01:07','2019-06-26 10:01:07',75,67,593,NULL,1,NULL,NULL),(228,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:06:58','2019-06-26 10:06:58',75,22,594,NULL,3,NULL,NULL),(229,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:06:58','2019-06-26 10:06:58',75,48,594,NULL,3,NULL,NULL),(230,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:06:58','2019-06-26 10:06:58',75,69,594,NULL,3,NULL,NULL),(231,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:06:58','2019-06-26 10:06:58',75,70,594,NULL,3,NULL,NULL),(232,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:24:54','2019-06-26 10:24:54',75,12,595,NULL,8,NULL,NULL),(233,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:24:54','2019-06-26 10:24:54',75,23,595,NULL,8,NULL,NULL),(234,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:24:54','2019-06-26 10:24:54',75,34,595,NULL,8,NULL,NULL),(235,0,'was posted in the','community','communityQuestionPost','2019-06-26 10:24:54','2019-06-26 10:24:54',75,65,595,NULL,8,NULL,NULL),(236,0,'liked','home','postLike','2019-07-06 10:50:06','2019-07-06 10:50:06',75,75,NULL,92,NULL,NULL,NULL),(237,0,'was posted in the','community','communityQuestionPost','2019-08-14 08:48:29','2019-08-14 08:48:29',79,22,596,NULL,3,NULL,NULL),(238,0,'was posted in the','community','communityQuestionPost','2019-08-14 08:48:29','2019-08-14 08:48:29',79,48,596,NULL,3,NULL,NULL),(239,0,'was posted in the','community','communityQuestionPost','2019-08-14 08:48:29','2019-08-14 08:48:29',79,69,596,NULL,3,NULL,NULL),(240,0,'was posted in the','community','communityQuestionPost','2019-08-14 08:48:29','2019-08-14 08:48:29',79,70,596,NULL,3,NULL,NULL),(241,0,'was posted in the','community','communityQuestionPost','2019-08-14 08:49:45','2019-08-14 08:49:45',79,55,597,NULL,15,NULL,NULL),(242,0,'answered to','community','communityQuestionReply','2019-08-14 14:59:50','2019-08-14 14:59:50',78,79,596,NULL,3,NULL,NULL),(243,0,'replied to','community','communityQuestionFollow','2019-08-14 15:02:36','2019-08-14 15:02:36',78,79,596,NULL,3,NULL,NULL),(244,0,'Commented on','home','postReply','2019-08-15 03:29:51','2019-08-15 03:29:51',79,78,NULL,95,NULL,NULL,NULL),(245,0,'Commented on','home','postReply','2019-08-15 10:59:55','2019-08-15 10:59:55',79,78,NULL,95,NULL,NULL,NULL),(246,0,'Commented on','home','postReply','2019-08-15 11:20:24','2019-08-15 11:20:24',79,78,NULL,95,NULL,NULL,NULL),(247,0,'Commented on','home','postReply','2019-08-15 11:21:52','2019-08-15 11:21:52',79,78,NULL,95,NULL,NULL,NULL),(248,0,'Commented on','home','postReply','2019-08-15 11:49:50','2019-08-15 11:49:50',79,78,NULL,95,NULL,NULL,NULL),(249,0,'Commented on','home','postReply','2019-08-15 12:37:21','2019-08-15 12:37:21',79,78,NULL,95,NULL,NULL,NULL),(250,0,'Commented on','home','postReply','2019-08-15 12:39:28','2019-08-15 12:39:28',79,78,NULL,95,NULL,NULL,NULL),(251,0,'Commented on','home','postReply','2019-08-15 12:40:03','2019-08-15 12:40:03',79,78,NULL,95,NULL,NULL,NULL),(252,0,'Commented on','home','postReply','2019-08-15 12:43:26','2019-08-15 12:43:26',79,78,NULL,95,NULL,NULL,NULL),(253,0,'Commented on','home','postReply','2019-08-15 12:48:00','2019-08-15 12:48:00',79,78,NULL,95,NULL,NULL,NULL),(254,0,'Commented on','home','postReply','2019-08-15 12:50:41','2019-08-15 12:50:41',79,78,NULL,95,NULL,NULL,NULL),(255,0,'liked','home','postLike','2019-08-15 13:18:58','2019-08-15 13:18:58',79,78,NULL,95,NULL,NULL,NULL),(256,0,'Commented on','home','postReply','2019-08-16 03:04:02','2019-08-16 03:04:02',79,78,NULL,94,NULL,NULL,NULL),(257,0,'Commented on','home','postReply','2019-08-16 03:11:50','2019-08-16 03:11:50',79,78,NULL,94,NULL,NULL,NULL),(258,0,'Commented on','home','postReply','2019-08-16 03:16:31','2019-08-16 03:16:31',79,78,NULL,94,NULL,NULL,NULL),(259,0,'Commented on','home','postReply','2019-08-16 03:58:08','2019-08-16 03:58:08',79,78,NULL,94,NULL,NULL,NULL),(260,0,'Commented on','home','postReply','2019-08-16 04:00:23','2019-08-16 04:00:23',79,78,NULL,94,NULL,NULL,NULL),(261,0,'answered to','community','communityQuestionReply','2019-08-16 04:48:47','2019-08-16 04:48:47',78,79,596,NULL,3,NULL,NULL),(262,0,'answered to','community','communityQuestionReply','2019-08-16 07:16:15','2019-08-16 07:16:15',80,79,596,NULL,3,NULL,NULL);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pageview`
--

DROP TABLE IF EXISTS `pageview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pageview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postv1Id` (`postv1Id`),
  KEY `userId` (`userId`),
  CONSTRAINT `pageview_ibfk_1` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pageview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pageview`
--

LOCK TABLES `pageview` WRITE;
/*!40000 ALTER TABLE `pageview` DISABLE KEYS */;
/*!40000 ALTER TABLE `pageview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_option`
--

DROP TABLE IF EXISTS `poll_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poll_option` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postv1Id` (`postv1Id`),
  CONSTRAINT `poll_option_ibfk_1` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_option`
--

LOCK TABLES `poll_option` WRITE;
/*!40000 ALTER TABLE `poll_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `poll_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8_unicode_ci,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `pollExpiration` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `postTo` int(10) unsigned DEFAULT NULL,
  `sharePostId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postTo` (`postTo`),
  KEY `sharePostId` (`sharePostId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`postTo`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_3` FOREIGN KEY (`sharePostId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (3,'Psychology students are the Jehovah\'s witnesses of uni, walking around the library asking you to take part in their study.',NULL,NULL,NULL,NULL,'2019-01-12 14:46:54','2019-01-12 14:46:54',5,NULL,NULL),(5,'You can blink and there will be another assignment to do. When can I rest?',NULL,NULL,NULL,NULL,'2019-01-12 18:38:23','2019-01-12 18:38:23',3,NULL,NULL),(6,'This looks sensational.',NULL,NULL,NULL,NULL,'2019-01-13 23:38:35','2019-01-13 23:38:35',9,NULL,NULL),(7,'What you know about copying homework that was given a week ago in 60 seconds on the stair case right before you had that lesson?',NULL,NULL,NULL,NULL,'2019-01-14 14:56:53','2019-01-14 14:56:53',9,NULL,NULL),(8,'need to lose weight, I know how to lose weight, but I don’t wanna do the things that I need to do to lose the weight, but I still wanna lose weight. You get me?',NULL,NULL,NULL,NULL,'2019-01-16 20:50:56','2019-01-16 20:50:56',9,NULL,NULL),(9,'Every student’s mood after exams',NULL,NULL,NULL,NULL,'2019-01-16 20:56:49','2019-01-16 20:56:49',9,NULL,NULL),(10,'Ppl will go to the library and pull out their laptop, textbook, agenda, multicoloured pens, 2 calculators and a large coffee just to sit there like this for 2 hours...',NULL,NULL,NULL,NULL,'2019-01-16 21:03:26','2019-01-16 21:03:26',9,NULL,NULL),(11,' “Thank u, next” is really how you gotta navigate through relationships in life. If all else fails, grab your lessons, grab yourself, and go.',NULL,NULL,NULL,NULL,'2019-01-16 21:08:10','2019-01-16 21:08:10',3,NULL,NULL),(12,'“You look familiar” lmao shut up no I don’t. I’m always at home.',NULL,NULL,NULL,NULL,'2019-01-16 21:46:26','2019-01-16 21:46:26',9,NULL,NULL),(13,'I saw a post that said “I wasn’t myself for months and nobody noticed” I felt that.',NULL,NULL,NULL,NULL,'2019-01-16 21:51:47','2019-01-16 21:51:47',9,NULL,NULL),(14,'british government looking like a group project at uni gone wrong.',NULL,NULL,NULL,NULL,'2019-01-16 21:53:18','2019-01-16 21:53:18',9,NULL,NULL),(15,'Can we just skip to the part where I\'m done with school and have my career and life together?',NULL,NULL,NULL,NULL,'2019-01-17 07:15:59','2019-01-17 07:15:59',3,NULL,NULL),(16,'My degree and I waiting to see who will finish who first...',NULL,NULL,NULL,NULL,'2019-01-17 12:00:33','2019-01-17 12:00:33',18,NULL,NULL),(17,'The quietest people tend to have the loudest minds.',NULL,NULL,NULL,NULL,'2019-01-17 12:02:14','2019-01-17 12:02:14',17,NULL,NULL),(18,'Once you don’t feel guilty about missing lectures/seminars, it’s really a downhill spiral from that point.',NULL,NULL,NULL,NULL,'2019-01-17 12:04:04','2019-01-17 12:04:04',17,NULL,NULL),(19,'I don’t even learn in school anymore\n\nI am just trying to maintain good grades..',NULL,NULL,NULL,NULL,'2019-01-17 12:05:13','2019-01-17 12:05:13',18,NULL,NULL),(20,'Multiple choice in high school:\na) not the answer \nb) DEFINITELY THE ANSWER\nc) not the answer\n\nIn college:\na) could be the answer\nb) oh this one could be too\nc) doubtful, but what if I’m wrong and it is the answer?\nd) vague option that could also be right',NULL,NULL,NULL,NULL,'2019-01-17 12:07:11','2019-01-17 12:07:11',16,NULL,NULL),(21,'Every relationship is different. You can’t go into a new relationship with the same expectations as the last, eitherwise you’re gonna be heartbroken.',NULL,NULL,NULL,NULL,'2019-01-17 12:08:57','2019-01-17 12:08:57',18,NULL,NULL),(22,'Me in class taking a picture of the board that I know I will never look at again.',NULL,NULL,NULL,NULL,'2019-01-17 13:56:45','2019-01-17 13:56:45',18,NULL,NULL),(24,'Insane how pals you’ve known a few months can be better to you than ones you’ve known years..',NULL,NULL,NULL,NULL,'2019-01-17 14:09:59','2019-01-17 14:09:59',16,NULL,NULL),(25,'When the FaceTime connects.',NULL,NULL,NULL,NULL,'2019-01-17 14:27:44','2019-01-17 14:27:44',15,NULL,NULL),(26,'y’all ever understand a sentence in another language without translate and you’re like wow i’m really out here being buy linguini...',NULL,NULL,NULL,NULL,'2019-01-17 18:56:15','2019-01-17 18:56:15',15,NULL,NULL),(27,'Every uni student changes the dates on the reference list so it looks like u did it well before it was due in and not the day before ?',NULL,NULL,NULL,NULL,'2019-01-17 21:18:56','2019-01-17 21:18:56',15,NULL,NULL),(28,'Guy thot majors:\n1) economics\n2) business\n3) engineering (no specific type)',NULL,NULL,NULL,NULL,'2019-01-20 07:16:53','2019-01-20 07:16:53',15,NULL,NULL),(29,'Insane how pals you’ve known a few months can be better to you than ones you’ve known years..',NULL,NULL,NULL,NULL,'2019-01-20 08:57:16','2019-01-20 08:57:16',17,NULL,NULL),(30,'Job interviewer: It says on your résumé that you went to Harvard University\n\nMe: Yeah, I was visiting my friend.',NULL,NULL,NULL,NULL,'2019-01-20 09:23:00','2019-01-20 09:23:00',17,NULL,NULL),(31,'Hey guys I’m new here ',NULL,NULL,NULL,NULL,'2019-01-21 06:28:31','2019-01-21 06:28:31',27,NULL,NULL),(32,'Me: Carrying all the groceries on one trip',NULL,NULL,NULL,NULL,'2019-01-23 15:50:16','2019-01-23 15:50:16',17,NULL,NULL),(33,'Pushing my feelings aside because I have school work to worry about is hard af and draining..',NULL,NULL,NULL,NULL,'2019-01-24 13:49:13','2019-01-24 13:49:13',18,NULL,NULL),(34,'How do u juggle commuting to uni, doing uni work at home, working, going to the gym, seeing your bf, seeing your friends, seeing your family, having a social life, keeping on top of things at home, having some time to yourself, and maintaining any sanity ??? asking for myself',NULL,NULL,NULL,NULL,'2019-01-24 13:55:09','2019-01-24 13:55:09',18,NULL,NULL),(35,'Listen, if drunk me says something, you gotta take that up with drunk me. Don’t come at sober me because she wasn’t there...',NULL,NULL,NULL,NULL,'2019-01-24 15:21:02','2019-01-24 15:21:02',3,NULL,NULL),(36,'When u got alot on your mind & someone asks whats wrong',NULL,NULL,NULL,NULL,'2019-01-25 12:24:45','2019-01-25 12:24:45',16,NULL,NULL),(37,'Wikipedia is an excellent source. \nThe trick is to cite their citations and not wikipedia.',NULL,NULL,NULL,NULL,'2019-01-28 21:10:44','2019-01-28 21:10:44',16,NULL,NULL),(38,'y’all ever skip class and then have the post skip class depression? Like damn i should’ve just went...',NULL,NULL,NULL,NULL,'2019-01-31 13:04:26','2019-01-31 13:04:26',16,NULL,NULL),(40,'Goals ',NULL,NULL,NULL,NULL,'2019-02-03 02:43:17','2019-02-03 02:43:17',15,NULL,NULL),(41,'Been postponing doing this assignment till the due date because “works well under pressure”. Turns out I was only looking at page 1 of the question. There’s 3 more pages.',NULL,NULL,NULL,NULL,'2019-02-03 07:28:46','2019-02-03 07:28:46',16,NULL,NULL),(42,'Sitting in lectures and not understanding whats going on but your attendance is going up >>>>',NULL,NULL,NULL,NULL,'2019-02-08 16:00:19','2019-02-08 16:00:19',16,NULL,NULL),(43,'Nothing worse than when you’ve been on the treadmill for 15mins and you look down and it says 0:46 secs ?',NULL,NULL,NULL,NULL,'2019-02-10 09:11:52','2019-02-10 09:11:52',17,NULL,NULL),(44,'Share your craziest exam experience. Like you seeing the questions in the hall and becoming blank, or you were afraid. ',NULL,NULL,NULL,NULL,'2019-02-10 09:13:06','2019-02-10 09:13:06',17,NULL,NULL),(45,'“How’s uni?” is defo one of the worst questions to be asked.',NULL,NULL,NULL,NULL,'2019-02-10 09:19:15','2019-02-10 09:19:15',15,NULL,NULL),(46,'Uni life be like:',NULL,NULL,NULL,NULL,'2019-02-10 09:22:41','2019-02-10 09:22:41',15,NULL,NULL),(48,'before you feed your girl \nvs.\nafter you feed your girl',NULL,NULL,NULL,NULL,'2019-02-10 09:28:43','2019-02-10 09:28:43',17,NULL,NULL),(49,'sis will graduate, sis will be successful. sis will be healthy & wealthy. \n\ni am sis. sis is me. me is sis.',NULL,NULL,NULL,NULL,'2019-02-10 12:03:18','2019-02-10 12:03:18',17,NULL,NULL),(50,'A failure is not always a mistake. It may simply be the best one can do under the circumstances. The real mistake is to stop trying.” – B. F. Skinner',NULL,NULL,NULL,NULL,'2019-02-10 23:00:08','2019-02-10 23:00:08',16,NULL,NULL),(51,'My class got cancelled today? and by cancelled, i mean i cancelled it. Cause i didnt go.',NULL,NULL,NULL,NULL,'2019-02-15 22:55:57','2019-02-15 22:55:57',16,NULL,NULL),(54,'Next week I’m actually going to be a serious student.',NULL,NULL,NULL,NULL,'2019-03-07 10:22:43','2019-03-07 10:22:43',15,NULL,NULL),(55,'Jimmy Nolan has a thing for broads—loud, brassy women who sit with their legs open and drink beer straight from the bottle—women who always say exactly what they’re thinking and, for better or worse, mean what they say.\n\nJimmy Nolan has a hard time meeting broads. He’s not quite sure if this is the result of geography, circumstance, or personal limitation. Jimmy’s ex-girlfriend Marissa was the antithesis of a broad—pale, thin, precise, and polite with a watery voice and weak handshake. \n\nTo be Continued.','Broads',NULL,NULL,NULL,'2019-03-07 21:14:14','2019-03-07 21:14:14',18,NULL,NULL),(56,'Worry comes from the belief that you are powerless.',NULL,NULL,NULL,NULL,'2019-03-08 21:18:27','2019-03-08 21:18:27',16,NULL,NULL),(57,'This woman was sleeping in snake printed pajamas and her one foot was outside the blanket. Well, her husband thought it was snake and he broke her foot with with an iron stick!',NULL,NULL,NULL,NULL,'2019-03-12 08:37:40','2019-03-12 08:37:40',16,NULL,NULL),(58,'Stealing things from home to take back to uni >>>>',NULL,NULL,NULL,NULL,'2019-03-14 11:27:15','2019-03-14 11:27:15',3,NULL,NULL),(59,'Doctor finds 27 contact lenses lost in woman\'s eye!!',NULL,NULL,NULL,NULL,'2019-03-14 17:27:24','2019-03-14 17:27:24',3,NULL,NULL),(60,'King cobra bites python. Python constricts cobra. Cobra dies of constriction. Python dies from venom. 100% holy shit..',NULL,NULL,NULL,NULL,'2019-03-15 20:20:02','2019-03-15 20:20:02',3,NULL,NULL),(61,'Cranberry juice tastes like it wants to be alcohol but it’s too shy.',NULL,NULL,NULL,NULL,'2019-03-19 20:17:37','2019-03-19 20:17:37',17,NULL,NULL),(62,'I am rapidly running out of tomorrows on which to begin studying.',NULL,NULL,NULL,NULL,'2019-03-21 14:30:52','2019-03-21 14:30:52',17,NULL,NULL),(63,'Respecting women includes respecting women you are not attracted to.',NULL,NULL,NULL,NULL,'2019-03-21 23:50:23','2019-03-21 23:50:23',17,NULL,NULL),(64,'My result this semester:',NULL,NULL,NULL,NULL,'2019-03-22 15:37:27','2019-03-22 15:37:27',15,NULL,NULL),(65,'“ill study on my bed so I can rest my back”',NULL,NULL,NULL,NULL,'2019-03-22 17:25:32','2019-03-22 17:25:32',18,NULL,NULL),(67,'I could lounge here all day',NULL,NULL,NULL,NULL,'2019-03-22 18:30:53','2019-03-22 18:30:53',18,NULL,NULL),(68,'lecturer said “come back after the break” \n\nlol see you tomorrow x',NULL,NULL,NULL,NULL,'2019-03-23 11:24:45','2019-03-23 11:24:45',16,NULL,NULL),(69,'I am a:\n\n⚪️ girl\n\n⚪️ boy\n\n?  Student \n\nLooking for:\n\n⚪️ a boyfriend\n\n⚪️ a girlfriend \n\n? a paid summer internship',NULL,NULL,NULL,NULL,'2019-03-23 12:21:55','2019-03-23 12:21:55',17,NULL,NULL),(70,'A bar of iron costs $5, made into horseshoes its worth is $12, made into needles its worth is $3500, made into balance springs for watches, its worth is $300,000. Your own value is determined also by what you are able to make of yourself.',NULL,NULL,NULL,NULL,'2019-03-24 22:05:25','2019-03-24 22:05:25',18,NULL,NULL),(71,'Next week I’m actually going to be a serious student',NULL,NULL,NULL,NULL,'2019-03-25 16:12:35','2019-03-25 16:12:35',17,NULL,NULL),(72,'Learning 80% of any new skill shouldn’t take much time to achieve.\n\nMastering the last 20% takes a life time.',NULL,NULL,NULL,NULL,'2019-03-25 16:23:30','2019-03-25 16:23:30',17,NULL,NULL),(73,'Me holding my degree ',NULL,NULL,NULL,NULL,'2019-03-26 23:41:35','2019-03-26 23:41:35',15,NULL,NULL),(74,'If you set your goals ridiculously high and it\'s a failure,\nyou will fail above everyone else\'s success.\n\n~ James Cameron',NULL,NULL,NULL,NULL,'2019-03-27 09:59:39','2019-03-27 09:59:39',15,NULL,NULL),(75,'After exams ',NULL,NULL,NULL,NULL,'2019-04-01 23:10:19','2019-04-01 23:10:19',15,NULL,NULL),(76,'First year students ....',NULL,NULL,NULL,NULL,'2019-04-08 21:30:55','2019-04-08 21:30:55',3,NULL,NULL),(77,'This dog chewed up a phone lol',NULL,NULL,NULL,NULL,'2019-04-11 19:50:35','2019-04-11 19:50:35',15,NULL,NULL),(78,'fef',NULL,NULL,NULL,NULL,'2019-04-15 06:01:23','2019-04-15 06:01:23',70,NULL,76),(79,'xsx',NULL,NULL,NULL,NULL,'2019-04-15 06:02:37','2019-04-15 06:02:37',70,NULL,70),(80,'Nobody: \n\nMe: Those days when I was in Uni ...',NULL,NULL,NULL,NULL,'2019-04-26 12:47:20','2019-04-26 12:47:20',15,NULL,NULL),(81,'I have never been so unserious for an exam period, like this one.',NULL,NULL,NULL,NULL,'2019-04-26 20:05:20','2019-04-26 20:05:20',15,NULL,NULL),(83,'Watching Netflix without academic pressure just isn’t the same.',NULL,NULL,NULL,NULL,'2019-05-18 18:44:40','2019-05-18 18:44:40',3,NULL,NULL),(86,'Empty pockets never held anyone back, only empty heads and empty hearts can do that',NULL,NULL,NULL,NULL,'2019-05-19 23:24:39','2019-05-19 23:24:39',3,NULL,NULL),(90,'Testing story','Temp story',NULL,NULL,NULL,'2019-06-08 04:39:34','2019-06-08 04:39:34',75,NULL,NULL),(91,'Hello There',NULL,NULL,NULL,NULL,'2019-06-11 05:34:09','2019-06-11 05:34:09',75,NULL,NULL),(92,'Here is the watch\nhttps://www.amazon.in/dp/B07DD4LBXF/?coliid=I2X51REWYBPBLS&colid=3D8H1GFJBFSE8&psc=0',NULL,NULL,NULL,NULL,'2019-06-13 05:32:04','2019-06-13 05:32:04',75,NULL,NULL),(93,'Hey',NULL,NULL,NULL,NULL,'2019-07-06 10:45:22','2019-07-06 10:45:22',75,NULL,NULL),(94,'Hi\nI am test',NULL,NULL,NULL,NULL,'2019-08-13 08:15:30','2019-08-13 08:15:30',78,NULL,NULL),(95,'Hi\nIt is new post',NULL,NULL,NULL,NULL,'2019-08-13 14:26:32','2019-08-13 14:26:32',78,NULL,NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_complaint`
--

DROP TABLE IF EXISTS `post_complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_complaint` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_complaint_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_complaint_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_complaint`
--

LOCK TABLES `post_complaint` WRITE;
/*!40000 ALTER TABLE `post_complaint` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_like`
--

DROP TABLE IF EXISTS `post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_like_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_like`
--

LOCK TABLES `post_like` WRITE;
/*!40000 ALTER TABLE `post_like` DISABLE KEYS */;
INSERT INTO `post_like` VALUES (1,'2019-01-12 09:07:02','2019-01-12 09:07:02',NULL,1),(2,'2019-01-12 10:37:33','2019-01-12 10:37:33',NULL,3),(3,'2019-01-12 14:45:41','2019-01-12 14:45:41',NULL,5),(4,'2019-01-14 14:59:50','2019-01-14 14:59:50',3,9),(5,'2019-01-14 15:00:12','2019-01-14 15:00:12',NULL,9),(6,'2019-01-16 21:13:03','2019-01-16 21:13:03',8,9),(7,'2019-01-16 21:13:29','2019-01-16 21:13:29',9,9),(8,'2019-01-16 21:13:41','2019-01-16 21:13:41',11,9),(9,'2019-01-16 21:14:24','2019-01-16 21:14:24',7,9),(11,'2019-01-17 08:42:11','2019-01-17 08:42:11',15,17),(15,'2019-01-20 16:38:55','2019-01-20 16:38:55',30,25),(16,'2019-01-20 18:14:44','2019-01-20 18:14:44',29,3),(18,'2019-01-21 06:39:47','2019-01-21 06:39:47',31,3),(19,'2019-01-23 07:46:54','2019-01-23 07:46:54',16,32),(21,'2019-01-23 07:47:02','2019-01-23 07:47:02',21,32),(22,'2019-01-23 21:32:19','2019-01-23 21:32:19',15,34),(23,'2019-01-24 13:30:44','2019-01-24 13:30:44',30,3),(24,'2019-01-25 16:08:46','2019-01-25 16:08:46',36,38),(25,'2019-02-10 09:25:34','2019-02-10 09:25:34',46,17),(46,'2019-02-20 14:55:01','2019-02-20 14:55:01',50,48),(47,'2019-03-06 15:30:38','2019-03-06 15:30:38',NULL,16),(48,'2019-03-06 15:30:39','2019-03-06 15:30:39',NULL,16),(49,'2019-03-06 15:36:31','2019-03-06 15:36:31',51,16),(55,'2019-03-06 16:12:27','2019-03-06 16:12:27',NULL,48),(56,'2019-03-06 16:27:35','2019-03-06 16:27:35',49,3),(57,'2019-03-06 16:27:36','2019-03-06 16:27:36',49,3),(58,'2019-03-06 16:27:36','2019-03-06 16:27:36',49,3),(59,'2019-03-07 08:53:24','2019-03-07 08:53:24',48,16),(60,'2019-03-07 23:25:11','2019-03-07 23:25:11',54,11),(61,'2019-03-07 23:27:36','2019-03-07 23:27:36',50,11),(62,'2019-03-15 13:38:01','2019-03-15 13:38:01',59,3),(63,'2019-03-21 23:50:35','2019-03-21 23:50:35',63,17),(64,'2019-03-21 23:50:43','2019-03-21 23:50:43',61,17),(65,'2019-03-21 23:50:44','2019-03-21 23:50:44',60,17),(66,'2019-03-21 23:50:49','2019-03-21 23:50:49',58,17),(67,'2019-03-21 23:50:52','2019-03-21 23:50:52',57,17),(68,'2019-03-21 23:50:56','2019-03-21 23:50:56',55,17),(69,'2019-03-21 23:51:07','2019-03-21 23:51:07',62,17),(70,'2019-03-22 14:29:28','2019-03-22 14:29:28',63,3),(71,'2019-03-23 11:24:51','2019-03-23 11:24:51',67,16),(72,'2019-03-23 11:24:54','2019-03-23 11:24:54',65,16),(73,'2019-03-23 11:25:01','2019-03-23 11:25:01',64,16),(74,'2019-03-23 11:27:21','2019-03-23 11:27:21',68,17),(75,'2019-03-23 11:27:24','2019-03-23 11:27:24',67,17),(76,'2019-03-23 11:27:28','2019-03-23 11:27:28',65,17),(77,'2019-03-23 11:27:43','2019-03-23 11:27:43',64,17),(78,'2019-03-26 23:43:08','2019-03-26 23:43:08',69,15),(79,'2019-03-26 23:43:14','2019-03-26 23:43:14',70,15),(80,'2019-03-26 23:43:19','2019-03-26 23:43:19',71,15),(81,'2019-03-26 23:43:22','2019-03-26 23:43:22',72,15),(82,'2019-03-26 23:43:27','2019-03-26 23:43:27',73,15),(84,'2019-05-29 06:20:40','2019-05-29 06:20:40',73,3),(98,'2019-06-07 07:34:14','2019-06-07 07:34:14',86,75),(104,'2019-06-10 06:45:38','2019-06-10 06:45:38',86,76),(118,'2019-06-10 07:52:40','2019-06-10 07:52:40',90,76),(119,'2019-06-11 05:35:19','2019-06-11 05:35:19',91,76),(120,'2019-07-06 10:50:06','2019-07-06 10:50:06',92,75),(121,'2019-08-15 13:18:58','2019-08-15 13:18:58',95,79);
/*!40000 ALTER TABLE `post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_pageview`
--

DROP TABLE IF EXISTS `post_pageview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_pageview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_pageview_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_pageview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_pageview`
--

LOCK TABLES `post_pageview` WRITE;
/*!40000 ALTER TABLE `post_pageview` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_pageview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_poll_option`
--

DROP TABLE IF EXISTS `post_poll_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_poll_option` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  CONSTRAINT `post_poll_option_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_poll_option`
--

LOCK TABLES `post_poll_option` WRITE;
/*!40000 ALTER TABLE `post_poll_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_poll_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_poll_option_summary`
--

DROP TABLE IF EXISTS `post_poll_option_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_poll_option_summary` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postPollOptionId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postPollOptionId` (`postPollOptionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_poll_option_summary_ibfk_1` FOREIGN KEY (`postPollOptionId`) REFERENCES `post_poll_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_poll_option_summary_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_poll_option_summary`
--

LOCK TABLES `post_poll_option_summary` WRITE;
/*!40000 ALTER TABLE `post_poll_option_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_poll_option_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_rating`
--

DROP TABLE IF EXISTS `post_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_rating_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_rating_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_rating`
--

LOCK TABLES `post_rating` WRITE;
/*!40000 ALTER TABLE `post_rating` DISABLE KEYS */;
INSERT INTO `post_rating` VALUES (1,3,'2019-01-12 09:07:02','2019-01-12 09:07:02',NULL,1),(2,2,'2019-01-12 10:37:33','2019-01-12 10:37:33',NULL,3),(3,4,'2019-01-14 14:59:44','2019-01-14 14:59:44',3,9),(4,4,'2019-01-16 21:13:15','2019-01-16 21:13:15',9,9),(5,5,'2019-01-16 21:13:39','2019-01-16 21:13:39',11,9),(6,4,'2019-01-16 21:14:23','2019-01-16 21:14:23',7,9),(7,3,'2019-01-17 07:54:35','2019-01-17 07:54:35',15,15),(8,5,'2019-01-17 08:42:11','2019-01-17 08:42:11',15,17),(9,2,'2019-01-19 14:13:58','2019-01-19 14:13:58',27,22),(10,3,'2019-01-19 14:14:02','2019-01-19 14:14:02',27,22),(11,5,'2019-01-19 14:16:02','2019-01-19 14:16:02',27,22),(12,4,'2019-01-19 14:22:40','2019-01-19 14:22:40',27,22),(13,4,'2019-01-20 16:38:55','2019-01-20 16:38:55',30,25),(14,4,'2019-01-21 06:39:41','2019-01-21 06:39:41',31,3),(15,4,'2019-01-21 06:39:47','2019-01-21 06:39:47',31,3),(16,4,'2019-01-23 07:46:54','2019-01-23 07:46:54',16,32),(17,5,'2019-01-23 07:46:59','2019-01-23 07:46:59',21,32),(18,5,'2019-01-23 21:32:18','2019-01-23 21:32:18',15,34),(19,5,'2019-02-10 09:25:31','2019-02-10 09:25:31',46,17),(20,5,'2019-02-19 06:17:50','2019-02-19 06:17:50',51,48),(21,5,'2019-02-19 06:17:54','2019-02-19 06:17:54',51,48),(22,1,'2019-02-19 06:17:56','2019-02-19 06:17:56',51,48),(23,1,'2019-02-19 06:17:59','2019-02-19 06:17:59',51,48),(24,1,'2019-02-19 06:18:01','2019-02-19 06:18:01',51,48),(25,1,'2019-02-19 06:18:03','2019-02-19 06:18:03',51,48),(26,1,'2019-02-19 06:18:04','2019-02-19 06:18:04',51,48),(27,1,'2019-02-19 06:18:06','2019-02-19 06:18:06',51,48),(28,1,'2019-02-19 06:18:07','2019-02-19 06:18:07',51,48),(29,1,'2019-02-19 06:18:09','2019-02-19 06:18:09',51,48),(30,1,'2019-02-19 06:18:12','2019-02-19 06:18:12',51,48),(31,1,'2019-02-19 06:18:15','2019-02-19 06:18:15',51,48),(32,1,'2019-02-19 06:18:27','2019-02-19 06:18:27',51,48),(33,5,'2019-02-19 14:51:12','2019-02-19 14:51:12',51,48),(34,3,'2019-02-19 14:51:14','2019-02-19 14:51:14',51,48),(35,2,'2019-02-19 14:51:17','2019-02-19 14:51:17',51,48),(36,5,'2019-02-20 14:50:32','2019-02-20 14:50:32',51,48),(37,5,'2019-02-20 14:50:35','2019-02-20 14:50:35',51,48),(38,5,'2019-02-20 14:53:07','2019-02-20 14:53:07',50,48),(39,4,'2019-02-20 14:53:13','2019-02-20 14:53:13',50,48),(40,6,'2019-02-20 14:53:18','2019-02-20 14:53:18',50,48),(41,2,'2019-02-20 14:53:22','2019-02-20 14:53:22',50,48),(42,5,'2019-02-20 14:53:26','2019-02-20 14:53:26',50,48),(43,5,'2019-02-20 14:53:29','2019-02-20 14:53:29',50,48),(44,6,'2019-02-20 14:53:31','2019-02-20 14:53:31',50,48),(45,2,'2019-02-20 14:54:46','2019-02-20 14:54:46',50,48),(46,1,'2019-02-20 14:54:57','2019-02-20 14:54:57',50,48),(47,1,'2019-02-20 14:54:59','2019-02-20 14:54:59',50,48),(48,1,'2019-02-20 14:55:01','2019-02-20 14:55:01',50,48),(49,5,'2019-03-06 15:48:08','2019-03-06 15:48:08',NULL,48),(50,4,'2019-03-06 15:48:14','2019-03-06 15:48:14',NULL,48),(51,1,'2019-03-06 15:48:21','2019-03-06 15:48:21',NULL,48),(52,3,'2019-03-06 15:48:24','2019-03-06 15:48:24',NULL,48),(53,5,'2019-03-06 15:48:26','2019-03-06 15:48:26',NULL,48),(54,5,'2019-03-06 15:48:27','2019-03-06 15:48:27',NULL,48),(55,5,'2019-03-06 15:48:29','2019-03-06 15:48:29',NULL,48),(56,2,'2019-03-06 15:48:31','2019-03-06 15:48:31',NULL,48),(57,1,'2019-03-06 15:48:33','2019-03-06 15:48:33',NULL,48),(58,1,'2019-03-06 15:48:34','2019-03-06 15:48:34',NULL,48),(59,5,'2019-03-06 16:12:26','2019-03-06 16:12:26',NULL,48),(60,5,'2019-03-06 16:27:35','2019-03-06 16:27:35',49,3),(61,5,'2019-03-06 16:27:36','2019-03-06 16:27:36',49,3),(62,5,'2019-03-06 16:27:36','2019-03-06 16:27:36',49,3),(65,3,'2019-03-07 07:27:02','2019-03-07 07:27:02',NULL,3),(66,4,'2019-03-07 08:53:23','2019-03-07 08:53:23',48,16),(67,4,'2019-03-07 23:27:33','2019-03-07 23:27:33',50,11),(68,5,'2019-03-15 13:37:57','2019-03-15 13:37:57',59,3),(69,4,'2019-03-21 23:50:33','2019-03-21 23:50:33',63,17),(70,4,'2019-03-21 23:50:41','2019-03-21 23:50:41',61,17),(71,4,'2019-03-21 23:50:44','2019-03-21 23:50:44',60,17),(72,5,'2019-03-21 23:50:47','2019-03-21 23:50:47',58,17),(73,4,'2019-03-21 23:50:50','2019-03-21 23:50:50',57,17),(74,3,'2019-03-21 23:50:54','2019-03-21 23:50:54',55,17),(75,4,'2019-03-21 23:51:06','2019-03-21 23:51:06',62,17),(76,3,'2019-03-23 11:24:50','2019-03-23 11:24:50',67,16),(77,5,'2019-03-23 11:24:52','2019-03-23 11:24:52',65,16),(78,4,'2019-03-23 11:25:00','2019-03-23 11:25:00',64,16),(79,5,'2019-03-23 11:27:20','2019-03-23 11:27:20',68,17),(80,4,'2019-03-23 11:27:23','2019-03-23 11:27:23',67,17),(81,4,'2019-03-23 11:27:27','2019-03-23 11:27:27',65,17),(82,5,'2019-03-23 11:27:41','2019-03-23 11:27:41',64,17),(83,5,'2019-03-26 23:43:06','2019-03-26 23:43:06',69,15),(84,5,'2019-03-26 23:43:12','2019-03-26 23:43:12',70,15),(85,5,'2019-03-26 23:43:17','2019-03-26 23:43:17',71,15),(86,5,'2019-03-26 23:43:21','2019-03-26 23:43:21',72,15),(87,5,'2019-03-26 23:43:26','2019-03-26 23:43:26',73,15),(88,5,'2019-05-20 22:12:29','2019-05-20 22:12:29',NULL,3),(89,5,'2019-05-29 06:20:39','2019-05-29 06:20:39',73,3),(90,5,'2019-06-07 05:21:16','2019-06-07 05:21:16',86,75),(91,1,'2019-06-07 05:21:30','2019-06-07 05:21:30',86,75),(92,5,'2019-06-07 05:22:56','2019-06-07 05:22:56',86,75),(93,5,'2019-06-07 05:24:01','2019-06-07 05:24:01',86,75),(94,5,'2019-06-07 05:24:04','2019-06-07 05:24:04',86,75),(95,5,'2019-06-07 05:24:07','2019-06-07 05:24:07',86,75),(96,5,'2019-06-07 05:39:17','2019-06-07 05:39:17',86,75),(97,4,'2019-06-07 06:05:59','2019-06-07 06:05:59',86,75),(98,2,'2019-06-07 06:06:13','2019-06-07 06:06:13',86,75),(99,2,'2019-06-07 06:26:08','2019-06-07 06:26:08',86,75),(100,3,'2019-06-07 06:32:43','2019-06-07 06:32:43',86,75),(101,1,'2019-06-07 06:32:56','2019-06-07 06:32:56',86,75),(102,2,'2019-06-07 06:34:34','2019-06-07 06:34:34',86,75),(103,1,'2019-06-07 06:34:45','2019-06-07 06:34:45',86,75),(104,5,'2019-06-07 06:34:54','2019-06-07 06:34:54',86,75),(105,5,'2019-06-07 06:35:06','2019-06-07 06:35:06',86,75),(106,3,'2019-06-07 06:44:35','2019-06-07 06:44:35',86,75),(107,5,'2019-06-07 06:44:49','2019-06-07 06:44:49',86,75),(108,3,'2019-06-07 06:50:03','2019-06-07 06:50:03',86,75),(109,3,'2019-06-07 06:59:00','2019-06-07 06:59:00',86,75),(110,4,'2019-06-07 07:00:57','2019-06-07 07:00:57',86,75),(111,3,'2019-06-07 07:01:08','2019-06-07 07:01:08',86,75),(112,1,'2019-06-07 07:04:23','2019-06-07 07:04:23',86,75),(113,1,'2019-06-07 07:11:25','2019-06-07 07:11:25',86,75),(114,1,'2019-06-07 07:18:54','2019-06-07 07:18:54',86,75),(115,1,'2019-06-07 07:21:03','2019-06-07 07:21:03',86,75),(116,2,'2019-06-07 07:34:13','2019-06-07 07:34:13',86,75),(117,5,'2019-06-10 06:32:01','2019-06-10 06:32:01',90,76),(118,4,'2019-06-10 06:38:01','2019-06-10 06:38:01',90,76),(119,5,'2019-06-10 06:38:46','2019-06-10 06:38:46',90,76),(120,6,'2019-06-10 06:40:33','2019-06-10 06:40:33',90,76),(121,4,'2019-06-10 06:45:53','2019-06-10 06:45:53',90,76),(122,4,'2019-06-10 06:45:57','2019-06-10 06:45:57',90,76),(123,5,'2019-06-10 07:00:15','2019-06-10 07:00:15',90,76),(124,5,'2019-06-10 07:01:10','2019-06-10 07:01:10',90,76),(125,3,'2019-06-10 07:13:43','2019-06-10 07:13:43',90,76),(126,5,'2019-06-10 07:16:34','2019-06-10 07:16:34',90,76),(127,4,'2019-07-06 10:49:50','2019-07-06 10:49:50',92,75),(128,2,'2019-08-15 13:32:11','2019-08-15 13:32:11',94,79);
/*!40000 ALTER TABLE `post_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_reply`
--

DROP TABLE IF EXISTS `post_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hideComment` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `postPollOptionId` int(10) unsigned DEFAULT NULL,
  `quoteReplyId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  KEY `postPollOptionId` (`postPollOptionId`),
  KEY `quoteReplyId` (`quoteReplyId`),
  CONSTRAINT `post_reply_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_reply_ibfk_3` FOREIGN KEY (`postPollOptionId`) REFERENCES `post_poll_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_reply_ibfk_4` FOREIGN KEY (`quoteReplyId`) REFERENCES `post_reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_reply`
--

LOCK TABLES `post_reply` WRITE;
/*!40000 ALTER TABLE `post_reply` DISABLE KEYS */;
INSERT INTO `post_reply` VALUES (1,'HI',NULL,'2019-01-12 09:14:36','2019-01-12 09:14:36',NULL,1,NULL,NULL),(6,'Nice ',NULL,'2019-01-12 14:30:28','2019-01-12 14:30:28',NULL,5,NULL,NULL),(7,'Lool',NULL,'2019-01-13 06:54:50','2019-01-13 06:54:50',5,5,NULL,NULL),(8,'This sounds alot like me LMAO',NULL,'2019-01-19 08:39:05','2019-01-19 08:39:05',27,3,NULL,NULL),(10,'Welcome to Peersview lol',NULL,'2019-01-22 22:32:34','2019-01-22 22:32:34',31,17,NULL,NULL),(12,'sure',NULL,'2019-02-17 05:58:12','2019-02-17 05:58:12',49,48,NULL,NULL),(13,'oh',NULL,'2019-02-17 06:05:00','2019-02-17 06:05:00',51,48,NULL,NULL),(14,'Interesting.. When are we getting the next part?',NULL,'2019-03-07 21:20:17','2019-03-07 21:20:17',55,17,NULL,NULL),(15,'This is comment',NULL,'2019-07-06 10:50:48','2019-07-06 10:50:48',92,75,NULL,NULL),(16,'Good',NULL,'2019-08-14 17:55:43','2019-08-14 17:55:43',95,78,NULL,NULL),(17,'Very good',NULL,'2019-08-14 17:56:20','2019-08-14 17:56:20',95,78,NULL,NULL),(18,'Thank you',NULL,'2019-08-15 03:29:51','2019-08-15 03:29:51',95,79,NULL,NULL),(19,'Hi Nice to meet you',NULL,'2019-08-15 10:56:28','2019-08-15 10:56:28',95,79,NULL,NULL),(20,'Hi',NULL,'2019-08-15 10:59:19','2019-08-15 10:59:19',95,79,NULL,NULL),(21,'Hi',NULL,'2019-08-15 10:59:55','2019-08-15 10:59:55',95,79,NULL,NULL),(22,'Hello',NULL,'2019-08-15 11:20:24','2019-08-15 11:20:24',95,79,NULL,NULL),(23,'dsf',NULL,'2019-08-15 11:21:52','2019-08-15 11:21:52',95,79,NULL,NULL),(24,'HiHello',NULL,'2019-08-15 11:49:50','2019-08-15 11:49:50',95,79,NULL,NULL),(25,'Hello dfsdf',NULL,'2019-08-15 12:37:21','2019-08-15 12:37:21',95,79,NULL,NULL),(26,'fdsfsfasfdasfd',NULL,'2019-08-15 12:39:28','2019-08-15 12:39:28',95,79,NULL,NULL),(27,'sdfsdfsdfsdfdfsd',NULL,'2019-08-15 12:40:03','2019-08-15 12:40:03',95,79,NULL,NULL),(28,'sdfdfasdfdfasdf',NULL,'2019-08-15 12:43:26','2019-08-15 12:43:26',95,79,NULL,NULL),(29,'fsfgfsdfasdfasfsadf',NULL,'2019-08-15 12:48:00','2019-08-15 12:48:00',95,79,NULL,NULL),(30,'bvbcvbcvbffgffsafd',NULL,'2019-08-15 12:50:41','2019-08-15 12:50:41',95,79,NULL,NULL),(31,'How are you?',NULL,'2019-08-16 03:04:02','2019-08-16 03:04:02',94,79,NULL,NULL),(32,'Hello',NULL,'2019-08-16 03:11:50','2019-08-16 03:11:50',94,79,NULL,NULL),(33,'Hi',NULL,'2019-08-16 03:16:31','2019-08-16 03:16:31',94,79,NULL,NULL),(34,'Hellllllo',NULL,'2019-08-16 03:58:07','2019-08-16 03:58:07',94,79,NULL,NULL),(35,'hihihihi',NULL,'2019-08-16 04:00:23','2019-08-16 04:00:23',94,79,NULL,NULL);
/*!40000 ALTER TABLE `post_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_reply_like`
--

DROP TABLE IF EXISTS `post_reply_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_reply_like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postReplyId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postReplyId` (`postReplyId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_reply_like_ibfk_1` FOREIGN KEY (`postReplyId`) REFERENCES `post_reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_reply_like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_reply_like`
--

LOCK TABLES `post_reply_like` WRITE;
/*!40000 ALTER TABLE `post_reply_like` DISABLE KEYS */;
INSERT INTO `post_reply_like` VALUES (1,'2019-02-23 09:12:53','2019-02-23 09:12:53',13,48),(2,'2019-07-06 10:50:55','2019-07-06 10:50:55',15,75);
/*!40000 ALTER TABLE `post_reply_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_reply_rating`
--

DROP TABLE IF EXISTS `post_reply_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_reply_rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postReplyId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postReplyId` (`postReplyId`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_reply_rating_ibfk_1` FOREIGN KEY (`postReplyId`) REFERENCES `post_reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_reply_rating_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_reply_rating`
--

LOCK TABLES `post_reply_rating` WRITE;
/*!40000 ALTER TABLE `post_reply_rating` DISABLE KEYS */;
INSERT INTO `post_reply_rating` VALUES (1,5,'2019-02-23 09:12:53','2019-02-23 09:12:53',13,48),(2,4,'2019-07-06 10:50:53','2019-07-06 10:50:53',15,75),(3,5,'2019-08-14 17:56:28','2019-08-14 17:56:28',16,78);
/*!40000 ALTER TABLE `post_reply_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_report`
--

DROP TABLE IF EXISTS `post_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  `reportedBy` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `reportedBy` (`reportedBy`),
  CONSTRAINT `post_report_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `post_report_ibfk_2` FOREIGN KEY (`reportedBy`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_report`
--

LOCK TABLES `post_report` WRITE;
/*!40000 ALTER TABLE `post_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postv1`
--

DROP TABLE IF EXISTS `postv1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postv1` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8_unicode_ci,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `expiration` datetime DEFAULT NULL,
  `area` enum('home','campus','community') COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` enum('post','poll','career') COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  `communityId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `sharePostId` int(10) unsigned DEFAULT NULL,
  `postTo` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  KEY `communityId` (`communityId`),
  KEY `userId` (`userId`),
  KEY `sharePostId` (`sharePostId`),
  KEY `postTo` (`postTo`),
  CONSTRAINT `postv1_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postv1_ibfk_2` FOREIGN KEY (`communityId`) REFERENCES `community` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postv1_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postv1_ibfk_4` FOREIGN KEY (`sharePostId`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postv1_ibfk_5` FOREIGN KEY (`postTo`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=598 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postv1`
--

LOCK TABLES `postv1` WRITE;
/*!40000 ALTER TABLE `postv1` DISABLE KEYS */;
INSERT INTO `postv1` VALUES (5,'What is Abbeynomics? I am curious about it.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-12 10:42:11','2019-01-12 10:42:11',17,NULL,3,NULL,NULL),(6,'What is Accounting and finance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-14 15:02:08','2019-01-14 15:02:08',1,NULL,9,NULL,NULL),(7,'What are some project ideas relating to \nAccounting of Future and Option?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:33:44','2019-01-15 17:33:44',1,NULL,3,NULL,NULL),(8,'What do you find challenging about Managerial Accounting?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:34:02','2019-01-15 17:34:02',1,NULL,3,NULL,NULL),(9,'What is the difference between CPA and a Bachelor Degree in Accounting? With which qualification would I earn more in an accounting firm?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:34:25','2019-01-15 17:34:25',1,NULL,3,NULL,NULL),(10,'What side are you on Stock Dividend vs Stock Split?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:34:42','2019-01-15 17:34:42',1,NULL,3,NULL,NULL),(11,'What textbooks would you suggest forAuditing,Governance and Risk Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:35:00','2019-01-15 17:35:00',1,NULL,3,NULL,NULL),(12,'Who can recommend Article/papers on Macroeconomic Principles?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:35:15','2019-01-15 17:35:15',1,NULL,3,NULL,NULL),(13,'Should IFRS be used in the US?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:35:33','2019-01-15 17:35:33',1,NULL,3,NULL,NULL),(14,'Who is for or against Direct vs Indirect methods of reporting cashflow from operating activities?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:35:58','2019-01-15 17:35:58',1,NULL,3,NULL,NULL),(15,'Can you suggest me some books/articles about IFRS VS GAAP?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:36:10','2019-01-15 17:36:10',1,NULL,3,NULL,NULL),(16,'Is investing in CPA worth it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:36:53','2019-01-15 17:36:53',1,NULL,3,NULL,NULL),(17,'Is pursuing a PhD in Agricultural Economics worth it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:37:52','2019-01-15 17:37:52',2,NULL,3,NULL,NULL),(18,'Is Biofuel currently a sustainable energy solution?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:38:29','2019-01-15 17:38:29',2,NULL,3,NULL,NULL),(19,'What can I do after Bsc Agriculture?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:38:58','2019-01-15 17:38:58',2,NULL,3,NULL,NULL),(20,'What are some interesting areas within Agriculture that I could do undergraduate honors thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:39:49','2019-01-15 17:39:49',2,NULL,3,NULL,NULL),(21,'What are the biggest problems in Agriculture?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:40:19','2019-01-15 17:40:19',2,NULL,3,NULL,NULL),(22,'I need a simple but effective book on Animal Nutrition and Biotechnology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:40:54','2019-01-15 17:40:54',2,NULL,3,NULL,NULL),(23,'What universities are the best for Post graduate degrees in agriculture in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:41:28','2019-01-15 17:41:28',2,NULL,3,NULL,NULL),(24,'What textbooks would you recommend forManaging Soils in Agricultural Systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:42:12','2019-01-15 17:42:12',2,NULL,3,NULL,NULL),(25,'How do I study for exams inApplied Animal Nutrition,are there techniques I could use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:42:41','2019-01-15 17:42:41',2,NULL,3,NULL,NULL),(26,'What are some project ideas related to \nCrops and environmental protection?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:43:09','2019-01-15 17:43:09',2,NULL,3,NULL,NULL),(27,'What is the best way to learn Human anatomy and Physiology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:45:10','2019-01-15 17:45:10',3,NULL,3,NULL,NULL),(28,'Is the shape of the skull important for brain size?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:45:39','2019-01-15 17:45:39',3,NULL,3,NULL,NULL),(29,'What are the strongest creatures relative to their weight?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:46:20','2019-01-15 17:46:20',3,NULL,3,NULL,NULL),(30,'What is the structure of simple Columnar Epithelium? What purpose does it serve?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:46:53','2019-01-15 17:46:53',3,NULL,3,NULL,NULL),(31,'My cousin is considering a degree in Anatomy, What types of jobs can he get with a Bachelor of Science in Anatomy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:47:22','2019-01-15 17:47:22',3,NULL,3,NULL,NULL),(32,'Who can recommend Article/papers Human Anatomy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:47:53','2019-01-15 17:47:53',3,NULL,3,NULL,NULL),(33,'What are some project ideas relating to \nBiological Anthropology of the Human Skeleton?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:48:22','2019-01-15 17:48:22',3,NULL,3,NULL,NULL),(34,'What textbooks would you recommend forExcitable Cells?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:48:50','2019-01-15 17:48:50',3,NULL,3,NULL,NULL),(36,'How do I study for an exam in Advanced Immunology, are there techniques I could use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:50:20','2019-01-15 17:50:20',3,NULL,3,NULL,NULL),(37,'Why do arteries contain more elastic tissue and less smooth muscle, while arterioles contain less elastic tissue and more smooth muscle?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:50:53','2019-01-15 17:50:53',3,NULL,3,NULL,NULL),(38,'What interesting areas within Anthropology could i do my undergraduate thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:53:31','2019-01-15 17:53:31',4,NULL,3,NULL,NULL),(39,'Why did you decide to study Anthropology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:54:04','2019-01-15 17:54:04',4,NULL,3,NULL,NULL),(40,'Who can recommend Article/papers on Biology and Human Identity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:54:33','2019-01-15 17:54:33',4,NULL,3,NULL,NULL),(41,'What is the job market like for Anthropology graduates in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:55:09','2019-01-15 17:55:09',4,NULL,3,NULL,NULL),(42,' What are some tips and hacks for making a degree in anthropology useful?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:55:52','2019-01-15 17:55:52',4,NULL,3,NULL,NULL),(43,'What are common required and elective courses in anthropology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:56:23','2019-01-15 17:56:23',4,NULL,3,NULL,NULL),(44,'Any tips on how to get through Advanced Social Anthropology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:56:52','2019-01-15 17:56:52',4,NULL,3,NULL,NULL),(45,'What textbooks would you recommend for Paleoanthropology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:57:22','2019-01-15 17:57:22',4,NULL,3,NULL,NULL),(46,'How do I study for an exam in Human Osteology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:57:53','2019-01-15 17:57:53',4,NULL,3,NULL,NULL),(47,' My cousin is considering a degree in Anthropology, What career options would he get with a Bachelor of Science in Anthropology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:58:21','2019-01-15 17:58:21',4,NULL,3,NULL,NULL),(48,'What are top books every Architecture student must read?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:59:26','2019-01-15 17:59:26',5,NULL,3,NULL,NULL),(49,'What are some interesting areas within Architecture that I could do my undergraduate honors thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 17:59:57','2019-01-15 17:59:57',5,NULL,3,NULL,NULL),(50,'I’m i the only one feeling that I\'m not learning much Architecture in university?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:00:26','2019-01-15 18:00:26',5,NULL,3,NULL,NULL),(51,'Who can recommend some good home & interior design softwares?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:00:56','2019-01-15 18:00:56',5,NULL,3,NULL,NULL),(52,'What is the process involved in designing a building or a structure (from empty plot to preparation of drawings)?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:01:47','2019-01-15 18:01:47',5,NULL,3,NULL,NULL),(53,'What\'s the influence of building envelopes on the result of Green building rating systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:02:21','2019-01-15 18:02:21',5,NULL,3,NULL,NULL),(54,'What should be design approach for architecture student?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:02:59','2019-01-15 18:02:59',5,NULL,3,NULL,NULL),(55,'What are the most controversial issues in the field of architecture?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:04:10','2019-01-15 18:04:10',5,NULL,3,NULL,NULL),(56,'Can someone suggest some good Architecture portfolios? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:04:59','2019-01-15 18:04:59',5,NULL,3,NULL,NULL),(57,'What got you interested in studying Architecture?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:06:19','2019-01-15 18:06:19',5,NULL,3,NULL,NULL),(58,'What is the scientific evidence that the Earth went out of its orbit during Varaha Avatar?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:07:35','2019-01-15 18:07:35',6,NULL,3,NULL,NULL),(59,'What interesting areas within Astronomy could I do my undergraduate thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:08:37','2019-01-15 18:08:37',6,NULL,3,NULL,NULL),(60,'What is your view of Astrobiology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:09:29','2019-01-15 18:09:29',6,NULL,3,NULL,NULL),(61,'How has Astronomy changed over the past 10 years?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:10:09','2019-01-15 18:10:09',6,NULL,3,NULL,NULL),(62,'What are the key similarities between a lunar and a solar ecplise?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:10:37','2019-01-15 18:10:37',6,NULL,3,NULL,NULL),(63,'My cousin is considering a degree in Astronomy, What career options can he get with a Bachelor of Science in Astronomy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:11:05','2019-01-15 18:11:05',6,NULL,3,NULL,NULL),(64,'What do you find challenging about Studying Astronomy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:12:13','2019-01-15 18:12:13',6,NULL,3,NULL,NULL),(65,'Where does space begin?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:12:40','2019-01-15 18:12:40',6,NULL,3,NULL,NULL),(66,'How Did the First Quasars Form?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:14:14','2019-01-15 18:14:14',6,NULL,3,NULL,NULL),(67,'How are gravitational waves detected?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:14:42','2019-01-15 18:14:42',6,NULL,3,NULL,NULL),(68,'After a Bachelors degree in Biology, would you recommend obtaining a PhD or Masters?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:15:50','2019-01-15 18:15:50',7,NULL,3,NULL,NULL),(69,'Genetic engineering of food crops: Should it be encouraged?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:16:30','2019-01-15 18:16:30',7,NULL,3,NULL,NULL),(70,'Does Trypsin cause a change in cell morphology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:17:17','2019-01-15 18:17:17',7,NULL,3,NULL,NULL),(71,'What did you find challenging about \nOrganismal Biology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:18:23','2019-01-15 18:18:23',7,NULL,3,NULL,NULL),(72,'What are some interesting areas within Biology that I could do my undergraduate honors thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:20:31','2019-01-15 18:20:31',7,NULL,3,NULL,NULL),(73,'What are some project ideas relating to \nCell Biology & Genetics?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:20:55','2019-01-15 18:20:55',7,NULL,3,NULL,NULL),(74,'What is the function of cystine, cysteine, and cysteine protease?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:21:15','2019-01-15 18:21:15',7,NULL,3,NULL,NULL),(75,'How can I search for and find specific biology topics in scientific journals?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:23:33','2019-01-15 18:23:33',7,NULL,3,NULL,NULL),(76,'Can someone suggest me some books/articles about the \nControl of neural systems?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:27:20','2019-01-15 18:27:20',7,NULL,3,NULL,NULL),(77,'Does genetically engineered bacteria divide and reproduce themselves in the same way the natural ones do?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:27:54','2019-01-15 18:27:54',7,NULL,3,NULL,NULL),(78,'What does Bio accumulation factor means?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:36:11','2019-01-15 18:36:11',9,NULL,3,NULL,NULL),(79,'Does Anyone have exam experience in Corporate Finance, Any tips on how to prepare for it? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:40:58','2019-01-15 18:40:58',8,NULL,3,NULL,NULL),(80,'David McLelland\'s motivational theory identified three principal motivational needs which he said each of us possesses to varying degrees, and which characterize our motivational behavior; what are these three motivational needs?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:42:01','2019-01-15 18:42:01',8,NULL,3,NULL,NULL),(81,'How do you analyze and improve a business process? What are the different ways to do so?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:42:34','2019-01-15 18:42:34',8,NULL,3,NULL,NULL),(82,'What got you interested in studying\nBusiness?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:45:43','2019-01-15 18:45:43',8,NULL,3,NULL,NULL),(83,'I need a good textbook on Strategic Management, any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:49:37','2019-01-15 18:49:37',8,NULL,3,NULL,NULL),(84,'What are some project ideas relating to Organizational behavior?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:49:58','2019-01-15 18:49:58',8,NULL,3,NULL,NULL),(85,'What are some easy thesis topics in Business Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:50:36','2019-01-15 18:50:36',8,NULL,3,NULL,NULL),(86,'Found a link on best the paying jobs for Business graduates:\nBest Jobs For Business Majors | PayScale\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:51:01','2019-01-15 18:51:01',8,NULL,3,NULL,NULL),(87,'What are the best International Business journals?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:51:22','2019-01-15 18:51:22',8,NULL,3,NULL,NULL),(88,'What would be your advice for an undergraduate fresher of Business management major?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:51:39','2019-01-15 18:51:39',8,NULL,3,NULL,NULL),(89,'What are some interesting areas relating to International Business thati can use as the basis for my undergrad thesis?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:51:58','2019-01-15 18:51:58',8,NULL,3,NULL,NULL),(90,'I need a text in “Organic Synthesis”, any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:52:39','2019-01-15 18:52:39',9,NULL,3,NULL,NULL),(91,'Does a positive electron affinity actually correspond to the release of energy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:54:08','2019-01-15 18:54:08',9,NULL,3,NULL,NULL),(92,'What top universities can my sister get into to study Bsc in Chemistry with a 70% average in high school?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:54:45','2019-01-15 18:54:45',9,NULL,3,NULL,NULL),(93,'What on Earth is not Chemistry?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:55:15','2019-01-15 18:55:15',9,NULL,3,NULL,NULL),(94,'What got you interested in studying Chemistry?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:55:44','2019-01-15 18:55:44',9,NULL,3,NULL,NULL),(95,'Is Chemistry Environment’s’ worst enemy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:56:11','2019-01-15 18:56:11',9,NULL,3,NULL,NULL),(96,'How can I search for and find specific Chemistry topics in scientific journals?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:56:40','2019-01-15 18:56:40',9,NULL,3,NULL,NULL),(97,'Can someone suggest me some books/articles about ageing in humans.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:57:09','2019-01-15 18:57:09',9,NULL,3,NULL,NULL),(98,'The symbol Sb stands for stibnum or stibnite. What is the modern name of this element?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:57:37','2019-01-15 18:57:37',9,NULL,3,NULL,NULL),(99,'How much salt (NaCl) is in the average adult human body?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:58:06','2019-01-15 18:58:06',9,NULL,3,NULL,NULL),(100,'What are some easy topics relating to Inorganic Chemistry I can use as the basis for my undergrad thesis?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 18:58:51','2019-01-15 18:58:51',9,NULL,3,NULL,NULL),(101,'Were politicians in the late republic only successful when they had support of the society?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:00:05','2019-01-15 19:00:05',10,NULL,3,NULL,NULL),(102,'How much did Augustus depend on individuals to rule Rome?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:00:16','2019-01-15 19:00:16',10,NULL,3,NULL,NULL),(103,' Do you think the behaviors of Caligula can be replicated in the 21st century?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:00:32','2019-01-15 19:00:32',10,NULL,3,NULL,NULL),(104,'Who is the Augustus of the 21st century?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:00:52','2019-01-15 19:00:52',10,NULL,3,NULL,NULL),(105,'How well has studying Classics & Ancient History improved your  skills of Analysis and Writing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:01:40','2019-01-15 19:01:40',10,NULL,3,NULL,NULL),(106,'What are your favorite societal practices and values from the ancient Rome?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:02:12','2019-01-15 19:02:12',10,NULL,3,NULL,NULL),(107,'How much of a hero was Caratacus, in the resistance of the Roman invasion of Britain?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:02:39','2019-01-15 19:02:39',10,NULL,3,NULL,NULL),(108,'Who can recommend a good book on the Roman Emperors?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:02:58','2019-01-15 19:02:58',10,NULL,3,NULL,NULL),(109,'How can I search for and find specific Classics topics in scientific journals?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:03:15','2019-01-15 19:03:15',10,NULL,3,NULL,NULL),(110,'Why was Odysseus considered a good leader in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:03:34','2019-01-15 19:03:34',10,NULL,3,NULL,NULL),(111,'What are the main differences between Titans and Olympians in terms of power? How could Olympians become mortals and titans can’t?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:04:16','2019-01-15 19:04:16',10,NULL,3,NULL,NULL),(112,'Any tips on how to get through this Course?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:05:45','2019-01-15 19:05:45',11,NULL,3,NULL,NULL),(113,'How good is Vancouver film school for animation and visual effects?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:07:26','2019-01-15 19:07:26',11,NULL,3,NULL,NULL),(114,'I am curious to know What news networks you guys think are the most biased, in your opinions? And why?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:07:54','2019-01-15 19:07:54',11,NULL,3,NULL,NULL),(115,'How can we address bias in the media?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:08:21','2019-01-15 19:08:21',11,NULL,3,NULL,NULL),(116,'Who can recommend a good screenwriting workshop in Canada? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:08:51','2019-01-15 19:08:51',11,NULL,3,NULL,NULL),(117,'Where are the best schools for studying film and why?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:09:20','2019-01-15 19:09:20',11,NULL,3,NULL,NULL),(118,'Are there some good certificate programs in film making for students who already hold a BA in another major?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:10:00','2019-01-15 19:10:00',11,NULL,3,NULL,NULL),(119,'What are the advantages and disadvantages of going to Film School?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:10:28','2019-01-15 19:10:28',11,NULL,3,NULL,NULL),(120,'What are the main classes a communication studies major would take?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:10:55','2019-01-15 19:10:55',11,NULL,3,NULL,NULL),(121,'Why do we study science in Communication Studies?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:11:26','2019-01-15 19:11:26',11,NULL,3,NULL,NULL),(122,'How do I begin learning artificial intelligence(AI) from zero/ground level?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:13:41','2019-01-15 19:13:41',12,NULL,3,NULL,NULL),(123,'Suitable choice for moderate-size square matrix multiplication?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:14:24','2019-01-15 19:14:24',12,NULL,3,NULL,NULL),(124,'Can someone recommend the best beginner’s book on artificial intelligence or machine learning?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:14:54','2019-01-15 19:14:54',12,NULL,3,NULL,NULL),(125,'What is the difference between Computer Science and Computer Engineering at universities and the jobs after university?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:15:32','2019-01-15 19:15:32',12,NULL,3,NULL,NULL),(126,'Is there a formalization of the computational model for quantum computers?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:16:01','2019-01-15 19:16:01',12,NULL,3,NULL,NULL),(127,'Why don\'t imperative languages like C or Go support Haskell-like parametric polymorphism?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:16:31','2019-01-15 19:16:31',12,NULL,3,NULL,NULL),(128,'Any tips on how to get through Concurrent programming?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:17:00','2019-01-15 19:17:00',12,NULL,3,NULL,NULL),(129,'What is the easiest way to prepare and pass the CISA (Certified Information Systems Auditor) exam?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:17:36','2019-01-15 19:17:36',12,NULL,3,NULL,NULL),(130,'I need a simple but effective book on  UNIX Operating Systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:18:06','2019-01-15 19:18:06',12,NULL,3,NULL,NULL),(131,'What would you say is an artistic outlook on life?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:19:18','2019-01-15 19:19:18',13,NULL,3,NULL,NULL),(132,'What made you first realize you wanted to pursue a career in the Arts?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:19:58','2019-01-15 19:19:58',13,NULL,3,NULL,NULL),(133,'What memorable responses have you had to your work?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:24:50','2019-01-15 19:24:50',13,NULL,3,NULL,NULL),(134,'Whose work do you relate to most? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:25:35','2019-01-15 19:25:35',13,NULL,3,NULL,NULL),(135,'Who inspires you?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:27:53','2019-01-15 19:27:53',13,NULL,3,NULL,NULL),(136,'If you were to combine any two animals, what would it be?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:28:39','2019-01-15 19:28:39',13,NULL,3,NULL,NULL),(137,'How do I study for an exams in Creative Thinking?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:30:07','2019-01-15 19:30:07',13,NULL,3,NULL,NULL),(138,'What would be your advice for an undergraduate fresher of Creative Arts major?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:31:42','2019-01-15 19:31:42',13,NULL,3,NULL,NULL),(139,'Any tips on how to get through this Course?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:36:50','2019-01-15 19:36:50',13,NULL,3,NULL,NULL),(140,'Are there any dentists at all who do not use x-rays? Are there any alternatives that dentists can realistically use, like thermography or ultrasounds?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:37:48','2019-01-15 19:37:48',14,NULL,3,NULL,NULL),(141,'What can I do after my degree in Dental Surgery?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:39:04','2019-01-15 19:39:04',14,NULL,3,NULL,NULL),(142,'Any tips on how to get through this Course?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:39:25','2019-01-15 19:39:25',14,NULL,3,NULL,NULL),(143,'How do I study for exams in Oral Microbiology and Immunology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:41:37','2019-01-15 19:41:37',14,NULL,3,NULL,NULL),(144,'What advantage does Biomimetic Dentistry have over regular dentistry techniques?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:43:54','2019-01-15 19:43:54',14,NULL,3,NULL,NULL),(145,'Are you happy with your decision to study dentistry? And why?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:45:49','2019-01-15 19:45:49',14,NULL,3,NULL,NULL),(146,'What would be your advice for an undergraduate fresher in Dentistry major?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:46:30','2019-01-15 19:46:30',14,NULL,3,NULL,NULL),(147,'My younger brother is interested in studying Dentistry \nWhere can he find the dentistry degree rankings?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:48:52','2019-01-15 19:48:52',14,NULL,3,NULL,NULL),(148,'What are some interesting project ideas relating to Orofacial Biology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:49:21','2019-01-15 19:49:21',14,NULL,3,NULL,NULL),(149,'What are the causes and effects of Urbanization?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:50:41','2019-01-15 19:50:41',15,NULL,3,NULL,NULL),(150,'Where can I get books or articles on “Concept of participation”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:51:31','2019-01-15 19:51:31',15,NULL,3,NULL,NULL),(151,'What are some project ideas relating to Modernization?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:52:00','2019-01-15 19:52:00',15,NULL,3,NULL,NULL),(152,'What got you interested in\nStudying Development Studies?\n\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:52:32','2019-01-15 19:52:32',15,NULL,3,NULL,NULL),(153,'What are the Different approaches to “Development economics”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:52:59','2019-01-15 19:52:59',15,NULL,3,NULL,NULL),(154,'What are the roles of the Bureaucracy and Judiciary?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:53:37','2019-01-15 19:53:37',15,NULL,3,NULL,NULL),(155,'Are societal institutions such as NGOs and social groups efficient in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:54:08','2019-01-15 19:54:08',15,NULL,3,NULL,NULL),(156,'What textbooks you recommend on“The relationship between citizens, the state and the market in ‘the urban’, delving into the consequences and disparate politics of the ‘slum”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:54:37','2019-01-15 19:54:37',15,NULL,3,NULL,NULL),(157,'Ideas on Good papers relating to “The international economy, globalisation and developing countries”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:55:08','2019-01-15 19:55:08',15,NULL,3,NULL,NULL),(158,'I need some research papers on “Theories of growth, structural change, and technical progress”. Who can help?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:55:36','2019-01-15 19:55:36',15,NULL,3,NULL,NULL),(159,'In what circumstance does Strict Liability apply?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:56:17','2019-01-15 19:56:17',34,NULL,3,NULL,NULL),(160,'What do you guys think about the idea of legal personality, and the legal status of a deadman?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:56:47','2019-01-15 19:56:47',34,NULL,3,NULL,NULL),(161,'Can someone help distinguish between a company limited by shares and a company limited by guarantee?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:57:51','2019-01-15 19:57:51',34,NULL,3,NULL,NULL),(162,'What is the right of pre-emption on the allotment of shares?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:58:13','2019-01-15 19:58:13',34,NULL,3,NULL,NULL),(163,'Does Anyone have exams experience in Conflict Resolution, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:59:01','2019-01-15 19:59:01',34,NULL,3,NULL,NULL),(164,'I need a simple but effective book on Criminal Law?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:59:23','2019-01-15 19:59:23',34,NULL,3,NULL,NULL),(165,'What books would you recommend for Criminology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 19:59:50','2019-01-15 19:59:50',34,NULL,3,NULL,NULL),(166,'Why did you decide to study Law?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:00:09','2019-01-15 20:00:09',34,NULL,3,NULL,NULL),(167,'Any tips on how to get through Business Law?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:00:29','2019-01-15 20:00:29',34,NULL,3,NULL,NULL),(168,'The proliferation of international courts and tribunalsare often considered to be interrelated. How are these two related to each other?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:01:21','2019-01-15 20:01:21',34,NULL,3,NULL,NULL),(169,'Nuclear energy: A solution to green house gasses?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:06:12','2019-01-15 20:06:12',16,NULL,3,NULL,NULL),(170,'Why did you decide to study Geology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:06:40','2019-01-15 20:06:40',16,NULL,3,NULL,NULL),(171,'What major and minor elements (or the lack of) characterize different rock types? (e.g. clays, sandstones, ultramafics, mafics, intermediates, felsics, various metamorphics, etc.)',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:07:06','2019-01-15 20:07:06',16,NULL,3,NULL,NULL),(172,'How do I prepare for exams in Igneous Petrology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:07:51','2019-01-15 20:07:51',16,NULL,3,NULL,NULL),(173,'Does Anyone suggest any hacks I can use in preparing for an exam Metamorphic Petrology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:08:19','2019-01-15 20:08:19',16,NULL,3,NULL,NULL),(174,'What textbooks would you recommend for Structural Geology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:08:48','2019-01-15 20:08:48',16,NULL,3,NULL,NULL),(175,'What textbooks would you recommend for Hydrogeology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:09:55','2019-01-15 20:09:55',16,NULL,3,NULL,NULL),(176,'I am struggling with my Environment and Land Resources course, what can I do?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:10:22','2019-01-15 20:10:22',16,NULL,3,NULL,NULL),(177,'I am struggling with my Environment and Land Resources course, what can I do?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:10:55','2019-01-15 20:10:55',16,NULL,3,NULL,NULL),(178,'Any tips on how to get through Biogeochemistry?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:11:30','2019-01-15 20:11:30',16,NULL,3,NULL,NULL),(179,'What does \'Fictional capital\' mean?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:14:36','2019-01-15 20:14:36',17,NULL,3,NULL,NULL),(180,'Does Anyone have exams experience in Macroeconomic Principles; how did you prepare for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:15:56','2019-01-15 20:15:56',17,NULL,3,NULL,NULL),(181,'What are some interesting areas in “Micro-economics” I can use as the basis for my undergrad thesis?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:16:35','2019-01-15 20:16:35',17,NULL,3,NULL,NULL),(182,'What textbooks would you recommend for Principles of Econometrics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:17:04','2019-01-15 20:17:04',17,NULL,3,NULL,NULL),(183,'What challenges do countries with GDPs dominated by exports face?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:17:31','2019-01-15 20:17:31',17,NULL,3,NULL,NULL),(184,'Why are some economists against a target of Zero inflation?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:18:02','2019-01-15 20:18:02',17,NULL,3,NULL,NULL),(185,'What role should the LafferCurve play in deliberations on Tax policy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:18:34','2019-01-15 20:18:34',17,NULL,3,NULL,NULL),(186,'What are the aspects of Micro economics and Macroeconomics have you found most difficult to learn or understand?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:19:16','2019-01-15 20:19:16',17,NULL,3,NULL,NULL),(187,'Who knows about any internships relating too Stockbroking I could apply for?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:19:49','2019-01-15 20:19:49',17,NULL,3,NULL,NULL),(188,'How do I prepare for an exam in Leading & Managing Education?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:21:08','2019-01-15 20:21:08',18,NULL,3,NULL,NULL),(189,'Are you happy with your decision to study Education? And why?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:21:37','2019-01-15 20:21:37',18,NULL,3,NULL,NULL),(190,'What textbooks would you recommend for Internationalization and Education?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:21:52','2019-01-15 20:21:52',18,NULL,3,NULL,NULL),(191,'In your opinion What are major Current Issues in teaching and learning in schools, colleges and higher education?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:22:09','2019-01-15 20:22:09',18,NULL,3,NULL,NULL),(192,'Any tips on how to get through “Curriculum design, implementation, assessment and evaluation”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:22:32','2019-01-15 20:22:32',18,NULL,3,NULL,NULL),(193,'What do you find challenging about Studying Education?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:25:03','2019-01-15 20:25:03',18,NULL,3,NULL,NULL),(194,'What are some interesting areas within Education that I could base my undergraduate thesis on?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:25:23','2019-01-15 20:25:23',18,NULL,3,NULL,NULL),(195,'Where can I find books or articles on Learning styles, group development and special educational needs?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:25:49','2019-01-15 20:25:49',18,NULL,3,NULL,NULL),(196,'Who knows about any Teaching internships that I could apply for?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:26:22','2019-01-15 20:26:22',18,NULL,3,NULL,NULL),(197,'Any good project ideas relating to Stress analysis?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:27:23','2019-01-15 20:27:23',19,NULL,3,NULL,NULL),(198,'Does Anyone have exams experience in “Design and Computer Aided Engineering”,what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:27:46','2019-01-15 20:27:46',19,NULL,3,NULL,NULL),(199,'Fellow Peers, How do I study for an exam in Aerodynamics? I need some help!!!',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:29:15','2019-01-15 20:29:15',19,NULL,3,NULL,NULL),(200,'What textbooks would you recommend for Thermodynamics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:29:55','2019-01-15 20:29:55',19,NULL,3,NULL,NULL),(201,'Who knows about any internships relating to Aeronautical Engineering that I could apply for?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:31:24','2019-01-15 20:31:24',19,NULL,3,NULL,NULL),(202,'Any tips on how to get through Dynamics and control?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:31:52','2019-01-15 20:31:52',19,NULL,3,NULL,NULL),(203,'So far What do you find challenging about Studying Aeronautical-Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:32:21','2019-01-15 20:32:21',19,NULL,3,NULL,NULL),(204,'Pointers on Papers relating to Maintenance requirements of Aircraft systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:32:49','2019-01-15 20:32:49',19,NULL,3,NULL,NULL),(205,'How do Thrust reversers work?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:33:27','2019-01-15 20:33:27',19,NULL,3,NULL,NULL),(206,'What would you recommend for a thesis depending upon the Aerospace industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:33:56','2019-01-15 20:33:56',19,NULL,3,NULL,NULL),(207,'Any tips on how I could prepare for exams in“Hydraulics”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:35:52','2019-01-15 20:35:52',20,NULL,3,NULL,NULL),(208,'I need a simple but effective book on Sustainability & Built Environment, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:36:47','2019-01-15 20:36:47',20,NULL,3,NULL,NULL),(209,'What got you interested in Civil Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:37:05','2019-01-15 20:37:05',20,NULL,3,NULL,NULL),(210,'What textbooks would you recommend for Geotechnics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:37:27','2019-01-15 20:37:27',20,NULL,3,NULL,NULL),(211,'So far are you happy with your decision to study Civil Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:38:15','2019-01-15 20:38:15',20,NULL,3,NULL,NULL),(212,'Who knows about any paid internships in the field of civil engineering I can apply for?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:39:33','2019-01-15 20:39:33',20,NULL,3,NULL,NULL),(213,'Could someone tell me more about Modelling & Simulation?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:39:46','2019-01-15 20:39:46',20,NULL,3,NULL,NULL),(214,'What freelance work can civil engineering students do?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:40:10','2019-01-15 20:40:10',20,NULL,3,NULL,NULL),(215,'Is it prerequisite to learn finite element methods before taking a pre-stress concrete course?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:40:31','2019-01-15 20:40:31',20,NULL,3,NULL,NULL),(216,'What would you recommend for the thesis depending upon the construction industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:40:48','2019-01-15 20:40:48',20,NULL,3,NULL,NULL),(217,': How do I prepare for an exam Information Systems Modeling?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 20:41:41','2019-01-15 20:41:41',21,NULL,3,NULL,NULL),(218,'I need a simple but effective bookfor Object Oriented Programming with Java, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:10:50','2019-01-15 22:10:50',21,NULL,3,NULL,NULL),(219,'Why did you decide to study Computer engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:11:33','2019-01-15 22:11:33',21,NULL,3,NULL,NULL),(221,'So far are you happy with your decision to studySoftware Engineering? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:12:17','2019-01-15 22:12:17',21,NULL,3,NULL,NULL),(223,'What are some project ideas relating to Network Software Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:13:27','2019-01-15 22:13:27',21,NULL,3,NULL,NULL),(224,'Who knows about any paid internships in the field of Networking I can apply for?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:14:22','2019-01-15 22:14:22',21,NULL,3,NULL,NULL),(225,'What if I am not developing an interest in engineering? I am a second year computer engineering student. What can I do?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:15:41','2019-01-15 22:15:41',21,NULL,3,NULL,NULL),(226,'What would you recommend for the thesis depending upon the Machine learning industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:16:16','2019-01-15 22:16:16',21,NULL,3,NULL,NULL),(227,'Who do you think manufactures the best supercomputers?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:16:37','2019-01-15 22:16:37',21,NULL,3,NULL,NULL),(228,'How do I prepare for exams in Analogue Electronics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:17:44','2019-01-15 22:17:44',22,NULL,3,NULL,NULL),(229,'I need a simple but effective book on Electrical Principles, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:18:07','2019-01-15 22:18:07',22,NULL,3,NULL,NULL),(230,'Why did you decide to study Electrical Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:18:24','2019-01-15 22:18:24',22,NULL,3,NULL,NULL),(231,'What textbooks would you recommend for Engineering Mathematics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:18:50','2019-01-15 22:18:50',22,NULL,3,NULL,NULL),(232,'What textbooks would you recommend for \nElectrical Principles?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:19:14','2019-01-15 22:19:14',22,NULL,3,NULL,NULL),(233,'Could someone tell me more about Classical Control?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:19:33','2019-01-15 22:19:33',22,NULL,3,NULL,NULL),(234,'What is connection and differences between VLSI design and embedded systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:19:48','2019-01-15 22:19:48',22,NULL,3,NULL,NULL),(235,'What would you recommend for the thesis depending upon the Electronics industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:20:04','2019-01-15 22:20:04',22,NULL,3,NULL,NULL),(236,'What makes Digital signal processing so difficult?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:20:19','2019-01-15 22:20:19',22,NULL,3,NULL,NULL),(237,'So far are you happy with your decision to study Electrical Engineering.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:20:36','2019-01-15 22:20:36',22,NULL,3,NULL,NULL),(238,'How do I prepare for an exam in Environmental engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:21:36','2019-01-15 22:21:36',23,NULL,3,NULL,NULL),(239,'Does Anyone have experience exams for Fluid Mechanics,what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:21:51','2019-01-15 22:21:51',23,NULL,3,NULL,NULL),(240,'Why did you decide to study Mining Engineering? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:22:07','2019-01-15 22:22:07',23,NULL,3,NULL,NULL),(241,'Which crusher is better to crush calcite?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:22:25','2019-01-15 22:22:25',23,NULL,3,NULL,NULL),(242,' A Mining Career Australia or South Africa? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:22:43','2019-01-15 22:22:43',23,NULL,3,NULL,NULL),(243,' Could someone tell me more about Mechanics of Materials?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:23:00','2019-01-15 22:23:00',23,NULL,3,NULL,NULL),(244,'Can someone explain what limonite is in a simple way?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:23:15','2019-01-15 22:23:15',23,NULL,3,NULL,NULL),(245,'What textbooks would you recommend for Mineral Deposit Modeling?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:23:34','2019-01-15 22:23:34',23,NULL,3,NULL,NULL),(246,'What would you recommend for the thesis depending upon the Underground Metal Mining industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:23:48','2019-01-15 22:23:48',23,NULL,3,NULL,NULL),(247,'So far are you happy with your decision to study Mining Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:24:06','2019-01-15 22:24:06',23,NULL,3,NULL,NULL),(248,'What would you recommend for the thesis depending upon the Chemical industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:24:42','2019-01-15 22:24:42',24,NULL,3,NULL,NULL),(249,'I need a simple but effective book on Process Optimisation and Control, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:25:01','2019-01-15 22:25:01',24,NULL,3,NULL,NULL),(250,'What textbooks would you recommend for\nSeparation Processes?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:25:15','2019-01-15 22:25:15',24,NULL,3,NULL,NULL),(251,'When an electrophile and neutrophile meet, how do we know if they will undergo nucleophillic or electrophillic reactions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:25:32','2019-01-15 22:25:32',24,NULL,3,NULL,NULL),(252,'What are some interesting areas within Organic Chemistry that I could do my undergraduate thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:25:58','2019-01-15 22:25:58',24,NULL,3,NULL,NULL),(253,'What got you interested in Chemical engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:26:22','2019-01-15 22:26:22',24,NULL,3,NULL,NULL),(254,'How do I study for exams in Fluid Mechanics, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:26:44','2019-01-15 22:26:44',24,NULL,3,NULL,NULL),(255,'Any tips on how to get through Chemical Kinetics and Reactor Design?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:27:03','2019-01-15 22:27:03',24,NULL,3,NULL,NULL),(257,'What is the fundamental difference between studying Chemistry and Chemical Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:28:35','2019-01-15 22:28:35',24,NULL,3,NULL,NULL),(258,'So far are you happy with your decision to study Chemical Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:30:54','2019-01-15 22:30:54',24,NULL,3,NULL,NULL),(259,'What would you recommend for the thesis depending upon the Auto mobile industry requirements?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:32:49','2019-01-15 22:32:49',25,NULL,3,NULL,NULL),(260,'I need a simple but effective book on Solid Mechanics and Thermofluids,\nAny suggestions?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:32:57','2019-01-15 22:32:57',25,NULL,3,NULL,NULL),(261,'What textbooks would you recommend for Electromechanical System Design?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:34:00','2019-01-15 22:34:00',25,NULL,3,NULL,NULL),(262,'What can a new Mechanical engineering student do in their own time to strengthen or learn new skills?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:34:07','2019-01-15 22:34:07',25,NULL,3,NULL,NULL),(263,'What are some interesting areas within Statics and Structures that I could do my undergraduate thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:35:05','2019-01-15 22:35:05',25,NULL,3,NULL,NULL),(264,'What are the things all Mechanical engineering students should know?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:35:45','2019-01-15 22:35:45',25,NULL,3,NULL,NULL),(265,'Any tips on how to get through Forensic Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:35:49','2019-01-15 22:35:49',25,NULL,3,NULL,NULL),(266,'So far are you happy with your decision to study Mechanical Engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:36:44','2019-01-15 22:36:44',25,NULL,3,NULL,NULL),(267,'How monotonous is Mechanical engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:36:49','2019-01-15 22:36:49',25,NULL,3,NULL,NULL),(268,'What got you interested in Mechanical engineering?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:37:37','2019-01-15 22:37:37',25,NULL,3,NULL,NULL),(269,'What are some themes of The Stranger by Albert Camus?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:38:17','2019-01-15 22:38:17',26,NULL,3,NULL,NULL),(270,'What is your review of A.A. Milne\'s The Ugly Duckling, and is it an adaptation of the classic The Ugly Duckling tale?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:38:53','2019-01-15 22:38:53',26,NULL,3,NULL,NULL),(271,'Is there any difference between a degree in English and a degree in English literature?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:39:22','2019-01-15 22:39:22',26,NULL,3,NULL,NULL),(272,'So far are you happy with your decision to study English Language?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:39:29','2019-01-15 22:39:29',26,NULL,3,NULL,NULL),(273,'What books would you recommend to someone interested in Contemporary Canadian Literature?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:40:07','2019-01-15 22:40:07',26,NULL,3,NULL,NULL),(274,'Could someone tell me more about Postcolonial Literature of the Americas?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:40:38','2019-01-15 22:40:38',26,NULL,3,NULL,NULL),(275,' I need a simple but effective book on Early Canadian Literature\'s, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:41:16','2019-01-15 22:41:16',26,NULL,3,NULL,NULL),(276,'What is your opinion of Stephen King\'s body of work?\'',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:41:59','2019-01-15 22:41:59',26,NULL,3,NULL,NULL),(277,'In your Opinion Which is the best modern English translation of Shakespeare\'s works?In your Opinion Which is the best modern English translation of Shakespeare\'s works?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:42:05','2019-01-15 22:42:05',26,NULL,3,NULL,NULL),(278,'So far are you happy with your decision to study Gender and Diversity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:47:38','2019-01-15 22:47:38',27,NULL,3,NULL,NULL),(279,'Why did you decide to study Gender and Diversity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:48:05','2019-01-15 22:48:05',27,NULL,3,NULL,NULL),(280,'I need a simple but effective book on Human Sexuality?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:48:37','2019-01-15 22:48:37',27,NULL,3,NULL,NULL),(281,'I need papers and Articles on Human Variation?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:49:04','2019-01-15 22:49:04',27,NULL,3,NULL,NULL),(282,'Any tips on how to get through Race and Ethnicity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:49:33','2019-01-15 22:49:33',27,NULL,3,NULL,NULL),(283,'What are some interesting areas within Human Diversity?\nthat I could do my undergraduate thesis in?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:50:06','2019-01-15 22:50:06',27,NULL,3,NULL,NULL),(284,'What do you find challenging about Studying Ethnicity, & Diversity.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:50:14','2019-01-15 22:50:14',27,NULL,3,NULL,NULL),(285,'What are some project ideas relating to Debt versus equity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:50:39','2019-01-15 22:50:39',28,NULL,3,NULL,NULL),(286,'I need a simple but effective book on Theories of Corporate Finance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:50:52','2019-01-15 22:50:52',28,NULL,3,NULL,NULL),(287,'What textbooks would you recommend for Principles of Finance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:51:12','2019-01-15 22:51:12',28,NULL,3,NULL,NULL),(288,'Could someone tell me more about Market Anomalies and Asset Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:51:30','2019-01-15 22:51:30',28,NULL,3,NULL,NULL),(289,'The annual membership fee at your health club is $750 per year and is expected to increase at 5% per year. A life membership is $7,500 and the discount rate is 12%. In order to justify taking the life membership, what would your minimum life expectancy need to be?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:51:56','2019-01-15 22:51:56',28,NULL,3,NULL,NULL),(290,'What got you interested in Finance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:52:11','2019-01-15 22:52:11',28,NULL,3,NULL,NULL),(291,'What are some interesting areas within Derivatives that I could do my undergraduate thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:52:29','2019-01-15 22:52:29',28,NULL,3,NULL,NULL),(292,'Any tips on how to get through Risk Management? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:52:42','2019-01-15 22:52:42',28,NULL,3,NULL,NULL),(293,'Investors do not get rewarded for bearing idiosyncratic risk?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:52:55','2019-01-15 22:52:55',28,NULL,3,NULL,NULL),(294,'If a commercial airline wants to hedge its risk against oil prices, it should go short in oil futures?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:53:15','2019-01-15 22:53:15',28,NULL,3,NULL,NULL),(295,'What mountains are still unclimbed?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:53:59','2019-01-15 22:53:59',29,NULL,3,NULL,NULL),(297,'How developed is the river system in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:54:49','2019-01-15 22:54:49',29,NULL,3,NULL,NULL),(298,'What are some Canadian geography facts?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:55:05','2019-01-15 22:55:05',29,NULL,3,NULL,NULL),(299,'What makes geography difficult to learn in school?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:55:20','2019-01-15 22:55:20',29,NULL,3,NULL,NULL),(300,'Any tips on how to get through Research Design and Overseas Field courses?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:55:44','2019-01-15 22:55:44',29,NULL,3,NULL,NULL),(301,'Any tips on how to get through Climate Change and carbon Cycling?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:56:25','2019-01-15 22:56:25',29,NULL,3,NULL,NULL),(302,'Where is the  most populous island in America?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:58:34','2019-01-15 22:58:34',29,NULL,3,NULL,NULL),(303,'Why did you decide to study Geography?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 22:59:02','2019-01-15 22:59:02',29,NULL,3,NULL,NULL),(304,'What books would you recommend for\nInternational Tourism Studies?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:00:24','2019-01-15 23:00:24',30,NULL,3,NULL,NULL),(305,'I need a simple but effective book on Strategic Management for Tourism & Hospitality?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:01:14','2019-01-15 23:01:14',30,NULL,3,NULL,NULL),(306,'I need some recent articles on Urban Tourism, any pointers please?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:06:22','2019-01-15 23:06:22',30,NULL,3,NULL,NULL),(307,'Any tips on how to get through Food safety and Quality Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:08:17','2019-01-15 23:08:17',30,NULL,3,NULL,NULL),(308,'Does Anyone have exam experience in Hospitality Marketing and Management, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:08:35','2019-01-15 23:08:35',30,NULL,3,NULL,NULL),(309,'Where can I work with a Hospitality management degree?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:08:56','2019-01-15 23:08:56',30,NULL,3,NULL,NULL),(310,'What is the job market like in Canada for a Hospitality management graduate?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:09:45','2019-01-15 23:09:45',30,NULL,3,NULL,NULL),(311,'So far are you happy with your decision to study Hospitality & Leisure Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:10:19','2019-01-15 23:10:19',30,NULL,3,NULL,NULL),(312,'Why did you decide to study Hospitality & Leisure Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:11:04','2019-01-15 23:11:04',30,NULL,3,NULL,NULL),(313,'I am considering switching my course, however I am curious about how much work load there is for an hospitality management undergraduate program?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:13:00','2019-01-15 23:13:00',30,NULL,3,NULL,NULL),(314,'What are the procedures for evaluating line Managers in accordance to HRM policies and procedures?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:13:36','2019-01-15 23:13:36',31,NULL,3,NULL,NULL),(315,'How can I find a good source for generating leads, for a human resources \nproject?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:14:12','2019-01-15 23:14:12',31,NULL,3,NULL,NULL),(316,'What is the human resources cycle?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:17:51','2019-01-15 23:17:51',31,NULL,3,NULL,NULL),(317,'Could someone tell me more about various types of selection processes?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:21:51','2019-01-15 23:21:51',31,NULL,3,NULL,NULL),(318,'What is a manager’s guide on employee engagement?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:22:18','2019-01-15 23:22:18',31,NULL,3,NULL,NULL),(319,'What books would you recommend for\nTheory and Practice of Leadership?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:22:47','2019-01-15 23:22:47',31,NULL,3,NULL,NULL),(320,'Does Anyone have exam experience in Strategic Finance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:23:13','2019-01-15 23:23:13',31,NULL,3,NULL,NULL),(321,'What influences are New Technologies having on the way we manage people?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:25:07','2019-01-15 23:25:07',31,NULL,3,NULL,NULL),(322,' In your opinion, has globalization had a positive or negative impact on International relations? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:28:16','2019-01-15 23:28:16',32,NULL,3,NULL,NULL),(323,'What problems and prospects are apparent in the processes for global governance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:28:42','2019-01-15 23:28:42',32,NULL,3,NULL,NULL),(324,'How do religious fundamentalism impact theories of International relations?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:29:12','2019-01-15 23:29:12',32,NULL,3,NULL,NULL),(325,'How much of a detrimental impact has the advent of Nuclear weapons had on international relations?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:29:41','2019-01-15 23:29:41',32,NULL,3,NULL,NULL),(326,'Which countries are the most difficult to invade geographically?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:30:10','2019-01-15 23:30:10',32,NULL,3,NULL,NULL),(327,'What are some cultural faux pas among diplomats?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:30:41','2019-01-15 23:30:41',32,NULL,3,NULL,NULL),(328,'What are the Key perspectives on International Conflict?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:31:09','2019-01-15 23:31:09',32,NULL,3,NULL,NULL),(329,'What books would you recommend for Governing the Global Economy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:31:35','2019-01-15 23:31:35',32,NULL,3,NULL,NULL),(330,'In your personal view what are the major gaps in International relations theories?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:32:32','2019-01-15 23:32:32',32,NULL,3,NULL,NULL),(331,'What is meant by Balance of power theory?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:32:47','2019-01-15 23:32:47',32,NULL,3,NULL,NULL),(332,'What are the differences between Multipolar and Bipolar systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:33:29','2019-01-15 23:33:29',32,NULL,3,NULL,NULL),(333,'I need a simple but effective book on Journalism Principles?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:33:58','2019-01-15 23:33:58',33,NULL,3,NULL,NULL),(334,'Any tips on how to get through Storytelling for Audio Platforms?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:34:11','2019-01-15 23:34:11',33,NULL,3,NULL,NULL),(335,'I need papers and Articles on Cross Platform Reporting, any recommendations?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:34:32','2019-01-15 23:34:32',33,NULL,3,NULL,NULL),(336,'Being a Media studies student, is it important to avail on Facebook or Instagram?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:35:08','2019-01-15 23:35:08',33,NULL,3,NULL,NULL),(337,'How has the economy influenced journalism?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:35:35','2019-01-15 23:35:35',33,NULL,3,NULL,NULL),(338,'What other core skills are required in Journalism apart from writing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:35:52','2019-01-15 23:35:52',33,NULL,3,NULL,NULL),(339,'What kind of texts/materials do Journalists and reporters utilize to practice speaking on air?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:36:14','2019-01-15 23:36:14',33,NULL,3,NULL,NULL),(340,'How do you think politics influences Journalism?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:36:39','2019-01-15 23:36:39',33,NULL,3,NULL,NULL),(341,'Why did you decide to study Journalism?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:36:56','2019-01-15 23:36:56',33,NULL,3,NULL,NULL),(342,'Why did you decide to study Library Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:37:33','2019-01-15 23:37:33',35,NULL,3,NULL,NULL),(343,'So far are you happy with your decision to study Information Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:37:45','2019-01-15 23:37:45',35,NULL,3,NULL,NULL),(344,'My brother is considering a degree in Information Management what types of jobs can he get with a Bachelor of Science in Information Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:38:01','2019-01-15 23:38:01',35,NULL,3,NULL,NULL),(345,'What books would you recommend for Knowledge Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:38:18','2019-01-15 23:38:18',35,NULL,3,NULL,NULL),(346,'I need papers and Articles on Reference and Information Services?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:38:32','2019-01-15 23:38:32',35,NULL,3,NULL,NULL),(347,'I need papers and Articles on Cataloging and Classification?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:39:07','2019-01-15 23:39:07',35,NULL,3,NULL,NULL),(348,'What books would you recommend for Library Practicum?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:39:35','2019-01-15 23:39:35',35,NULL,3,NULL,NULL),(349,' I need a simple but effective book on “Digital Libraries “, any suggestions please?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:40:04','2019-01-15 23:40:04',35,NULL,3,NULL,NULL),(350,'Does Anyone have exam experience in Epidemiology,  what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:40:59','2019-01-15 23:40:59',36,NULL,3,NULL,NULL),(351,'What books would you recommend for Genetics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-15 23:41:03','2019-01-15 23:41:03',36,NULL,3,NULL,NULL),(352,'What are the biggest issues facing the life sciences supply chain?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:00:32','2019-01-16 00:00:32',36,NULL,3,NULL,NULL),(353,'Are plate tectonics on earth caused by the presence of life?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:00:51','2019-01-16 00:00:51',36,NULL,3,NULL,NULL),(354,'What are the effects of urbanization?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:01:18','2019-01-16 00:01:18',36,NULL,3,NULL,NULL),(355,'What books would you recommend for Immunology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:01:36','2019-01-16 00:01:36',36,NULL,3,NULL,NULL),(356,'Should genetically modified food crops be approved by the government?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:01:53','2019-01-16 00:01:53',36,NULL,3,NULL,NULL),(357,'Should there be stricter regulations on the usage of antibiotics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:02:12','2019-01-16 00:02:12',36,NULL,3,NULL,NULL),(358,'What are the Benefits of afforestation to man?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:02:30','2019-01-16 00:02:30',36,NULL,3,NULL,NULL),(359,'What is probiosis all about?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:02:54','2019-01-16 00:02:54',36,NULL,3,NULL,NULL),(360,'How can one prevent superficial fungal infection such as Ringworm since one is also exposed to spores?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:03:10','2019-01-16 00:03:10',36,NULL,3,NULL,NULL),(361,'Could someone tell me more about Phonetics and Phonology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:03:53','2019-01-16 00:03:53',37,NULL,3,NULL,NULL),(362,'Any tips on how to get through Syntactic Theory?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:04:11','2019-01-16 00:04:11',37,NULL,3,NULL,NULL),(363,'What books would you recommend for Psycholinguistics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:04:58','2019-01-16 00:04:58',37,NULL,3,NULL,NULL),(364,'Does anyone have exam experience in Lexical Semantics, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:05:13','2019-01-16 00:05:13',37,NULL,3,NULL,NULL),(365,'How many languages do you understand fluently?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:05:33','2019-01-16 00:05:33',37,NULL,3,NULL,NULL),(366,'Current Issues in Applied Linguistics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:05:44','2019-01-16 00:05:44',37,NULL,3,NULL,NULL),(367,'Who has read “The Language Instinct” by Steven Pinker?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:06:03','2019-01-16 00:06:03',37,NULL,3,NULL,NULL),(368,'Why did you decide to study Linguistics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:06:19','2019-01-16 00:06:19',37,NULL,3,NULL,NULL),(369,'What language is the most similar to English?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:06:35','2019-01-16 00:06:35',37,NULL,3,NULL,NULL),(370,'So far are you happy with your decision to study Linguistics ?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:06:58','2019-01-16 00:06:58',37,NULL,3,NULL,NULL),(371,'How is it possible to be fluent in 6-7 languages?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:07:12','2019-01-16 00:07:12',37,NULL,3,NULL,NULL),(372,'What are the Most efficient Analytical techniques in Supply Chain, Inventory Planning and Control?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:07:50','2019-01-16 00:07:50',38,NULL,3,NULL,NULL),(373,'What is 6PL in supply chain management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:08:06','2019-01-16 00:08:06',38,NULL,3,NULL,NULL),(374,'Would you advise me to pursue a masters in supply chain management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:08:29','2019-01-16 00:08:29',38,NULL,3,NULL,NULL),(375,'Can anyone recommend an alternative book to MRP II Standard System: A Handbook for Manufacturing Software Survival\nby Christopher D. Gray?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:08:54','2019-01-16 00:08:54',38,NULL,3,NULL,NULL),(376,'What books would you recommend for Six sigma?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:09:13','2019-01-16 00:09:13',38,NULL,3,NULL,NULL),(377,'After a BS in supply Chain Management, does it make more sense to further your education with a masters or get the APICS CPIM certification?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:09:28','2019-01-16 00:09:28',38,NULL,3,NULL,NULL),(378,'What are some of the best certifications in supply chain certification, for beginners?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:09:42','2019-01-16 00:09:42',38,NULL,3,NULL,NULL),(379,'I need papers and Articles on Project Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:09:59','2019-01-16 00:09:59',38,NULL,3,NULL,NULL),(380,'Any tips on how to get through Modelling Simulation and Optimisation?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:10:15','2019-01-16 00:10:15',38,NULL,3,NULL,NULL),(381,'Does Anyone have exam experience in Supply Chain Planning, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:10:29','2019-01-16 00:10:29',38,NULL,3,NULL,NULL),(382,'Why did you decide to study Supply Chain Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:10:44','2019-01-16 00:10:44',38,NULL,3,NULL,NULL),(383,'How do I become an affiliate marketer?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:11:15','2019-01-16 00:11:15',39,NULL,3,NULL,NULL),(384,'What books would you recommend for Consumer Behavior?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:11:28','2019-01-16 00:11:28',39,NULL,3,NULL,NULL),(385,'Does Anyone have exam experience in Marketing Foundations, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:11:50','2019-01-16 00:11:50',39,NULL,3,NULL,NULL),(386,'I need papers and Articles on Digital Marketing',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:12:12','2019-01-16 00:12:12',39,NULL,3,NULL,NULL),(387,'I need papers and Articles on Retailing Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:12:50','2019-01-16 00:12:50',39,NULL,3,NULL,NULL),(388,'What books would you recommend for Brand Management?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:13:21','2019-01-16 00:13:21',39,NULL,3,NULL,NULL),(389,'So far are you happy with your decision to study marketing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:13:51','2019-01-16 00:13:51',39,NULL,3,NULL,NULL),(390,'Any tips on how to get through Strategic Finance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:14:19','2019-01-16 00:14:19',39,NULL,3,NULL,NULL),(391,'What are some examples of great marketing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:14:53','2019-01-16 00:14:53',39,NULL,3,NULL,NULL),(392,'What are the best big data tools to achieve efficient Customer Analytics and customer insights?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:14:57','2019-01-16 00:14:57',39,NULL,3,NULL,NULL),(393,'What are essential skills of modern marketers?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:15:38','2019-01-16 00:15:38',39,NULL,3,NULL,NULL),(394,'What books would you recommend for Crystallography?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:16:47','2019-01-16 00:16:47',40,NULL,3,NULL,NULL),(395,'Any tips on how to get through  Mathematics for materials science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:17:17','2019-01-16 00:17:17',40,NULL,3,NULL,NULL),(396,'Does Anyone have exam experience in Mathematics for materials science, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:17:45','2019-01-16 00:17:45',40,NULL,3,NULL,NULL),(397,'Are there any metals with strength-to-weight similar to aluminum or titanium but with the hardness of high-carbon hardened steel?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:18:14','2019-01-16 00:18:14',40,NULL,3,NULL,NULL),(398,'I need papers and Articles on Structure of materials.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:18:46','2019-01-16 00:18:46',40,NULL,3,NULL,NULL),(399,'So far are you happy with your decision to study Material Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:19:17','2019-01-16 00:19:17',40,NULL,3,NULL,NULL),(400,'Why did you decide to study Material Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:19:43','2019-01-16 00:19:43',40,NULL,3,NULL,NULL),(401,'My brother is considering a degree in Material Science, what types of jobs can he get with a Bachelor of Science in Material Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:20:26','2019-01-16 00:20:26',40,NULL,3,NULL,NULL),(402,'If you added molten stone to molten steel and kept them melted while stirring, could there hypothetically be a stone-steel alloy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:20:53','2019-01-16 00:20:53',40,NULL,3,NULL,NULL),(403,'What do we call a solid which does not conduct electricity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:21:20','2019-01-16 00:21:20',40,NULL,3,NULL,NULL),(404,'How is calculus used in the real world?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:22:54','2019-01-16 00:22:54',41,NULL,3,NULL,NULL),(405,'Any tips on how to get through Calculus and Vectors? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:23:25','2019-01-16 00:23:25',41,NULL,3,NULL,NULL),(406,'So far are you happy with your decision to study Mathematics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:24:16','2019-01-16 00:24:16',41,NULL,3,NULL,NULL),(407,'What\'s the status of Norbert Blum\'s claim that P≠NPP≠NP?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:30:14','2019-01-16 00:30:14',41,NULL,3,NULL,NULL),(408,'Does anyone know abit about Commutative Algebra?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:31:18','2019-01-16 00:31:18',41,NULL,3,NULL,NULL),(409,'Does Anyone have exam experience in Real and Complex Analysis,what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:31:46','2019-01-16 00:31:46',41,NULL,3,NULL,NULL),(410,'Does Anyone have exam experience in Fractal Geometry, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:32:59','2019-01-16 00:32:59',41,NULL,3,NULL,NULL),(411,'What should I do to become a good mathematician? I am a 2nd year math student.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:33:26','2019-01-16 00:33:26',41,NULL,3,NULL,NULL),(412,'Why did you decide to study Mathematics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 00:33:57','2019-01-16 00:33:57',41,NULL,3,NULL,NULL),(413,'What can be the portals for toxin absorption?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:04:36','2019-01-16 07:04:36',42,NULL,3,NULL,NULL),(414,'What do epidemiological studies measure?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:04:58','2019-01-16 07:04:58',42,NULL,3,NULL,NULL),(415,'Does anyone know thinning of cerebellur gyri leads to?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:06:49','2019-01-16 07:06:49',42,NULL,3,NULL,NULL),(416,'Any tips on how to get through Medical Genetics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:07:11','2019-01-16 07:07:11',42,NULL,3,NULL,NULL),(417,'So far are you happy with your decision to study Medicine?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:07:30','2019-01-16 07:07:30',42,NULL,3,NULL,NULL),(418,'Suggestion for a book on Neurobiology of Memory and Learning?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:07:48','2019-01-16 07:07:48',42,NULL,3,NULL,NULL),(419,'Does anyone know abit about Human Endocrinology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:08:06','2019-01-16 07:08:06',42,NULL,3,NULL,NULL),(420,'Can someone tell me more about Physiology of Absorption and Excretion?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:08:22','2019-01-16 07:08:22',42,NULL,3,NULL,NULL),(421,'What books would you recommend for Inherited Disorders?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:08:42','2019-01-16 07:08:42',42,NULL,3,NULL,NULL),(422,'Why did you decide to study Medical science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:09:03','2019-01-16 07:09:03',42,NULL,3,NULL,NULL),(423,'What books would you recommend for Advanced Chinese Language Skills?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:09:37','2019-01-16 07:09:37',43,NULL,3,NULL,NULL),(424,'What books would you recommend for Italian Linguistics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:09:54','2019-01-16 07:09:54',43,NULL,3,NULL,NULL),(425,'Any tips on how to get through Socio linguistics of French?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:10:15','2019-01-16 07:10:15',43,NULL,3,NULL,NULL),(426,'How many languages have died in the last decade?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:10:32','2019-01-16 07:10:32',43,NULL,3,NULL,NULL),(427,'Suggestions for a book on Evolution of the French Language?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:10:50','2019-01-16 07:10:50',43,NULL,3,NULL,NULL),(428,'Best languages that Influence the World?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:11:10','2019-01-16 07:11:10',43,NULL,3,NULL,NULL),(429,'Why did you decide to study Modern Languages?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:11:32','2019-01-16 07:11:32',43,NULL,3,NULL,NULL),(430,'I need a simple but effective book on Varieties of French?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:11:46','2019-01-16 07:11:46',43,NULL,3,NULL,NULL),(431,'far are you happy with your decision to study Modern Languages?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:11:59','2019-01-16 07:11:59',43,NULL,3,NULL,NULL),(432,'How tough is nursing school?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:12:35','2019-01-16 07:12:35',44,NULL,3,NULL,NULL),(433,'What are some things I should know before majoring in nursing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:12:52','2019-01-16 07:12:52',44,NULL,3,NULL,NULL),(434,'Is math important to nursing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:13:04','2019-01-16 07:13:04',44,NULL,3,NULL,NULL),(435,'Is doing a graduate degree in nursing worth the money? I need some your advice peers.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:13:17','2019-01-16 07:13:17',44,NULL,3,NULL,NULL),(436,'What is your favorite part of studying nursing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:13:32','2019-01-16 07:13:32',44,NULL,3,NULL,NULL),(437,'What are the fastest ways to become a registered nurse?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:14:09','2019-01-16 07:14:09',44,NULL,3,NULL,NULL),(438,'What books would you recommend for Haematology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:14:26','2019-01-16 07:14:26',44,NULL,3,NULL,NULL),(439,'Why did you decide to study Nursing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:14:44','2019-01-16 07:14:44',44,NULL,3,NULL,NULL),(440,'Any tips on how to get through \nPaediatric Nursing?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:14:58','2019-01-16 07:14:58',44,NULL,3,NULL,NULL),(441,'So far are you happy with your decision to study Nursing?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:15:30','2019-01-16 07:15:30',44,NULL,3,NULL,NULL),(442,'Why did you decide to study Optometry?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:16:31','2019-01-16 07:16:31',45,NULL,3,NULL,NULL),(443,'Can someone tell me more about the uses of a Retinoscope?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:16:59','2019-01-16 07:16:59',45,NULL,3,NULL,NULL),(444,'So far are you happy with your decision to study Optometry?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:17:25','2019-01-16 07:17:25',45,NULL,3,NULL,NULL),(445,'I need papers and Articles on Dispensing, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:17:32','2019-01-16 07:17:32',45,NULL,3,NULL,NULL),(446,'Any tips on how to get through Visual Optics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:18:15','2019-01-16 07:18:15',45,NULL,3,NULL,NULL),(447,'What books would you recommend for Low Vision?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:18:22','2019-01-16 07:18:22',45,NULL,3,NULL,NULL),(448,'Does Anyone have exam experience in Emerging Optometry, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:19:03','2019-01-16 07:19:03',45,NULL,3,NULL,NULL),(449,'What books would you recommend for Ocular Disease?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:19:30','2019-01-16 07:19:30',45,NULL,3,NULL,NULL),(450,'A patient has the most common type of inherited color vision defect that appears in males. What are the most important advice that should be provided to this patient?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:20:12','2019-01-16 07:20:12',45,NULL,3,NULL,NULL),(451,'What symptoms would this patient experience if she was having binocular vision problems associated with wearing the contact lenses?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:20:18','2019-01-16 07:20:18',45,NULL,3,NULL,NULL),(452,'Why did you decide to study Performing Arts?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:20:52','2019-01-16 07:20:52',46,NULL,3,NULL,NULL),(453,'What are some difficult ballet moves to learn?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:21:05','2019-01-16 07:21:05',46,NULL,3,NULL,NULL),(454,'Have you ever performed in any theater/play?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:21:19','2019-01-16 07:21:19',46,NULL,3,NULL,NULL),(455,'How can you understand opera performances?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:21:38','2019-01-16 07:21:38',46,NULL,3,NULL,NULL),(456,'How important is conceptual understanding for a performance piece?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:21:57','2019-01-16 07:21:57',46,NULL,3,NULL,NULL),(457,'What is the definition of an art-film?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:22:05','2019-01-16 07:22:05',46,NULL,3,NULL,NULL),(458,'What books would you recommend on the history of performance art?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:22:25','2019-01-16 07:22:25',46,NULL,3,NULL,NULL),(459,'Is there a modern day replacement for Gilbert and Sullivan?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:22:40','2019-01-16 07:22:40',46,NULL,3,NULL,NULL),(460,'Can philosophy be categorized as a type of performance art?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:23:00','2019-01-16 07:23:00',46,NULL,3,NULL,NULL),(461,'Who are the most famous performance artists of all time?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:23:13','2019-01-16 07:23:13',46,NULL,3,NULL,NULL),(462,'Why did you decide to study Product Design?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:24:07','2019-01-16 07:24:07',50,NULL,3,NULL,NULL),(463,'What are the best engineering design firms in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:24:20','2019-01-16 07:24:20',50,NULL,3,NULL,NULL),(464,'What books would you recommend for User interface design?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:24:32','2019-01-16 07:24:32',50,NULL,3,NULL,NULL),(465,'Any tips on how to get through Ergonomics for Design?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:24:47','2019-01-16 07:24:47',50,NULL,3,NULL,NULL),(466,'What are the most influential UI/UX design blogs?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:25:01','2019-01-16 07:25:01',50,NULL,3,NULL,NULL),(467,'I need papers and Articles on User Experience Design, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:25:17','2019-01-16 07:25:17',50,NULL,3,NULL,NULL),(468,'I need a simple but effective book on Prototyping & Development, Any suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:25:34','2019-01-16 07:25:34',50,NULL,3,NULL,NULL),(469,'How/where can I learn to draw designs and prototype my ideas?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:26:10','2019-01-16 07:26:10',50,NULL,3,NULL,NULL),(470,'So far are you happy with your decision to study Product Design?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:26:34','2019-01-16 07:26:34',50,NULL,3,NULL,NULL),(471,'Which one of these software’s is easier to learn and use: Rhinoceros 3D or 3DS Max?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:26:54','2019-01-16 07:26:54',50,NULL,3,NULL,NULL),(472,'Why did you decide to study Pharmacy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:27:28','2019-01-16 07:27:28',48,NULL,3,NULL,NULL),(473,'Can someone tell me more about Genes, Cells & Evolution?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:27:44','2019-01-16 07:27:44',48,NULL,3,NULL,NULL),(474,'What books would you recommend for Cellular Physiology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:27:57','2019-01-16 07:27:57',48,NULL,3,NULL,NULL),(475,'Does Anyone have exam experience in Drug Discovery, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:28:13','2019-01-16 07:28:13',48,NULL,3,NULL,NULL),(476,'What’s next after a B.Pharmacy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:28:27','2019-01-16 07:28:27',48,NULL,3,NULL,NULL),(477,'What should I do after a B.Pharm?  A Pharm D. or an MBA in healthcare?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:29:08','2019-01-16 07:29:08',48,NULL,3,NULL,NULL),(478,'I am looking to change my course to B.Pharm, but I am curious about how much Maths I would be encountering?\nAny pointers?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:29:25','2019-01-16 07:29:25',48,NULL,3,NULL,NULL),(479,'What is the scope after B.Pharm completion?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:29:40','2019-01-16 07:29:40',48,NULL,3,NULL,NULL),(480,'What kind of job could i get after completing my B.Pharmacy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:29:59','2019-01-16 07:29:59',48,NULL,3,NULL,NULL),(481,'What are the advantages and disadvantages of pursuing a B.Pharm?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:30:10','2019-01-16 07:30:10',48,NULL,3,NULL,NULL),(482,'Why did you decide to study Philosophy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:30:58','2019-01-16 07:30:58',49,NULL,3,NULL,NULL),(483,'Augustine argued that evil is the absence of good. Is it equally possible that good is the absence of evil?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:31:17','2019-01-16 07:31:17',49,NULL,3,NULL,NULL),(484,'What books would you recommend for History of Philosophy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:31:29','2019-01-16 07:31:29',49,NULL,3,NULL,NULL),(485,'I need papers and Articles on Philosophy of Mind?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:31:47','2019-01-16 07:31:47',49,NULL,3,NULL,NULL),(486,'Can someone explain more about Phenomenology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:32:18','2019-01-16 07:32:18',49,NULL,3,NULL,NULL),(487,'What books would you recommend for Philosophy of Religion?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:32:35','2019-01-16 07:32:35',49,NULL,3,NULL,NULL),(488,'Any tips on how to get through Metaphysics ?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:32:50','2019-01-16 07:32:50',49,NULL,3,NULL,NULL),(489,'Does Anyone have exam experience in Aesthetics, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:33:06','2019-01-16 07:33:06',49,NULL,3,NULL,NULL),(490,'In your opinion who are the easiest, and least complex philosopher to read?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:33:32','2019-01-16 07:33:32',49,NULL,3,NULL,NULL),(491,'Which philosophical concept challenges you the most?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:33:51','2019-01-16 07:33:51',49,NULL,3,NULL,NULL),(492,'What responses are associated with the sympathetic autonomic nervous system?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:34:32','2019-01-16 07:34:32',51,NULL,3,NULL,NULL),(493,'Why did you decide to study Psychology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:34:48','2019-01-16 07:34:48',51,NULL,3,NULL,NULL),(494,'What are the differences between practice and deliberate practice?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:41:53','2019-01-16 07:41:53',51,NULL,3,NULL,NULL),(495,'What books would you recommend for Cognitive Psychology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:42:14','2019-01-16 07:42:14',51,NULL,3,NULL,NULL),(496,'What are the basic Information Processing approaches to psychology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:42:30','2019-01-16 07:42:30',51,NULL,3,NULL,NULL),(497,'Any tips on how to get through Human Neuropsychology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:42:49','2019-01-16 07:42:49',51,NULL,3,NULL,NULL),(498,'I need a simple but effective book on Abnormal Psychology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:43:08','2019-01-16 07:43:08',51,NULL,3,NULL,NULL),(499,'Can someone tell me more about Theory of conformity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:43:31','2019-01-16 07:43:31',51,NULL,3,NULL,NULL),(500,'I need papers and Articles on Personality Theory? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:43:52','2019-01-16 07:43:52',51,NULL,3,NULL,NULL),(501,'Does Anyone have exam experience in Cognitive Neuroscience, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:44:10','2019-01-16 07:44:10',51,NULL,3,NULL,NULL),(502,'What different theories and approaches are used to study the phenomena of cross-sector social partnerships and collaborative strategy (development and implementation)? ',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:51:51','2019-01-16 07:51:51',52,NULL,3,NULL,NULL),(503,'How is the concept and measurement of sustainability, a major issue affecting healthcare policy in Canada.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:52:29','2019-01-16 07:52:29',52,NULL,3,NULL,NULL),(504,'What books would you recommend for Public administration & governance?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:53:10','2019-01-16 07:53:10',52,NULL,3,NULL,NULL),(505,'How is health care and fiscal federalism, a major issue affecting healthcare policy in Canada.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:54:07','2019-01-16 07:54:07',52,NULL,3,NULL,NULL),(506,'How is health care spending as investment a major issue affecting healthcare policy in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:54:39','2019-01-16 07:54:39',52,NULL,3,NULL,NULL),(507,'Should Canada Attract More Foreign Students?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:55:57','2019-01-16 07:55:57',52,NULL,3,NULL,NULL),(508,'I need a simple but effective book on Policy Analysis & challenges?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:56:53','2019-01-16 07:56:53',52,NULL,3,NULL,NULL),(509,'I need papers and Articles on The state and the economy in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:57:00','2019-01-16 07:57:00',52,NULL,3,NULL,NULL),(510,' I need papers and Articles on Middle East and Global Conflict?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:58:45','2019-01-16 07:58:45',53,NULL,3,NULL,NULL),(511,'Why did you decide to study Political Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:59:02','2019-01-16 07:59:02',53,NULL,3,NULL,NULL),(512,'I need papers and Articles on Human Rights and International Justice?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 07:59:51','2019-01-16 07:59:51',53,NULL,3,NULL,NULL),(513,'What books would you recommend on The Government of Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:00:09','2019-01-16 08:00:09',53,NULL,3,NULL,NULL),(514,'I need a simple but effective book on Federalism in Canada?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:00:55','2019-01-16 08:00:55',53,NULL,3,NULL,NULL),(515,'I need a simple but effective book on Democratic Theory?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:01:45','2019-01-16 08:01:45',53,NULL,3,NULL,NULL),(516,'Any tips on how to get through The Politics of International Law?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:03:30','2019-01-16 08:03:30',53,NULL,3,NULL,NULL),(517,'So far are you happy with your decision to study Political Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:04:17','2019-01-16 08:04:17',53,NULL,3,NULL,NULL),(518,' What are the major consequences of global climate change (global warming?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:04:46','2019-01-16 08:04:46',53,NULL,3,NULL,NULL),(519,'How many political philosophies are there?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:06:13','2019-01-16 08:06:13',53,NULL,3,NULL,NULL),(520,'What books would you recommend on Modernity to Postmodernity?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:09:41','2019-01-16 08:09:41',54,NULL,3,NULL,NULL),(521,' Why did you decide to study Sociology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:10:23','2019-01-16 08:10:23',54,NULL,3,NULL,NULL),(522,'What are the biggest sociological problem of Canadian society?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:10:51','2019-01-16 08:10:51',54,NULL,3,NULL,NULL),(523,'I need papers and Articles on Global Social Challenges?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:10:55','2019-01-16 08:10:55',54,NULL,3,NULL,NULL),(524,'Can someone tell me more about Social Network Analysis?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:11:33','2019-01-16 08:11:33',54,NULL,3,NULL,NULL),(525,'So far are you happy with your decision to study Sociology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:12:03','2019-01-16 08:12:03',54,NULL,3,NULL,NULL),(526,'How much of a clear perception has studying Sociology given you about how people (as a group) behave?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:12:30','2019-01-16 08:12:30',54,NULL,3,NULL,NULL),(527,'What influence did Emile Durkheim have on sociology?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:13:41','2019-01-16 08:13:41',54,NULL,3,NULL,NULL),(528,'Someone tell me more about Forced Migration?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:14:12','2019-01-16 08:14:12',54,NULL,3,NULL,NULL),(529,'Any suggestions for recent articles on Urban Sociology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:16:17','2019-01-16 08:16:17',54,NULL,3,NULL,NULL),(530,'What books would you recommend on Biomechanics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:18:18','2019-01-16 08:18:18',57,NULL,3,NULL,NULL),(531,'Why did you decide to study Sports Science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:19:05','2019-01-16 08:19:05',57,NULL,3,NULL,NULL),(532,'Can someone tell me more about Bioenergetics?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:19:53','2019-01-16 08:19:53',57,NULL,3,NULL,NULL),(533,'How is piezoelectric force platform used in sport and\nexercise biomechanics?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:20:46','2019-01-16 08:20:46',57,NULL,3,NULL,NULL),(534,'I need a simple but effective book on Sports Nutrition and Metabolism?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:21:40','2019-01-16 08:21:40',57,NULL,3,NULL,NULL),(535,'Does Anyone have exam experience in Sport Psychology, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:21:57','2019-01-16 08:21:57',57,NULL,3,NULL,NULL),(536,'Outline an experiment to conduct a bilateral muscle imbalance assessment inknee joint motion of a rugby player using the Isokinetic Dynamometer.Provide details of experimental design including familiarization and speed\nSelection?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:22:23','2019-01-16 08:22:23',57,NULL,3,NULL,NULL),(537,'Calculate the linear tangential velocity, tangential acceleration & radialacceleration relating to a rugby players leg in a conversion kick, at the instantbefore contact. The angular velocity at that instant was 15 rad • s-1 and theswing time of that phase of the kick was 0.22 s. The length of the extendedleg in that phase of the kick was 0.96 m.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:22:43','2019-01-16 08:22:43',57,NULL,3,NULL,NULL),(538,'Which is usually considered more effective as a stimulant before a work-out: caffeine or L-Carnitine?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:23:00','2019-01-16 08:23:00',57,NULL,3,NULL,NULL),(539,'What is the reliability and validity of isokinetic strength assessment using a dynamometer in the context of soccer?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:23:12','2019-01-16 08:23:12',57,NULL,3,NULL,NULL),(540,'Does Anyone have exam experience in“Further Probability and Statistics”,what techniques did you use while preparing for this exam?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:23:46','2019-01-16 08:23:46',58,NULL,3,NULL,NULL),(541,'What books would you recommend for “Probability and Inference”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:24:06','2019-01-16 08:24:06',58,NULL,3,NULL,NULL),(542,'What books would you suggest for someone studying “Applied Probability”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:24:24','2019-01-16 08:24:24',58,NULL,3,NULL,NULL),(543,'Why did you decide to study Statistics & Operation?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:24:40','2019-01-16 08:24:40',58,NULL,3,NULL,NULL),(544,'Does Anyone have exam experience in “Statistical Inference”, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:24:56','2019-01-16 08:24:56',58,NULL,3,NULL,NULL),(545,'How do I compare which of two data sets are more spread out normalized to their ranges?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:25:13','2019-01-16 08:25:13',58,NULL,3,NULL,NULL),(546,'How do I fill the table involving cumulative frequency and relative frequency?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:25:28','2019-01-16 08:25:28',58,NULL,3,NULL,NULL),(547,'Is anyone considering a project topic in something relating to statistical analysis (relationship between 2 variables)?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:25:52','2019-01-16 08:25:52',58,NULL,3,NULL,NULL),(548,'What is the most difficult statistics course in your opinion?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:26:09','2019-01-16 08:26:09',58,NULL,3,NULL,NULL),(549,'If you were to construct a 90% confidence interval, would it be longer or shorter than the 95%, and longer or shorter than the 80%?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:26:24','2019-01-16 08:26:24',58,NULL,3,NULL,NULL),(550,'What are the strongest arguments that God exists?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:26:58','2019-01-16 08:26:58',59,NULL,3,NULL,NULL),(551,'I need a simple book on Qur’anic Arabic, Any Suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:27:11','2019-01-16 08:27:11',59,NULL,3,NULL,NULL),(552,'How important is the contribution of Mu‘taziliKalam theology to the Islamic theological\ntradition?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:27:31','2019-01-16 08:27:31',59,NULL,3,NULL,NULL),(553,'How well have Muslim theologians succeeded in holding together God’s creative power\non the one hand and human action and responsibility on the other?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:27:48','2019-01-16 08:27:48',59,NULL,3,NULL,NULL),(554,'I need a simple but effectively detailed book on Judaism. Any Suggestions?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:28:06','2019-01-16 08:28:06',59,NULL,3,NULL,NULL),(555,'Can someone recommend a good book on “New Testament Christology”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:28:27','2019-01-16 08:28:27',59,NULL,3,NULL,NULL),(556,'Any suggestions for recent articles on “Urban Economies”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:29:05','2019-01-16 08:29:05',60,NULL,3,NULL,NULL),(557,'What books would you recommend for “Site Planning and Development Valuation”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:29:32','2019-01-16 08:29:32',60,NULL,3,NULL,NULL),(558,'Can someone recommend a good book on “Planning Theory and Practice”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:29:47','2019-01-16 08:29:47',60,NULL,3,NULL,NULL),(559,'Why did you decide to study Urban planning?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:30:01','2019-01-16 08:30:01',60,NULL,3,NULL,NULL),(560,'What are some project ideas within \nGreen Futures or Climate change?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:30:28','2019-01-16 08:30:28',60,NULL,3,NULL,NULL),(561,'What are the advantages and disadvantages of expert type of planning in urban planning theory?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:30:41','2019-01-16 08:30:41',60,NULL,3,NULL,NULL),(562,'What are some interesting areas of urban planning that I could do my undergraduate honors thesis in?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:31:46','2019-01-16 08:31:46',60,NULL,3,NULL,NULL),(563,'I always wondered What the fundamental differences were between urban planning and architecture, Any interesting opinions.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:32:18','2019-01-16 08:32:18',60,NULL,3,NULL,NULL),(564,'How important is surveying in urban planning and development?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:33:19','2019-01-16 08:33:19',60,NULL,3,NULL,NULL),(565,'How can the principles of urban planning + design work in Township that is not densely populated and bring benefits to its residents?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:33:47','2019-01-16 08:33:47',60,NULL,3,NULL,NULL),(567,'How would you investigate an outbreak of diarrhoea in young Calves?\n',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:36:47','2019-01-16 08:36:47',61,NULL,3,NULL,NULL),(568,'What types of non-surgical methods could be used to correct the uterine torsion of a Cow?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:38:01','2019-01-16 08:38:01',61,NULL,3,NULL,NULL),(569,'What methods that could be used to attempt to facilitate expulsion of the placenta in a Horse?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:43:33','2019-01-16 08:43:33',61,NULL,3,NULL,NULL),(570,'What recommendations could you make to a farmer to help control the outbreak of diarrhoea among his Calves?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:43:54','2019-01-16 08:43:54',61,NULL,3,NULL,NULL),(571,'What are some project ideas relating to “Principles of Infectious Disease”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:44:11','2019-01-16 08:44:11',61,NULL,3,NULL,NULL),(572,'Any suggestions for recent articles on Animal Behaviour and Welfare?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:44:35','2019-01-16 08:44:35',61,NULL,3,NULL,NULL),(573,'Why did you decide to study Veterinary science?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:44:49','2019-01-16 08:44:49',61,NULL,3,NULL,NULL),(574,'What books would you recommend for “Comparative Mammalian Biochemistry”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:45:12','2019-01-16 08:45:12',61,NULL,3,NULL,NULL),(575,'Can someone recommend a good book on Cell Biology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:45:38','2019-01-16 08:45:38',61,NULL,3,NULL,NULL),(576,'I need papers and Articles on “Livestock Science and Genetics”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:45:48','2019-01-16 08:45:48',61,NULL,3,NULL,NULL),(577,'Any suggestions for recent articles on “Biodiversity”?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:46:20','2019-01-16 08:46:20',62,NULL,3,NULL,NULL),(578,'What is Iodine essential for?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:46:35','2019-01-16 08:46:35',62,NULL,3,NULL,NULL),(579,'Does Anyone have exam experience in “Molecular Biology”, what techniques did you use while preparing for it?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:46:51','2019-01-16 08:46:51',62,NULL,3,NULL,NULL),(580,'Why did you decide to study Zoology?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:47:02','2019-01-16 08:47:02',62,NULL,3,NULL,NULL),(581,'What books would you recommend for Animal Behavior?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:47:20','2019-01-16 08:47:20',62,NULL,3,NULL,NULL),(582,'I need papers and Articles on Evolution of Genes, Genomes & Systems?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:47:41','2019-01-16 08:47:41',62,NULL,3,NULL,NULL),(583,'F2 generation illustrates a lack of fitness, as an example of?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:47:50','2019-01-16 08:47:50',62,NULL,3,NULL,NULL),(584,'What mechanisms of evolution could contribute to reproductive isolation of the populations,During allopatric speciation?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:48:04','2019-01-16 08:48:04',62,NULL,3,NULL,NULL),(585,'What volume of gas remains in the lungs after forceful expiration?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:48:19','2019-01-16 08:48:19',62,NULL,3,NULL,NULL),(586,'The skeleton in the developing young is formed with most of the bones present by which week of pregnancy?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-01-16 08:49:05','2019-01-16 08:49:05',62,NULL,3,NULL,NULL),(587,'Why the sports is important?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-02-19 18:34:57','2019-02-19 18:34:57',56,NULL,48,NULL,NULL),(590,'Who Recommend Articles/Papers on Human Anatomy?\"',NULL,NULL,NULL,NULL,NULL,'community','post','2019-03-22 16:16:11','2019-03-22 16:16:11',3,NULL,3,NULL,NULL),(591,'test',NULL,NULL,NULL,NULL,NULL,'community','post','2019-03-28 09:53:10','2019-03-28 09:53:10',5,NULL,69,NULL,NULL),(592,'https://www.amazon.in/dp/B07DD4LBXF/?coliid=I2X51REWYBPBLS&colid=3D8H1GFJBFSE8&psc=1&ref_=lv_ov_lig_dp_it\n\nHere is the link for watch',NULL,NULL,NULL,NULL,NULL,'community','post','2019-06-26 09:58:03','2019-06-26 09:58:03',8,NULL,75,NULL,NULL),(593,'https://www.amazon.in/dp/B07DD4LBXF/?coliid=I2X51REWYBPBLS&colid=3D8H1GFJBFSE8&psc=1&ref_=lv_ov_lig_dp_it\n\nHere is the watch',NULL,NULL,NULL,NULL,NULL,'community','post','2019-06-26 10:01:06','2019-06-26 10:01:06',1,NULL,75,NULL,NULL),(594,'How it is going?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-06-26 10:06:58','2019-06-26 10:06:58',3,NULL,75,NULL,NULL),(595,'And if you are doing partial payment then only I can do things for you. Otherwise I can\'t spend much efforts on this. I thought it may be small changes, so I\'ll do that for you for free. But now I realized that this will take time, so I can;t go ahead without payment.',NULL,NULL,NULL,NULL,NULL,'community','post','2019-06-26 10:24:54','2019-06-26 10:24:54',8,NULL,75,NULL,NULL),(596,'What is your address?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-08-14 08:48:29','2019-08-14 08:48:29',3,NULL,79,NULL,NULL),(597,'What is the Mean Stack?',NULL,NULL,NULL,NULL,NULL,'community','post','2019-08-14 08:49:45','2019-08-14 08:49:45',15,NULL,79,NULL,NULL);
/*!40000 ALTER TABLE `postv1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postv1Id` (`postv1Id`),
  KEY `userId` (`userId`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hideComment` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `quoteReplyId` int(10) unsigned DEFAULT NULL,
  `tagUserId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postv1Id` (`postv1Id`),
  KEY `userId` (`userId`),
  KEY `quoteReplyId` (`quoteReplyId`),
  KEY `tagUserId` (`tagUserId`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reply_ibfk_3` FOREIGN KEY (`quoteReplyId`) REFERENCES `reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reply_ibfk_4` FOREIGN KEY (`tagUserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,'Testing how this platform works  within my system now',NULL,'2019-01-12 10:47:48','2019-01-12 10:47:48',5,3,NULL,NULL),(5,'I loved sports. ',NULL,'2019-02-09 08:38:23','2019-02-09 08:38:23',531,16,NULL,NULL),(6,'Yes, I\'m investing',NULL,'2019-02-18 17:14:47','2019-02-18 17:14:47',16,48,NULL,NULL),(7,'Anytime',NULL,'2019-02-20 06:05:12','2019-02-20 06:05:12',16,48,6,48),(8,'Great',NULL,'2019-03-28 09:53:17','2019-03-28 09:53:17',591,69,NULL,NULL),(9,'You need to be specific about what Countries you are looking to apply too.',NULL,'2019-05-23 06:44:45','2019-05-23 06:44:45',187,3,NULL,NULL),(10,'We can know it by seeing the phenomenon that apple drops to the ground. ',NULL,'2019-05-24 16:03:19','2019-05-24 16:03:19',67,48,NULL,NULL),(12,'Hello, I am web dev',NULL,'2019-08-14 14:59:50','2019-08-14 14:59:50',596,78,NULL,NULL),(13,'Hi My name is xxx',NULL,'2019-08-15 13:56:20','2019-08-15 13:56:20',596,79,NULL,NULL),(14,'gdfgsdfsdfsaf',NULL,'2019-08-15 13:59:42','2019-08-15 13:59:42',596,79,NULL,NULL),(15,'fsdfasdfasfda',NULL,'2019-08-15 14:04:58','2019-08-15 14:04:58',596,79,NULL,NULL),(16,'gdsgdfgdfgsdfg',NULL,'2019-08-15 14:05:57','2019-08-15 14:05:57',596,79,NULL,NULL),(17,'fgdfgdgdhdgsdfgs',NULL,'2019-08-15 14:30:23','2019-08-15 14:30:23',596,78,NULL,NULL),(18,'ffsfasfdsfdasfdsfasfd',NULL,'2019-08-15 14:35:08','2019-08-15 14:35:08',596,78,NULL,NULL),(19,'dgsdfsdgdgs',NULL,'2019-08-15 14:37:01','2019-08-15 14:37:01',596,78,NULL,NULL),(20,'hgfsdgdgsdfsfa',NULL,'2019-08-16 04:48:47','2019-08-16 04:48:47',596,78,NULL,NULL),(21,'hahaha',NULL,'2019-08-16 07:16:15','2019-08-16 07:16:15',596,80,NULL,NULL);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postv1Id` int(10) unsigned DEFAULT NULL,
  `reportedBy` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postv1Id` (`postv1Id`),
  KEY `reportedBy` (`reportedBy`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`postv1Id`) REFERENCES `postv1` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`reportedBy`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'I am not interested in this Post','2019-02-18 17:14:05','2019-02-18 17:14:05',16,NULL);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top_stories`
--

DROP TABLE IF EXISTS `top_stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `top_stories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `interestId` int(10) unsigned DEFAULT NULL,
  `interestCategoryId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `interestId` (`interestId`),
  KEY `interestCategoryId` (`interestCategoryId`),
  CONSTRAINT `top_stories_ibfk_1` FOREIGN KEY (`interestId`) REFERENCES `interest` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `top_stories_ibfk_2` FOREIGN KEY (`interestCategoryId`) REFERENCES `interest_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top_stories`
--

LOCK TABLES `top_stories` WRITE;
/*!40000 ALTER TABLE `top_stories` DISABLE KEYS */;
/*!40000 ALTER TABLE `top_stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `aboutMe` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accomplishments` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tokenActiveDate` datetime DEFAULT NULL,
  `isSuspended` tinyint(1) DEFAULT NULL,
  `profilePicture` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'avatar',
  `socialImage` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profilePrivacy` tinyint(1) DEFAULT '0',
  `protectPost` tinyint(1) DEFAULT '1',
  `facebookId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedinId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `googleId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `schoolName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institutionName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `yearOfIncorporation` datetime DEFAULT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userTypeId` int(10) unsigned DEFAULT NULL,
  `userPrivacyId` int(10) unsigned DEFAULT NULL,
  `campusId` int(10) unsigned DEFAULT NULL,
  `email_send_date` datetime DEFAULT NULL,
  `last_logging_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userTypeId` (`userTypeId`),
  KEY `userPrivacyId` (`userPrivacyId`),
  KEY `campusId` (`campusId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `user_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`userPrivacyId`) REFERENCES `user_privacy` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`campusId`) REFERENCES `campus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Test','Test','25f9e794323b453885f5181f1b624d0b','test.gkyb+1@gmail.com',NULL,NULL,NULL,'5JJbdchoytVouSJlSULzP4mhY0JbvLaJ','2019-01-13 09:01:13',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Test','1993-10-20 18:30:00','Gandhinagar','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-12 09:01:13','2019-01-12 09:05:55',1,NULL,NULL,NULL,NULL),(2,'Test','User','0ee0646c1c77d8131cc8f4ee65c7673b','test@test.com',NULL,NULL,NULL,'8GQQckEESs57qglLCVRekYcLA4Rr5rb3',NULL,NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-12 09:05:12','2019-01-12 09:05:12',NULL,NULL,1,NULL,NULL),(3,'Tony','Sims','20848550619d01e3d2949baa79c5144a','gabriel@peersview.com',NULL,NULL,NULL,'Zt9bSI5wQpgVqPSaPn6fZCPkwcrDZvdK','2019-01-13 10:32:25',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'University of Leeds','1997-02-01 23:00:00','Leeds','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-12 10:32:25','2019-01-12 10:34:55',1,NULL,NULL,NULL,NULL),(4,'Tony','Graham','20848550619d01e3d2949baa79c5144a','adekunle.amodu@yahoo.co.uk',NULL,NULL,NULL,NULL,'2019-01-13 10:55:03',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-12 10:55:03','2019-01-12 10:55:03',NULL,NULL,NULL,NULL,NULL),(5,'Adekunle','Amodu',NULL,'adedaboss5@gmail.com',NULL,NULL,NULL,'G42qr7JuD26fjQpKxmfFJaAjZ1s0adJc',NULL,NULL,'avatar','https://lh4.googleusercontent.com/-1KQHRJsR_2o/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcaXeVpVsAP3vq6m0yJ0ARnZH-vysw/s96-c/photo.jpg',0,1,NULL,NULL,'100042912075416850267','University of Manchester','1998-03-01 23:00:00','London','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-12 11:11:35','2019-01-12 11:13:05',1,NULL,NULL,NULL,NULL),(6,'Tom','Graham','20848550619d01e3d2949baa79c5144a','tonyogbu41@gmail.com',NULL,NULL,NULL,NULL,'2019-01-13 12:08:29',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-12 12:08:29','2019-01-12 12:08:29',NULL,NULL,NULL,NULL,NULL),(7,'Toyocy','Adeyemoh','a7e86f1e537e3460f1c50d8cac584818','diadeyemoh@gmail.com',NULL,NULL,NULL,'vVZc7yao36f9gpwQKPpcElmd4Gz4qqHV','2019-01-13 18:31:54',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Unilag','1996-10-16 23:00:00','Lagos','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-12 18:31:54','2019-01-12 18:38:10',1,NULL,NULL,NULL,NULL),(8,'John','WiIlis',NULL,'hihireme@gmx.com',NULL,NULL,NULL,'qXBtglqtGwqlZ4fi2VqG9ANh3DPxzvFx',NULL,NULL,'avatar','https://graph.facebook.com/2296723697216319/picture?type=normal',0,1,'2296723697216319',NULL,NULL,'Fiverr','2001-01-01 05:00:00','Fiverr','Prefer not to respond',NULL,NULL,NULL,NULL,NULL,'2019-01-12 19:39:00','2019-01-12 19:39:29',1,NULL,NULL,NULL,NULL),(9,'Kelly','Price','20848550619d01e3d2949baa79c5144a','Peersview@outlook.com',NULL,NULL,NULL,'hnMh9GS9y6paZuFwqscpZuNYer6TCdS7','2019-01-14 23:27:57',NULL,'hnMh9GS9y6paZuFwqscpZuNYer6TCdS7/ckce3kmzmd52zjmebvfi',NULL,0,1,NULL,NULL,NULL,'University of Birmingham','1998-02-01 23:00:00','Birmingham ','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-13 23:27:57','2019-01-16 21:10:04',1,NULL,NULL,NULL,NULL),(10,'Chimobi','Ucha',NULL,'rositaucha@gmail.com',NULL,NULL,NULL,'Gulu2rNiII6kefDJ7oRUs8ifTJ3KiRIp',NULL,NULL,'avatar','https://lh6.googleusercontent.com/-LpmNysaqOUw/AAAAAAAAAAI/AAAAAAAAAQQ/QixEpR7M2BE/s96-c/photo.jpg',0,1,NULL,NULL,'117558660805830025043',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-15 07:55:56','2019-01-15 07:55:56',NULL,NULL,NULL,NULL,NULL),(11,'Abimbola','solarin','10636f3395a086660af1b228785a3ace','Solarin_a@yahoo.com',NULL,NULL,NULL,'IOjr4RlfBWTnAUuYBva4AB2HgHH7XfOH','2019-01-16 22:04:31',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Afe Babalola University','1994-03-19 23:00:00','Lagos ','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-15 22:04:31','2019-01-15 22:09:18',1,NULL,NULL,NULL,NULL),(12,'Eseosa','Odemwingie','e7d6e8d2f667d7783aba245b6af571bc','odemwingieoe@yahoo.com',NULL,NULL,NULL,'S213QFIHrd6aeH5MdijDrVqHF6sNSvTP','2019-01-17 11:03:06',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'caleb university','1999-03-18 00:00:00','Magodo','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-16 11:03:06','2019-01-16 11:06:11',1,NULL,NULL,NULL,NULL),(13,'Ola','Aregbesola','3abb7de4f4a5ea3d873e0b7b87f648d4','ola.kerk@hotmail.com',NULL,NULL,NULL,'OQVKGt6mc670IRay8TFdoJHaucBICQID','2019-01-17 18:10:36',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'University of Kent','1996-11-13 00:00:00','Canterbury ','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-16 18:10:36','2019-01-16 18:13:37',1,NULL,NULL,NULL,NULL),(14,'edwin','ojogo',NULL,'ojogo.edwin3@gmail.com',NULL,NULL,NULL,'azJM8s4EMtLsc5LiHip7FU9YN0wvU0BF',NULL,NULL,'avatar','https://lh3.googleusercontent.com/-pHQ2UcjqxiQ/AAAAAAAAAAI/AAAAAAAAAB4/i8Jtr14tFhI/s96-c/photo.jpg',0,1,NULL,NULL,'106669686795324836353','Nigeria Police Academy','1997-03-03 23:00:00','Kano','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-16 22:20:57','2019-01-16 22:22:14',1,NULL,NULL,NULL,NULL),(15,'Ryan','Bontemps','20848550619d01e3d2949baa79c5144a','christpraisejet@gmail.com',NULL,NULL,NULL,'73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr','2019-01-18 07:37:11',NULL,'73fLoBLcFwMGrWGJiWQTLtFpVVFYjnxr/tmh91xehfai3yutrbywv',NULL,0,1,NULL,NULL,NULL,'Tufts University','1999-06-01 23:00:00','Massachusetts','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-17 07:37:11','2019-01-20 07:42:12',1,NULL,NULL,NULL,NULL),(16,'Ian','Greene','20848550619d01e3d2949baa79c5144a','tomrush756@gmail.com',NULL,NULL,NULL,'lUWbl6c6yPI0aKDTUB2jgIm2cnlK1bdH','2019-01-18 08:06:00',NULL,'lUWbl6c6yPI0aKDTUB2jgIm2cnlK1bdH/mjixoecehwsi7xeliepf',NULL,0,1,NULL,NULL,NULL,'University of Toronto','1998-06-01 23:00:00','Toronto','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-17 08:06:00','2019-01-24 21:35:17',1,NULL,NULL,NULL,NULL),(17,'Sarah','Montes','20848550619d01e3d2949baa79c5144a','montessarah4@gmail.com',NULL,NULL,NULL,'LNXqmFQhqc7VmBcCedFbXcJMZVJQHFgj','2019-01-18 08:16:58',NULL,'LNXqmFQhqc7VmBcCedFbXcJMZVJQHFgj/eimgfordvidjigh02i0t',NULL,0,1,NULL,NULL,NULL,'University of Guelph','2000-06-01 23:00:00','Gueiph','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-17 08:16:58','2019-01-20 08:03:14',1,NULL,NULL,NULL,NULL),(18,'Caraline','Edwards','20848550619d01e3d2949baa79c5144a','caralinee403@yahoo.com',NULL,NULL,NULL,'YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i','2019-01-18 08:59:55',NULL,'YswaJ2tYua89cLtlVx5OIkRXLZMcFm5i/vovkinmsf975wyjmllqf',NULL,0,1,NULL,NULL,NULL,'Ryerson University','1998-08-01 23:00:00','Toronto','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-17 08:59:55','2019-01-20 07:33:16',1,NULL,NULL,NULL,NULL),(19,'PA','Technology',NULL,'pa.technology.90@gmail.com',NULL,NULL,NULL,'LNyj8as1CBW2SCcAaeVRGewxlOKbYEzk',NULL,NULL,'avatar','https://lh3.googleusercontent.com/-I-nKRYQBlBc/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcYYskrkiF3-akkUIq4SqlFRj46OcA/s96-c/photo.jpg',0,1,NULL,NULL,'114329889775491536093','Pa','2019-01-07 18:30:00','ahmedabad','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-19 10:04:37','2019-01-19 12:23:26',1,NULL,NULL,NULL,NULL),(20,'Pa','Tech','a95d49a2b7b205fe6823b77d2e25cdcd','pa@pa.pa',NULL,NULL,NULL,NULL,'2019-01-20 12:16:37',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-19 12:16:37','2019-01-19 12:16:37',NULL,NULL,NULL,NULL,NULL),(21,'Pujan','Shah',NULL,'shahpujanjio@gmail.com',NULL,NULL,NULL,'7jeQ7uVSTUHfo3zNLDpYBBWik2RlewIt',NULL,NULL,'avatar','https://lh5.googleusercontent.com/-6Zix1Hd9uZ8/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcbkkeOB5SyHzJp40oHxJVUxXVsR7Q/s96-c/photo.jpg',0,1,NULL,NULL,'110208890632781705833',NULL,NULL,'Baroda',NULL,NULL,NULL,'Rollwala','2014-01-01 00:00:00','www.pa.com','2019-01-19 12:31:52','2019-01-19 13:22:58',3,NULL,NULL,NULL,NULL),(22,'Thomas','Hill','dd1febf755561c8c40fe61bab660f3b3','thomashill1026@outlook.com',NULL,NULL,NULL,'vAgFxsuRcwPjZSwTOv3oqbvI79wpUvZo','2019-01-20 13:59:49',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Tx','1994-03-03 05:00:00','city','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-19 13:59:49','2019-01-19 14:11:47',1,NULL,NULL,NULL,NULL),(23,'Neha','Kumar',NULL,'neha.kumar030201@gmail.com',NULL,NULL,NULL,'V9oiuH21JJ4g6Pe6JarnOjXDCi4Tipo7',NULL,NULL,'avatar','https://lh6.googleusercontent.com/-OoT1-Pqa5n4/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwca9LDZSuxWpGiKUn_5QA-2am1veQA/s96-c/photo.jpg',0,1,NULL,NULL,'105353776056554751176','Auckland University','2001-02-02 11:00:00','Auckland, NZ','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-20 01:24:02','2019-01-20 01:25:47',1,NULL,NULL,NULL,NULL),(24,'moutasem','h',NULL,'moutasemhseifi@gmail.com',NULL,NULL,NULL,'DrTXo9ex1LUwv4g4u2zu7ca5mrnjH1VA',NULL,NULL,'avatar','https://lh3.googleusercontent.com/-VkiNZRQ52qE/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcaErUct8MaaPfNiEBB-ORkL-y-TkQ/s96-c/photo.jpg',0,1,NULL,NULL,'112499854013852422262','university of windsor','1998-01-25 05:00:00','Windsor ','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-20 03:03:52','2019-01-20 03:04:57',1,NULL,NULL,NULL,NULL),(25,'Danijel','Mekiho','6a204bd89f3c8348afd5c77c717a097a','danijelwebmobile@gmail.com',NULL,NULL,NULL,'sTDuZcEv7Q4bm1T8DAuKn4Sc729WgLxL','2019-01-21 15:41:59',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'LonDon University','1990-02-02 16:00:00','LonDon','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-20 15:41:59','2019-01-20 16:31:46',1,NULL,NULL,NULL,NULL),(26,'Cristina','Folarin',NULL,'tinafolarin@gmail.com',NULL,NULL,NULL,'lBymJZ5teF4y8cUdVMvHR0MKejt9vExm',NULL,NULL,'avatar','https://lh6.googleusercontent.com/-NBXMK-0JxP4/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcbQRm77ZnuSKHVZbZ-3EAqwHdBN0A/s96-c/photo.jpg',0,1,NULL,NULL,'102370740773643966091','royal holloway university','1992-09-29 23:00:00','London','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-20 20:51:54','2019-01-20 20:54:06',1,NULL,NULL,NULL,NULL),(27,'Angel','Akabuno',NULL,'angel.aakabuno@gmail.com',NULL,NULL,NULL,'d2dXj3PTD1XrIPicD6TPhosz0QdZqHex',NULL,NULL,'avatar','https://graph.facebook.com/2121387554574245/picture?type=normal',0,1,'2121387554574245',NULL,NULL,'university of british columbia','1998-07-30 07:00:00','Kelowna','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-21 06:26:26','2019-01-21 06:36:05',1,NULL,NULL,NULL,NULL),(28,'Nimi','Selekere','3df14b8e754fbc3e28ddf9eb9b7579f8','Snimibra@gmail.com',NULL,NULL,NULL,'nTIPi5zcTdoKivLiYuy2x9v5XQJfEu1R','2019-01-23 08:49:05',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-22 08:49:05','2019-01-22 08:50:20',NULL,NULL,NULL,NULL,NULL),(29,'Roopesh','Dhara','d46307915920f95d29a34a43e4753298','dharar@uwindsor.ca',NULL,NULL,NULL,'egl3xh9FS50XM48DjsG40Wg44E9rEtP4','2019-01-23 17:11:24',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-22 17:11:24','2019-01-22 17:22:09',NULL,NULL,NULL,NULL,NULL),(30,'Sam','Ezeoke',NULL,'w6v74@students.keele.ac.uk',NULL,NULL,NULL,'y7cHQ3cLmtQjRSpXb7R9wnsegtx44VE8',NULL,NULL,'avatar','https://lh3.googleusercontent.com/-hnZYg1HqaRE/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZf5akDxH3_htaS7eJ5bdCyT_1DGg/s96-c/photo.jpg',0,1,NULL,NULL,'110890592731752317880','Keele university','1997-08-10 23:00:00','London','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-22 19:35:04','2019-01-22 19:38:54',1,NULL,NULL,NULL,NULL),(31,'Winnie','Lambo','79458572bed2fc324d94c967e8449ebe','winifredlambo@hotmail.co.uk',NULL,NULL,NULL,'ivLzr6qXmfPsvvkOTNONrBiK1e8tXeuZ','2019-01-23 20:08:40',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'University of Birmingham','2000-05-13 23:00:00','Birmingham','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-22 20:08:40','2019-01-22 20:10:11',1,NULL,NULL,NULL,NULL),(32,'Phalecs','Jagboro',NULL,'phalecs@googlemail.com',NULL,NULL,NULL,'2auAqRe4DnYzubKNYhgQNph51IQmXZ6U',NULL,NULL,'avatar','https://lh6.googleusercontent.com/-_N6vrUnDjO4/AAAAAAAAAAI/AAAAAAAAErA/Or46N5ePy8w/s96-c/photo.jpg',0,1,NULL,NULL,'104334175596046572688','Caleb University','1992-07-23 23:00:00','London','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-23 07:43:54','2019-01-23 07:44:41',1,NULL,NULL,NULL,NULL),(33,'Greg','Prifti',NULL,'gmarkagency18@gmail.com',NULL,NULL,NULL,'sveZeI3jYM4ZLM5hzYb5upN8UFYxGOgw',NULL,NULL,'avatar','https://graph.facebook.com/348395602668814/picture?type=normal',0,1,'348395602668814',NULL,NULL,NULL,NULL,'Tirana',NULL,NULL,NULL,'Rudina','2001-01-01 00:00:00','gmarkagency.com','2019-01-23 09:42:11','2019-01-23 09:43:56',3,NULL,NULL,NULL,NULL),(34,'Edwig','Munangati',NULL,'muffz202@gmail.com',NULL,NULL,NULL,'3GnvFmofrEKFIcq0mCdGN7N6bhsmMcaK',NULL,NULL,'avatar','https://graph.facebook.com/2606127236070700/picture?type=normal',0,1,'2606127236070700',NULL,NULL,'university of winnipeg','1996-10-02 05:00:00','Winnipeg','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-23 21:29:10','2019-01-23 21:30:16',1,NULL,NULL,NULL,NULL),(35,'Tomike','Kaffo','d9b9e7ac5b5cee184d2330aeeac4fc4d','tomikekaffo@gmail.com',NULL,NULL,NULL,'ZlRkQvc71gYvXtoLULamyyHPE3Ch1gYu','2019-01-24 22:24:30',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'University of Kent','1999-08-23 23:00:00','London','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-23 22:24:30','2019-01-23 22:26:30',1,NULL,NULL,NULL,NULL),(36,'Camelia','Florentina',NULL,'atomei_camelia@yahoo.com',NULL,NULL,NULL,'j9lCfYkyoaeOvX3TgH1z5s1Ycl3F5k15',NULL,NULL,'avatar','https://graph.facebook.com/317658402214032/picture?type=normal',0,1,'317658402214032',NULL,NULL,'university of suffolk','1998-08-22 21:00:00','Ipswich','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-24 14:41:28','2019-01-24 14:43:18',1,NULL,NULL,NULL,NULL),(37,'Hamza','Boutayeb',NULL,'hamza-b@hotmail.com',NULL,NULL,NULL,'0y4nkazoObC5phIwKNdqFncbLQJJFEbK',NULL,NULL,'avatar','https://graph.facebook.com/2243508059025445/picture?type=normal',0,1,'2243508059025445',NULL,NULL,'université Laval','1995-12-14 05:00:00','Québec ','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-24 20:59:11','2019-01-24 21:01:02',1,NULL,NULL,NULL,NULL),(38,'Clinton','Obi',NULL,'clintonobi15@gmail.com',NULL,NULL,NULL,'DPqc8UhMllERwuQTppKDLciziZti5F5p',NULL,NULL,'avatar','https://lh5.googleusercontent.com/-Qwqvu8GREJY/AAAAAAAAAAI/AAAAAAAAATw/EW7b8BQFtgU/s96-c/photo.jpg',0,1,NULL,NULL,'114965323835694804953','Ambrose Alli University','2001-07-20 23:00:00','Ekpoma ','Male',NULL,NULL,NULL,NULL,NULL,'2019-01-25 15:54:08','2019-01-25 15:56:22',1,NULL,NULL,NULL,NULL),(39,'Theresa','Badero','5a855f4b59e8d00be28bc51ef6a1ceb9','theresab93@ymail.com',NULL,NULL,NULL,NULL,'2019-01-26 16:39:49',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-25 16:39:49','2019-01-25 16:39:49',NULL,NULL,NULL,NULL,NULL),(40,'Temidayo','Oyepitan','216ad467c8d71c67e3085252205b1fcc','temidayooyepitan@hotmail.com',NULL,NULL,NULL,'PXYZn8fnkxjSaIXVIIyq1izTWCTvy6nT','2019-01-26 19:26:38',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-25 19:26:38','2019-01-25 19:27:28',NULL,NULL,NULL,NULL,NULL),(41,'Ogbleba','Grace','8e5673e0f26fb51a6dc4aeea62bcd1c5','ogbgracey@gmail.com',NULL,NULL,NULL,'MFujdkgsR6B7sLy7xag2OYPVssW4Yeho','2019-01-27 18:10:04',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Ghana Technology University College','2000-04-30 00:00:00','Accra ','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-26 18:10:04','2019-01-26 18:13:03',1,NULL,NULL,NULL,NULL),(42,'Srujana','yerrapragada','78ed2d93cd2fe275d931db2dab8cd295','srujana.srujana10@gmail.com',NULL,NULL,NULL,'O5ai5hSP9wk1jeLc5l1FnzTAoOFlVmlL','2019-01-28 01:04:27',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'university of windsor','1993-11-19 05:00:00','Windsor','Female',NULL,NULL,NULL,NULL,NULL,'2019-01-27 01:04:27','2019-01-27 01:06:15',1,NULL,NULL,NULL,NULL),(43,'Lavinia','Hunte','6d341b499cee26e8e2fb7deac4e22268','laviniahunte1709@hotmail.co.uk',NULL,NULL,NULL,'XG7lWeWi2oGjs8p4QpxTG8tTR0sASJej','2019-01-31 11:09:25',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-01-30 11:09:25','2019-01-30 11:10:14',NULL,NULL,NULL,NULL,NULL),(44,'Adebayo','Idowu','22271ed6eaf69248f28490ceeadf20bd','Aderules88@yahoo.com',NULL,NULL,NULL,'5fMuaUAmQtmK6zgb7KhjYI1jcSIkjpMb','2019-02-02 21:38:05',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,'1988-11-02 00:00:00','Dartford',NULL,NULL,'NHS',NULL,NULL,NULL,'2019-02-01 21:38:05','2019-02-01 21:46:00',2,NULL,NULL,NULL,NULL),(45,'Solarin','Olaiyan','10636f3395a086660af1b228785a3ace','Solarin4000@gmail.com',NULL,NULL,NULL,'gukCEXNP18K9BUV2uWARHFhIx7ShnHpr','2019-02-06 22:37:40',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'afe babalola','0094-04-19 23:00:00','Lagos ','Female',NULL,NULL,NULL,NULL,NULL,'2019-02-05 22:37:40','2019-02-05 22:59:51',1,NULL,NULL,NULL,NULL),(46,'Modestas','Banys','93ebe5479352e7a96f9eade8f49f21b9','mbaniukas@gmail.com',NULL,NULL,NULL,NULL,'2019-02-08 04:50:39',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-02-07 04:50:39','2019-02-07 04:50:39',NULL,NULL,NULL,NULL,NULL),(47,'Yannick','Heyne','8d4b17a8c26c6d2527dc5f276e988171','yheyne@pauly.de',NULL,NULL,NULL,'QiEjzVt7XVSiOb5Fv5Et9s1MkW2hPg0l','2019-02-12 14:06:58',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,'Offheim',NULL,NULL,NULL,'Pauly','2017-01-01 00:00:00','www.pauly.de','2019-02-11 14:06:58','2019-02-11 14:28:05',3,NULL,NULL,NULL,NULL),(48,'daniel','wayne','1e55dbf412cb74d5e2c21fb6452408c7','wayne4989@yahoo.com',NULL,NULL,NULL,'12tG8vIj49QCV841F71Kz8zw3FrgCRBx','2019-02-18 05:49:31',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'asd','2016-02-08 22:00:00','new york','Male',NULL,NULL,NULL,NULL,NULL,'2019-02-17 05:49:31','2019-02-17 05:53:33',1,NULL,NULL,NULL,NULL),(49,'David','Castellar',NULL,'davidcastellar33@gmail.com',NULL,NULL,NULL,'4webNp5RgaG65qWABcoPFRvanX00ZxfN',NULL,NULL,'4webNp5RgaG65qWABcoPFRvanX00ZxfN/x8citqshjze05umxxqfy','https://lh5.googleusercontent.com/-Kz9vVMMkDoY/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQMBC1IoXH7cNwLu_ATRKTF4PGgIdQ/s96-c/photo.jpg',0,1,NULL,NULL,'112357482732660821841','University of the people','1981-12-05 07:00:00','Salt lake city','Male',NULL,NULL,NULL,NULL,NULL,'2019-02-17 22:24:06','2019-02-17 22:40:14',1,NULL,NULL,NULL,NULL),(50,'Stacey','Myles','22560dfe0d1d4186e165f0c1d8cc3c66','anneskiragu@gmail.com',NULL,NULL,NULL,'Vm0CRaSM1kEaSxJaTeyDaj9HikRrbJxe','2019-02-19 19:57:30',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-02-18 19:57:30','2019-02-18 20:01:33',NULL,NULL,NULL,NULL,NULL),(51,'maria','angela',NULL,'mariaangelamagtoto@gmail.com',NULL,NULL,NULL,'4NSEGqx0wYjDqEcVrveqck3KePpRVWnx',NULL,NULL,'avatar','https://lh4.googleusercontent.com/-WQowBvns3Es/AAAAAAAAAAI/AAAAAAAAASw/qgwjjaAOG-M/s96-c/photo.jpg',0,1,NULL,NULL,'116178273033904828429',NULL,'1994-11-01 16:00:00','asdasd',NULL,NULL,'asdasdas',NULL,NULL,NULL,'2019-02-19 12:58:49','2019-02-19 12:59:02',2,NULL,NULL,NULL,NULL),(52,'Mo','Prairie','e1d9a3e301d47f4806bf64a41c47fa7c','maryampinkanni@yahoo.com',NULL,NULL,NULL,'5LIWUZz6i8ipk3FaaosSy4SGZzNLTLWv','2019-02-21 18:22:36',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Afe Babalola University','1999-03-09 23:00:00','Ado','Female',NULL,NULL,NULL,NULL,NULL,'2019-02-20 18:22:36','2019-02-20 18:26:27',1,NULL,NULL,NULL,NULL),(53,'wayne','lee','1e55dbf412cb74d5e2c21fb6452408c7','waynelee4989@zoho.com',NULL,NULL,NULL,'2ZLbYmODvMwJjWxuaSRSh563DXqMWnzf','2019-02-26 11:24:09',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,'1989-01-06 16:00:00','London',NULL,NULL,'mzn l.t.d',NULL,NULL,NULL,'2019-02-25 11:24:09','2019-02-25 11:29:08',2,NULL,NULL,NULL,NULL),(54,'wayne','woll','1e55dbf412cb74d5e2c21fb6452408c7','wayne.woll4989@gmail.com',NULL,NULL,NULL,'r5yANR2YPucqRznzMZAefr3FBRSaDGKg','2019-02-26 11:56:37',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-02-25 11:56:37','2019-02-25 11:57:59',NULL,NULL,NULL,NULL,NULL),(55,'wayne','daline','1e55dbf412cb74d5e2c21fb6452408c7','waynedalin4989@zoho.eu',NULL,NULL,NULL,'HRKgJsNrjKVvL7dnzPhivcdsYJDlqfG6','2019-02-26 14:24:38',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'g','2019-02-25 16:00:00','h','Male',NULL,NULL,NULL,NULL,NULL,'2019-02-25 14:24:38','2019-02-25 16:37:46',1,NULL,NULL,NULL,NULL),(56,'viga','razvan','1e55dbf412cb74d5e2c21fb6452408c7','razvan4989@mail.ru',NULL,NULL,NULL,'ecHD4ncXYtCJiRLKPLjyLrFiDo0f2ma7','2019-02-26 16:39:09',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'senior education','1992-06-16 16:00:00','liverpool','Male',NULL,NULL,NULL,NULL,NULL,'2019-02-25 16:39:09','2019-02-25 16:41:08',1,NULL,NULL,NULL,NULL),(57,'Oyindamola','Abolade',NULL,'aboladedamola@gmail.com',NULL,NULL,NULL,'JtDWLVX6PHXd9nx0BaevItydIUvbQSCN',NULL,NULL,'avatar','https://lh5.googleusercontent.com/-VqH-9zQnftA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdMmXJAf7OmR74V-b2uQ_CtCz2Y7Q/s96-c/photo.jpg',0,1,NULL,NULL,'116730398861193377629','university of lagos','1994-01-31 23:00:00','Lagos ','Female',NULL,NULL,NULL,NULL,NULL,'2019-03-07 09:06:35','2019-03-07 09:08:47',1,NULL,NULL,NULL,NULL),(58,'CHIEMEKA,','EVELY','98470701c153370f2f694dd43832b794','queensimi2016@gmail.com',NULL,NULL,NULL,'LNbP2vZ1aJpmoDXEOUTUeMsJ8dmPJDqF','2019-03-08 09:24:46',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Universityof lagos','1993-03-03 23:00:00','Lagos','Female',NULL,NULL,NULL,NULL,NULL,'2019-03-07 09:24:46','2019-03-07 09:27:44',1,NULL,NULL,NULL,NULL),(59,'Obaleye','Oluwafunminiyi','d66fba1303cd3296615138d3bbb211b6','nehyooseun@gmail.com',NULL,NULL,NULL,NULL,'2019-03-08 12:11:55',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-03-07 12:11:55','2019-03-07 12:11:55',NULL,NULL,NULL,NULL,NULL),(60,'Jeffrey','Ogbeide',NULL,'jeffzyme@gmail.com',NULL,NULL,NULL,'LdsovloIHoGT9TIjLqV0LgcevSRshDlU',NULL,NULL,'avatar','https://lh4.googleusercontent.com/-rR4RFiLKY8g/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rewlllDk7cmprMQgV1DO9xWduVjJA/s96-c/photo.jpg',0,1,NULL,NULL,'109285640320050487287','university of Lagos','1990-01-11 23:00:00','Lagos','Male',NULL,NULL,NULL,NULL,NULL,'2019-03-07 20:07:17','2019-03-07 20:12:17',1,NULL,NULL,NULL,NULL),(61,'Weronika','Rosińska',NULL,'w.rosinska00@gmail.com',NULL,NULL,NULL,'altR0CKJSaYAIh3V0pOVG4Mv9ZPKev52',NULL,NULL,'avatar','https://lh6.googleusercontent.com/-a5cw4NpgEsc/AAAAAAAAAAI/AAAAAAAAHUY/KY4SgmG89go/s96-c/photo.jpg',0,1,NULL,NULL,'104640718872365465277','London South Bank University','2000-08-14 22:00:00','London','Female',NULL,NULL,NULL,NULL,NULL,'2019-03-10 08:43:37','2019-03-10 12:51:51',1,NULL,NULL,NULL,NULL),(62,'Peter','Adebayo','7fbc1bec3a83447420782ad911b68f58','ideagates@gmail.com',NULL,NULL,NULL,'YP7OVJap5NblXJfpVLnTfSCdsxlyJYuI','2019-03-12 17:55:26',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-03-11 17:55:26','2019-03-11 17:59:38',NULL,NULL,NULL,NULL,NULL),(63,'forest','future','25f9e794323b453885f5181f1b624d0b','forestfuture89@gmail.com',NULL,NULL,NULL,'XBXSKPl4pvEGydVO3WqCyNWlx2aPdgex','2019-03-14 13:17:15',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'test','1989-02-09 00:00:00','country','Male',NULL,NULL,NULL,NULL,NULL,'2019-03-13 13:17:15','2019-03-13 13:18:34',1,NULL,NULL,NULL,NULL),(64,'web','developer','25f9e794323b453885f5181f1b624d0b','web.developer916@gmail.com',NULL,NULL,NULL,'4PCdOXiRJcb22aZ53pnXtQO22p450JAD','2019-03-14 13:32:49',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-03-13 13:32:49','2019-03-13 13:33:23',NULL,NULL,NULL,NULL,NULL),(65,'Quan','Wang',NULL,'jonmr0727@gmail.com',NULL,NULL,NULL,'gnaQ9dwBsUwk13BteUKNPsXpsRrs3GjH',NULL,NULL,'avatar','https://lh4.googleusercontent.com/-ftoFUg2eTks/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfakcuyAvaMf3DrvTjjjeTWRCLONw/s96-c/photo.jpg',0,1,NULL,NULL,'110211219727359922939',NULL,'2001-01-11 16:00:00','england',NULL,NULL,'eb',NULL,NULL,NULL,'2019-03-18 00:27:24','2019-03-18 00:34:16',2,NULL,NULL,NULL,NULL),(66,'Chang','Jin',NULL,'wangboris@hotmail.com',NULL,NULL,NULL,'zIC8JqWzNzFAtGupkD0lPTKtd4c4i9Ra',NULL,NULL,'avatar','https://graph.facebook.com/265115994407322/picture?type=normal',0,1,'265115994407322',NULL,NULL,NULL,'2001-06-11 16:00:00','city',NULL,NULL,'company',NULL,NULL,NULL,'2019-03-18 00:34:48','2019-03-18 00:35:24',2,NULL,NULL,NULL,NULL),(67,'Alexander','Johansen','b5df3b8793b6a7aa8995ef5cca23270a','alexander.johansen.g0711@gmail.com',NULL,NULL,NULL,'k1ZDkITIxvx7lsj2Fm0kxT1LVPVYbKl8','2019-03-19 00:35:25',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'aaa','2019-03-17 16:00:00','bbbb','Male',NULL,'aaa',NULL,NULL,NULL,'2019-03-18 00:35:25','2019-03-18 00:43:19',2,NULL,NULL,NULL,NULL),(68,'Rona','Evezi',NULL,'evezirona@gmail.com',NULL,NULL,NULL,'KqOB5AQD78fGvqf713FwDr8jDxKNyNWV',NULL,NULL,'avatar','https://lh4.googleusercontent.com/-9p7pdkvF_AQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reMafX7b3Fz6mk0LNqHD-J0usjCqg/s96-c/photo.jpg',0,1,NULL,NULL,'117742457910679265122',NULL,'1998-07-01 23:00:00','lagos',NULL,NULL,'Adams',NULL,NULL,NULL,'2019-03-18 00:41:20','2019-03-18 00:42:36',2,NULL,NULL,NULL,NULL),(69,'Jo-Ries','Canino',NULL,'joriespringcanino@gmail.com',NULL,NULL,NULL,'5PijE8x3yjGmV1PiPPgSSG2tU8vfig5q',NULL,NULL,'avatar','https://lh3.googleusercontent.com/-ap9nIRjHmdo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2spZmKoMhRU3SASR8dgP7oS7HrQ/s96-c/photo.jpg',0,1,NULL,NULL,'100330148836798930308','Holy Angel University','1987-08-12 21:00:00','Angeles City','Male',NULL,NULL,NULL,NULL,NULL,'2019-03-28 09:49:44','2019-03-28 09:51:26',1,NULL,NULL,NULL,NULL),(70,'John','Smith',NULL,'cpvdmwypys_1543823215@tfbnw.net',NULL,NULL,NULL,'SuqsunQNlVncSu4BLvZLyKWiVnmhduw3',NULL,NULL,'avatar','https://graph.facebook.com/10150061672371189/picture?type=normal',0,1,'10150061672371189',NULL,NULL,'sacscs','1996-04-09 16:00:00','singapore','Male',NULL,NULL,NULL,NULL,NULL,'2019-04-15 05:59:45','2019-04-15 06:00:27',1,NULL,NULL,NULL,NULL),(71,'ABOOH','IFUNANYA',NULL,'sarahifunanya95@gmail.com',NULL,NULL,NULL,'ScBw3wrqpAbILCFLZOQGCTXnJ4w6a5DL',NULL,NULL,'avatar','https://lh3.googleusercontent.com/-hH_A19UqaCA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfFWn1gt_qm66KXf3G8Dvw78l6Mtw/s96-c/photo.jpg',0,1,NULL,NULL,'114044924434527832379',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-04-22 12:00:06','2019-04-22 12:00:06',NULL,NULL,NULL,NULL,NULL),(72,'orange','dev','9cef246c3b19137a46155edab035b49b','glassocto@gmail.com',NULL,NULL,NULL,NULL,'2019-04-25 13:36:06',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-04-24 13:36:06','2019-04-24 13:36:06',NULL,NULL,NULL,NULL,NULL),(73,'test','test','cd84d683cc5612c69efe115c80d0b7dc','testred@mailinator.com',NULL,NULL,NULL,'Pte9KcTvDOHiH2F4GiUMDU8HlPevCNXZ','2019-05-17 10:00:53',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'ttttttttttttttttttttt','2019-05-29 18:30:00','UUU','Male',NULL,NULL,NULL,NULL,NULL,'2019-05-16 10:00:53','2019-05-21 06:15:54',1,NULL,NULL,NULL,NULL),(74,'ggggggg','ggggggg','cd84d683cc5612c69efe115c80d0b7dc','gggggg@mailinator.com',NULL,NULL,NULL,NULL,'2019-05-22 06:17:31',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-05-21 06:17:31','2019-05-21 06:17:31',NULL,NULL,NULL,NULL,NULL),(75,'Ashish','Rana','83609f3ea983eb5c5c275ab4e0022b3a','ashisharana@yahoo.com',NULL,NULL,NULL,'VM5wGWADLqEVajfoI215J3SvfdERH63j','2019-06-08 05:18:02',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Sir j j','1993-10-31 18:30:00','Surat','Male',NULL,NULL,NULL,NULL,NULL,'2019-06-07 05:18:02','2019-06-07 05:19:40',1,NULL,NULL,NULL,NULL),(76,'Siddharth','Sarfale','25d55ad283aa400af464c76d713c07ad','uwoppacek-3170@yopmail.com',NULL,NULL,NULL,'81mJS2RJLpzB6g4q61UBCwZsuo1JdUQU','2019-06-11 06:29:48',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Sir j j','1969-12-30 18:30:00','Surat','Male',NULL,NULL,NULL,NULL,NULL,'2019-06-10 06:29:48','2019-06-10 06:31:19',1,NULL,NULL,NULL,NULL),(77,'Siddharth','Sarfale','25d55ad283aa400af464c76d713c07ad','sarfalesiddharth@gmail.com',NULL,NULL,NULL,NULL,'2019-07-07 10:54:00',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-06 10:54:00','2019-07-06 10:54:00',NULL,NULL,NULL,NULL,NULL),(78,'Web','Dev','a236072942bea5db3e6c363adeba5dba','lazstar1127@gmail.com',NULL,NULL,NULL,'yCS2RwOI05ciK7dtFIyqlbrCxcrnX6pc','2019-08-14 07:56:10',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Test','2019-08-01 07:00:00','TEst','Male',NULL,NULL,NULL,NULL,NULL,'2019-08-13 07:56:10','2019-08-16 04:48:47',1,NULL,NULL,'2019-08-11 13:39:00','2019-08-16 04:48:47'),(79,'Mi','Talent','a236072942bea5db3e6c363adeba5dba','mitalent821@gmail.com',NULL,NULL,NULL,'67ZWPHul9ryVXsS86JimcRkjHGPZx1bD','2019-08-15 08:36:25',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Academy of World','2016-01-05 08:00:00','New York','Male',NULL,NULL,NULL,NULL,NULL,'2019-08-14 08:36:25','2019-08-16 04:04:47',1,NULL,NULL,NULL,'2019-08-16 04:04:47'),(80,'Test','Test','a236072942bea5db3e6c363adeba5dba','luanzhi@yandex.com',NULL,NULL,NULL,'pfrLbS28GOQmLs6poeKXTzrgr3BInUai','2019-08-17 07:08:51',NULL,'avatar',NULL,0,1,NULL,NULL,NULL,'Hello World','2016-08-01 07:00:00','Hello World','Male',NULL,NULL,NULL,NULL,NULL,'2019-08-16 07:08:51','2019-08-16 07:16:15',1,NULL,NULL,NULL,'2019-08-16 07:16:15');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_course`
--

DROP TABLE IF EXISTS `user_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_course`
--

LOCK TABLES `user_course` WRITE;
/*!40000 ALTER TABLE `user_course` DISABLE KEYS */;
INSERT INTO `user_course` VALUES (1,'2019-01-12 09:05:55','2019-01-12 09:05:55',1,12),(2,'2019-01-12 10:34:55','2019-01-12 10:34:55',3,17),(3,'2019-01-12 11:13:05','2019-01-12 11:13:05',5,17),(4,'2019-01-12 18:38:10','2019-01-12 18:38:10',7,60),(5,'2019-01-12 19:39:29','2019-01-12 19:39:29',8,28),(6,'2019-01-13 23:33:52','2019-01-13 23:33:52',9,1),(7,'2019-01-15 22:09:18','2019-01-15 22:09:18',11,34),(8,'2019-01-16 11:06:11','2019-01-16 11:06:11',12,8),(9,'2019-01-16 18:13:37','2019-01-16 18:13:37',13,55),(10,'2019-01-16 22:22:14','2019-01-16 22:22:14',14,7),(11,'2019-01-17 07:47:46','2019-01-17 07:47:46',15,24),(12,'2019-01-17 08:12:52','2019-01-17 08:12:52',16,57),(13,'2019-01-17 08:35:09','2019-01-17 08:35:09',17,17),(14,'2019-01-17 09:03:54','2019-01-17 09:03:54',18,7),(15,'2019-01-19 10:05:53','2019-01-19 10:05:53',19,1),(16,'2019-01-19 10:05:53','2019-01-19 10:05:53',19,2),(17,'2019-01-19 10:05:53','2019-01-19 10:05:53',19,53),(18,'2019-01-19 10:05:53','2019-01-19 10:05:53',19,12),(19,'2019-01-19 14:11:47','2019-01-19 14:11:47',22,3),(20,'2019-01-20 01:25:47','2019-01-20 01:25:47',23,8),(21,'2019-01-20 01:25:47','2019-01-20 01:25:47',23,7),(22,'2019-01-20 01:25:47','2019-01-20 01:25:47',23,63),(23,'2019-01-20 03:04:57','2019-01-20 03:04:57',24,7),(24,'2019-01-20 16:31:46','2019-01-20 16:31:46',25,9),(25,'2019-01-20 20:54:06','2019-01-20 20:54:06',26,50),(26,'2019-01-20 20:54:06','2019-01-20 20:54:06',26,54),(27,'2019-01-21 06:27:10','2019-01-21 06:27:10',27,22),(28,'2019-01-22 19:38:54','2019-01-22 19:38:54',30,41),(29,'2019-01-22 20:10:11','2019-01-22 20:10:11',31,44),(30,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,1),(31,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,9),(32,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,10),(33,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,11),(34,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,12),(35,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,13),(36,'2019-01-23 07:44:41','2019-01-23 07:44:41',32,12),(37,'2019-01-23 21:30:16','2019-01-23 21:30:16',34,8),(38,'2019-01-23 22:26:30','2019-01-23 22:26:30',35,51),(39,'2019-01-24 14:42:20','2019-01-24 14:42:20',36,30),(40,'2019-01-24 14:43:18','2019-01-24 14:43:18',36,30),(41,'2019-01-24 21:01:02','2019-01-24 21:01:02',37,16),(42,'2019-01-25 15:56:22','2019-01-25 15:56:22',38,42),(43,'2019-01-26 18:13:03','2019-01-26 18:13:03',41,63),(44,'2019-01-27 01:06:15','2019-01-27 01:06:15',42,25),(45,'2019-02-01 21:46:00','2019-02-01 21:46:00',44,51),(46,'2019-02-05 22:59:51','2019-02-05 22:59:51',45,34),(47,'2019-02-17 05:53:33','2019-02-17 05:53:33',48,3),(48,'2019-02-17 22:24:49','2019-02-17 22:24:49',49,12),(49,'2019-02-19 12:59:02','2019-02-19 12:59:02',51,17),(50,'2019-02-20 18:26:27','2019-02-20 18:26:27',52,34),(51,'2019-02-25 11:29:08','2019-02-25 11:29:08',53,1),(52,'2019-02-25 16:37:46','2019-02-25 16:37:46',55,15),(53,'2019-02-25 16:41:08','2019-02-25 16:41:08',56,1),(54,'2019-03-07 09:08:47','2019-03-07 09:08:47',57,63),(55,'2019-03-07 09:08:47','2019-03-07 09:08:47',57,47),(56,'2019-03-07 09:27:44','2019-03-07 09:27:44',58,63),(57,'2019-03-07 20:12:17','2019-03-07 20:12:17',60,7),(58,'2019-03-10 08:44:54','2019-03-10 08:44:54',61,57),(59,'2019-03-13 13:18:34','2019-03-13 13:18:34',63,2),(60,'2019-03-18 00:28:20','2019-03-18 00:28:20',65,8),(61,'2019-03-18 00:35:24','2019-03-18 00:35:24',66,5),(62,'2019-03-18 00:40:55','2019-03-18 00:40:55',67,1),(63,'2019-03-18 00:42:36','2019-03-18 00:42:36',68,6),(64,'2019-03-18 00:43:19','2019-03-18 00:43:19',67,1),(65,'2019-03-28 09:51:26','2019-03-28 09:51:26',69,3),(66,'2019-04-15 06:00:27','2019-04-15 06:00:27',70,3),(67,'2019-05-21 06:15:54','2019-05-21 06:15:54',73,16),(68,'2019-06-07 05:19:40','2019-06-07 05:19:40',75,8),(69,'2019-06-10 06:31:20','2019-06-10 06:31:20',76,30),(70,'2019-08-13 08:13:54','2019-08-13 08:13:54',78,1),(71,'2019-08-14 08:38:19','2019-08-14 08:38:19',79,3),(72,'2019-08-16 07:14:09','2019-08-16 07:14:09',80,3);
/*!40000 ALTER TABLE `user_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_credits`
--

DROP TABLE IF EXISTS `user_credits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_credits` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `credits` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `courseId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `user_credits_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_credits_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=890 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credits`
--

LOCK TABLES `user_credits` WRITE;
/*!40000 ALTER TABLE `user_credits` DISABLE KEYS */;
INSERT INTO `user_credits` VALUES (1,'1_post',1,'2019-01-12 09:06:54','2019-01-12 09:06:54',1,NULL),(2,'1_postRating',3,'2019-01-12 09:07:03','2019-01-12 09:07:03',NULL,NULL),(3,'1communitypost',1,'2019-01-12 09:13:13','2019-01-12 09:13:13',1,NULL),(4,'2communitypost',1,'2019-01-12 09:14:06','2019-01-12 09:14:06',1,NULL),(5,'1_postReply',1,'2019-01-12 09:14:36','2019-01-12 09:14:36',1,NULL),(6,'3communitypost',1,'2019-01-12 09:51:29','2019-01-12 09:51:29',1,NULL),(7,'4communitypost',1,'2019-01-12 09:51:52','2019-01-12 09:51:52',1,NULL),(8,'2_post',1,'2019-01-12 10:37:06','2019-01-12 10:37:06',3,NULL),(9,'2_postRating',2,'2019-01-12 10:37:33','2019-01-12 10:37:33',NULL,NULL),(10,'2_postReply',1,'2019-01-12 10:38:17','2019-01-12 10:38:17',3,NULL),(11,'3_postReply',1,'2019-01-12 10:40:11','2019-01-12 10:40:11',3,NULL),(12,'5communitypost',1,'2019-01-12 10:42:11','2019-01-12 10:42:11',3,NULL),(13,'4_postReply',1,'2019-01-12 10:46:08','2019-01-12 10:46:08',3,NULL),(14,'1reply',1,'2019-01-12 10:47:48','2019-01-12 10:47:48',3,NULL),(15,'5_postReply',1,'2019-01-12 10:50:31','2019-01-12 10:50:31',3,NULL),(16,'6_postReply',1,'2019-01-12 14:30:28','2019-01-12 14:30:28',5,NULL),(17,'3_post',1,'2019-01-12 14:46:54','2019-01-12 14:46:54',5,NULL),(18,'4_post',1,'2019-01-12 18:37:51','2019-01-12 18:37:51',3,NULL),(19,'5_post',1,'2019-01-12 18:38:23','2019-01-12 18:38:23',3,NULL),(20,'7_postReply',1,'2019-01-13 06:54:50','2019-01-13 06:54:50',5,NULL),(21,'6_post',1,'2019-01-13 23:38:35','2019-01-13 23:38:35',9,NULL),(22,'7_post',1,'2019-01-14 14:56:53','2019-01-14 14:56:53',9,NULL),(23,'3_postRating',4,'2019-01-14 14:59:44','2019-01-14 14:59:44',NULL,NULL),(24,'6communitypost',1,'2019-01-14 15:02:08','2019-01-14 15:02:08',9,NULL),(25,'7communitypost',1,'2019-01-15 17:33:44','2019-01-15 17:33:44',3,NULL),(26,'8communitypost',1,'2019-01-15 17:34:02','2019-01-15 17:34:02',3,NULL),(27,'9communitypost',1,'2019-01-15 17:34:25','2019-01-15 17:34:25',3,NULL),(28,'10communitypost',1,'2019-01-15 17:34:42','2019-01-15 17:34:42',3,NULL),(29,'11communitypost',1,'2019-01-15 17:35:00','2019-01-15 17:35:00',3,NULL),(30,'12communitypost',1,'2019-01-15 17:35:15','2019-01-15 17:35:15',3,NULL),(31,'13communitypost',1,'2019-01-15 17:35:33','2019-01-15 17:35:33',3,NULL),(32,'14communitypost',1,'2019-01-15 17:35:58','2019-01-15 17:35:58',3,NULL),(33,'15communitypost',1,'2019-01-15 17:36:10','2019-01-15 17:36:10',3,NULL),(34,'16communitypost',1,'2019-01-15 17:36:53','2019-01-15 17:36:53',3,NULL),(35,'17communitypost',1,'2019-01-15 17:37:52','2019-01-15 17:37:52',3,NULL),(36,'18communitypost',1,'2019-01-15 17:38:29','2019-01-15 17:38:29',3,NULL),(37,'19communitypost',1,'2019-01-15 17:38:58','2019-01-15 17:38:58',3,NULL),(38,'20communitypost',1,'2019-01-15 17:39:49','2019-01-15 17:39:49',3,NULL),(39,'21communitypost',1,'2019-01-15 17:40:19','2019-01-15 17:40:19',3,NULL),(40,'22communitypost',1,'2019-01-15 17:40:54','2019-01-15 17:40:54',3,NULL),(41,'23communitypost',1,'2019-01-15 17:41:28','2019-01-15 17:41:28',3,NULL),(42,'24communitypost',1,'2019-01-15 17:42:12','2019-01-15 17:42:12',3,NULL),(43,'25communitypost',1,'2019-01-15 17:42:41','2019-01-15 17:42:41',3,NULL),(44,'26communitypost',1,'2019-01-15 17:43:09','2019-01-15 17:43:09',3,NULL),(45,'27communitypost',1,'2019-01-15 17:45:10','2019-01-15 17:45:10',3,NULL),(46,'28communitypost',1,'2019-01-15 17:45:39','2019-01-15 17:45:39',3,NULL),(47,'29communitypost',1,'2019-01-15 17:46:20','2019-01-15 17:46:20',3,NULL),(48,'30communitypost',1,'2019-01-15 17:46:53','2019-01-15 17:46:53',3,NULL),(49,'31communitypost',1,'2019-01-15 17:47:22','2019-01-15 17:47:22',3,NULL),(50,'32communitypost',1,'2019-01-15 17:47:53','2019-01-15 17:47:53',3,NULL),(51,'33communitypost',1,'2019-01-15 17:48:22','2019-01-15 17:48:22',3,NULL),(52,'34communitypost',1,'2019-01-15 17:48:50','2019-01-15 17:48:50',3,NULL),(53,'35communitypost',1,'2019-01-15 17:49:20','2019-01-15 17:49:20',3,NULL),(54,'36communitypost',1,'2019-01-15 17:50:20','2019-01-15 17:50:20',3,NULL),(55,'37communitypost',1,'2019-01-15 17:50:53','2019-01-15 17:50:53',3,NULL),(56,'38communitypost',1,'2019-01-15 17:53:31','2019-01-15 17:53:31',3,NULL),(57,'39communitypost',1,'2019-01-15 17:54:04','2019-01-15 17:54:04',3,NULL),(58,'40communitypost',1,'2019-01-15 17:54:33','2019-01-15 17:54:33',3,NULL),(59,'41communitypost',1,'2019-01-15 17:55:09','2019-01-15 17:55:09',3,NULL),(60,'42communitypost',1,'2019-01-15 17:55:52','2019-01-15 17:55:52',3,NULL),(61,'43communitypost',1,'2019-01-15 17:56:23','2019-01-15 17:56:23',3,NULL),(62,'44communitypost',1,'2019-01-15 17:56:52','2019-01-15 17:56:52',3,NULL),(63,'45communitypost',1,'2019-01-15 17:57:22','2019-01-15 17:57:22',3,NULL),(64,'46communitypost',1,'2019-01-15 17:57:53','2019-01-15 17:57:53',3,NULL),(65,'47communitypost',1,'2019-01-15 17:58:21','2019-01-15 17:58:21',3,NULL),(66,'48communitypost',1,'2019-01-15 17:59:26','2019-01-15 17:59:26',3,NULL),(67,'49communitypost',1,'2019-01-15 17:59:57','2019-01-15 17:59:57',3,NULL),(68,'50communitypost',1,'2019-01-15 18:00:26','2019-01-15 18:00:26',3,NULL),(69,'51communitypost',1,'2019-01-15 18:00:56','2019-01-15 18:00:56',3,NULL),(70,'52communitypost',1,'2019-01-15 18:01:47','2019-01-15 18:01:47',3,NULL),(71,'53communitypost',1,'2019-01-15 18:02:21','2019-01-15 18:02:21',3,NULL),(72,'54communitypost',1,'2019-01-15 18:02:59','2019-01-15 18:02:59',3,NULL),(73,'55communitypost',1,'2019-01-15 18:04:10','2019-01-15 18:04:10',3,NULL),(74,'56communitypost',1,'2019-01-15 18:04:59','2019-01-15 18:04:59',3,NULL),(75,'57communitypost',1,'2019-01-15 18:06:19','2019-01-15 18:06:19',3,NULL),(76,'58communitypost',1,'2019-01-15 18:07:35','2019-01-15 18:07:35',3,NULL),(77,'59communitypost',1,'2019-01-15 18:08:37','2019-01-15 18:08:37',3,NULL),(78,'60communitypost',1,'2019-01-15 18:09:29','2019-01-15 18:09:29',3,NULL),(79,'61communitypost',1,'2019-01-15 18:10:09','2019-01-15 18:10:09',3,NULL),(80,'62communitypost',1,'2019-01-15 18:10:37','2019-01-15 18:10:37',3,NULL),(81,'63communitypost',1,'2019-01-15 18:11:05','2019-01-15 18:11:05',3,NULL),(82,'64communitypost',1,'2019-01-15 18:12:13','2019-01-15 18:12:13',3,NULL),(83,'65communitypost',1,'2019-01-15 18:12:40','2019-01-15 18:12:40',3,NULL),(84,'66communitypost',1,'2019-01-15 18:14:14','2019-01-15 18:14:14',3,NULL),(85,'67communitypost',1,'2019-01-15 18:14:42','2019-01-15 18:14:42',3,NULL),(86,'68communitypost',1,'2019-01-15 18:15:50','2019-01-15 18:15:50',3,NULL),(87,'69communitypost',1,'2019-01-15 18:16:30','2019-01-15 18:16:30',3,NULL),(88,'70communitypost',1,'2019-01-15 18:17:17','2019-01-15 18:17:17',3,NULL),(89,'71communitypost',1,'2019-01-15 18:18:23','2019-01-15 18:18:23',3,NULL),(90,'72communitypost',1,'2019-01-15 18:20:31','2019-01-15 18:20:31',3,NULL),(91,'73communitypost',1,'2019-01-15 18:20:55','2019-01-15 18:20:55',3,NULL),(92,'74communitypost',1,'2019-01-15 18:21:15','2019-01-15 18:21:15',3,NULL),(93,'75communitypost',1,'2019-01-15 18:23:33','2019-01-15 18:23:33',3,NULL),(94,'76communitypost',1,'2019-01-15 18:27:20','2019-01-15 18:27:20',3,NULL),(95,'77communitypost',1,'2019-01-15 18:27:54','2019-01-15 18:27:54',3,NULL),(96,'78communitypost',1,'2019-01-15 18:36:11','2019-01-15 18:36:11',3,NULL),(97,'79communitypost',1,'2019-01-15 18:40:58','2019-01-15 18:40:58',3,NULL),(98,'80communitypost',1,'2019-01-15 18:42:01','2019-01-15 18:42:01',3,NULL),(99,'81communitypost',1,'2019-01-15 18:42:34','2019-01-15 18:42:34',3,NULL),(100,'82communitypost',1,'2019-01-15 18:45:43','2019-01-15 18:45:43',3,NULL),(101,'83communitypost',1,'2019-01-15 18:49:37','2019-01-15 18:49:37',3,NULL),(102,'84communitypost',1,'2019-01-15 18:49:58','2019-01-15 18:49:58',3,NULL),(103,'85communitypost',1,'2019-01-15 18:50:36','2019-01-15 18:50:36',3,NULL),(104,'86communitypost',1,'2019-01-15 18:51:01','2019-01-15 18:51:01',3,NULL),(105,'87communitypost',1,'2019-01-15 18:51:22','2019-01-15 18:51:22',3,NULL),(106,'88communitypost',1,'2019-01-15 18:51:39','2019-01-15 18:51:39',3,NULL),(107,'89communitypost',1,'2019-01-15 18:51:58','2019-01-15 18:51:58',3,NULL),(108,'90communitypost',1,'2019-01-15 18:52:39','2019-01-15 18:52:39',3,NULL),(109,'91communitypost',1,'2019-01-15 18:54:08','2019-01-15 18:54:08',3,NULL),(110,'92communitypost',1,'2019-01-15 18:54:45','2019-01-15 18:54:45',3,NULL),(111,'93communitypost',1,'2019-01-15 18:55:15','2019-01-15 18:55:15',3,NULL),(112,'94communitypost',1,'2019-01-15 18:55:44','2019-01-15 18:55:44',3,NULL),(113,'95communitypost',1,'2019-01-15 18:56:11','2019-01-15 18:56:11',3,NULL),(114,'96communitypost',1,'2019-01-15 18:56:40','2019-01-15 18:56:40',3,NULL),(115,'97communitypost',1,'2019-01-15 18:57:09','2019-01-15 18:57:09',3,NULL),(116,'98communitypost',1,'2019-01-15 18:57:37','2019-01-15 18:57:37',3,NULL),(117,'99communitypost',1,'2019-01-15 18:58:06','2019-01-15 18:58:06',3,NULL),(118,'100communitypost',1,'2019-01-15 18:58:51','2019-01-15 18:58:51',3,NULL),(119,'101communitypost',1,'2019-01-15 19:00:05','2019-01-15 19:00:05',3,NULL),(120,'102communitypost',1,'2019-01-15 19:00:16','2019-01-15 19:00:16',3,NULL),(121,'103communitypost',1,'2019-01-15 19:00:32','2019-01-15 19:00:32',3,NULL),(122,'104communitypost',1,'2019-01-15 19:00:52','2019-01-15 19:00:52',3,NULL),(123,'105communitypost',1,'2019-01-15 19:01:40','2019-01-15 19:01:40',3,NULL),(124,'106communitypost',1,'2019-01-15 19:02:12','2019-01-15 19:02:12',3,NULL),(125,'107communitypost',1,'2019-01-15 19:02:39','2019-01-15 19:02:39',3,NULL),(126,'108communitypost',1,'2019-01-15 19:02:58','2019-01-15 19:02:58',3,NULL),(127,'109communitypost',1,'2019-01-15 19:03:15','2019-01-15 19:03:15',3,NULL),(128,'110communitypost',1,'2019-01-15 19:03:34','2019-01-15 19:03:34',3,NULL),(129,'111communitypost',1,'2019-01-15 19:04:16','2019-01-15 19:04:16',3,NULL),(130,'112communitypost',1,'2019-01-15 19:05:45','2019-01-15 19:05:45',3,NULL),(131,'113communitypost',1,'2019-01-15 19:07:26','2019-01-15 19:07:26',3,NULL),(132,'114communitypost',1,'2019-01-15 19:07:54','2019-01-15 19:07:54',3,NULL),(133,'115communitypost',1,'2019-01-15 19:08:21','2019-01-15 19:08:21',3,NULL),(134,'116communitypost',1,'2019-01-15 19:08:51','2019-01-15 19:08:51',3,NULL),(135,'117communitypost',1,'2019-01-15 19:09:20','2019-01-15 19:09:20',3,NULL),(136,'118communitypost',1,'2019-01-15 19:10:00','2019-01-15 19:10:00',3,NULL),(137,'119communitypost',1,'2019-01-15 19:10:28','2019-01-15 19:10:28',3,NULL),(138,'120communitypost',1,'2019-01-15 19:10:55','2019-01-15 19:10:55',3,NULL),(139,'121communitypost',1,'2019-01-15 19:11:26','2019-01-15 19:11:26',3,NULL),(140,'122communitypost',1,'2019-01-15 19:13:41','2019-01-15 19:13:41',3,NULL),(141,'123communitypost',1,'2019-01-15 19:14:24','2019-01-15 19:14:24',3,NULL),(142,'124communitypost',1,'2019-01-15 19:14:54','2019-01-15 19:14:54',3,NULL),(143,'125communitypost',1,'2019-01-15 19:15:32','2019-01-15 19:15:32',3,NULL),(144,'126communitypost',1,'2019-01-15 19:16:01','2019-01-15 19:16:01',3,NULL),(145,'127communitypost',1,'2019-01-15 19:16:31','2019-01-15 19:16:31',3,NULL),(146,'128communitypost',1,'2019-01-15 19:17:00','2019-01-15 19:17:00',3,NULL),(147,'129communitypost',1,'2019-01-15 19:17:36','2019-01-15 19:17:36',3,NULL),(148,'130communitypost',1,'2019-01-15 19:18:06','2019-01-15 19:18:06',3,NULL),(149,'131communitypost',1,'2019-01-15 19:19:18','2019-01-15 19:19:18',3,NULL),(150,'132communitypost',1,'2019-01-15 19:19:58','2019-01-15 19:19:58',3,NULL),(151,'133communitypost',1,'2019-01-15 19:24:50','2019-01-15 19:24:50',3,NULL),(152,'134communitypost',1,'2019-01-15 19:25:35','2019-01-15 19:25:35',3,NULL),(153,'135communitypost',1,'2019-01-15 19:27:53','2019-01-15 19:27:53',3,NULL),(154,'136communitypost',1,'2019-01-15 19:28:39','2019-01-15 19:28:39',3,NULL),(155,'137communitypost',1,'2019-01-15 19:30:07','2019-01-15 19:30:07',3,NULL),(156,'138communitypost',1,'2019-01-15 19:31:42','2019-01-15 19:31:42',3,NULL),(157,'139communitypost',1,'2019-01-15 19:36:50','2019-01-15 19:36:50',3,NULL),(158,'140communitypost',1,'2019-01-15 19:37:48','2019-01-15 19:37:48',3,NULL),(159,'141communitypost',1,'2019-01-15 19:39:04','2019-01-15 19:39:04',3,NULL),(160,'142communitypost',1,'2019-01-15 19:39:25','2019-01-15 19:39:25',3,NULL),(161,'143communitypost',1,'2019-01-15 19:41:37','2019-01-15 19:41:37',3,NULL),(162,'144communitypost',1,'2019-01-15 19:43:54','2019-01-15 19:43:54',3,NULL),(163,'145communitypost',1,'2019-01-15 19:45:49','2019-01-15 19:45:49',3,NULL),(164,'146communitypost',1,'2019-01-15 19:46:30','2019-01-15 19:46:30',3,NULL),(165,'147communitypost',1,'2019-01-15 19:48:52','2019-01-15 19:48:52',3,NULL),(166,'148communitypost',1,'2019-01-15 19:49:21','2019-01-15 19:49:21',3,NULL),(167,'149communitypost',1,'2019-01-15 19:50:41','2019-01-15 19:50:41',3,NULL),(168,'150communitypost',1,'2019-01-15 19:51:31','2019-01-15 19:51:31',3,NULL),(169,'151communitypost',1,'2019-01-15 19:52:00','2019-01-15 19:52:00',3,NULL),(170,'152communitypost',1,'2019-01-15 19:52:32','2019-01-15 19:52:32',3,NULL),(171,'153communitypost',1,'2019-01-15 19:52:59','2019-01-15 19:52:59',3,NULL),(172,'154communitypost',1,'2019-01-15 19:53:37','2019-01-15 19:53:37',3,NULL),(173,'155communitypost',1,'2019-01-15 19:54:08','2019-01-15 19:54:08',3,NULL),(174,'156communitypost',1,'2019-01-15 19:54:37','2019-01-15 19:54:37',3,NULL),(175,'157communitypost',1,'2019-01-15 19:55:08','2019-01-15 19:55:08',3,NULL),(176,'158communitypost',1,'2019-01-15 19:55:36','2019-01-15 19:55:36',3,NULL),(177,'159communitypost',1,'2019-01-15 19:56:17','2019-01-15 19:56:17',3,NULL),(178,'160communitypost',1,'2019-01-15 19:56:47','2019-01-15 19:56:47',3,NULL),(179,'161communitypost',1,'2019-01-15 19:57:51','2019-01-15 19:57:51',3,NULL),(180,'162communitypost',1,'2019-01-15 19:58:13','2019-01-15 19:58:13',3,NULL),(181,'163communitypost',1,'2019-01-15 19:59:01','2019-01-15 19:59:01',3,NULL),(182,'164communitypost',1,'2019-01-15 19:59:23','2019-01-15 19:59:23',3,NULL),(183,'165communitypost',1,'2019-01-15 19:59:50','2019-01-15 19:59:50',3,NULL),(184,'166communitypost',1,'2019-01-15 20:00:09','2019-01-15 20:00:09',3,NULL),(185,'167communitypost',1,'2019-01-15 20:00:29','2019-01-15 20:00:29',3,NULL),(186,'168communitypost',1,'2019-01-15 20:01:21','2019-01-15 20:01:21',3,NULL),(187,'169communitypost',1,'2019-01-15 20:06:12','2019-01-15 20:06:12',3,NULL),(188,'170communitypost',1,'2019-01-15 20:06:40','2019-01-15 20:06:40',3,NULL),(189,'171communitypost',1,'2019-01-15 20:07:06','2019-01-15 20:07:06',3,NULL),(190,'172communitypost',1,'2019-01-15 20:07:51','2019-01-15 20:07:51',3,NULL),(191,'173communitypost',1,'2019-01-15 20:08:19','2019-01-15 20:08:19',3,NULL),(192,'174communitypost',1,'2019-01-15 20:08:48','2019-01-15 20:08:48',3,NULL),(193,'175communitypost',1,'2019-01-15 20:09:55','2019-01-15 20:09:55',3,NULL),(194,'176communitypost',1,'2019-01-15 20:10:22','2019-01-15 20:10:22',3,NULL),(195,'177communitypost',1,'2019-01-15 20:10:55','2019-01-15 20:10:55',3,NULL),(196,'178communitypost',1,'2019-01-15 20:11:30','2019-01-15 20:11:30',3,NULL),(197,'179communitypost',1,'2019-01-15 20:14:36','2019-01-15 20:14:36',3,NULL),(198,'180communitypost',1,'2019-01-15 20:15:56','2019-01-15 20:15:56',3,NULL),(199,'181communitypost',1,'2019-01-15 20:16:35','2019-01-15 20:16:35',3,NULL),(200,'182communitypost',1,'2019-01-15 20:17:04','2019-01-15 20:17:04',3,NULL),(201,'183communitypost',1,'2019-01-15 20:17:31','2019-01-15 20:17:31',3,NULL),(202,'184communitypost',1,'2019-01-15 20:18:02','2019-01-15 20:18:02',3,NULL),(203,'185communitypost',1,'2019-01-15 20:18:34','2019-01-15 20:18:34',3,NULL),(204,'186communitypost',1,'2019-01-15 20:19:16','2019-01-15 20:19:16',3,NULL),(205,'187communitypost',1,'2019-01-15 20:19:49','2019-01-15 20:19:49',3,NULL),(206,'188communitypost',1,'2019-01-15 20:21:08','2019-01-15 20:21:08',3,NULL),(207,'189communitypost',1,'2019-01-15 20:21:37','2019-01-15 20:21:37',3,NULL),(208,'190communitypost',1,'2019-01-15 20:21:52','2019-01-15 20:21:52',3,NULL),(209,'191communitypost',1,'2019-01-15 20:22:09','2019-01-15 20:22:09',3,NULL),(210,'192communitypost',1,'2019-01-15 20:22:32','2019-01-15 20:22:32',3,NULL),(211,'193communitypost',1,'2019-01-15 20:25:03','2019-01-15 20:25:03',3,NULL),(212,'194communitypost',1,'2019-01-15 20:25:23','2019-01-15 20:25:23',3,NULL),(213,'195communitypost',1,'2019-01-15 20:25:49','2019-01-15 20:25:49',3,NULL),(214,'196communitypost',1,'2019-01-15 20:26:22','2019-01-15 20:26:22',3,NULL),(215,'197communitypost',1,'2019-01-15 20:27:23','2019-01-15 20:27:23',3,NULL),(216,'198communitypost',1,'2019-01-15 20:27:46','2019-01-15 20:27:46',3,NULL),(217,'199communitypost',1,'2019-01-15 20:29:15','2019-01-15 20:29:15',3,NULL),(218,'200communitypost',1,'2019-01-15 20:29:55','2019-01-15 20:29:55',3,NULL),(219,'201communitypost',1,'2019-01-15 20:31:24','2019-01-15 20:31:24',3,NULL),(220,'202communitypost',1,'2019-01-15 20:31:52','2019-01-15 20:31:52',3,NULL),(221,'203communitypost',1,'2019-01-15 20:32:21','2019-01-15 20:32:21',3,NULL),(222,'204communitypost',1,'2019-01-15 20:32:49','2019-01-15 20:32:49',3,NULL),(223,'205communitypost',1,'2019-01-15 20:33:27','2019-01-15 20:33:27',3,NULL),(224,'206communitypost',1,'2019-01-15 20:33:56','2019-01-15 20:33:56',3,NULL),(225,'207communitypost',1,'2019-01-15 20:35:52','2019-01-15 20:35:52',3,NULL),(226,'208communitypost',1,'2019-01-15 20:36:47','2019-01-15 20:36:47',3,NULL),(227,'209communitypost',1,'2019-01-15 20:37:05','2019-01-15 20:37:05',3,NULL),(228,'210communitypost',1,'2019-01-15 20:37:27','2019-01-15 20:37:27',3,NULL),(229,'211communitypost',1,'2019-01-15 20:38:15','2019-01-15 20:38:15',3,NULL),(230,'212communitypost',1,'2019-01-15 20:39:33','2019-01-15 20:39:33',3,NULL),(231,'213communitypost',1,'2019-01-15 20:39:46','2019-01-15 20:39:46',3,NULL),(232,'214communitypost',1,'2019-01-15 20:40:10','2019-01-15 20:40:10',3,NULL),(233,'215communitypost',1,'2019-01-15 20:40:31','2019-01-15 20:40:31',3,NULL),(234,'216communitypost',1,'2019-01-15 20:40:48','2019-01-15 20:40:48',3,NULL),(235,'217communitypost',1,'2019-01-15 20:41:41','2019-01-15 20:41:41',3,NULL),(236,'218communitypost',1,'2019-01-15 22:10:50','2019-01-15 22:10:50',3,NULL),(237,'219communitypost',1,'2019-01-15 22:11:33','2019-01-15 22:11:33',3,NULL),(238,'220communitypost',1,'2019-01-15 22:11:39','2019-01-15 22:11:39',3,NULL),(239,'221communitypost',1,'2019-01-15 22:12:17','2019-01-15 22:12:17',3,NULL),(240,'222communitypost',1,'2019-01-15 22:12:44','2019-01-15 22:12:44',3,NULL),(241,'223communitypost',1,'2019-01-15 22:13:27','2019-01-15 22:13:27',3,NULL),(242,'224communitypost',1,'2019-01-15 22:14:22','2019-01-15 22:14:22',3,NULL),(243,'225communitypost',1,'2019-01-15 22:15:41','2019-01-15 22:15:41',3,NULL),(244,'226communitypost',1,'2019-01-15 22:16:16','2019-01-15 22:16:16',3,NULL),(245,'227communitypost',1,'2019-01-15 22:16:37','2019-01-15 22:16:37',3,NULL),(246,'228communitypost',1,'2019-01-15 22:17:44','2019-01-15 22:17:44',3,NULL),(247,'229communitypost',1,'2019-01-15 22:18:07','2019-01-15 22:18:07',3,NULL),(248,'230communitypost',1,'2019-01-15 22:18:24','2019-01-15 22:18:24',3,NULL),(249,'231communitypost',1,'2019-01-15 22:18:50','2019-01-15 22:18:50',3,NULL),(250,'232communitypost',1,'2019-01-15 22:19:14','2019-01-15 22:19:14',3,NULL),(251,'233communitypost',1,'2019-01-15 22:19:33','2019-01-15 22:19:33',3,NULL),(252,'234communitypost',1,'2019-01-15 22:19:48','2019-01-15 22:19:48',3,NULL),(253,'235communitypost',1,'2019-01-15 22:20:04','2019-01-15 22:20:04',3,NULL),(254,'236communitypost',1,'2019-01-15 22:20:19','2019-01-15 22:20:19',3,NULL),(255,'237communitypost',1,'2019-01-15 22:20:36','2019-01-15 22:20:36',3,NULL),(256,'238communitypost',1,'2019-01-15 22:21:36','2019-01-15 22:21:36',3,NULL),(257,'239communitypost',1,'2019-01-15 22:21:51','2019-01-15 22:21:51',3,NULL),(258,'240communitypost',1,'2019-01-15 22:22:07','2019-01-15 22:22:07',3,NULL),(259,'241communitypost',1,'2019-01-15 22:22:25','2019-01-15 22:22:25',3,NULL),(260,'242communitypost',1,'2019-01-15 22:22:43','2019-01-15 22:22:43',3,NULL),(261,'243communitypost',1,'2019-01-15 22:23:00','2019-01-15 22:23:00',3,NULL),(262,'244communitypost',1,'2019-01-15 22:23:15','2019-01-15 22:23:15',3,NULL),(263,'245communitypost',1,'2019-01-15 22:23:34','2019-01-15 22:23:34',3,NULL),(264,'246communitypost',1,'2019-01-15 22:23:48','2019-01-15 22:23:48',3,NULL),(265,'247communitypost',1,'2019-01-15 22:24:06','2019-01-15 22:24:06',3,NULL),(266,'248communitypost',1,'2019-01-15 22:24:42','2019-01-15 22:24:42',3,NULL),(267,'249communitypost',1,'2019-01-15 22:25:01','2019-01-15 22:25:01',3,NULL),(268,'250communitypost',1,'2019-01-15 22:25:15','2019-01-15 22:25:15',3,NULL),(269,'251communitypost',1,'2019-01-15 22:25:32','2019-01-15 22:25:32',3,NULL),(270,'252communitypost',1,'2019-01-15 22:25:58','2019-01-15 22:25:58',3,NULL),(271,'253communitypost',1,'2019-01-15 22:26:22','2019-01-15 22:26:22',3,NULL),(272,'254communitypost',1,'2019-01-15 22:26:44','2019-01-15 22:26:44',3,NULL),(273,'255communitypost',1,'2019-01-15 22:27:03','2019-01-15 22:27:03',3,NULL),(274,'256communitypost',1,'2019-01-15 22:27:43','2019-01-15 22:27:43',3,NULL),(275,'257communitypost',1,'2019-01-15 22:28:35','2019-01-15 22:28:35',3,NULL),(276,'258communitypost',1,'2019-01-15 22:30:54','2019-01-15 22:30:54',3,NULL),(277,'259communitypost',1,'2019-01-15 22:32:49','2019-01-15 22:32:49',3,NULL),(278,'260communitypost',1,'2019-01-15 22:32:57','2019-01-15 22:32:57',3,NULL),(279,'261communitypost',1,'2019-01-15 22:34:00','2019-01-15 22:34:00',3,NULL),(280,'262communitypost',1,'2019-01-15 22:34:07','2019-01-15 22:34:07',3,NULL),(281,'263communitypost',1,'2019-01-15 22:35:05','2019-01-15 22:35:05',3,NULL),(282,'264communitypost',1,'2019-01-15 22:35:45','2019-01-15 22:35:45',3,NULL),(283,'265communitypost',1,'2019-01-15 22:35:49','2019-01-15 22:35:49',3,NULL),(284,'266communitypost',1,'2019-01-15 22:36:44','2019-01-15 22:36:44',3,NULL),(285,'267communitypost',1,'2019-01-15 22:36:49','2019-01-15 22:36:49',3,NULL),(286,'268communitypost',1,'2019-01-15 22:37:37','2019-01-15 22:37:37',3,NULL),(287,'269communitypost',1,'2019-01-15 22:38:17','2019-01-15 22:38:17',3,NULL),(288,'270communitypost',1,'2019-01-15 22:38:53','2019-01-15 22:38:53',3,NULL),(289,'271communitypost',1,'2019-01-15 22:39:22','2019-01-15 22:39:22',3,NULL),(290,'272communitypost',1,'2019-01-15 22:39:29','2019-01-15 22:39:29',3,NULL),(291,'273communitypost',1,'2019-01-15 22:40:07','2019-01-15 22:40:07',3,NULL),(292,'274communitypost',1,'2019-01-15 22:40:38','2019-01-15 22:40:38',3,NULL),(293,'275communitypost',1,'2019-01-15 22:41:16','2019-01-15 22:41:16',3,NULL),(294,'276communitypost',1,'2019-01-15 22:41:59','2019-01-15 22:41:59',3,NULL),(295,'277communitypost',1,'2019-01-15 22:42:05','2019-01-15 22:42:05',3,NULL),(296,'278communitypost',1,'2019-01-15 22:47:38','2019-01-15 22:47:38',3,NULL),(297,'279communitypost',1,'2019-01-15 22:48:05','2019-01-15 22:48:05',3,NULL),(298,'280communitypost',1,'2019-01-15 22:48:37','2019-01-15 22:48:37',3,NULL),(299,'281communitypost',1,'2019-01-15 22:49:04','2019-01-15 22:49:04',3,NULL),(300,'282communitypost',1,'2019-01-15 22:49:33','2019-01-15 22:49:33',3,NULL),(301,'283communitypost',1,'2019-01-15 22:50:06','2019-01-15 22:50:06',3,NULL),(302,'284communitypost',1,'2019-01-15 22:50:14','2019-01-15 22:50:14',3,NULL),(303,'285communitypost',1,'2019-01-15 22:50:39','2019-01-15 22:50:39',3,NULL),(304,'286communitypost',1,'2019-01-15 22:50:52','2019-01-15 22:50:52',3,NULL),(305,'287communitypost',1,'2019-01-15 22:51:12','2019-01-15 22:51:12',3,NULL),(306,'288communitypost',1,'2019-01-15 22:51:30','2019-01-15 22:51:30',3,NULL),(307,'289communitypost',1,'2019-01-15 22:51:56','2019-01-15 22:51:56',3,NULL),(308,'290communitypost',1,'2019-01-15 22:52:11','2019-01-15 22:52:11',3,NULL),(309,'291communitypost',1,'2019-01-15 22:52:29','2019-01-15 22:52:29',3,NULL),(310,'292communitypost',1,'2019-01-15 22:52:42','2019-01-15 22:52:42',3,NULL),(311,'293communitypost',1,'2019-01-15 22:52:55','2019-01-15 22:52:55',3,NULL),(312,'294communitypost',1,'2019-01-15 22:53:15','2019-01-15 22:53:15',3,NULL),(313,'295communitypost',1,'2019-01-15 22:53:59','2019-01-15 22:53:59',3,NULL),(314,'296communitypost',1,'2019-01-15 22:54:14','2019-01-15 22:54:14',3,NULL),(315,'297communitypost',1,'2019-01-15 22:54:49','2019-01-15 22:54:49',3,NULL),(316,'298communitypost',1,'2019-01-15 22:55:05','2019-01-15 22:55:05',3,NULL),(317,'299communitypost',1,'2019-01-15 22:55:20','2019-01-15 22:55:20',3,NULL),(318,'300communitypost',1,'2019-01-15 22:55:44','2019-01-15 22:55:44',3,NULL),(319,'301communitypost',1,'2019-01-15 22:56:25','2019-01-15 22:56:25',3,NULL),(320,'302communitypost',1,'2019-01-15 22:58:34','2019-01-15 22:58:34',3,NULL),(321,'303communitypost',1,'2019-01-15 22:59:02','2019-01-15 22:59:02',3,NULL),(322,'304communitypost',1,'2019-01-15 23:00:24','2019-01-15 23:00:24',3,NULL),(323,'305communitypost',1,'2019-01-15 23:01:14','2019-01-15 23:01:14',3,NULL),(324,'306communitypost',1,'2019-01-15 23:06:22','2019-01-15 23:06:22',3,NULL),(325,'307communitypost',1,'2019-01-15 23:08:17','2019-01-15 23:08:17',3,NULL),(326,'308communitypost',1,'2019-01-15 23:08:35','2019-01-15 23:08:35',3,NULL),(327,'309communitypost',1,'2019-01-15 23:08:56','2019-01-15 23:08:56',3,NULL),(328,'310communitypost',1,'2019-01-15 23:09:45','2019-01-15 23:09:45',3,NULL),(329,'311communitypost',1,'2019-01-15 23:10:19','2019-01-15 23:10:19',3,NULL),(330,'312communitypost',1,'2019-01-15 23:11:04','2019-01-15 23:11:04',3,NULL),(331,'313communitypost',1,'2019-01-15 23:13:00','2019-01-15 23:13:00',3,NULL),(332,'314communitypost',1,'2019-01-15 23:13:36','2019-01-15 23:13:36',3,NULL),(333,'315communitypost',1,'2019-01-15 23:14:12','2019-01-15 23:14:12',3,NULL),(334,'316communitypost',1,'2019-01-15 23:17:51','2019-01-15 23:17:51',3,NULL),(335,'317communitypost',1,'2019-01-15 23:21:51','2019-01-15 23:21:51',3,NULL),(336,'318communitypost',1,'2019-01-15 23:22:18','2019-01-15 23:22:18',3,NULL),(337,'319communitypost',1,'2019-01-15 23:22:47','2019-01-15 23:22:47',3,NULL),(338,'320communitypost',1,'2019-01-15 23:23:13','2019-01-15 23:23:13',3,NULL),(339,'321communitypost',1,'2019-01-15 23:25:07','2019-01-15 23:25:07',3,NULL),(340,'322communitypost',1,'2019-01-15 23:28:16','2019-01-15 23:28:16',3,NULL),(341,'323communitypost',1,'2019-01-15 23:28:42','2019-01-15 23:28:42',3,NULL),(342,'324communitypost',1,'2019-01-15 23:29:12','2019-01-15 23:29:12',3,NULL),(343,'325communitypost',1,'2019-01-15 23:29:41','2019-01-15 23:29:41',3,NULL),(344,'326communitypost',1,'2019-01-15 23:30:10','2019-01-15 23:30:10',3,NULL),(345,'327communitypost',1,'2019-01-15 23:30:41','2019-01-15 23:30:41',3,NULL),(346,'328communitypost',1,'2019-01-15 23:31:09','2019-01-15 23:31:09',3,NULL),(347,'329communitypost',1,'2019-01-15 23:31:35','2019-01-15 23:31:35',3,NULL),(348,'330communitypost',1,'2019-01-15 23:32:32','2019-01-15 23:32:32',3,NULL),(349,'331communitypost',1,'2019-01-15 23:32:47','2019-01-15 23:32:47',3,NULL),(350,'332communitypost',1,'2019-01-15 23:33:29','2019-01-15 23:33:29',3,NULL),(351,'333communitypost',1,'2019-01-15 23:33:58','2019-01-15 23:33:58',3,NULL),(352,'334communitypost',1,'2019-01-15 23:34:11','2019-01-15 23:34:11',3,NULL),(353,'335communitypost',1,'2019-01-15 23:34:32','2019-01-15 23:34:32',3,NULL),(354,'336communitypost',1,'2019-01-15 23:35:08','2019-01-15 23:35:08',3,NULL),(355,'337communitypost',1,'2019-01-15 23:35:35','2019-01-15 23:35:35',3,NULL),(356,'338communitypost',1,'2019-01-15 23:35:52','2019-01-15 23:35:52',3,NULL),(357,'339communitypost',1,'2019-01-15 23:36:14','2019-01-15 23:36:14',3,NULL),(358,'340communitypost',1,'2019-01-15 23:36:39','2019-01-15 23:36:39',3,NULL),(359,'341communitypost',1,'2019-01-15 23:36:56','2019-01-15 23:36:56',3,NULL),(360,'342communitypost',1,'2019-01-15 23:37:33','2019-01-15 23:37:33',3,NULL),(361,'343communitypost',1,'2019-01-15 23:37:45','2019-01-15 23:37:45',3,NULL),(362,'344communitypost',1,'2019-01-15 23:38:01','2019-01-15 23:38:01',3,NULL),(363,'345communitypost',1,'2019-01-15 23:38:18','2019-01-15 23:38:18',3,NULL),(364,'346communitypost',1,'2019-01-15 23:38:32','2019-01-15 23:38:32',3,NULL),(365,'347communitypost',1,'2019-01-15 23:39:07','2019-01-15 23:39:07',3,NULL),(366,'348communitypost',1,'2019-01-15 23:39:35','2019-01-15 23:39:35',3,NULL),(367,'349communitypost',1,'2019-01-15 23:40:04','2019-01-15 23:40:04',3,NULL),(368,'350communitypost',1,'2019-01-15 23:40:59','2019-01-15 23:40:59',3,NULL),(369,'351communitypost',1,'2019-01-15 23:41:03','2019-01-15 23:41:03',3,NULL),(370,'352communitypost',1,'2019-01-16 00:00:32','2019-01-16 00:00:32',3,NULL),(371,'353communitypost',1,'2019-01-16 00:00:51','2019-01-16 00:00:51',3,NULL),(372,'354communitypost',1,'2019-01-16 00:01:18','2019-01-16 00:01:18',3,NULL),(373,'355communitypost',1,'2019-01-16 00:01:36','2019-01-16 00:01:36',3,NULL),(374,'356communitypost',1,'2019-01-16 00:01:53','2019-01-16 00:01:53',3,NULL),(375,'357communitypost',1,'2019-01-16 00:02:12','2019-01-16 00:02:12',3,NULL),(376,'358communitypost',1,'2019-01-16 00:02:30','2019-01-16 00:02:30',3,NULL),(377,'359communitypost',1,'2019-01-16 00:02:54','2019-01-16 00:02:54',3,NULL),(378,'360communitypost',1,'2019-01-16 00:03:10','2019-01-16 00:03:10',3,NULL),(379,'361communitypost',1,'2019-01-16 00:03:53','2019-01-16 00:03:53',3,NULL),(380,'362communitypost',1,'2019-01-16 00:04:11','2019-01-16 00:04:11',3,NULL),(381,'363communitypost',1,'2019-01-16 00:04:58','2019-01-16 00:04:58',3,NULL),(382,'364communitypost',1,'2019-01-16 00:05:13','2019-01-16 00:05:13',3,NULL),(383,'365communitypost',1,'2019-01-16 00:05:33','2019-01-16 00:05:33',3,NULL),(384,'366communitypost',1,'2019-01-16 00:05:44','2019-01-16 00:05:44',3,NULL),(385,'367communitypost',1,'2019-01-16 00:06:03','2019-01-16 00:06:03',3,NULL),(386,'368communitypost',1,'2019-01-16 00:06:19','2019-01-16 00:06:19',3,NULL),(387,'369communitypost',1,'2019-01-16 00:06:35','2019-01-16 00:06:35',3,NULL),(388,'370communitypost',1,'2019-01-16 00:06:58','2019-01-16 00:06:58',3,NULL),(389,'371communitypost',1,'2019-01-16 00:07:12','2019-01-16 00:07:12',3,NULL),(390,'372communitypost',1,'2019-01-16 00:07:50','2019-01-16 00:07:50',3,NULL),(391,'373communitypost',1,'2019-01-16 00:08:06','2019-01-16 00:08:06',3,NULL),(392,'374communitypost',1,'2019-01-16 00:08:29','2019-01-16 00:08:29',3,NULL),(393,'375communitypost',1,'2019-01-16 00:08:54','2019-01-16 00:08:54',3,NULL),(394,'376communitypost',1,'2019-01-16 00:09:13','2019-01-16 00:09:13',3,NULL),(395,'377communitypost',1,'2019-01-16 00:09:28','2019-01-16 00:09:28',3,NULL),(396,'378communitypost',1,'2019-01-16 00:09:42','2019-01-16 00:09:42',3,NULL),(397,'379communitypost',1,'2019-01-16 00:09:59','2019-01-16 00:09:59',3,NULL),(398,'380communitypost',1,'2019-01-16 00:10:15','2019-01-16 00:10:15',3,NULL),(399,'381communitypost',1,'2019-01-16 00:10:29','2019-01-16 00:10:29',3,NULL),(400,'382communitypost',1,'2019-01-16 00:10:44','2019-01-16 00:10:44',3,NULL),(401,'383communitypost',1,'2019-01-16 00:11:15','2019-01-16 00:11:15',3,NULL),(402,'384communitypost',1,'2019-01-16 00:11:28','2019-01-16 00:11:28',3,NULL),(403,'385communitypost',1,'2019-01-16 00:11:50','2019-01-16 00:11:50',3,NULL),(404,'386communitypost',1,'2019-01-16 00:12:12','2019-01-16 00:12:12',3,NULL),(405,'387communitypost',1,'2019-01-16 00:12:50','2019-01-16 00:12:50',3,NULL),(406,'388communitypost',1,'2019-01-16 00:13:21','2019-01-16 00:13:21',3,NULL),(407,'389communitypost',1,'2019-01-16 00:13:51','2019-01-16 00:13:51',3,NULL),(408,'390communitypost',1,'2019-01-16 00:14:19','2019-01-16 00:14:19',3,NULL),(409,'391communitypost',1,'2019-01-16 00:14:53','2019-01-16 00:14:53',3,NULL),(410,'392communitypost',1,'2019-01-16 00:14:57','2019-01-16 00:14:57',3,NULL),(411,'393communitypost',1,'2019-01-16 00:15:38','2019-01-16 00:15:38',3,NULL),(412,'394communitypost',1,'2019-01-16 00:16:47','2019-01-16 00:16:47',3,NULL),(413,'395communitypost',1,'2019-01-16 00:17:17','2019-01-16 00:17:17',3,NULL),(414,'396communitypost',1,'2019-01-16 00:17:45','2019-01-16 00:17:45',3,NULL),(415,'397communitypost',1,'2019-01-16 00:18:14','2019-01-16 00:18:14',3,NULL),(416,'398communitypost',1,'2019-01-16 00:18:46','2019-01-16 00:18:46',3,NULL),(417,'399communitypost',1,'2019-01-16 00:19:17','2019-01-16 00:19:17',3,NULL),(418,'400communitypost',1,'2019-01-16 00:19:43','2019-01-16 00:19:43',3,NULL),(419,'401communitypost',1,'2019-01-16 00:20:26','2019-01-16 00:20:26',3,NULL),(420,'402communitypost',1,'2019-01-16 00:20:53','2019-01-16 00:20:53',3,NULL),(421,'403communitypost',1,'2019-01-16 00:21:20','2019-01-16 00:21:20',3,NULL),(422,'404communitypost',1,'2019-01-16 00:22:54','2019-01-16 00:22:54',3,NULL),(423,'405communitypost',1,'2019-01-16 00:23:25','2019-01-16 00:23:25',3,NULL),(424,'406communitypost',1,'2019-01-16 00:24:16','2019-01-16 00:24:16',3,NULL),(425,'1_userFollower',5,'2019-01-16 00:24:43','2019-01-16 00:24:43',3,NULL),(426,'2_userFollower',5,'2019-01-16 00:24:47','2019-01-16 00:24:47',3,NULL),(427,'407communitypost',1,'2019-01-16 00:30:14','2019-01-16 00:30:14',3,NULL),(428,'408communitypost',1,'2019-01-16 00:31:18','2019-01-16 00:31:18',3,NULL),(429,'409communitypost',1,'2019-01-16 00:31:46','2019-01-16 00:31:46',3,NULL),(430,'410communitypost',1,'2019-01-16 00:32:59','2019-01-16 00:32:59',3,NULL),(431,'411communitypost',1,'2019-01-16 00:33:26','2019-01-16 00:33:26',3,NULL),(432,'412communitypost',1,'2019-01-16 00:33:57','2019-01-16 00:33:57',3,NULL),(433,'413communitypost',1,'2019-01-16 07:04:36','2019-01-16 07:04:36',3,NULL),(434,'414communitypost',1,'2019-01-16 07:04:58','2019-01-16 07:04:58',3,NULL),(435,'415communitypost',1,'2019-01-16 07:06:49','2019-01-16 07:06:49',3,NULL),(436,'416communitypost',1,'2019-01-16 07:07:11','2019-01-16 07:07:11',3,NULL),(437,'417communitypost',1,'2019-01-16 07:07:30','2019-01-16 07:07:30',3,NULL),(438,'418communitypost',1,'2019-01-16 07:07:48','2019-01-16 07:07:48',3,NULL),(439,'419communitypost',1,'2019-01-16 07:08:06','2019-01-16 07:08:06',3,NULL),(440,'420communitypost',1,'2019-01-16 07:08:22','2019-01-16 07:08:22',3,NULL),(441,'421communitypost',1,'2019-01-16 07:08:42','2019-01-16 07:08:42',3,NULL),(442,'422communitypost',1,'2019-01-16 07:09:03','2019-01-16 07:09:03',3,NULL),(443,'423communitypost',1,'2019-01-16 07:09:37','2019-01-16 07:09:37',3,NULL),(444,'424communitypost',1,'2019-01-16 07:09:54','2019-01-16 07:09:54',3,NULL),(445,'425communitypost',1,'2019-01-16 07:10:15','2019-01-16 07:10:15',3,NULL),(446,'426communitypost',1,'2019-01-16 07:10:32','2019-01-16 07:10:32',3,NULL),(447,'427communitypost',1,'2019-01-16 07:10:50','2019-01-16 07:10:50',3,NULL),(448,'428communitypost',1,'2019-01-16 07:11:10','2019-01-16 07:11:10',3,NULL),(449,'429communitypost',1,'2019-01-16 07:11:32','2019-01-16 07:11:32',3,NULL),(450,'430communitypost',1,'2019-01-16 07:11:46','2019-01-16 07:11:46',3,NULL),(451,'431communitypost',1,'2019-01-16 07:11:59','2019-01-16 07:11:59',3,NULL),(452,'432communitypost',1,'2019-01-16 07:12:35','2019-01-16 07:12:35',3,NULL),(453,'433communitypost',1,'2019-01-16 07:12:52','2019-01-16 07:12:52',3,NULL),(454,'434communitypost',1,'2019-01-16 07:13:04','2019-01-16 07:13:04',3,NULL),(455,'435communitypost',1,'2019-01-16 07:13:17','2019-01-16 07:13:17',3,NULL),(456,'436communitypost',1,'2019-01-16 07:13:32','2019-01-16 07:13:32',3,NULL),(457,'437communitypost',1,'2019-01-16 07:14:09','2019-01-16 07:14:09',3,NULL),(458,'438communitypost',1,'2019-01-16 07:14:26','2019-01-16 07:14:26',3,NULL),(459,'439communitypost',1,'2019-01-16 07:14:44','2019-01-16 07:14:44',3,NULL),(460,'440communitypost',1,'2019-01-16 07:14:58','2019-01-16 07:14:58',3,NULL),(461,'441communitypost',1,'2019-01-16 07:15:30','2019-01-16 07:15:30',3,NULL),(462,'442communitypost',1,'2019-01-16 07:16:31','2019-01-16 07:16:31',3,NULL),(463,'443communitypost',1,'2019-01-16 07:16:59','2019-01-16 07:16:59',3,NULL),(464,'444communitypost',1,'2019-01-16 07:17:25','2019-01-16 07:17:25',3,NULL),(465,'445communitypost',1,'2019-01-16 07:17:32','2019-01-16 07:17:32',3,NULL),(466,'446communitypost',1,'2019-01-16 07:18:15','2019-01-16 07:18:15',3,NULL),(467,'447communitypost',1,'2019-01-16 07:18:22','2019-01-16 07:18:22',3,NULL),(468,'448communitypost',1,'2019-01-16 07:19:03','2019-01-16 07:19:03',3,NULL),(469,'449communitypost',1,'2019-01-16 07:19:30','2019-01-16 07:19:30',3,NULL),(470,'450communitypost',1,'2019-01-16 07:20:12','2019-01-16 07:20:12',3,NULL),(471,'451communitypost',1,'2019-01-16 07:20:18','2019-01-16 07:20:18',3,NULL),(472,'452communitypost',1,'2019-01-16 07:20:52','2019-01-16 07:20:52',3,NULL),(473,'453communitypost',1,'2019-01-16 07:21:05','2019-01-16 07:21:05',3,NULL),(474,'454communitypost',1,'2019-01-16 07:21:19','2019-01-16 07:21:19',3,NULL),(475,'455communitypost',1,'2019-01-16 07:21:38','2019-01-16 07:21:38',3,NULL),(476,'456communitypost',1,'2019-01-16 07:21:57','2019-01-16 07:21:57',3,NULL),(477,'457communitypost',1,'2019-01-16 07:22:05','2019-01-16 07:22:05',3,NULL),(478,'458communitypost',1,'2019-01-16 07:22:25','2019-01-16 07:22:25',3,NULL),(479,'459communitypost',1,'2019-01-16 07:22:40','2019-01-16 07:22:40',3,NULL),(480,'460communitypost',1,'2019-01-16 07:23:00','2019-01-16 07:23:00',3,NULL),(481,'461communitypost',1,'2019-01-16 07:23:13','2019-01-16 07:23:13',3,NULL),(482,'462communitypost',1,'2019-01-16 07:24:07','2019-01-16 07:24:07',3,NULL),(483,'463communitypost',1,'2019-01-16 07:24:20','2019-01-16 07:24:20',3,NULL),(484,'464communitypost',1,'2019-01-16 07:24:32','2019-01-16 07:24:32',3,NULL),(485,'465communitypost',1,'2019-01-16 07:24:47','2019-01-16 07:24:47',3,NULL),(486,'466communitypost',1,'2019-01-16 07:25:01','2019-01-16 07:25:01',3,NULL),(487,'467communitypost',1,'2019-01-16 07:25:17','2019-01-16 07:25:17',3,NULL),(488,'468communitypost',1,'2019-01-16 07:25:34','2019-01-16 07:25:34',3,NULL),(489,'469communitypost',1,'2019-01-16 07:26:10','2019-01-16 07:26:10',3,NULL),(490,'470communitypost',1,'2019-01-16 07:26:35','2019-01-16 07:26:35',3,NULL),(491,'471communitypost',1,'2019-01-16 07:26:54','2019-01-16 07:26:54',3,NULL),(492,'472communitypost',1,'2019-01-16 07:27:28','2019-01-16 07:27:28',3,NULL),(493,'473communitypost',1,'2019-01-16 07:27:44','2019-01-16 07:27:44',3,NULL),(494,'474communitypost',1,'2019-01-16 07:27:57','2019-01-16 07:27:57',3,NULL),(495,'475communitypost',1,'2019-01-16 07:28:13','2019-01-16 07:28:13',3,NULL),(496,'476communitypost',1,'2019-01-16 07:28:27','2019-01-16 07:28:27',3,NULL),(497,'477communitypost',1,'2019-01-16 07:29:08','2019-01-16 07:29:08',3,NULL),(498,'478communitypost',1,'2019-01-16 07:29:25','2019-01-16 07:29:25',3,NULL),(499,'479communitypost',1,'2019-01-16 07:29:40','2019-01-16 07:29:40',3,NULL),(500,'480communitypost',1,'2019-01-16 07:29:59','2019-01-16 07:29:59',3,NULL),(501,'481communitypost',1,'2019-01-16 07:30:10','2019-01-16 07:30:10',3,NULL),(502,'482communitypost',1,'2019-01-16 07:30:58','2019-01-16 07:30:58',3,NULL),(503,'483communitypost',1,'2019-01-16 07:31:17','2019-01-16 07:31:17',3,NULL),(504,'484communitypost',1,'2019-01-16 07:31:29','2019-01-16 07:31:29',3,NULL),(505,'485communitypost',1,'2019-01-16 07:31:47','2019-01-16 07:31:47',3,NULL),(506,'486communitypost',1,'2019-01-16 07:32:18','2019-01-16 07:32:18',3,NULL),(507,'487communitypost',1,'2019-01-16 07:32:35','2019-01-16 07:32:35',3,NULL),(508,'488communitypost',1,'2019-01-16 07:32:50','2019-01-16 07:32:50',3,NULL),(509,'489communitypost',1,'2019-01-16 07:33:07','2019-01-16 07:33:07',3,NULL),(510,'490communitypost',1,'2019-01-16 07:33:32','2019-01-16 07:33:32',3,NULL),(511,'491communitypost',1,'2019-01-16 07:33:51','2019-01-16 07:33:51',3,NULL),(512,'492communitypost',1,'2019-01-16 07:34:32','2019-01-16 07:34:32',3,NULL),(513,'493communitypost',1,'2019-01-16 07:34:48','2019-01-16 07:34:48',3,NULL),(514,'494communitypost',1,'2019-01-16 07:41:53','2019-01-16 07:41:53',3,NULL),(515,'495communitypost',1,'2019-01-16 07:42:14','2019-01-16 07:42:14',3,NULL),(516,'496communitypost',1,'2019-01-16 07:42:30','2019-01-16 07:42:30',3,NULL),(517,'497communitypost',1,'2019-01-16 07:42:49','2019-01-16 07:42:49',3,NULL),(518,'498communitypost',1,'2019-01-16 07:43:08','2019-01-16 07:43:08',3,NULL),(519,'499communitypost',1,'2019-01-16 07:43:31','2019-01-16 07:43:31',3,NULL),(520,'500communitypost',1,'2019-01-16 07:43:52','2019-01-16 07:43:52',3,NULL),(521,'501communitypost',1,'2019-01-16 07:44:10','2019-01-16 07:44:10',3,NULL),(522,'502communitypost',1,'2019-01-16 07:51:51','2019-01-16 07:51:51',3,NULL),(523,'503communitypost',1,'2019-01-16 07:52:29','2019-01-16 07:52:29',3,NULL),(524,'504communitypost',1,'2019-01-16 07:53:10','2019-01-16 07:53:10',3,NULL),(525,'505communitypost',1,'2019-01-16 07:54:07','2019-01-16 07:54:07',3,NULL),(526,'506communitypost',1,'2019-01-16 07:54:39','2019-01-16 07:54:39',3,NULL),(527,'507communitypost',1,'2019-01-16 07:55:57','2019-01-16 07:55:57',3,NULL),(528,'508communitypost',1,'2019-01-16 07:56:53','2019-01-16 07:56:53',3,NULL),(529,'509communitypost',1,'2019-01-16 07:57:00','2019-01-16 07:57:00',3,NULL),(530,'510communitypost',1,'2019-01-16 07:58:45','2019-01-16 07:58:45',3,NULL),(531,'511communitypost',1,'2019-01-16 07:59:02','2019-01-16 07:59:02',3,NULL),(532,'512communitypost',1,'2019-01-16 07:59:51','2019-01-16 07:59:51',3,NULL),(533,'513communitypost',1,'2019-01-16 08:00:09','2019-01-16 08:00:09',3,NULL),(534,'514communitypost',1,'2019-01-16 08:00:55','2019-01-16 08:00:55',3,NULL),(535,'515communitypost',1,'2019-01-16 08:01:45','2019-01-16 08:01:45',3,NULL),(536,'516communitypost',1,'2019-01-16 08:03:30','2019-01-16 08:03:30',3,NULL),(537,'517communitypost',1,'2019-01-16 08:04:17','2019-01-16 08:04:17',3,NULL),(538,'518communitypost',1,'2019-01-16 08:04:46','2019-01-16 08:04:46',3,NULL),(539,'519communitypost',1,'2019-01-16 08:06:14','2019-01-16 08:06:14',3,NULL),(540,'520communitypost',1,'2019-01-16 08:09:41','2019-01-16 08:09:41',3,NULL),(541,'521communitypost',1,'2019-01-16 08:10:23','2019-01-16 08:10:23',3,NULL),(542,'522communitypost',1,'2019-01-16 08:10:51','2019-01-16 08:10:51',3,NULL),(543,'523communitypost',1,'2019-01-16 08:10:55','2019-01-16 08:10:55',3,NULL),(544,'524communitypost',1,'2019-01-16 08:11:33','2019-01-16 08:11:33',3,NULL),(545,'525communitypost',1,'2019-01-16 08:12:03','2019-01-16 08:12:03',3,NULL),(546,'526communitypost',1,'2019-01-16 08:12:30','2019-01-16 08:12:30',3,NULL),(547,'527communitypost',1,'2019-01-16 08:13:41','2019-01-16 08:13:41',3,NULL),(548,'528communitypost',1,'2019-01-16 08:14:12','2019-01-16 08:14:12',3,NULL),(549,'529communitypost',1,'2019-01-16 08:16:17','2019-01-16 08:16:17',3,NULL),(550,'530communitypost',1,'2019-01-16 08:18:18','2019-01-16 08:18:18',3,NULL),(551,'531communitypost',1,'2019-01-16 08:19:05','2019-01-16 08:19:05',3,NULL),(552,'532communitypost',1,'2019-01-16 08:19:53','2019-01-16 08:19:53',3,NULL),(553,'533communitypost',1,'2019-01-16 08:20:46','2019-01-16 08:20:46',3,NULL),(554,'534communitypost',1,'2019-01-16 08:21:40','2019-01-16 08:21:40',3,NULL),(555,'535communitypost',1,'2019-01-16 08:21:57','2019-01-16 08:21:57',3,NULL),(556,'536communitypost',1,'2019-01-16 08:22:23','2019-01-16 08:22:23',3,NULL),(557,'537communitypost',1,'2019-01-16 08:22:43','2019-01-16 08:22:43',3,NULL),(558,'538communitypost',1,'2019-01-16 08:23:00','2019-01-16 08:23:00',3,NULL),(559,'539communitypost',1,'2019-01-16 08:23:12','2019-01-16 08:23:12',3,NULL),(560,'540communitypost',1,'2019-01-16 08:23:46','2019-01-16 08:23:46',3,NULL),(561,'541communitypost',1,'2019-01-16 08:24:06','2019-01-16 08:24:06',3,NULL),(562,'542communitypost',1,'2019-01-16 08:24:24','2019-01-16 08:24:24',3,NULL),(563,'543communitypost',1,'2019-01-16 08:24:40','2019-01-16 08:24:40',3,NULL),(564,'544communitypost',1,'2019-01-16 08:24:56','2019-01-16 08:24:56',3,NULL),(565,'545communitypost',1,'2019-01-16 08:25:13','2019-01-16 08:25:13',3,NULL),(566,'546communitypost',1,'2019-01-16 08:25:28','2019-01-16 08:25:28',3,NULL),(567,'547communitypost',1,'2019-01-16 08:25:52','2019-01-16 08:25:52',3,NULL),(568,'548communitypost',1,'2019-01-16 08:26:09','2019-01-16 08:26:09',3,NULL),(569,'549communitypost',1,'2019-01-16 08:26:24','2019-01-16 08:26:24',3,NULL),(570,'550communitypost',1,'2019-01-16 08:26:58','2019-01-16 08:26:58',3,NULL),(571,'551communitypost',1,'2019-01-16 08:27:11','2019-01-16 08:27:11',3,NULL),(572,'552communitypost',1,'2019-01-16 08:27:31','2019-01-16 08:27:31',3,NULL),(573,'553communitypost',1,'2019-01-16 08:27:48','2019-01-16 08:27:48',3,NULL),(574,'554communitypost',1,'2019-01-16 08:28:06','2019-01-16 08:28:06',3,NULL),(575,'555communitypost',1,'2019-01-16 08:28:27','2019-01-16 08:28:27',3,NULL),(576,'556communitypost',1,'2019-01-16 08:29:05','2019-01-16 08:29:05',3,NULL),(577,'557communitypost',1,'2019-01-16 08:29:32','2019-01-16 08:29:32',3,NULL),(578,'558communitypost',1,'2019-01-16 08:29:47','2019-01-16 08:29:47',3,NULL),(579,'559communitypost',1,'2019-01-16 08:30:01','2019-01-16 08:30:01',3,NULL),(580,'560communitypost',1,'2019-01-16 08:30:28','2019-01-16 08:30:28',3,NULL),(581,'561communitypost',1,'2019-01-16 08:30:41','2019-01-16 08:30:41',3,NULL),(582,'562communitypost',1,'2019-01-16 08:31:46','2019-01-16 08:31:46',3,NULL),(583,'563communitypost',1,'2019-01-16 08:32:18','2019-01-16 08:32:18',3,NULL),(584,'564communitypost',1,'2019-01-16 08:33:19','2019-01-16 08:33:19',3,NULL),(585,'565communitypost',1,'2019-01-16 08:33:47','2019-01-16 08:33:47',3,NULL),(586,'566communitypost',1,'2019-01-16 08:34:28','2019-01-16 08:34:28',3,NULL),(587,'567communitypost',1,'2019-01-16 08:36:47','2019-01-16 08:36:47',3,NULL),(588,'568communitypost',1,'2019-01-16 08:38:01','2019-01-16 08:38:01',3,NULL),(589,'569communitypost',1,'2019-01-16 08:43:33','2019-01-16 08:43:33',3,NULL),(590,'570communitypost',1,'2019-01-16 08:43:54','2019-01-16 08:43:54',3,NULL),(591,'571communitypost',1,'2019-01-16 08:44:11','2019-01-16 08:44:11',3,NULL),(592,'572communitypost',1,'2019-01-16 08:44:35','2019-01-16 08:44:35',3,NULL),(593,'573communitypost',1,'2019-01-16 08:44:49','2019-01-16 08:44:49',3,NULL),(594,'574communitypost',1,'2019-01-16 08:45:12','2019-01-16 08:45:12',3,NULL),(595,'575communitypost',1,'2019-01-16 08:45:38','2019-01-16 08:45:38',3,NULL),(596,'576communitypost',1,'2019-01-16 08:45:48','2019-01-16 08:45:48',3,NULL),(597,'577communitypost',1,'2019-01-16 08:46:20','2019-01-16 08:46:20',3,NULL),(598,'578communitypost',1,'2019-01-16 08:46:35','2019-01-16 08:46:35',3,NULL),(599,'579communitypost',1,'2019-01-16 08:46:51','2019-01-16 08:46:51',3,NULL),(600,'580communitypost',1,'2019-01-16 08:47:02','2019-01-16 08:47:02',3,NULL),(601,'581communitypost',1,'2019-01-16 08:47:20','2019-01-16 08:47:20',3,NULL),(602,'582communitypost',1,'2019-01-16 08:47:41','2019-01-16 08:47:41',3,NULL),(603,'583communitypost',1,'2019-01-16 08:47:50','2019-01-16 08:47:50',3,NULL),(604,'584communitypost',1,'2019-01-16 08:48:04','2019-01-16 08:48:04',3,NULL),(605,'585communitypost',1,'2019-01-16 08:48:19','2019-01-16 08:48:19',3,NULL),(606,'586communitypost',1,'2019-01-16 08:49:05','2019-01-16 08:49:05',3,NULL),(607,'8_post',1,'2019-01-16 20:50:56','2019-01-16 20:50:56',9,NULL),(608,'9_post',1,'2019-01-16 20:56:49','2019-01-16 20:56:49',9,NULL),(609,'10_post',1,'2019-01-16 21:03:26','2019-01-16 21:03:26',9,NULL),(610,'11_post',1,'2019-01-16 21:08:10','2019-01-16 21:08:10',3,NULL),(611,'9_postRating',4,'2019-01-16 21:13:15','2019-01-16 21:13:15',NULL,NULL),(612,'11_postRating',5,'2019-01-16 21:13:39','2019-01-16 21:13:39',NULL,NULL),(613,'7_postRating',4,'2019-01-16 21:14:23','2019-01-16 21:14:23',NULL,NULL),(614,'12_post',1,'2019-01-16 21:46:26','2019-01-16 21:46:26',9,NULL),(615,'13_post',1,'2019-01-16 21:51:47','2019-01-16 21:51:47',9,NULL),(616,'14_post',1,'2019-01-16 21:53:18','2019-01-16 21:53:18',9,NULL),(617,'15_post',1,'2019-01-17 07:15:59','2019-01-17 07:15:59',3,NULL),(618,'3_userFollower',5,'2019-01-17 07:28:00','2019-01-17 07:28:00',3,NULL),(619,'4_userFollower',5,'2019-01-17 07:28:13','2019-01-17 07:28:13',3,NULL),(622,'16_post',1,'2019-01-17 12:00:33','2019-01-17 12:00:33',18,NULL),(623,'17_post',1,'2019-01-17 12:02:14','2019-01-17 12:02:14',17,NULL),(624,'18_post',1,'2019-01-17 12:04:04','2019-01-17 12:04:04',17,NULL),(625,'19_post',1,'2019-01-17 12:05:13','2019-01-17 12:05:13',18,NULL),(626,'20_post',1,'2019-01-17 12:07:11','2019-01-17 12:07:11',16,NULL),(627,'21_post',1,'2019-01-17 12:08:57','2019-01-17 12:08:57',18,NULL),(628,'22_post',1,'2019-01-17 13:56:45','2019-01-17 13:56:45',18,NULL),(629,'23_post',1,'2019-01-17 14:04:21','2019-01-17 14:04:21',16,NULL),(630,'24_post',1,'2019-01-17 14:09:59','2019-01-17 14:09:59',16,NULL),(631,'25_post',1,'2019-01-17 14:27:44','2019-01-17 14:27:44',15,NULL),(632,'5_userFollower',5,'2019-01-17 18:03:26','2019-01-17 18:03:26',16,NULL),(633,'26_post',1,'2019-01-17 18:56:15','2019-01-17 18:56:15',15,NULL),(634,'27_post',1,'2019-01-17 21:18:56','2019-01-17 21:18:56',15,NULL),(635,'8_postReply',1,'2019-01-19 08:39:05','2019-01-19 08:39:05',3,NULL),(636,'9_postReply',1,'2019-01-19 08:50:13','2019-01-19 08:50:13',3,NULL),(637,'2reply',1,'2019-01-19 11:36:23','2019-01-19 11:36:23',19,NULL),(638,'3reply',1,'2019-01-19 12:26:32','2019-01-19 12:26:32',19,NULL),(639,'4reply',1,'2019-01-19 12:33:35','2019-01-19 12:33:35',21,NULL),(643,'27_postRating',4,'2019-01-19 14:22:40','2019-01-19 14:22:40',NULL,NULL),(644,'28_post',1,'2019-01-20 07:16:53','2019-01-20 07:16:53',15,NULL),(645,'29_post',1,'2019-01-20 08:57:16','2019-01-20 08:57:16',17,NULL),(646,'30_post',1,'2019-01-20 09:23:00','2019-01-20 09:23:00',17,NULL),(647,'30_postRating',4,'2019-01-20 16:38:55','2019-01-20 16:38:55',NULL,NULL),(648,'31_post',1,'2019-01-21 06:28:31','2019-01-21 06:28:31',27,NULL),(650,'31_postRating',4,'2019-01-21 06:39:47','2019-01-21 06:39:47',NULL,NULL),(651,'6_userFollower',5,'2019-01-21 06:40:41','2019-01-21 06:40:41',3,NULL),(652,'10_postReply',1,'2019-01-22 22:32:34','2019-01-22 22:32:34',17,NULL),(653,'16_postRating',4,'2019-01-23 07:46:54','2019-01-23 07:46:54',NULL,NULL),(654,'21_postRating',5,'2019-01-23 07:46:59','2019-01-23 07:46:59',NULL,NULL),(655,'32_post',1,'2019-01-23 15:50:16','2019-01-23 15:50:16',17,NULL),(656,'15_postRating',4,'2019-01-23 21:32:18','2019-01-23 21:32:18',NULL,NULL),(657,'7_userFollower',5,'2019-01-24 13:30:00','2019-01-24 13:30:00',3,NULL),(658,'33_post',1,'2019-01-24 13:49:13','2019-01-24 13:49:13',18,NULL),(659,'34_post',1,'2019-01-24 13:55:09','2019-01-24 13:55:09',18,NULL),(660,'35_post',1,'2019-01-24 15:21:02','2019-01-24 15:21:02',3,NULL),(661,'36_post',1,'2019-01-25 12:24:45','2019-01-25 12:24:45',16,NULL),(662,'37_post',1,'2019-01-28 21:10:44','2019-01-28 21:10:44',16,NULL),(663,'38_post',1,'2019-01-31 13:04:26','2019-01-31 13:04:26',16,NULL),(664,'39_post',1,'2019-02-03 02:42:30','2019-02-03 02:42:30',15,NULL),(665,'40_post',1,'2019-02-03 02:43:17','2019-02-03 02:43:17',15,NULL),(666,'41_post',1,'2019-02-03 07:28:46','2019-02-03 07:28:46',16,NULL),(667,'42_post',1,'2019-02-08 16:00:19','2019-02-08 16:00:19',16,NULL),(668,'5reply',1,'2019-02-09 08:38:23','2019-02-09 08:38:23',16,NULL),(669,'43_post',1,'2019-02-10 09:11:52','2019-02-10 09:11:52',17,NULL),(670,'44_post',1,'2019-02-10 09:13:06','2019-02-10 09:13:06',17,NULL),(671,'45_post',1,'2019-02-10 09:19:15','2019-02-10 09:19:15',15,NULL),(672,'46_post',1,'2019-02-10 09:22:41','2019-02-10 09:22:41',15,NULL),(673,'46_postRating',5,'2019-02-10 09:25:31','2019-02-10 09:25:31',NULL,NULL),(674,'47_post',1,'2019-02-10 09:27:48','2019-02-10 09:27:48',17,NULL),(675,'48_post',1,'2019-02-10 09:28:43','2019-02-10 09:28:43',17,NULL),(676,'49_post',1,'2019-02-10 12:03:18','2019-02-10 12:03:18',17,NULL),(677,'50_post',1,'2019-02-10 23:00:08','2019-02-10 23:00:08',16,NULL),(678,'51_post',1,'2019-02-15 22:55:57','2019-02-15 22:55:57',16,NULL),(679,'11_postReply',1,'2019-02-17 05:57:23','2019-02-17 05:57:23',48,NULL),(680,'12_postReply',1,'2019-02-17 05:58:12','2019-02-17 05:58:12',48,NULL),(681,'13_postReply',1,'2019-02-17 06:05:00','2019-02-17 06:05:00',48,NULL),(682,'6reply',1,'2019-02-18 17:14:47','2019-02-18 17:14:47',48,NULL),(699,'8_userFollower',5,'2019-02-19 17:34:40','2019-02-19 17:34:40',48,NULL),(700,'9_userFollower',5,'2019-02-19 17:34:43','2019-02-19 17:34:43',48,NULL),(701,'10_userFollower',5,'2019-02-19 17:34:45','2019-02-19 17:34:45',48,NULL),(702,'587communitypost',1,'2019-02-19 18:34:57','2019-02-19 18:34:57',48,NULL),(703,'7reply',1,'2019-02-20 06:05:12','2019-02-20 06:05:12',48,NULL),(704,'52_post',1,'2019-02-20 14:37:26','2019-02-20 14:37:26',16,NULL),(706,'51_postRating',2,'2019-02-20 14:50:35','2019-02-20 14:50:35',NULL,NULL),(718,'13_postReplyRating',5,'2019-02-23 09:12:53','2019-02-23 09:12:53',NULL,NULL),(719,'53_post',1,'2019-03-02 09:19:47','2019-03-02 09:19:47',16,NULL),(730,'53_postRating',3,'2019-03-06 16:12:26','2019-03-06 16:12:26',NULL,NULL),(733,'49_postRating',5,'2019-03-06 16:27:36','2019-03-06 16:27:36',NULL,NULL),(734,'11_userFollower',5,'2019-03-07 06:53:25','2019-03-07 06:53:25',3,NULL),(735,'4_postRating',3,'2019-03-07 07:27:02','2019-03-07 07:27:02',NULL,NULL),(736,'48_postRating',4,'2019-03-07 08:53:23','2019-03-07 08:53:23',NULL,NULL),(737,'54_post',1,'2019-03-07 10:22:43','2019-03-07 10:22:43',15,NULL),(738,'14_postReply',1,'2019-03-07 21:20:17','2019-03-07 21:20:17',17,NULL),(739,'50_postRating',4,'2019-03-07 23:27:33','2019-03-07 23:27:33',NULL,NULL),(740,'56_post',1,'2019-03-08 21:18:27','2019-03-08 21:18:27',16,NULL),(741,'57_post',1,'2019-03-12 08:37:40','2019-03-12 08:37:40',16,NULL),(742,'58_post',1,'2019-03-14 11:27:15','2019-03-14 11:27:15',3,NULL),(743,'59_post',1,'2019-03-14 17:27:24','2019-03-14 17:27:24',3,NULL),(744,'59_postRating',5,'2019-03-15 13:37:57','2019-03-15 13:37:57',NULL,NULL),(745,'60_post',1,'2019-03-15 20:20:02','2019-03-15 20:20:02',3,NULL),(746,'61_post',1,'2019-03-19 20:17:37','2019-03-19 20:17:37',17,NULL),(747,'62_post',1,'2019-03-21 14:30:52','2019-03-21 14:30:52',17,NULL),(748,'63_post',1,'2019-03-21 23:50:23','2019-03-21 23:50:23',17,NULL),(749,'63_postRating',4,'2019-03-21 23:50:33','2019-03-21 23:50:33',NULL,NULL),(750,'61_postRating',4,'2019-03-21 23:50:41','2019-03-21 23:50:41',NULL,NULL),(751,'60_postRating',4,'2019-03-21 23:50:44','2019-03-21 23:50:44',NULL,NULL),(752,'58_postRating',5,'2019-03-21 23:50:47','2019-03-21 23:50:47',NULL,NULL),(753,'57_postRating',4,'2019-03-21 23:50:50','2019-03-21 23:50:50',NULL,NULL),(754,'55_postRating',3,'2019-03-21 23:50:54','2019-03-21 23:50:54',NULL,NULL),(755,'62_postRating',4,'2019-03-21 23:51:06','2019-03-21 23:51:06',NULL,NULL),(756,'588communitypost',1,'2019-03-22 15:30:39','2019-03-22 15:30:39',3,NULL),(757,'64_post',1,'2019-03-22 15:37:27','2019-03-22 15:37:27',15,NULL),(758,'589communitypost',1,'2019-03-22 15:39:42','2019-03-22 15:39:42',3,NULL),(759,'590communitypost',1,'2019-03-22 16:16:11','2019-03-22 16:16:11',3,NULL),(760,'65_post',1,'2019-03-22 17:25:32','2019-03-22 17:25:32',18,NULL),(761,'66_post',1,'2019-03-22 18:29:54','2019-03-22 18:29:54',18,NULL),(762,'67_post',1,'2019-03-22 18:30:53','2019-03-22 18:30:53',18,NULL),(763,'68_post',1,'2019-03-23 11:24:45','2019-03-23 11:24:45',16,NULL),(767,'68_postRating',5,'2019-03-23 11:27:20','2019-03-23 11:27:20',NULL,NULL),(768,'67_postRating',4,'2019-03-23 11:27:23','2019-03-23 11:27:23',NULL,NULL),(769,'65_postRating',5,'2019-03-23 11:27:27','2019-03-23 11:27:27',NULL,NULL),(770,'64_postRating',5,'2019-03-23 11:27:41','2019-03-23 11:27:41',NULL,NULL),(771,'69_post',1,'2019-03-23 12:21:55','2019-03-23 12:21:55',17,NULL),(772,'70_post',1,'2019-03-24 22:05:25','2019-03-24 22:05:25',18,NULL),(773,'71_post',1,'2019-03-25 16:12:35','2019-03-25 16:12:35',17,NULL),(774,'72_post',1,'2019-03-25 16:23:30','2019-03-25 16:23:30',17,NULL),(775,'73_post',1,'2019-03-26 23:41:35','2019-03-26 23:41:35',15,NULL),(776,'69_postRating',5,'2019-03-26 23:43:06','2019-03-26 23:43:06',NULL,NULL),(777,'70_postRating',5,'2019-03-26 23:43:12','2019-03-26 23:43:12',NULL,NULL),(778,'71_postRating',5,'2019-03-26 23:43:17','2019-03-26 23:43:17',NULL,NULL),(779,'72_postRating',5,'2019-03-26 23:43:21','2019-03-26 23:43:21',NULL,NULL),(781,'74_post',1,'2019-03-27 09:59:39','2019-03-27 09:59:39',15,NULL),(782,'12_userFollower',5,'2019-03-28 09:52:23','2019-03-28 09:52:23',69,NULL),(783,'12_userFollower',-5,'2019-03-28 09:52:27','2019-03-28 09:52:27',69,NULL),(784,'13_userFollower',5,'2019-03-28 09:52:28','2019-03-28 09:52:28',69,NULL),(785,'13_userFollower',-5,'2019-03-28 09:52:29','2019-03-28 09:52:29',69,NULL),(786,'591communitypost',1,'2019-03-28 09:53:10','2019-03-28 09:53:10',69,NULL),(787,'8reply',1,'2019-03-28 09:53:17','2019-03-28 09:53:17',69,NULL),(788,'75_post',1,'2019-04-01 23:10:19','2019-04-01 23:10:19',15,NULL),(789,'76_post',1,'2019-04-08 21:30:55','2019-04-08 21:30:55',3,NULL),(790,'77_post',1,'2019-04-11 19:50:35','2019-04-11 19:50:35',15,NULL),(791,'80_post',1,'2019-04-26 12:47:20','2019-04-26 12:47:20',15,NULL),(792,'81_post',1,'2019-04-26 20:05:20','2019-04-26 20:05:20',15,NULL),(793,'82_post',1,'2019-05-16 11:09:39','2019-05-16 11:09:39',3,NULL),(794,'83_post',1,'2019-05-18 18:44:40','2019-05-18 18:44:40',3,NULL),(795,'84_post',1,'2019-05-19 11:39:02','2019-05-19 11:39:02',3,NULL),(796,'85_post',1,'2019-05-19 22:53:03','2019-05-19 22:53:03',3,NULL),(797,'86_post',1,'2019-05-19 23:24:39','2019-05-19 23:24:39',3,NULL),(798,'87_post',1,'2019-05-19 23:27:45','2019-05-19 23:27:45',3,NULL),(799,'88_post',1,'2019-05-19 23:32:18','2019-05-19 23:32:18',3,NULL),(800,'88_postRating',5,'2019-05-20 22:12:29','2019-05-20 22:12:29',NULL,NULL),(801,'14_userFollower',5,'2019-05-20 22:13:31','2019-05-20 22:13:31',3,NULL),(802,'9reply',1,'2019-05-23 06:44:45','2019-05-23 06:44:45',3,NULL),(803,'10reply',1,'2019-05-24 16:03:19','2019-05-24 16:03:19',48,NULL),(804,'89_post',1,'2019-05-27 21:20:28','2019-05-27 21:20:28',3,NULL),(805,'73_postRating',5,'2019-05-29 06:20:39','2019-05-29 06:20:39',NULL,NULL),(832,'86_postRating',3,'2019-06-07 07:34:14','2019-06-07 07:34:14',NULL,NULL),(842,'90_postRating',5,'2019-06-10 07:16:34','2019-06-10 07:16:34',NULL,NULL),(843,'91_post',1,'2019-06-11 05:34:09','2019-06-11 05:34:09',75,NULL),(844,'92_post',1,'2019-06-13 05:32:05','2019-06-13 05:32:05',75,NULL),(845,'592communitypost',1,'2019-06-26 09:58:04','2019-06-26 09:58:04',75,NULL),(846,'593communitypost',1,'2019-06-26 10:01:07','2019-06-26 10:01:07',75,NULL),(847,'594communitypost',1,'2019-06-26 10:06:58','2019-06-26 10:06:58',75,NULL),(848,'595communitypost',1,'2019-06-26 10:24:54','2019-06-26 10:24:54',75,NULL),(849,'93_post',1,'2019-07-06 10:45:24','2019-07-06 10:45:24',75,NULL),(850,'92_postRating',4,'2019-07-06 10:49:50','2019-07-06 10:49:50',NULL,NULL),(851,'15_postReply',1,'2019-07-06 10:50:48','2019-07-06 10:50:48',75,NULL),(852,'15_postReplyRating',4,'2019-07-06 10:50:53','2019-07-06 10:50:53',NULL,NULL),(853,'94_post',1,'2019-08-13 08:15:30','2019-08-13 08:15:30',78,NULL),(854,'95_post',1,'2019-08-13 14:26:32','2019-08-13 14:26:32',78,NULL),(855,'596communitypost',1,'2019-08-14 08:48:29','2019-08-14 08:48:29',79,NULL),(856,'597communitypost',1,'2019-08-14 08:49:45','2019-08-14 08:49:45',79,NULL),(857,'11reply',1,'2019-08-14 14:42:46','2019-08-14 14:42:46',79,NULL),(858,'12reply',1,'2019-08-14 14:59:50','2019-08-14 14:59:50',78,NULL),(859,'16_postReply',1,'2019-08-14 17:55:43','2019-08-14 17:55:43',78,NULL),(860,'17_postReply',1,'2019-08-14 17:56:20','2019-08-14 17:56:20',78,NULL),(861,'16_postReplyRating',5,'2019-08-14 17:56:28','2019-08-14 17:56:28',NULL,NULL),(862,'18_postReply',1,'2019-08-15 03:29:51','2019-08-15 03:29:51',79,NULL),(863,'19_postReply',1,'2019-08-15 10:56:28','2019-08-15 10:56:28',79,NULL),(864,'20_postReply',1,'2019-08-15 10:59:19','2019-08-15 10:59:19',79,NULL),(865,'21_postReply',1,'2019-08-15 10:59:55','2019-08-15 10:59:55',79,NULL),(866,'22_postReply',1,'2019-08-15 11:20:24','2019-08-15 11:20:24',79,NULL),(867,'23_postReply',1,'2019-08-15 11:21:52','2019-08-15 11:21:52',79,NULL),(868,'24_postReply',1,'2019-08-15 11:49:50','2019-08-15 11:49:50',79,NULL),(869,'25_postReply',1,'2019-08-15 12:37:21','2019-08-15 12:37:21',79,NULL),(870,'26_postReply',1,'2019-08-15 12:39:28','2019-08-15 12:39:28',79,NULL),(871,'27_postReply',1,'2019-08-15 12:40:03','2019-08-15 12:40:03',79,NULL),(872,'28_postReply',1,'2019-08-15 12:43:26','2019-08-15 12:43:26',79,NULL),(873,'29_postReply',1,'2019-08-15 12:48:00','2019-08-15 12:48:00',79,NULL),(874,'30_postReply',1,'2019-08-15 12:50:41','2019-08-15 12:50:41',79,NULL),(875,'94_postRating',2,'2019-08-15 13:32:11','2019-08-15 13:32:11',NULL,NULL),(876,'13reply',1,'2019-08-15 13:56:20','2019-08-15 13:56:20',79,NULL),(877,'14reply',1,'2019-08-15 13:59:42','2019-08-15 13:59:42',79,NULL),(878,'15reply',1,'2019-08-15 14:04:58','2019-08-15 14:04:58',79,NULL),(879,'16reply',1,'2019-08-15 14:05:57','2019-08-15 14:05:57',79,NULL),(880,'17reply',1,'2019-08-15 14:30:23','2019-08-15 14:30:23',78,NULL),(881,'18reply',1,'2019-08-15 14:35:08','2019-08-15 14:35:08',78,NULL),(882,'19reply',1,'2019-08-15 14:37:01','2019-08-15 14:37:01',78,NULL),(883,'31_postReply',1,'2019-08-16 03:04:02','2019-08-16 03:04:02',79,NULL),(884,'32_postReply',1,'2019-08-16 03:11:50','2019-08-16 03:11:50',79,NULL),(885,'33_postReply',1,'2019-08-16 03:16:31','2019-08-16 03:16:31',79,NULL),(886,'34_postReply',1,'2019-08-16 03:58:08','2019-08-16 03:58:08',79,NULL),(887,'35_postReply',1,'2019-08-16 04:00:23','2019-08-16 04:00:23',79,NULL),(888,'20reply',1,'2019-08-16 04:48:47','2019-08-16 04:48:47',78,NULL),(889,'21reply',1,'2019-08-16 07:16:15','2019-08-16 07:16:15',80,NULL);
/*!40000 ALTER TABLE `user_credits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follower`
--

DROP TABLE IF EXISTS `user_follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_follower` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `followeeId` int(10) unsigned DEFAULT NULL,
  `followerId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `followeeId` (`followeeId`),
  KEY `followerId` (`followerId`),
  CONSTRAINT `user_follower_ibfk_1` FOREIGN KEY (`followeeId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_follower_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follower`
--

LOCK TABLES `user_follower` WRITE;
/*!40000 ALTER TABLE `user_follower` DISABLE KEYS */;
INSERT INTO `user_follower` VALUES (1,'2019-01-16 00:24:43','2019-01-16 00:24:43',1,3),(2,'2019-01-16 00:24:47','2019-01-16 00:24:47',2,3),(3,'2019-01-17 07:28:00','2019-01-17 07:28:00',6,3),(4,'2019-01-17 07:28:13','2019-01-17 07:28:13',4,3),(5,'2019-01-17 18:03:26','2019-01-17 18:03:26',11,16),(6,'2019-01-21 06:40:41','2019-01-21 06:40:41',27,3),(7,'2019-01-24 13:30:00','2019-01-24 13:30:00',35,3),(8,'2019-02-19 17:34:39','2019-02-19 17:34:39',1,48),(9,'2019-02-19 17:34:43','2019-02-19 17:34:43',2,48),(10,'2019-02-19 17:34:45','2019-02-19 17:34:45',4,48),(11,'2019-03-07 06:53:24','2019-03-07 06:53:24',9,3),(14,'2019-05-20 22:13:30','2019-05-20 22:13:30',12,3);
/*!40000 ALTER TABLE `user_follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interest`
--

DROP TABLE IF EXISTS `user_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_interest` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `interestId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `interestId` (`interestId`),
  CONSTRAINT `user_interest_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_interest_ibfk_2` FOREIGN KEY (`interestId`) REFERENCES `interest` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=873 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interest`
--

LOCK TABLES `user_interest` WRITE;
/*!40000 ALTER TABLE `user_interest` DISABLE KEYS */;
INSERT INTO `user_interest` VALUES (1,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,125),(2,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,86),(3,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,64),(4,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,63),(5,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,40),(6,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,45),(7,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,7),(8,'2019-01-12 09:06:24','2019-01-12 09:06:24',1,8),(9,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,27),(10,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,28),(11,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,58),(12,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,59),(13,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,60),(14,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,76),(15,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,77),(16,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,110),(17,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,111),(18,'2019-01-12 10:36:11','2019-01-12 10:36:11',3,148),(19,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,244),(20,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,92),(21,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,93),(22,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,53),(23,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,55),(24,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,38),(25,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,27),(26,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,29),(27,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,30),(28,'2019-01-12 11:14:11','2019-01-12 11:14:11',5,31),(29,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,109),(30,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,110),(31,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,111),(32,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,7),(33,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,32),(34,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,35),(35,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,30),(36,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,75),(37,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,72),(38,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,92),(39,'2019-01-12 18:39:51','2019-01-12 18:39:51',7,97),(40,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,1),(41,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,2),(42,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,5),(43,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,213),(44,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,128),(45,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,131),(46,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,107),(47,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,104),(48,'2019-01-12 19:41:19','2019-01-12 19:41:19',8,73),(49,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,146),(50,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,149),(51,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,151),(52,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,112),(53,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,111),(54,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,74),(55,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,73),(56,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,33),(57,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,31),(58,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,29),(59,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,21),(60,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,25),(61,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,24),(62,'2019-01-13 23:35:24','2019-01-13 23:35:24',9,26),(63,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,19),(64,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,144),(65,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,152),(66,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,147),(67,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,39),(68,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,44),(69,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,47),(70,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,45),(71,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,43),(72,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,28),(73,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,30),(74,'2019-01-15 22:15:28','2019-01-15 22:15:28',11,29),(75,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,19),(76,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,144),(77,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,152),(78,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,147),(79,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,39),(80,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,44),(81,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,47),(82,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,45),(83,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,43),(84,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,28),(85,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,30),(86,'2019-01-15 22:15:31','2019-01-15 22:15:31',11,29),(87,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,19),(88,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,144),(89,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,152),(90,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,147),(91,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,39),(92,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,44),(93,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,47),(94,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,45),(95,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,43),(96,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,28),(97,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,30),(98,'2019-01-15 22:15:33','2019-01-15 22:15:33',11,29),(99,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,344),(100,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,346),(101,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,341),(102,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,343),(103,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,342),(104,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,146),(105,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,147),(106,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,145),(107,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,150),(108,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,152),(109,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,130),(110,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,141),(111,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,143),(112,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,119),(113,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,122),(114,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,120),(115,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,123),(116,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,109),(117,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,110),(118,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,111),(119,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,113),(120,'2019-01-16 11:08:21','2019-01-16 11:08:21',12,112),(121,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,111),(122,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,109),(123,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,110),(124,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,43),(125,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,122),(126,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,126),(127,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,201),(128,'2019-01-16 18:15:43','2019-01-16 18:15:43',13,192),(129,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,246),(130,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,119),(131,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,117),(132,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,115),(133,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,107),(134,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,9),(135,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,10),(136,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,11),(137,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,12),(138,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,13),(139,'2019-01-16 22:24:00','2019-01-16 22:24:00',14,17),(140,'2019-01-17 07:52:34','2019-01-17 07:52:34',15,12),(141,'2019-01-17 07:52:34','2019-01-17 07:52:34',15,16),(142,'2019-01-17 07:52:34','2019-01-17 07:52:34',15,192),(143,'2019-01-17 07:52:34','2019-01-17 07:52:34',15,263),(144,'2019-01-17 07:52:34','2019-01-17 07:52:34',15,272),(145,'2019-01-17 07:52:34','2019-01-17 07:52:34',15,399),(146,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,59),(147,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,58),(148,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,55),(149,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,54),(150,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,56),(151,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,49),(152,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,50),(153,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,51),(154,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,41),(155,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,45),(156,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,44),(157,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,12),(158,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,10),(159,'2019-01-17 08:13:47','2019-01-17 08:13:47',16,15),(160,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,183),(161,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,187),(162,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,84),(163,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,83),(164,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,59),(165,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,68),(166,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,28),(167,'2019-01-17 08:37:59','2019-01-17 08:37:59',17,29),(168,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,183),(169,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,187),(170,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,84),(171,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,83),(172,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,59),(173,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,68),(174,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,28),(175,'2019-01-17 08:38:25','2019-01-17 08:38:25',17,29),(176,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,239),(177,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,240),(178,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,120),(179,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,124),(180,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,126),(181,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,111),(182,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,114),(183,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,93),(184,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,94),(185,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,19),(186,'2019-01-17 09:06:33','2019-01-17 09:06:33',18,23),(187,'2019-01-19 10:06:35','2019-01-19 10:06:35',19,63),(188,'2019-01-19 10:06:35','2019-01-19 10:06:35',19,64),(189,'2019-01-19 10:06:35','2019-01-19 10:06:35',19,3),(190,'2019-01-19 10:06:35','2019-01-19 10:06:35',19,7),(191,'2019-01-19 10:06:35','2019-01-19 10:06:35',19,8),(192,'2019-01-19 12:32:49','2019-01-19 12:32:49',21,64),(193,'2019-01-19 12:32:49','2019-01-19 12:32:49',21,63),(194,'2019-01-19 12:32:49','2019-01-19 12:32:49',21,2),(195,'2019-01-19 12:32:49','2019-01-19 12:32:49',21,7),(196,'2019-01-19 12:32:49','2019-01-19 12:32:49',21,8),(197,'2019-01-19 14:13:20','2019-01-19 14:13:20',22,7),(198,'2019-01-20 03:05:58','2019-01-20 03:05:58',24,42),(199,'2019-01-20 03:05:58','2019-01-20 03:05:58',24,9),(200,'2019-01-20 03:05:58','2019-01-20 03:05:58',24,10),(201,'2019-01-20 03:05:58','2019-01-20 03:05:58',24,15),(202,'2019-01-20 03:05:58','2019-01-20 03:05:58',24,2),(203,'2019-01-20 03:05:58','2019-01-20 03:05:58',24,3),(204,'2019-01-20 16:32:45','2019-01-20 16:32:45',25,6),(205,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,119),(206,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,122),(207,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,125),(208,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,126),(209,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,58),(210,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,59),(211,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,63),(212,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,41),(213,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,39),(214,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,40),(215,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,45),(216,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,9),(217,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,11),(218,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,10),(219,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,1),(220,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,3),(221,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,5),(222,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,7),(223,'2019-01-21 06:28:10','2019-01-21 06:28:10',27,8),(224,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,111),(225,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,112),(226,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,114),(227,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,110),(228,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,109),(229,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,92),(230,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,93),(231,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,98),(232,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,94),(233,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,97),(234,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,95),(235,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,72),(236,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,74),(237,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,73),(238,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,75),(239,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,71),(240,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,27),(241,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,29),(242,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,31),(243,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,30),(244,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,32),(245,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,33),(246,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,35),(247,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,36),(248,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,34),(249,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,37),(250,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,28),(251,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,9),(252,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,10),(253,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,11),(254,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,12),(255,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,16),(256,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,15),(257,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,14),(258,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,13),(259,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,17),(260,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,26),(261,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,24),(262,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,25),(263,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,21),(264,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,22),(265,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,18),(266,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,23),(267,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,109),(268,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,110),(269,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,111),(270,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,112),(271,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,114),(272,'2019-01-21 09:39:08','2019-01-21 09:39:08',23,113),(273,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,344),(274,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,340),(275,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,145),(276,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,136),(277,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,122),(278,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,110),(279,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,109),(280,'2019-01-22 20:12:10','2019-01-22 20:12:10',31,111),(281,'2019-01-23 07:44:56','2019-01-23 07:44:56',32,1),(282,'2019-01-23 07:44:56','2019-01-23 07:44:56',32,12),(283,'2019-01-23 09:45:02','2019-01-23 09:45:02',33,32),(284,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,378),(285,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,375),(286,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,376),(287,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,119),(288,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,126),(289,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,122),(290,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,109),(291,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,111),(292,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,32),(293,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,30),(294,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,35),(295,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,1),(296,'2019-01-23 22:28:20','2019-01-23 22:28:20',35,403),(297,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,376),(298,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,327),(299,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,38),(300,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,39),(301,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,45),(302,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,47),(303,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,30),(304,'2019-01-24 14:44:17','2019-01-24 14:44:17',36,32),(305,'2019-01-24 21:01:33','2019-01-24 21:01:33',37,1),(306,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,375),(307,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,376),(308,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,377),(309,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,378),(310,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,99),(311,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,104),(312,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,107),(313,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,106),(314,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,108),(315,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,82),(316,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,85),(317,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,86),(318,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,102),(319,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,38),(320,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,41),(321,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,42),(322,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,44),(323,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,45),(324,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,40),(325,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,43),(326,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,46),(327,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,48),(328,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,47),(329,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,39),(330,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,9),(331,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,10),(332,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,11),(333,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,12),(334,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,13),(335,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,14),(336,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,17),(337,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,16),(338,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,15),(339,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,1),(340,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,5),(341,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,3),(342,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,4),(343,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,6),(344,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,7),(345,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,8),(346,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,403),(347,'2019-01-25 16:07:44','2019-01-25 16:07:44',38,381),(348,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,147),(349,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,150),(350,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,145),(351,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,119),(352,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,110),(353,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,111),(354,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,109),(355,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,74),(356,'2019-01-26 18:16:22','2019-01-26 18:16:22',41,7),(357,'2019-01-27 01:08:11','2019-01-27 01:08:11',42,342),(358,'2019-01-27 01:08:11','2019-01-27 01:08:11',42,332),(359,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,245),(360,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,244),(361,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,246),(362,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,247),(363,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,248),(364,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,250),(365,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,127),(366,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,136),(367,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,143),(368,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,138),(369,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,64),(370,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,63),(371,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,59),(372,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,58),(373,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,45),(374,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,44),(375,'2019-02-01 21:52:36','2019-02-01 21:52:36',44,41),(376,'2019-02-05 23:02:25','2019-02-05 23:02:25',45,123),(377,'2019-02-05 23:02:25','2019-02-05 23:02:25',45,115),(378,'2019-02-05 23:02:25','2019-02-05 23:02:25',45,38),(379,'2019-02-05 23:02:25','2019-02-05 23:02:25',45,40),(380,'2019-02-05 23:02:25','2019-02-05 23:02:25',45,48),(381,'2019-02-11 14:29:28','2019-02-11 14:29:28',47,273),(382,'2019-02-11 14:29:28','2019-02-11 14:29:28',47,125),(383,'2019-02-11 14:29:28','2019-02-11 14:29:28',47,84),(384,'2019-02-11 14:29:28','2019-02-11 14:29:28',47,30),(385,'2019-02-11 14:29:28','2019-02-11 14:29:28',47,6),(386,'2019-02-17 05:53:57','2019-02-17 05:53:57',48,61),(387,'2019-02-17 05:53:57','2019-02-17 05:53:57',48,59),(388,'2019-02-17 05:53:57','2019-02-17 05:53:57',48,58),(389,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,49),(390,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,50),(391,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,27),(392,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,33),(393,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,1),(394,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,3),(395,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,7),(396,'2019-02-17 22:25:33','2019-02-17 22:25:33',49,8),(397,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,326),(398,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,327),(399,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,330),(400,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,328),(401,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,127),(402,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,141),(403,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,143),(404,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,134),(405,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,130),(406,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,128),(407,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,110),(408,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,111),(409,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,109),(410,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,375),(411,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,378),(412,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,380),(413,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,381),(414,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,377),(415,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,319),(416,'2019-02-20 18:32:11','2019-02-20 18:32:11',52,320),(417,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,326),(418,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,327),(419,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,330),(420,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,328),(421,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,127),(422,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,141),(423,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,143),(424,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,134),(425,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,130),(426,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,128),(427,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,110),(428,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,111),(429,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,109),(430,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,375),(431,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,378),(432,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,380),(433,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,381),(434,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,377),(435,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,319),(436,'2019-02-20 18:32:18','2019-02-20 18:32:18',52,320),(437,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,326),(438,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,327),(439,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,330),(440,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,328),(441,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,127),(442,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,141),(443,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,143),(444,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,134),(445,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,130),(446,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,128),(447,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,110),(448,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,111),(449,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,109),(450,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,375),(451,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,378),(452,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,380),(453,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,381),(454,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,377),(455,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,319),(456,'2019-02-20 18:32:26','2019-02-20 18:32:26',52,320),(457,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,326),(458,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,327),(459,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,330),(460,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,328),(461,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,127),(462,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,141),(463,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,143),(464,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,134),(465,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,130),(466,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,128),(467,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,110),(468,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,111),(469,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,109),(470,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,375),(471,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,378),(472,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,380),(473,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,381),(474,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,377),(475,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,319),(476,'2019-02-20 18:32:28','2019-02-20 18:32:28',52,320),(477,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,326),(478,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,327),(479,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,330),(480,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,328),(481,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,127),(482,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,141),(483,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,143),(484,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,134),(485,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,130),(486,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,128),(487,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,110),(488,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,111),(489,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,109),(490,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,375),(491,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,378),(492,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,380),(493,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,381),(494,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,377),(495,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,319),(496,'2019-02-20 18:32:29','2019-02-20 18:32:29',52,320),(497,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,326),(498,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,327),(499,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,330),(500,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,328),(501,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,127),(502,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,141),(503,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,143),(504,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,134),(505,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,130),(506,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,128),(507,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,110),(508,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,111),(509,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,109),(510,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,375),(511,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,378),(512,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,380),(513,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,381),(514,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,377),(515,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,319),(516,'2019-02-20 18:32:33','2019-02-20 18:32:33',52,320),(517,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,326),(518,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,327),(519,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,330),(520,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,328),(521,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,127),(522,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,141),(523,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,143),(524,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,134),(525,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,130),(526,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,128),(527,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,110),(528,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,111),(529,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,109),(530,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,375),(531,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,378),(532,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,380),(533,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,381),(534,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,377),(535,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,319),(536,'2019-02-20 18:32:38','2019-02-20 18:32:38',52,320),(537,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,326),(538,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,327),(539,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,330),(540,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,328),(541,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,127),(542,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,141),(543,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,143),(544,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,134),(545,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,130),(546,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,128),(547,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,110),(548,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,111),(549,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,109),(550,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,375),(551,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,378),(552,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,380),(553,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,381),(554,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,377),(555,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,319),(556,'2019-02-20 18:33:11','2019-02-20 18:33:11',52,320),(557,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,326),(558,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,327),(559,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,330),(560,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,328),(561,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,127),(562,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,141),(563,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,143),(564,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,134),(565,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,130),(566,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,128),(567,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,110),(568,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,111),(569,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,109),(570,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,375),(571,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,378),(572,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,380),(573,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,381),(574,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,377),(575,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,319),(576,'2019-02-20 18:33:59','2019-02-20 18:33:59',52,320),(577,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,326),(578,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,327),(579,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,330),(580,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,328),(581,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,127),(582,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,141),(583,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,143),(584,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,134),(585,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,130),(586,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,128),(587,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,110),(588,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,111),(589,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,109),(590,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,375),(591,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,378),(592,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,380),(593,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,381),(594,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,377),(595,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,319),(596,'2019-02-20 18:34:04','2019-02-20 18:34:04',52,320),(597,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,326),(598,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,327),(599,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,330),(600,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,328),(601,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,127),(602,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,141),(603,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,143),(604,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,134),(605,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,130),(606,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,128),(607,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,110),(608,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,111),(609,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,109),(610,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,375),(611,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,378),(612,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,380),(613,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,381),(614,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,377),(615,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,319),(616,'2019-02-20 18:34:05','2019-02-20 18:34:05',52,320),(617,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,326),(618,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,327),(619,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,330),(620,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,328),(621,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,127),(622,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,141),(623,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,143),(624,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,134),(625,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,130),(626,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,128),(627,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,110),(628,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,111),(629,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,109),(630,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,375),(631,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,378),(632,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,380),(633,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,381),(634,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,377),(635,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,319),(636,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,320),(637,'2019-02-20 18:34:41','2019-02-20 18:34:41',52,310),(638,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,326),(639,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,327),(640,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,330),(641,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,328),(642,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,127),(643,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,141),(644,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,143),(645,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,134),(646,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,130),(647,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,128),(648,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,110),(649,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,111),(650,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,109),(651,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,375),(652,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,378),(653,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,380),(654,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,381),(655,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,377),(656,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,319),(657,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,320),(658,'2019-02-20 18:34:49','2019-02-20 18:34:49',52,310),(659,'2019-02-25 16:38:07','2019-02-25 16:38:07',55,1),(660,'2019-02-25 16:42:50','2019-02-25 16:42:50',56,308),(661,'2019-02-25 16:42:50','2019-02-25 16:42:50',56,309),(662,'2019-02-25 16:42:50','2019-02-25 16:42:50',56,310),(663,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,9),(664,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,15),(665,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,10),(666,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,11),(667,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,50),(668,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,319),(669,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,119),(670,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,125),(671,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,122),(672,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,120),(673,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,1),(674,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,7),(675,'2019-03-07 09:12:25','2019-03-07 09:12:25',57,8),(676,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,378),(677,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,375),(678,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,377),(679,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,380),(680,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,320),(681,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,110),(682,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,111),(683,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,113),(684,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,109),(685,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,9),(686,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,17),(687,'2019-03-07 09:32:09','2019-03-07 09:32:09',58,404),(688,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,58),(689,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,59),(690,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,64),(691,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,61),(692,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,70),(693,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,56),(694,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,57),(695,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,55),(696,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,29),(697,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,27),(698,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,30),(699,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,31),(700,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,9),(701,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,11),(702,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,10),(703,'2019-03-07 20:17:11','2019-03-07 20:17:11',60,1),(704,'2019-03-10 08:47:01','2019-03-10 08:47:01',61,410),(705,'2019-03-10 08:47:01','2019-03-10 08:47:01',61,316),(706,'2019-03-10 08:47:01','2019-03-10 08:47:01',61,317),(707,'2019-03-10 08:47:01','2019-03-10 08:47:01',61,111),(708,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,58),(709,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,59),(710,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,60),(711,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,66),(712,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,65),(713,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,64),(714,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,63),(715,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,62),(716,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,67),(717,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,61),(718,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,68),(719,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,70),(720,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,69),(721,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,416),(722,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,27),(723,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,34),(724,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,32),(725,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,30),(726,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,28),(727,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,31),(728,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,29),(729,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,33),(730,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,35),(731,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,36),(732,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,37),(733,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,18),(734,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,22),(735,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,19),(736,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,23),(737,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,24),(738,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,26),(739,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,20),(740,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,25),(741,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,21),(742,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,9),(743,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,13),(744,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,17),(745,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,404),(746,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,414),(747,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,10),(748,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,14),(749,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,11),(750,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,15),(751,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,12),(752,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,16),(753,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,413),(754,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,1),(755,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,2),(756,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,3),(757,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,8),(758,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,7),(759,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,4),(760,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,5),(761,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,6),(762,'2019-03-13 13:19:25','2019-03-13 13:19:25',63,403),(763,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,42),(764,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,43),(765,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,27),(766,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,28),(767,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,18),(768,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,19),(769,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,15),(770,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,404),(771,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,2),(772,'2019-03-18 00:31:09','2019-03-18 00:31:09',65,5),(773,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,63),(774,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,64),(775,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,52),(776,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,55),(777,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,50),(778,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,49),(779,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,39),(780,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,41),(781,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,11),(782,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,13),(783,'2019-03-18 00:35:44','2019-03-18 00:35:44',66,413),(784,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,58),(785,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,61),(786,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,59),(787,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,54),(788,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,53),(789,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,52),(790,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,50),(791,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,28),(792,'2019-03-18 00:42:37','2019-03-18 00:42:37',67,18),(793,'2019-03-18 00:43:29','2019-03-18 00:43:29',67,34),(794,'2019-03-18 00:43:29','2019-03-18 00:43:29',67,19),(795,'2019-03-28 09:51:37','2019-03-28 09:51:37',69,27),(796,'2019-04-15 06:00:37','2019-04-15 06:00:37',70,5),(797,'2019-05-21 06:16:13','2019-05-21 06:16:13',73,52),(798,'2019-05-21 06:16:13','2019-05-21 06:16:13',73,416),(799,'2019-05-21 06:16:13','2019-05-21 06:16:13',73,28),(800,'2019-05-21 06:16:13','2019-05-21 06:16:13',73,19),(801,'2019-05-21 06:16:13','2019-05-21 06:16:13',73,15),(802,'2019-05-21 06:16:13','2019-05-21 06:16:13',73,58),(803,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,1),(804,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,3),(805,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,14),(806,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,15),(807,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,27),(808,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,29),(809,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,34),(810,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,38),(811,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,40),(812,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,45),(813,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,52),(814,'2019-06-07 05:20:49','2019-06-07 05:20:49',75,54),(815,'2019-06-10 06:31:32','2019-06-10 06:31:32',76,1),(816,'2019-06-10 06:31:32','2019-06-10 06:31:32',76,2),(817,'2019-06-10 06:31:32','2019-06-10 06:31:32',76,3),(818,'2019-06-10 06:31:32','2019-06-10 06:31:32',76,6),(819,'2019-06-10 06:31:32','2019-06-10 06:31:32',76,5),(820,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,414),(821,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,404),(822,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,15),(823,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,1),(824,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,3),(825,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,6),(826,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,2),(827,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,21),(828,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,19),(829,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,20),(830,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,18),(831,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,34),(832,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,32),(833,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,30),(834,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,31),(835,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,35),(836,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,49),(837,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,51),(838,'2019-08-13 08:15:06','2019-08-13 08:15:06',78,50),(839,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,81),(840,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,82),(841,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,83),(842,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,88),(843,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,87),(844,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,53),(845,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,52),(846,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,56),(847,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,50),(848,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,49),(849,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,10),(850,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,11),(851,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,14),(852,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,404),(853,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,4),(854,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,5),(855,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,417),(856,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,418),(857,'2019-08-14 08:38:41','2019-08-14 08:38:41',79,6),(858,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,52),(859,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,53),(860,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,56),(861,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,38),(862,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,39),(863,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,42),(864,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,27),(865,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,30),(866,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,33),(867,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,10),(868,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,12),(869,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,413),(870,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,1),(871,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,403),(872,'2019-08-16 07:14:45','2019-08-16 07:14:45',80,8);
/*!40000 ALTER TABLE `user_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_invite`
--

DROP TABLE IF EXISTS `user_invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_invite` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `emailToInvite` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `inviter` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inviter` (`inviter`),
  CONSTRAINT `user_invite_ibfk_1` FOREIGN KEY (`inviter`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_invite`
--

LOCK TABLES `user_invite` WRITE;
/*!40000 ALTER TABLE `user_invite` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_invite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_message`
--

DROP TABLE IF EXISTS `user_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fromId` int(10) unsigned DEFAULT NULL,
  `destinationId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fromId` (`fromId`),
  KEY `destinationId` (`destinationId`),
  CONSTRAINT `user_message_ibfk_1` FOREIGN KEY (`fromId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_message_ibfk_2` FOREIGN KEY (`destinationId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_message`
--

LOCK TABLES `user_message` WRITE;
/*!40000 ALTER TABLE `user_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_privacy`
--

DROP TABLE IF EXISTS `user_privacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_privacy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_privacy`
--

LOCK TABLES `user_privacy` WRITE;
/*!40000 ALTER TABLE `user_privacy` DISABLE KEYS */;
INSERT INTO `user_privacy` VALUES (1,'everyone','Everyone','All user can view your profile','2019-01-12 09:05:14','2019-01-12 09:05:14'),(2,'peopleifollow','People I Follow','All user can view your profile','2019-01-12 09:05:14','2019-01-12 09:05:14'),(3,'myfollowers','My Followers','All user can view your profile','2019-01-12 09:05:14','2019-01-12 09:05:14');
/*!40000 ALTER TABLE `user_privacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'student','Student','2019-01-12 09:05:12','2019-01-12 09:05:12'),(2,'professionals','Ex-student','2019-01-12 09:05:12','2019-01-12 09:05:12'),(3,'organizationInstitution','Organization/Institution','2019-01-12 09:05:12','2019-01-12 09:05:12');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'peersview'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-16  0:34:45

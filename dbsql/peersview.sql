-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 22, 2017 at 02:33 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peersview`
--

-- --------------------------------------------------------

--
-- Table structure for table `book_event`
--

CREATE TABLE `book_event` (
  `order_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `event_ID` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_event`
--

INSERT INTO `book_event` (`order_ID`, `user_ID`, `event_ID`, `price`, `qty`, `created_at`) VALUES
(1, 27, 1, 60, 2, '2017-09-18 05:16:10'),
(2, 10, 2, 0, 4, '2017-04-21 08:32:58'),
(3, 10, 4, 0, 4, '2017-05-03 09:35:30'),
(4, 10, 6, 100, 2, '2017-09-18 04:37:38'),
(5, 10, 6, 100, 2, '2017-09-18 04:41:17'),
(6, 10, 6, 100, 2, '2017-09-18 04:50:54'),
(7, 10, 6, 100, 2, '2017-09-18 04:58:17'),
(8, 10, 6, 100, 2, '2017-09-18 05:01:47'),
(9, 10, 6, 100, 2, '2017-09-18 05:03:27'),
(10, 10, 6, 100, 2, '2017-09-18 05:03:53'),
(11, 10, 6, 100, 2, '2017-09-18 05:04:04'),
(12, 10, 6, 100, 2, '2017-09-18 05:04:37'),
(13, 10, 6, 100, 2, '2017-09-18 05:05:09'),
(14, 10, 6, 100, 2, '2017-09-18 05:06:11'),
(15, 10, 6, 100, 2, '2017-09-18 05:07:18'),
(16, 10, 6, 100, 2, '2017-09-18 05:08:13'),
(17, 10, 6, 100, 2, '2017-09-18 05:08:50'),
(18, 34, 6, 100, 2, '2017-09-18 05:10:55'),
(19, 34, 6, 100, 2, '2017-09-18 05:11:30'),
(20, 34, 6, 100, 2, '2017-09-18 05:14:01'),
(21, 27, 6, 100, 2, '2017-09-18 05:14:23'),
(22, 27, 1, 100, 2, '2017-09-18 05:16:31'),
(23, 27, 7, 100, 2, '2017-09-20 06:58:01'),
(24, 22, 7, 100, 2, '2017-09-20 06:58:44'),
(25, 22, 7, 100, 2, '2017-09-20 06:59:04');

-- --------------------------------------------------------

--
-- Table structure for table `book_trans`
--

CREATE TABLE `book_trans` (
  `id` int(11) NOT NULL,
  `trans_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_trans`
--

INSERT INTO `book_trans` (`id`, `trans_id`, `event_id`, `user_Id`, `status`, `created_at`) VALUES
(1, 123456789, 4, 10, 'success', '2017-05-03 10:25:37');

-- --------------------------------------------------------

--
-- Table structure for table `brainStroming`
--

CREATE TABLE `brainStroming` (
  `nodeId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nodecolor` varchar(255) NOT NULL,
  `nodeshape` varchar(255) NOT NULL,
  `parentId` int(11) NOT NULL,
  `diagramId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brainStroming`
--

INSERT INTO `brainStroming` (`nodeId`, `name`, `nodecolor`, `nodeshape`, `parentId`, `diagramId`) VALUES
(2, 'main node', 'pink', 'circle', 0, 1),
(4, 'node1', 'pink', 'circle', 2, 1),
(5, 'node2', 'pink', 'circle', 2, 1),
(6, 'node3', 'pink', 'circle', 2, 1),
(7, 'node4', 'pink', 'circle', 4, 1),
(8, 'node4', 'pink', 'circle', 5, 1),
(9, 'node4', 'pink', 'circle', 7, 1),
(10, 'node4', 'pink', 'circle', 6, 1),
(11, 'node4', 'pink', 'circle', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `brainStromingDetails`
--

CREATE TABLE `brainStromingDetails` (
  `diagramId` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `typeId` int(11) NOT NULL COMMENT '1-community 2-forum',
  `topicName` varchar(255) NOT NULL,
  `courseId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `forumId` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brainStromingDetails`
--

INSERT INTO `brainStromingDetails` (`diagramId`, `userID`, `typeId`, `topicName`, `courseId`, `classId`, `forumId`, `created_at`, `updated_at`) VALUES
(1, 10, 1, 'abc', 3, 3, 0, '2017-08-03 13:06:45', '2017-08-28 12:26:06'),
(2, 10, 1, 'abc', 2, 1, 0, '2017-08-03 13:24:39', '2017-08-28 12:26:18'),
(3, 10, 1, 'abc', 2, 1, 0, '2017-08-03 13:24:59', '2017-08-28 12:26:14'),
(4, 10, 2, 'abc', 0, 0, 1, '2017-08-28 12:37:24', '2017-08-28 12:37:24');

-- --------------------------------------------------------

--
-- Table structure for table `comment_likes`
--

CREATE TABLE `comment_likes` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `comment_liked_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment_likes`
--

INSERT INTO `comment_likes` (`id`, `comment_id`, `comment_liked_by`) VALUES
(38, 71, 27),
(44, 150, 14),
(45, 151, 14),
(47, 201, 14),
(48, 201, 11),
(49, 202, 11);

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `communityId` int(11) NOT NULL,
  `institutionsName` varchar(255) NOT NULL,
  `institutionsEmail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `change_pwd` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`communityId`, `institutionsName`, `institutionsEmail`, `password`, `token`, `change_pwd`, `created_at`, `updated_at`) VALUES
(1, 'University of Manchester', 'test@gmail.com', '25f9e794323b453885f5181f1b624d0b', '', 0, '2017-07-12 06:32:36', '2017-09-11 12:28:18'),
(3, 'University of hyundaii', 'testgmail1@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'vtN3QsD5lweC1HHP6crRgQtcgeNOpn6A', 0, '2017-07-18 05:25:41', '2017-09-18 10:44:43'),
(4, 'ACET Update', 'saa@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'D8aPK6vsgBmrkPhGtfI3Ng97YY7Xo90D', 0, '2017-09-18 11:04:22', '2017-09-18 11:04:22'),
(5, 'Global', 'global@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'c1QxU0tpwQS3SjBSkvI7ztT9l2Czq7h6', 0, '2017-09-18 11:04:42', '2017-09-18 11:04:42'),
(6, 'GNDU', 'gndu@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'drE0TgO5dfIHVneilv5SbV8IPT9tEKkG', 0, '2017-09-18 11:04:53', '2017-09-18 11:04:53');

-- --------------------------------------------------------

--
-- Table structure for table `cources`
--

CREATE TABLE `cources` (
  `courseId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `courseType` varchar(255) NOT NULL COMMENT '1-undergraduate 2-postgraduate',
  `universityId` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cources`
--

INSERT INTO `cources` (`courseId`, `name`, `description`, `image`, `courseType`, `universityId`, `created_at`, `updated_at`) VALUES
(5, 'Economics', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate iaculis dolor, sit amet pulvinar purus gravida in.', '', '2', 6, '2017-09-18 16:11:40', '2017-09-18 16:11:40'),
(36, 'DAA', 'dummy text for testing', '', '2', 4, '2017-09-18 18:51:50', '2017-09-20 13:38:56');

-- --------------------------------------------------------

--
-- Table structure for table `courseClasses`
--

CREATE TABLE `courseClasses` (
  `classId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `universityId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courseClasses`
--

INSERT INTO `courseClasses` (`classId`, `courseId`, `universityId`, `name`) VALUES
(3, 3, 3, 'AUDITING');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course`) VALUES
(1, 'Agriculture & Forestry'),
(2, 'Anatomy & Physiology'),
(3, 'Anthropology'),
(4, 'Architecture & The built environment'),
(5, 'Accounting and Finance'),
(6, 'Astronomy'),
(7, 'Biological science'),
(8, 'Business & Management'),
(9, 'Chemistry'),
(10, 'Creative Arts'),
(11, 'Life sciences'),
(12, 'Classics & Ancient History'),
(13, 'Communication and Media studies'),
(14, 'Computer science and Information systems'),
(15, 'Development studies'),
(16, 'Dentistry'),
(17, 'Earth & Marine science'),
(18, 'Economics'),
(19, 'Education & Training'),
(20, 'Engineering-  Aeronautical'),
(21, 'Engineering-Chemical'),
(22, 'Engineering- Civil & Structural'),
(23, 'Engineering- Electrical'),
(24, 'Social work'),
(25, 'Social & Political science'),
(26, 'Engineering-Mechanical'),
(27, 'Engineering- Mineral & Mining'),
(28, 'Engineering- Computer& Network'),
(29, 'English Language & Literature'),
(30, 'Ethnicity, Gender & Diversity'),
(31, 'Finance'),
(32, 'Geography'),
(33, 'Hospitality & leisure management'),
(34, 'Human Resource Management'),
(35, 'International relations'),
(36, 'Journalism'),
(37, 'Law and Legal Studies'),
(38, 'Library & Information management'),
(39, 'Linguistics'),
(40, 'Logistics &supply chain Management'),
(41, 'Marketing'),
(42, 'Material science'),
(43, 'Mathematics'),
(44, 'Medicine'),
(45, 'Modern language'),
(46, 'Nursing'),
(47, 'Performing Arts'),
(48, 'Pharmacology'),
(49, 'Product design'),
(50, 'Pharmacy'),
(51, 'Philosophy'),
(52, 'Psychology'),
(53, 'Public policy'),
(54, 'Optometry'),
(55, 'Sociology'),
(56, 'Sports'),
(57, 'Statistics and operations'),
(58, 'Theology, Divinity and religious studies'),
(59, 'Sports Science'),
(60, 'Urban Planning'),
(61, 'Veterinary science'),
(62, 'Zoology'),
(63, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_Id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `event_title` varchar(500) NOT NULL,
  `event_description` text NOT NULL,
  `event_address` text NOT NULL,
  `event_city` varchar(100) NOT NULL,
  `event_startdate` date NOT NULL,
  `event_starttime` time NOT NULL,
  `event_enddate` date NOT NULL,
  `event_endtime` time NOT NULL,
  `event_typeofadvert` varchar(50) NOT NULL,
  `event_ticketclosedate` date NOT NULL,
  `event_ticketclosetime` time NOT NULL,
  `event_price` int(11) NOT NULL,
  `event_institutionName` varchar(100) NOT NULL,
  `event_dressCode` text NOT NULL,
  `event_contactDetails` text NOT NULL,
  `event_organiserBankaccount` int(50) NOT NULL,
  `view_count` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_Id`, `author_id`, `event_title`, `event_description`, `event_address`, `event_city`, `event_startdate`, `event_starttime`, `event_enddate`, `event_endtime`, `event_typeofadvert`, `event_ticketclosedate`, `event_ticketclosetime`, `event_price`, `event_institutionName`, `event_dressCode`, `event_contactDetails`, `event_organiserBankaccount`, `view_count`, `created_at`, `updated_at`) VALUES
(1, 27, 'this is demo title', 'this is event description', 'mohali,punjab India', 'mohali', '2017-04-18', '04:08:09', '2017-04-28', '04:08:09', 'Featured Event', '2017-04-27', '04:08:09', 0, 'demo', 'smart', 'Demo', 1234567890, 5, '2017-05-10 13:07:01', '2017-09-18 05:16:27'),
(4, 14, '', '', '', '', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', '', '0000-00-00', '00:00:00', 0, '', '', '', 0, 6, '2017-05-10 13:07:01', '2017-09-18 04:35:33'),
(5, 22, 'this is demo event', 'this is demo desc', 'moahli', 'mohi', '2017-04-18', '04:08:09', '2017-04-18', '04:08:09', 'Featured Event', '2017-04-27', '04:08:09', 0, 'demo', 'smart', 'Demo', 1234567890, 2, '2017-05-10 13:07:01', '2017-09-18 04:35:40'),
(6, 26, 'this is demo event', 'this is demo desc', 'moahli', 'mohi', '2017-04-18', '04:08:09', '2017-04-18', '04:08:09', 'Featured Event', '2017-04-27', '04:08:09', 0, 'demo', 'smart', 'Demo', 1234567890, 0, '2017-05-10 13:07:01', '2017-09-18 04:35:44'),
(7, 27, 'this is demo event', 'this is demo desc', 'moahli', 'mohi', '2017-04-18', '04:08:09', '2017-04-18', '04:08:09', 'Featured Event', '2017-04-27', '04:08:09', 0, 'demo', 'smart', 'Demo', 1234567890, 3, '2017-05-10 13:07:01', '2017-09-18 04:35:52'),
(8, 34, 'this is demo event', 'this is demo desc while update', 'moahli', 'mohi', '2017-04-18', '04:08:09', '2017-04-18', '04:08:09', 'Featured Event', '2017-04-27', '04:08:09', 0, 'demo', 'smart', 'Demo', 1234567890, 10, '2017-05-10 13:07:01', '2017-09-18 04:35:55'),
(9, 14, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:36:50', '2017-09-18 06:36:50'),
(10, 14, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:37:31', '2017-09-18 06:37:31'),
(11, 14, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:43:22', '2017-09-18 06:43:22'),
(12, 14, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:52:40', '2017-09-18 06:52:40'),
(13, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:53:25', '2017-09-18 06:53:25'),
(14, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:53:44', '2017-09-18 06:53:44'),
(15, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:54:08', '2017-09-18 06:54:08'),
(16, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:56:08', '2017-09-18 06:56:08'),
(17, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:56:26', '2017-09-18 06:56:26'),
(18, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:56:35', '2017-09-18 06:56:35'),
(19, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 06:57:24', '2017-09-18 06:57:24'),
(20, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:06:33', '2017-09-18 07:06:33'),
(21, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:06:49', '2017-09-18 07:06:49'),
(22, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:07:29', '2017-09-18 07:07:29'),
(23, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:08:08', '2017-09-18 07:08:08'),
(24, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:09:25', '2017-09-18 07:09:25'),
(25, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:09:49', '2017-09-18 07:09:49'),
(26, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:10:29', '2017-09-18 07:10:29'),
(27, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:11:05', '2017-09-18 07:11:05'),
(28, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:11:24', '2017-09-18 07:11:24'),
(29, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:11:39', '2017-09-18 07:11:39'),
(30, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:12:09', '2017-09-18 07:12:09'),
(31, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:12:39', '2017-09-18 07:12:39'),
(32, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:13:22', '2017-09-18 07:13:22'),
(33, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:14:13', '2017-09-18 07:14:13'),
(34, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:14:57', '2017-09-18 07:14:57'),
(35, 10, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:15:59', '2017-09-18 07:15:59'),
(36, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:16:23', '2017-09-18 07:16:23'),
(37, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:16:42', '2017-09-18 07:16:42'),
(38, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:23:02', '2017-09-18 07:23:02'),
(39, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:24:26', '2017-09-18 07:24:26'),
(40, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:24:52', '2017-09-18 07:24:52'),
(41, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:25:09', '2017-09-18 07:25:09'),
(42, 27, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:28:18', '2017-09-18 07:28:18'),
(43, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:32:43', '2017-09-18 07:32:43'),
(44, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:33:14', '2017-09-18 07:33:14'),
(45, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:33:28', '2017-09-18 07:33:28'),
(46, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:33:45', '2017-09-18 07:33:45'),
(47, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:34:42', '2017-09-18 07:34:42'),
(48, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:34:54', '2017-09-18 07:34:54'),
(49, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:37:57', '2017-09-18 07:37:57'),
(50, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:38:13', '2017-09-18 07:38:13'),
(51, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:42:33', '2017-09-18 07:42:33'),
(52, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:43:03', '2017-09-18 07:43:03'),
(53, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:44:39', '2017-09-18 07:44:39'),
(54, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:45:43', '2017-09-18 07:45:43'),
(55, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:47:51', '2017-09-18 07:47:51'),
(56, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:48:32', '2017-09-18 07:48:32'),
(57, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:49:02', '2017-09-18 07:49:02'),
(58, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:49:24', '2017-09-18 07:49:24'),
(59, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:49:49', '2017-09-18 07:49:49'),
(60, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:50:17', '2017-09-18 07:50:17'),
(61, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:50:41', '2017-09-18 07:50:41'),
(62, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:50:57', '2017-09-18 07:50:57'),
(63, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:52:02', '2017-09-18 07:52:02'),
(64, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:52:58', '2017-09-18 07:52:58'),
(65, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:56:31', '2017-09-18 07:56:31'),
(66, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:57:39', '2017-09-18 07:57:39'),
(67, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:58:31', '2017-09-18 07:58:31'),
(68, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 07:59:46', '2017-09-18 07:59:46'),
(69, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:00:09', '2017-09-18 08:00:09'),
(70, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:03:05', '2017-09-18 08:03:05'),
(71, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:03:14', '2017-09-18 08:03:14'),
(72, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:03:28', '2017-09-18 08:03:28'),
(73, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:03:45', '2017-09-18 08:03:45'),
(74, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:04:51', '2017-09-18 08:04:51'),
(75, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:06:21', '2017-09-18 08:06:21'),
(76, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:11:49', '2017-09-18 08:11:49'),
(77, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:12:04', '2017-09-18 08:12:04'),
(78, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:12:25', '2017-09-18 08:12:25'),
(79, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:14:15', '2017-09-18 08:14:15'),
(80, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:14:27', '2017-09-18 08:14:27'),
(81, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:15:30', '2017-09-18 08:15:30'),
(82, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:18:01', '2017-09-18 08:18:01'),
(83, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:19:43', '2017-09-18 08:19:43'),
(84, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:20:19', '2017-09-18 08:20:19'),
(85, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:20:39', '2017-09-18 08:20:39'),
(86, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:21:11', '2017-09-18 08:21:11'),
(87, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:21:26', '2017-09-18 08:21:26'),
(88, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:21:36', '2017-09-18 08:21:36'),
(89, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:22:07', '2017-09-18 08:22:07'),
(90, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:30:08', '2017-09-18 08:30:08'),
(91, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:30:41', '2017-09-18 08:30:41'),
(92, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:32:26', '2017-09-18 08:32:26'),
(93, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:33:45', '2017-09-18 08:33:45'),
(94, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:39:39', '2017-09-18 08:39:39'),
(95, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:40:06', '2017-09-18 08:40:06'),
(96, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:40:53', '2017-09-18 08:40:53'),
(97, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:41:21', '2017-09-18 08:41:21'),
(98, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:42:10', '2017-09-18 08:42:10'),
(99, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 08:42:42', '2017-09-18 08:42:42'),
(100, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:25:20', '2017-09-18 09:25:20'),
(101, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:33:07', '2017-09-18 09:33:07'),
(102, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:37:13', '2017-09-18 09:37:13'),
(103, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:37:56', '2017-09-18 09:37:56'),
(104, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:39:02', '2017-09-18 09:39:02'),
(105, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:40:07', '2017-09-18 09:40:07'),
(106, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:40:25', '2017-09-18 09:40:25'),
(107, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:41:19', '2017-09-18 09:41:19'),
(108, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:42:56', '2017-09-18 09:42:56'),
(109, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:44:13', '2017-09-18 09:44:13'),
(110, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:44:30', '2017-09-18 09:44:30'),
(111, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-18 09:47:23', '2017-09-18 09:47:23'),
(112, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-20 07:07:10', '2017-09-20 07:07:10'),
(113, 9, 'testing', 'xyzzzz', 'Mohali XYZ dsfsdfsd', 'dfsdfs', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 'sdfsdfdf', '0000-00-00', '00:00:00', 0, 'Sdfsdfsdf', 'Sfdfsdfsdf', 'sfsdfsdf', 0, 0, '2017-09-20 07:12:27', '2017-09-20 07:12:27');

-- --------------------------------------------------------

--
-- Table structure for table `event_media`
--

CREATE TABLE `event_media` (
  `id` int(11) NOT NULL,
  `event_ID` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1-Event Poster, 2- Event Images, 3- Event Video ',
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_media`
--

INSERT INTO `event_media` (`id`, `event_ID`, `type`, `name`) VALUES
(1, 8, 1, 'issue-1493794368508.png'),
(2, 9, 1, ''),
(3, 10, 1, ''),
(4, 11, 1, ''),
(5, 12, 1, ''),
(6, 13, 1, ''),
(7, 14, 1, ''),
(8, 15, 1, ''),
(9, 16, 1, ''),
(10, 17, 1, ''),
(11, 18, 1, ''),
(12, 19, 1, ''),
(13, 20, 1, ''),
(14, 21, 1, ''),
(15, 22, 1, ''),
(16, 23, 1, ''),
(17, 24, 1, ''),
(18, 25, 1, ''),
(19, 26, 1, ''),
(20, 27, 1, ''),
(21, 28, 1, ''),
(22, 29, 1, ''),
(23, 30, 1, ''),
(24, 31, 1, ''),
(25, 32, 1, ''),
(26, 33, 1, ''),
(27, 34, 1, ''),
(28, 35, 1, ''),
(29, 36, 1, ''),
(30, 37, 1, ''),
(31, 38, 1, ''),
(32, 39, 1, ''),
(33, 40, 1, ''),
(34, 41, 1, ''),
(35, 42, 1, ''),
(36, 43, 1, ''),
(37, 44, 1, ''),
(38, 45, 1, ''),
(39, 46, 1, ''),
(40, 47, 1, ''),
(41, 48, 1, ''),
(42, 49, 1, ''),
(43, 50, 1, ''),
(44, 51, 1, ''),
(45, 52, 1, ''),
(46, 53, 1, ''),
(47, 54, 1, ''),
(48, 55, 1, ''),
(49, 56, 1, ''),
(50, 57, 1, ''),
(51, 58, 1, ''),
(52, 59, 1, ''),
(53, 60, 1, ''),
(54, 61, 1, ''),
(55, 62, 1, ''),
(56, 63, 1, ''),
(57, 64, 1, ''),
(58, 65, 1, ''),
(59, 66, 1, ''),
(60, 67, 1, ''),
(61, 68, 1, ''),
(62, 69, 1, ''),
(63, 70, 1, ''),
(64, 71, 1, ''),
(65, 72, 1, ''),
(66, 73, 1, ''),
(67, 74, 1, ''),
(68, 75, 1, ''),
(69, 76, 1, ''),
(70, 77, 1, ''),
(71, 78, 1, ''),
(72, 79, 1, ''),
(73, 80, 1, ''),
(74, 81, 1, ''),
(75, 82, 1, ''),
(76, 83, 1, ''),
(77, 84, 1, ''),
(78, 85, 1, ''),
(79, 86, 1, ''),
(80, 87, 1, ''),
(81, 88, 1, ''),
(82, 89, 1, ''),
(83, 90, 1, ''),
(84, 91, 1, ''),
(85, 92, 1, ''),
(86, 93, 1, ''),
(87, 94, 1, ''),
(88, 95, 1, ''),
(89, 96, 1, ''),
(90, 97, 1, ''),
(91, 98, 1, ''),
(92, 99, 1, ''),
(93, 100, 1, ''),
(94, 101, 1, ''),
(95, 102, 1, ''),
(96, 103, 1, ''),
(97, 104, 1, ''),
(98, 105, 1, ''),
(99, 106, 1, ''),
(100, 107, 1, ''),
(101, 108, 1, ''),
(102, 109, 1, ''),
(103, 110, 1, ''),
(104, 111, 1, ''),
(105, 112, 1, ''),
(106, 113, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`id`, `user_id`, `follower_id`, `created_at`) VALUES
(1, 10, 11, '2017-08-28 07:24:25'),
(2, 11, 10, '2017-08-28 07:24:25'),
(3, 27, 10, '2017-09-05 13:33:44'),
(4, 9, 11, '2017-09-05 13:34:00'),
(5, 9, 34, '2017-09-05 13:37:44'),
(6, 9, 48, '2017-09-05 13:38:01'),
(7, 9, 28, '2017-09-05 13:40:17'),
(9, 9, 26, '2017-09-06 05:47:18'),
(10, 9, 27, '2017-09-06 05:49:30'),
(11, 9, 27, '2017-09-06 05:52:53'),
(12, 9, 10, '2017-09-06 05:53:31'),
(13, 9, 10, '2017-09-06 05:55:07'),
(14, 9, 10, '2017-09-06 05:55:56'),
(15, 9, 10, '2017-09-06 05:56:41'),
(16, 9, 10, '2017-09-06 05:57:16'),
(17, 9, 10, '2017-09-06 06:06:06'),
(18, 9, 10, '2017-09-06 06:07:04'),
(19, 9, 10, '2017-09-06 06:07:26'),
(20, 27, 10, '2017-09-06 06:09:25'),
(21, 9, 10, '2017-09-06 06:09:51'),
(22, 9, 10, '2017-09-06 06:11:08'),
(23, 9, 10, '2017-09-06 06:11:28'),
(24, 9, 10, '2017-09-06 06:11:57'),
(25, 9, 10, '2017-09-06 06:13:27'),
(26, 9, 10, '2017-09-06 06:14:35'),
(27, 9, 10, '2017-09-06 06:15:39'),
(28, 9, 10, '2017-09-06 06:17:20'),
(29, 9, 10, '2017-09-06 06:17:39'),
(30, 9, 10, '2017-09-06 06:19:35'),
(31, 9, 10, '2017-09-06 06:20:43'),
(32, 9, 10, '2017-09-06 06:22:53'),
(33, 9, 10, '2017-09-06 06:25:39'),
(34, 9, 10, '2017-09-06 06:28:09'),
(35, 9, 10, '2017-09-06 06:30:11'),
(36, 9, 10, '2017-09-06 06:30:51'),
(37, 9, 10, '2017-09-06 06:38:57'),
(38, 9, 10, '2017-09-06 06:39:23'),
(39, 9, 10, '2017-09-06 11:07:21'),
(40, 9, 10, '2017-09-06 11:07:43'),
(41, 9, 10, '2017-09-06 11:11:16'),
(42, 9, 10, '2017-09-06 11:12:47'),
(43, 9, 10, '2017-09-06 11:14:01'),
(44, 9, 10, '2017-09-06 11:14:09'),
(45, 9, 10, '2017-09-06 11:14:49'),
(46, 9, 10, '2017-09-06 11:14:56'),
(47, 9, 10, '2017-09-06 11:17:02'),
(48, 9, 10, '2017-09-06 11:17:33'),
(49, 9, 10, '2017-09-06 11:17:43'),
(50, 9, 10, '2017-09-06 11:19:27'),
(51, 9, 10, '2017-09-06 11:19:36'),
(52, 9, 10, '2017-09-06 11:20:46'),
(53, 9, 10, '2017-09-06 11:21:14'),
(54, 9, 10, '2017-09-06 11:21:50'),
(55, 9, 10, '2017-09-06 11:22:30'),
(56, 9, 10, '2017-09-06 11:22:38'),
(57, 9, 10, '2017-09-06 11:23:29'),
(58, 9, 10, '2017-09-06 11:23:50'),
(59, 9, 10, '2017-09-06 11:24:11'),
(60, 9, 10, '2017-09-06 11:24:44'),
(61, 9, 10, '2017-09-06 11:25:02'),
(62, 9, 10, '2017-09-06 11:25:11'),
(63, 9, 10, '2017-09-06 11:25:32'),
(64, 9, 10, '2017-09-06 11:32:39'),
(65, 9, 10, '2017-09-06 11:32:41'),
(66, 9, 10, '2017-09-06 11:32:42'),
(67, 9, 10, '2017-09-06 11:32:42'),
(68, 9, 10, '2017-09-06 11:32:43'),
(69, 9, 10, '2017-09-06 11:32:43'),
(70, 9, 10, '2017-09-06 11:32:44'),
(71, 9, 10, '2017-09-06 11:32:44'),
(72, 9, 10, '2017-09-06 11:32:44'),
(73, 9, 10, '2017-09-06 11:32:44'),
(74, 9, 10, '2017-09-06 11:32:45'),
(75, 9, 10, '2017-09-06 11:32:45'),
(76, 9, 10, '2017-09-06 11:32:45'),
(77, 9, 10, '2017-09-06 11:32:46'),
(78, 9, 10, '2017-09-06 11:32:46'),
(79, 9, 10, '2017-09-06 11:32:46'),
(80, 9, 10, '2017-09-06 11:32:46'),
(81, 9, 10, '2017-09-06 11:32:47'),
(82, 9, 10, '2017-09-06 11:32:47'),
(83, 9, 10, '2017-09-06 11:32:48'),
(84, 9, 10, '2017-09-06 11:34:43'),
(85, 9, 10, '2017-09-06 11:35:33'),
(86, 9, 10, '2017-09-06 11:36:27'),
(87, 9, 10, '2017-09-06 11:36:28'),
(88, 9, 10, '2017-09-06 11:36:29'),
(89, 9, 10, '2017-09-06 11:36:29'),
(90, 9, 10, '2017-09-06 11:36:29'),
(91, 9, 10, '2017-09-06 11:36:29'),
(92, 9, 10, '2017-09-06 11:36:30'),
(93, 9, 10, '2017-09-06 11:36:30'),
(94, 9, 10, '2017-09-06 11:36:30'),
(95, 9, 10, '2017-09-06 11:36:30'),
(96, 9, 10, '2017-09-06 11:36:37'),
(97, 9, 10, '2017-09-06 11:36:37'),
(98, 9, 10, '2017-09-06 11:36:38'),
(99, 9, 10, '2017-09-06 11:36:38'),
(100, 9, 10, '2017-09-06 11:36:38'),
(101, 9, 10, '2017-09-06 11:36:38'),
(102, 9, 10, '2017-09-06 11:36:38'),
(103, 9, 10, '2017-09-06 11:36:38'),
(104, 9, 10, '2017-09-06 11:36:39'),
(105, 9, 10, '2017-09-06 11:36:39'),
(106, 9, 10, '2017-09-06 11:36:39'),
(107, 9, 10, '2017-09-06 11:36:39'),
(108, 9, 10, '2017-09-06 11:37:09'),
(109, 9, 10, '2017-09-06 11:37:09'),
(110, 9, 10, '2017-09-06 11:37:09'),
(111, 9, 10, '2017-09-06 11:37:10'),
(112, 9, 10, '2017-09-06 11:37:10'),
(113, 9, 10, '2017-09-06 11:37:10'),
(114, 9, 10, '2017-09-06 11:37:10'),
(115, 9, 10, '2017-09-06 11:37:11'),
(116, 9, 10, '2017-09-06 11:37:11'),
(117, 9, 10, '2017-09-06 11:37:11'),
(118, 9, 10, '2017-09-06 11:37:11'),
(119, 9, 10, '2017-09-06 11:37:11'),
(120, 9, 10, '2017-09-06 11:37:11'),
(121, 9, 10, '2017-09-06 11:37:12'),
(122, 9, 10, '2017-09-06 11:37:12'),
(123, 9, 10, '2017-09-06 11:37:12'),
(124, 9, 10, '2017-09-06 11:37:13'),
(125, 9, 10, '2017-09-06 11:37:13'),
(126, 9, 10, '2017-09-06 11:37:13'),
(127, 9, 10, '2017-09-06 11:37:14'),
(128, 9, 10, '2017-09-06 11:37:14'),
(129, 9, 10, '2017-09-06 11:37:14'),
(130, 9, 10, '2017-09-06 11:37:14'),
(131, 9, 10, '2017-09-06 11:37:14'),
(132, 9, 10, '2017-09-06 11:37:51'),
(133, 9, 10, '2017-09-06 11:38:02'),
(134, 9, 10, '2017-09-06 11:39:00'),
(135, 9, 10, '2017-09-06 11:39:10'),
(136, 9, 10, '2017-09-06 13:04:48'),
(137, 22, 10, '2017-09-06 13:05:59'),
(138, 22, 10, '2017-09-06 13:06:03'),
(139, 22, 10, '2017-09-06 13:06:07'),
(140, 22, 10, '2017-09-06 13:06:28'),
(141, 22, 10, '2017-09-06 13:06:32'),
(142, 22, 10, '2017-09-06 13:06:36'),
(143, 22, 10, '2017-09-07 09:29:48'),
(144, 22, 10, '2017-09-07 09:30:13'),
(145, 28, 10, '2017-09-07 09:30:38'),
(146, 28, 10, '2017-09-07 09:31:29'),
(147, 28, 10, '2017-09-07 09:32:08'),
(148, 28, 10, '2017-09-08 04:50:50'),
(149, 11, 10, '2017-09-18 05:27:02'),
(150, 11, 10, '2017-09-18 05:27:14'),
(151, 11, 10, '2017-09-18 05:30:38'),
(152, 11, 10, '2017-09-18 05:32:27'),
(153, 11, 10, '2017-09-18 05:32:36'),
(154, 11, 10, '2017-09-18 05:32:52'),
(155, 11, 10, '2017-09-18 05:48:03'),
(156, 22, 10, '2017-09-18 05:48:57'),
(157, 22, 10, '2017-09-18 05:50:28'),
(158, 22, 10, '2017-09-18 06:00:02'),
(159, 22, 10, '2017-09-18 06:02:31'),
(160, 22, 10, '2017-09-18 06:02:59'),
(161, 22, 10, '2017-09-18 06:03:07'),
(162, 22, 10, '2017-09-18 06:03:45'),
(163, 22, 10, '2017-09-18 06:03:48'),
(164, 22, 27, '2017-09-18 06:04:41'),
(165, 22, 27, '2017-09-18 06:06:35'),
(166, 22, 27, '2017-09-18 06:07:24'),
(167, 22, 27, '2017-09-18 06:08:17'),
(168, 22, 27, '2017-09-19 09:30:23'),
(169, 48, 27, '2017-09-19 09:31:43'),
(170, 48, 27, '2017-09-19 09:32:41'),
(171, 48, 27, '2017-09-19 09:32:50'),
(172, 48, 27, '2017-09-19 09:33:14'),
(173, 48, 27, '2017-09-19 09:33:17'),
(174, 48, 27, '2017-09-19 09:33:19'),
(175, 48, 27, '2017-09-19 09:33:21'),
(176, 48, 27, '2017-09-19 09:33:22'),
(177, 48, 27, '2017-09-19 09:33:24'),
(178, 48, 27, '2017-09-19 09:33:26'),
(179, 48, 27, '2017-09-19 09:33:27'),
(180, 48, 27, '2017-09-19 09:33:29'),
(181, 48, 27, '2017-09-19 09:33:30'),
(182, 48, 27, '2017-09-19 09:33:32'),
(183, 48, 27, '2017-09-19 09:33:42'),
(184, 48, 27, '2017-09-19 09:33:44'),
(185, 48, 27, '2017-09-19 09:33:45'),
(186, 48, 27, '2017-09-19 09:33:53'),
(187, 48, 27, '2017-09-19 09:33:56'),
(188, 48, 27, '2017-09-19 09:33:58'),
(189, 48, 27, '2017-09-19 09:34:01'),
(190, 48, 27, '2017-09-19 09:39:22'),
(191, 9, 27, '2017-09-20 07:04:04'),
(192, 22, 27, '2017-09-20 07:04:30'),
(193, 22, 27, '2017-09-20 07:04:46');

-- --------------------------------------------------------

--
-- Table structure for table `follow_thread`
--

CREATE TABLE `follow_thread` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_thread`
--

INSERT INTO `follow_thread` (`id`, `question_id`, `user_id`) VALUES
(5, 8, 10),
(57, 8, 49),
(58, 8, 48),
(63, 28, 10),
(79, 7, 10),
(80, 8, 10),
(87, 48, 27),
(89, 13, 27),
(92, 8, 27);

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `forum_id` int(11) NOT NULL,
  `forumDetails_Id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `category` int(11) NOT NULL,
  `forumtype` int(11) NOT NULL COMMENT '1:General 2:Course 3:carrers',
  `graduatetype` int(11) NOT NULL COMMENT '1:Postgraduate, 2:Undergraduate',
  `description` text NOT NULL,
  `view_count` int(11) NOT NULL,
  `share_count` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`forum_id`, `forumDetails_Id`, `author_id`, `question`, `category`, `forumtype`, `graduatetype`, `description`, `view_count`, `share_count`, `created_at`, `updated_at`) VALUES
(7, 1, 10, 'this is a demo question ?', 0, 1, 1, '', 0, 0, '2017-04-18 12:58:08', '2017-08-24 11:55:15'),
(8, 1, 48, 'Testing hhsdasd', 0, 1, 2, '', 2, 4, '2017-04-18 12:58:43', '2017-09-12 10:01:42'),
(10, 1, 10, 'this is a second demo question ?', 1, 2, 1, '', 0, 0, '2017-04-18 12:59:29', '2017-08-24 11:55:08'),
(11, 1, 10, 'this is a second demo question ?', 1, 2, 2, '', 0, 0, '2017-04-18 12:59:29', '2017-08-24 13:10:23'),
(13, 1, 49, 'abc update', 0, 3, 0, 'abcabv cabca', 0, 0, '2017-08-24 11:41:55', '2017-09-12 09:48:11');

-- --------------------------------------------------------

--
-- Table structure for table `forumDetails`
--

CREATE TABLE `forumDetails` (
  `forumDetails_Id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author_id` int(11) NOT NULL,
  `institution_Id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forumDetails`
--

INSERT INTO `forumDetails` (`forumDetails_Id`, `name`, `author_id`, `institution_Id`, `created_at`, `updated_at`) VALUES
(1, 'Forum Name 1', 10, 3, '2017-08-24 12:10:18', '2017-08-24 12:24:58'),
(2, 'update Name 2', 10, 3, '2017-08-24 12:12:40', '2017-08-24 12:24:55'),
(3, 'Forum Name 2', 10, 3, '2017-08-24 12:23:03', '2017-08-24 12:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `forummembers`
--

CREATE TABLE `forummembers` (
  `forumMemberId` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `forumDetails_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forummembers`
--

INSERT INTO `forummembers` (`forumMemberId`, `user_id`, `forumDetails_id`) VALUES
(5, 10, 1),
(6, 11, 1),
(7, 14, 1),
(8, 22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `forumPolls`
--

CREATE TABLE `forumPolls` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `forumId` int(11) NOT NULL,
  `timeLimit` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forumPolls`
--

INSERT INTO `forumPolls` (`id`, `name`, `userId`, `forumId`, `timeLimit`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'forum poll update', 10, 2, 2, 1, '2017-08-28 05:36:07', '2017-08-28 05:39:04');

-- --------------------------------------------------------

--
-- Table structure for table `forumpolls_options`
--

CREATE TABLE `forumpolls_options` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `forumpollId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forumpolls_options`
--

INSERT INTO `forumpolls_options` (`id`, `name`, `forumpollId`) VALUES
(1, 'update option 1', 1),
(2, 'optiom3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `forumuserspolls`
--

CREATE TABLE `forumuserspolls` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `forumpollId` int(11) NOT NULL,
  `optionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forumuserspolls`
--

INSERT INTO `forumuserspolls` (`id`, `userId`, `forumpollId`, `optionId`) VALUES
(1, 10, 1, 2),
(2, 11, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `instituteId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `adminEmail` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `privacy` int(11) NOT NULL COMMENT '1-public, 2-private, 3-secret',
  `is_active` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`groupId`, `userId`, `instituteId`, `name`, `description`, `adminEmail`, `image`, `privacy`, `is_active`, `created_at`, `updated_at`) VALUES
(9, 10, 6, 'group1', 'this is desc', 'this@gmail.com', '', 1, 0, '2017-09-19 10:18:49', '2017-09-20 13:47:09'),
(58, 22, 3, 'peers group', 'testing', 'admin@gmail.com', '', 1, 0, '2017-09-20 13:50:31', '2017-09-20 13:51:45');

-- --------------------------------------------------------

--
-- Table structure for table `guest_list`
--

CREATE TABLE `guest_list` (
  `guestId` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1-Student, 2-ex-Student',
  `location` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guest_list`
--

INSERT INTO `guest_list` (`guestId`, `userID`, `eventID`, `name`, `type`, `location`, `created_at`) VALUES
(2, 22, 4, 'Manoj', 1, 'Mohali', '2017-08-02 13:30:11'),
(3, 28, 4, 'sdasd', 1, 'asdasd', '2017-09-07 19:30:08');

-- --------------------------------------------------------

--
-- Table structure for table `inbox`
--

CREATE TABLE `inbox` (
  `id` int(11) NOT NULL,
  `relation_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_seen` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 for not seen  1 for seen',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `interests`
--

CREATE TABLE `interests` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interests`
--

INSERT INTO `interests` (`id`, `title`) VALUES
(1, 'Technology'),
(2, 'Movies'),
(3, 'Science'),
(4, 'Law'),
(5, 'Business'),
(6, 'Philosophy'),
(7, 'Fitness & Health'),
(8, 'Visiting & Travelling'),
(9, 'Education'),
(10, 'Economics'),
(11, 'Engineering'),
(12, 'Cooking'),
(13, 'Sports'),
(14, 'Photography'),
(15, 'Psychology'),
(16, 'Accounting'),
(17, 'History'),
(18, 'Music'),
(19, 'Computer Programming'),
(20, 'Marketing'),
(21, 'Finance'),
(22, 'Mathematics'),
(23, 'Fashion & Style'),
(24, 'Politics'),
(25, 'Literature'),
(26, 'Current Affairs\r\nTelevision Service'),
(27, 'Fine Art'),
(28, 'Journalism'),
(29, 'Entertainment'),
(30, 'World News'),
(31, 'Motoring'),
(32, 'Trending News'),
(33, 'Energy'),
(34, 'TV SERIES'),
(35, 'FASHION & BEAUTY***'),
(36, 'NHL'),
(37, 'NBA'),
(38, 'CELEBRITY'),
(39, 'TECHNOLOGY PRODUCTS'),
(40, 'ENGLISH PREMIER LEAGUE'),
(41, 'AUTOMOBILES'),
(42, 'NFL'),
(43, 'TECHNOLOGY BRANDS'),
(44, 'AEROSPACE'),
(45, 'RELIGION'),
(46, 'TRAVEL & HOLIDAY'),
(47, 'SPANISH LA LIGA'),
(48, 'SCIENCE'),
(49, 'BOOK AUTHORS'),
(50, 'FAMILY & LIFE'),
(51, 'Food'),
(52, 'Gaming'),
(53, 'Books'),
(54, 'Films'),
(55, 'MBL');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `jobId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL COMMENT '1-contract, 2-full-time, 3-par-time',
  `hoursPerWeek` varchar(255) NOT NULL,
  `pricePerHour` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`jobId`, `title`, `description`, `type`, `hoursPerWeek`, `pricePerHour`, `location`, `created_at`, `updated_at`) VALUES
(1, 'this is job', 'this is description', 1, '10-15', '$15-$16', 'abc', '2017-07-25 19:15:01', '2017-07-25 19:15:01'),
(2, 'this is job', 'this is description', 1, '10-15', '$15-$16', 'xyz', '2017-07-25 19:21:54', '2017-07-25 19:15:11'),
(4, 'this is job', 'this is description', 1, '10-15', '$15-$16', 'abc', '2017-07-25 19:15:12', '2017-07-25 19:15:12');

-- --------------------------------------------------------

--
-- Table structure for table `landing_emails`
--

CREATE TABLE `landing_emails` (
  `id` int(11) NOT NULL,
  `email` varchar(234) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `landing_emails`
--

INSERT INTO `landing_emails` (`id`, `email`, `created_at`) VALUES
(1, 'salonimalhotra1ind@gmail.com', '2017-09-22 11:49:14'),
(5, 'xyz@gmail.com', '2017-09-22 12:00:26'),
(6, 'ronku987@gmail.com', '2017-09-22 12:00:48'),
(7, 'ajay12@gmail.com', '2017-09-22 12:32:16');

-- --------------------------------------------------------

--
-- Table structure for table `marketPlace`
--

CREATE TABLE `marketPlace` (
  `marketplaceId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `instituteId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `price` float NOT NULL,
  `location` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `edition` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `marketPlace`
--

INSERT INTO `marketPlace` (`marketplaceId`, `userId`, `instituteId`, `name`, `description`, `email`, `phone`, `image`, `price`, `location`, `author`, `edition`, `created_at`, `updated_at`) VALUES
(1, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', 'No-Image-Basic-1500985711134.png', 0, '', '', '', '2017-07-25 17:58:31', '2017-07-25 17:58:31'),
(3, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:09:43', '2017-07-25 18:09:43'),
(4, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:10:08', '2017-07-25 18:10:08'),
(5, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:10:27', '2017-07-25 18:10:27'),
(6, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:14:50', '2017-07-25 18:14:50'),
(7, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:18:48', '2017-07-25 18:18:48'),
(8, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:19:05', '2017-07-25 18:19:05'),
(9, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:20:18', '2017-07-25 18:20:18'),
(10, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', '', 0, '', '', '', '2017-07-25 18:20:35', '2017-07-25 18:20:35'),
(11, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', 'upgrade_arrow_icon-dd17277e-b58d-45b9-8a78-fb931a0225bd.png,upgrade_arrow_icon-270397c9-1ca3-4830-a262-4878b9ef827d.png,upgrade_icon-24b12216-fd5a-4cf6-912f-a2140a8de466.png', 0, '', '', '', '2017-07-25 18:42:43', '2017-07-25 18:42:43'),
(12, 10, 3, 'This is add', 'this is description add', 'admin@gmail.com', '123456789', 'upgrade_arrow_icon-20b9f21a-640f-4258-82ea-a7e592d9c2e3.png,upgrade_arrow_icon-f300dd03-97a6-4ea2-a3bb-3d23dae65fc2.png,upgrade_icon-4f152c80-38b0-4b35-b4df-7c9830c8253d.png', 0, '', '', '', '2017-07-25 18:43:37', '2017-07-25 18:43:37');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `file` varchar(255) NOT NULL,
  `is_read` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `file`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 10, 11, 'Hello', '', 0, '2017-03-02 07:09:57', '2017-09-18 10:26:35'),
(2, 11, 10, 'Hello mate', '', 0, '2017-03-02 07:09:57', '2017-09-18 10:26:30'),
(3, 11, 10, 'Hello', '', 0, '2017-03-02 07:09:57', '2017-09-18 10:26:34'),
(4, 10, 11, 'How are you?', '', 0, '2017-03-02 08:32:35', '2017-09-18 10:26:37'),
(5, 10, 11, 'What r u doing?', '', 0, '2017-03-02 08:35:08', '2017-09-18 10:26:39'),
(6, 10, 12, 'Hello', '', 0, '2017-03-02 07:09:57', '2017-03-02 07:09:57'),
(7, 9, 10, 'Hello', '', 0, '2017-03-02 08:09:57', '2017-03-02 09:58:55'),
(8, 10, 9, 'Hello!!', '', 0, '2017-03-02 08:09:57', '2017-03-02 09:58:55'),
(10, 10, 11, 'this is file upload', 'Campus functional Sspecification-1501669953415.docx', 0, '2017-08-02 10:32:33', '2017-08-02 10:32:33'),
(11, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:14:13', '2017-09-18 10:27:55'),
(12, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:17:42', '2017-09-18 10:27:55'),
(13, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:21:10', '2017-09-18 10:27:55'),
(14, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:23:10', '2017-09-18 10:27:55'),
(15, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:27:40', '2017-09-18 10:27:55'),
(16, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:28:24', '2017-09-18 10:27:55'),
(17, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:30:19', '2017-09-18 10:27:55'),
(18, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:30:52', '2017-09-18 10:27:55'),
(19, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:30:59', '2017-09-18 10:27:55'),
(20, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:32:11', '2017-09-18 10:27:55'),
(21, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:32:53', '2017-09-18 10:27:55'),
(22, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:32:58', '2017-09-18 10:27:55'),
(23, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:33:00', '2017-09-18 10:27:55'),
(24, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:33:01', '2017-09-18 10:27:55'),
(25, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:34:32', '2017-09-18 10:27:55'),
(26, 10, 22, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-07 11:34:34', '2017-09-18 10:27:55'),
(27, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:38:52', '2017-09-07 11:38:52'),
(28, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:39:47', '2017-09-07 11:39:47'),
(29, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:40:42', '2017-09-07 11:40:42'),
(30, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:41:20', '2017-09-07 11:41:20'),
(31, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:46:13', '2017-09-07 11:46:13'),
(32, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:48:21', '2017-09-07 11:48:21'),
(33, 10, 28, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-07 11:54:50', '2017-09-07 11:54:50'),
(34, 10, 48, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-12 10:28:05', '2017-09-20 10:18:30'),
(35, 10, 48, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-12 10:29:50', '2017-09-20 10:18:30'),
(36, 10, 48, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-12 10:30:13', '2017-09-20 10:18:30'),
(37, 10, 48, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-12 10:32:07', '2017-09-20 10:18:30'),
(38, 10, 48, 'Hello saloni this email is for testing!!!', '', 1, '2017-09-12 10:32:56', '2017-09-20 10:18:30'),
(39, 10, 49, 'Hello saloni this email is for testing!!!', '', 0, '2017-09-12 10:33:14', '2017-09-12 10:33:14');

-- --------------------------------------------------------

--
-- Table structure for table `newsnow_data`
--

CREATE TABLE `newsnow_data` (
  `ips` int(11) NOT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Root_name` varchar(100) NOT NULL,
  `Root_Url` text,
  `Title` text,
  `Url` text NOT NULL,
  `Date` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `newsnow_data`
--

INSERT INTO `newsnow_data` (`ips`, `Category`, `Root_name`, `Root_Url`, `Title`, `Url`, `Date`) VALUES
(1, 'arts', 'The Conversation', 'https://theconversation.com', 'Remembering the Blue Notes: South Africa’s first generation of free jazz', 'https://theconversation.com/remembering-the-blue-notes-south-africas-first-generation-of-free-jazz-83824', 'September 11, 2017'),
(2, 'arts', 'The Conversation', 'https://theconversation.com', 'Why Spike Lee’s 25th Hour is the most enduring film about 9/11', 'https://theconversation.com/why-spike-lees-25th-hour-is-the-most-enduring-film-about-9-11-82020', 'September 8, 2017'),
(3, 'arts', 'The Conversation', 'https://theconversation.com', 'Why crime writers irk forensic scientists', 'https://theconversation.com/take-pity-on-forensic-scientists-crime-writers-make-their-lives-a-nightmare-83620', 'September 7, 2017'),
(4, 'arts', 'The Conversation', 'https://theconversation.com', 'Musine Kokalari: a lost story of defiance', 'https://theconversation.com/musine-kokalari-a-lost-story-of-defiance-in-the-face-of-political-oppression-83541', 'September 7, 2017'),
(5, 'arts', 'The Conversation', 'https://theconversation.com', 'How fashion adapted to climate change – in the Little Ice Age', 'https://theconversation.com/how-fashion-adapted-to-climate-change-in-the-little-ice-age-82104', 'September 8, 2017'),
(6, 'arts', 'The Conversation', 'https://theconversation.com', 'In defense of HBO’s counterfactual ‘Confederate’', 'https://theconversation.com/in-defense-of-hbos-counterfactual-confederate-83483', 'September 6, 2017'),
(7, 'arts', 'The Conversation', 'https://theconversation.com', 'Musical ‘crate digging’ across Africa', 'https://theconversation.com/whose-record-is-it-anyway-musical-crate-digging-across-africa-83458', 'September 6, 2017'),
(8, 'arts', 'The Conversation', 'https://theconversation.com', 'My favourite album: Kate Bush’s Hounds of Love', 'https://theconversation.com/my-favourite-album-kate-bushs-hounds-of-love-79899', 'September 8, 2017'),
(9, 'arts', 'The Conversation', 'https://theconversation.com', 'From Breakfast at Tiffany’s to Hellboy: the problem of Hollywood ‘whitewashing’', 'https://theconversation.com/from-breakfast-at-tiffanys-to-hellboy-the-ongoing-problem-of-hollywood-whitewashing-83331', 'September 5, 2017'),
(10, 'arts', 'The Conversation', 'https://theconversation.com', 'What creativity really is - and why schools need it', 'https://theconversation.com/what-creativity-really-is-and-why-schools-need-it-81889', 'August 30, 2017'),
(11, 'arts', 'The Conversation', 'https://theconversation.com', 'Growing old disgracefully: DC comics’ Harley Quinn turns 25', 'https://theconversation.com/growing-old-disgracefully-dc-comics-harley-quinn-turns-25-82795', 'September 1, 2017'),
(12, 'arts', 'The Conversation', 'https://theconversation.com', 'Worth reading: Bananas, dwarves, salt and love', 'https://theconversation.com/worth-reading-bananas-dwarves-salt-and-love-82304', 'September 1, 2017'),
(13, 'arts', 'The Conversation', 'https://theconversation.com', 'The Tragically Hip imagines a better future', 'https://theconversation.com/ahead-by-a-century-the-hip-imagines-a-better-future-82507', 'August 17, 2017'),
(14, 'arts', 'The Conversation', 'https://theconversation.com', 'Channel 4’s The State: disturbing and accurate reminder of idealism gone wrong', 'https://theconversation.com/channel-4s-the-state-disturbing-and-accurate-reminder-of-idealism-gone-wrong-83018', 'August 25, 2017'),
(15, 'arts', 'The Conversation', 'https://theconversation.com', 'Why  invites empathy not voyeurism', 'https://theconversation.com/why-s-town-invites-empathy-not-voyeurism-76510', 'April 27, 2017'),
(16, 'arts', 'The Conversation', 'https://theconversation.com', 'Beyond Atomic Blonde: Cinema’s history of violent women', 'https://theconversation.com/beyond-atomic-blonde-cinemas-long-proud-history-of-violent-women-82900', 'August 29, 2017'),
(17, 'arts', 'The Conversation', 'https://theconversation.com', 'Game of Thrones: It’s all about Sansa & Arya', 'https://theconversation.com/forget-jon-snow-watch-the-young-women-to-find-out-how-game-of-thrones-ends-81372', 'August 25, 2017'),
(18, 'arts', 'The Conversation', 'https://theconversation.com', 'Chaplin provides tips on ridiculing Nazis', 'https://theconversation.com/for-a-primer-on-how-to-make-fun-of-nazis-look-to-charlie-chaplin-82574', 'August 25, 2017'),
(19, 'arts', 'The Conversation', 'https://theconversation.com', 'Decoding the music masterpieces: Schubert’s Winterreise', 'https://theconversation.com/decoding-the-music-masterpieces-schuberts-winterreise-81553', 'August 28, 2017'),
(20, 'arts', 'The Conversation', 'https://theconversation.com', 'Inconvenient truths about An Inconvenient Truth', 'https://theconversation.com/an-inconvenient-truth-about-an-inconvenient-truth-81799', 'August 16, 2017');
-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `notification` text NOT NULL,
  `is_read` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `sender_id`, `receiver_id`, `notification`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 11, 10, '[sender] started following you.', 0, '2017-03-02 10:52:41', '2017-03-02 11:07:40'),
(2, 11, 10, '[sender] like your post.', 0, '2017-03-02 11:52:41', '2017-03-02 11:25:56');

-- --------------------------------------------------------

--
-- Table structure for table `page_viewd`
--

CREATE TABLE `page_viewd` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `visiter_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `visiter_name` varchar(225) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page_viewd`
--

INSERT INTO `page_viewd` (`id`, `user_id`, `visiter_id`, `created_at`, `updated_at`, `visiter_name`) VALUES
(7, 48, 10, '2017-09-12 13:24:21', '0000-00-00 00:00:00', 'Heena'),
(8, 48, 10, '2017-09-12 13:24:17', '0000-00-00 00:00:00', 'heena'),
(11, 14, 9, '2017-09-12 13:02:26', '0000-00-00 00:00:00', 'heena'),
(12, 14, 48, '2017-09-12 13:24:24', '0000-00-00 00:00:00', 'heena');

-- --------------------------------------------------------

--
-- Table structure for table `Platform_notifications`
--

CREATE TABLE `Platform_notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reciever_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Platform_notifications`
--

INSERT INTO `Platform_notifications` (`id`, `user_id`, `reciever_id`, `table_id`, `message`, `is_read`, `type`, `created_at`, `updated_at`) VALUES
(510, 34, 10, 31, 'Tester One Liked Your Post', 1, 0, '2017-09-20 05:25:27', '2017-09-20 10:11:57'),
(511, 9, 28, 11, 'Heena Trivedi Liked Your Post', 1, 0, '2017-09-20 05:29:51', '2017-09-20 10:16:28'),
(514, 26, 28, 11, 'Sansha Dogra Comment on Your Post', 1, 1, '2017-09-20 05:35:33', '2017-09-20 10:16:28'),
(521, 14, 28, 34, 'saloni malhotra Comment on Your Post', 1, 1, '2017-09-20 06:04:21', '2017-09-20 10:16:28'),
(522, 14, 28, 34, 'saloni malhotra Likes Your Comment', 1, 2, '2017-09-20 06:05:27', '2017-09-20 10:16:28'),
(525, 11, 27, 45, 'Tester One Likes Your Comment', 1, 2, '2017-09-20 06:09:51', '2017-09-20 10:16:03'),
(526, 34, 26, 32, 'Tester One Share Your Post', 1, 3, '2017-09-20 06:13:07', '2017-09-20 10:15:54'),
(527, 34, 9, 17, 'Tester One Reported on Your Post', 1, 4, '2017-09-20 06:17:23', '2017-09-20 10:14:05'),
(528, 28, 11, 34, 'Amandeep Kaur Rated on Your Post', 1, 5, '2017-09-20 06:24:22', '2017-09-20 10:14:33'),
(529, 22, 27, 7, 'anmol Sharma Booked Your Ticket', 1, 6, '2017-09-20 06:58:44', '2017-09-20 10:16:03'),
(530, 27, 9, 9, 'Harshit Vaid Follows you', 1, 7, '2017-09-20 07:04:04', '2017-09-20 10:14:05'),
(531, 27, 22, 22, 'Harshit Vaid Follows you', 1, 7, '2017-09-20 07:04:30', '2017-09-20 10:15:17'),
(532, 9, 11, 11, 'Heena Trivedi Added Events', 1, 8, '2017-09-20 07:07:10', '2017-09-20 10:14:33'),
(533, 9, 34, 34, 'Heena Trivedi Added Events', 1, 8, '2017-09-20 07:07:10', '2017-09-20 10:16:51'),
(534, 9, 48, 48, 'Heena Trivedi Added Events', 1, 8, '2017-09-20 07:07:10', '2017-09-20 10:17:35'),
(606, 22, 34, 58, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(607, 22, 48, 58, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:17:35'),
(608, 22, 34, 67, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(609, 22, 48, 67, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:17:35'),
(610, 26, 34, 68, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(611, 26, 48, 68, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:17:35'),
(612, 26, 34, 69, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(613, 26, 48, 69, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:17:35'),
(614, 26, 34, 70, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(615, 26, 48, 70, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:17:35'),
(616, 26, 34, 71, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(617, 26, 48, 71, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:17:35'),
(618, 26, 34, 72, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:32', '2017-09-20 10:16:51'),
(619, 26, 48, 72, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:33', '2017-09-20 10:17:35'),
(620, 26, 34, 73, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:33', '2017-09-20 10:16:51'),
(621, 26, 48, 73, 'peers group group added in University of hyundaii', 1, 11, '2017-09-20 08:49:33', '2017-09-20 10:17:35'),
(632, 22, 22, 21, 'Happy club added in Global', 1, 12, '2017-09-20 09:52:15', '2017-09-20 10:15:17'),
(633, 22, 10, 21, 'Happy club added in Global', 1, 12, '2017-09-20 09:52:15', '2017-09-20 10:11:57'),
(640, 11, 34, 24, 'Happy club added in GNDU', 1, 12, '2017-09-20 09:56:15', '2017-09-20 10:16:51'),
(641, 11, 10, 24, 'Happy club added in GNDU', 1, 12, '2017-09-20 09:56:16', '2017-09-20 10:11:57'),
(642, 9, 22, 25, 'Heena Trivedi follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(643, 22, 22, 26, 'anmol Sharma follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(644, 34, 22, 27, 'Tester One follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(645, 48, 22, 28, 'sansha om follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(646, 26, 22, 29, 'Sansha Dogra follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(647, 11, 22, 30, 'Tester One follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(648, 10, 22, 31, 'akki Sharma follows your African Carrebean Society', 1, 13, '2017-09-20 10:00:36', '2017-09-20 10:15:17'),
(653, 10, 34, 5, 'this is first update added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:16:51'),
(654, 10, 34, 37, 'this is second poll added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:16:51'),
(655, 10, 48, 5, 'this is first update added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:17:35'),
(656, 10, 48, 37, 'this is second poll added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:17:35'),
(657, 10, 34, 5, 'this is first update added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:16:51'),
(658, 10, 34, 37, 'this is second poll added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:16:51'),
(659, 10, 48, 5, 'this is first update added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:17:35'),
(660, 10, 48, 37, 'this is second poll added in AUDITING under University of hyundaii', 1, 14, '2017-09-20 10:04:47', '2017-09-20 10:17:35');

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `pollId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `timeLimit` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `polls`
--

INSERT INTO `polls` (`pollId`, `name`, `userId`, `classId`, `timeLimit`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'this is first update', 10, 3, 2, 1, '2017-08-07 14:37:38', '2017-08-07 15:25:23'),
(37, 'this is second poll', 10, 3, 1, 1, '2017-09-20 15:34:47', '2017-09-20 15:34:47'),
(38, 'this is second poll', 10, 3, 1, 1, '2017-09-20 15:35:33', '2017-09-20 15:35:33'),
(39, 'this is second poll', 10, 3, 1, 1, '2017-09-20 15:35:59', '2017-09-20 15:35:59');

-- --------------------------------------------------------

--
-- Table structure for table `polls_options`
--

CREATE TABLE `polls_options` (
  `optionId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pollId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `polls_options`
--

INSERT INTO `polls_options` (`optionId`, `name`, `pollId`) VALUES
(5, 'demoUpdate1', 5),
(6, 'demo2', 5),
(7, 'demo3', 5),
(8, 'demo4', 5),
(9, 'demo1', 6),
(10, 'demo2', 6),
(11, 'demo1', 7),
(12, 'demo2', 7),
(13, 'demo1', 8),
(14, 'demo2', 8),
(15, 'demo1', 9),
(16, 'demo2', 9),
(17, 'demo1', 10),
(18, 'demo2', 10),
(19, 'demo1', 11),
(20, 'demo2', 11),
(21, 'demo1', 12),
(22, 'demo2', 12),
(23, 'demo1', 13),
(24, 'demo2', 13),
(25, 'demo1', 14),
(26, 'demo2', 14),
(27, 'demo1', 15),
(28, 'demo2', 15),
(29, 'demo1', 16),
(30, 'demo2', 16),
(31, 'demo1', 17),
(32, 'demo2', 17),
(33, 'demo1', 18),
(34, 'demo2', 18),
(35, 'demo1', 19),
(36, 'demo2', 19),
(37, 'demo1', 20),
(38, 'demo2', 20),
(39, 'demo1', 21),
(40, 'demo2', 21),
(41, 'demo1', 22),
(42, 'demo2', 22),
(43, 'demo1', 23),
(44, 'demo2', 23),
(45, 'demo1', 24),
(46, 'demo2', 24),
(47, 'demo1', 25),
(48, 'demo2', 25),
(49, 'demo1', 26),
(50, 'demo2', 26),
(51, 'demo1', 27),
(52, 'demo2', 27),
(53, 'demo1', 28),
(54, 'demo2', 28),
(55, 'demo1', 29),
(56, 'demo2', 29),
(57, 'demo1', 30),
(58, 'demo2', 30),
(59, 'demo1', 31),
(60, 'demo2', 31),
(61, 'demo1', 32),
(62, 'demo2', 32),
(63, 'demo1', 33),
(64, 'demo2', 33),
(65, 'demo1', 34),
(66, 'demo2', 34),
(67, 'demo1', 35),
(68, 'demo2', 35),
(69, 'demo1', 36),
(70, 'demo2', 36),
(71, 'demo1', 37),
(72, 'demo2', 37),
(73, 'demo1', 38),
(74, 'demo1', 39),
(75, 'demo2', 39);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `communityId` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(500) NOT NULL,
  `rating` varchar(10) NOT NULL,
  `views_count` int(11) NOT NULL,
  `sharing_count` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1-Post, 2-campus, 3-groups, 4-society and clubs',
  `courseId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `sacId` int(11) NOT NULL,
  `post_share_id` int(11) NOT NULL,
  `share_author_id` int(11) NOT NULL,
  `share_author_name` varchar(255) NOT NULL,
  `share_author_email` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author_id`, `communityId`, `category_id`, `title`, `description`, `image`, `rating`, `views_count`, `sharing_count`, `type`, `courseId`, `classId`, `groupId`, `sacId`, `post_share_id`, `share_author_id`, `share_author_name`, `share_author_email`, `is_active`, `created_at`, `updated_at`) VALUES
(9, 22, 0, 1, 'demo1', 'this is updates', 'collection-1490361148612.jpg', '', 0, 0, 1, 0, 0, 0, 0, 0, 0, '', '', 1, '2017-03-24 08:38:56', '2017-09-15 06:18:43'),
(11, 28, 0, 1, 'demo1dfsdfsd', 'this is updatesdsadas', '', '', 0, 0, 1, 0, 0, 0, 0, 0, 0, '', '', 1, '2017-03-24 13:13:32', '2017-09-15 06:39:37'),
(13, 34, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 3, 2, 1, 0, 0, 0, 0, 0, 0, '', '', 1, '2017-03-24 13:14:00', '2017-09-15 06:39:40'),
(14, 27, 3, 1, 'dem', '#this is for demo testing', '', '', 0, 0, 1, 0, 0, 0, 0, 0, 0, '', '', 1, '2017-03-24 13:14:12', '2017-09-15 06:40:42'),
(16, 14, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 2, 1, 3, 0, 0, 0, 0, '', '', 1, '2017-07-18 07:41:54', '2017-09-15 06:40:14'),
(17, 9, 0, 0, '', '', '', '', 0, 0, 1, 0, 0, 0, 0, 13, 0, '', '', 1, '2017-07-18 07:57:46', '2017-09-15 06:41:07'),
(18, 11, 0, 0, '', '', '', '', 0, 0, 1, 0, 0, 0, 0, 13, 0, '', '', 1, '2017-07-18 07:57:49', '2017-09-15 06:41:16'),
(21, 14, 0, 0, '', '', '', '', 0, 0, 2, 3, 3, 0, 0, 16, 0, '', '', 1, '2017-07-18 08:02:20', '2017-09-15 06:41:00'),
(22, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 2, 1, 3, 0, 0, 16, 0, '', '', 1, '2017-07-19 05:43:18', '2017-07-20 12:12:11'),
(24, 48, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 2, 3, 5, 0, 0, 16, 10, 'Manoj Singh', 'heenatechindustan1@gmail.com', 1, '2017-07-19 06:28:06', '2017-09-15 06:40:56'),
(27, 22, 0, 1, 'update group1', 'this is group update', '', '', 0, 0, 3, 0, 0, 1, 0, 0, 0, '', '', 1, '2017-07-21 10:32:25', '2017-09-15 06:41:20'),
(29, 28, 0, 1, 'campus post', 'this is campus post', '', '', 0, 0, 2, 3, 3, 0, 0, 0, 0, '', '', 1, '2017-07-21 10:52:47', '2017-09-15 06:40:48'),
(30, 11, 0, 1, 'demo', '#this is for testing', '', '', 0, 0, 1, 0, 0, 0, 0, 0, 0, '', '', 1, '2017-07-21 10:54:54', '2017-09-20 06:02:23'),
(31, 10, 1, 1, 'this is socity', 'this is desc', 'No-Image-Basic-1500982235756.png', '', 0, 0, 4, 0, 0, 0, 3, 0, 0, '', '', 1, '2017-07-25 10:35:16', '2017-09-11 11:20:49'),
(32, 26, 3, 1, 'this is update admin post', 'this is desc', 'No-Image-Basic-3d73b45f-8172-4107-96d1-1f8df380e183.png', '', 0, 0, 4, 0, 0, 0, 3, 0, 0, '', '', 1, '2017-07-28 06:27:45', '2017-09-15 06:40:38'),
(33, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 2, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:16:26', '2017-09-15 07:16:26'),
(34, 11, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 1, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:16:48', '2017-09-20 06:23:47'),
(35, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 4, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:19:46', '2017-09-15 07:19:46'),
(36, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 4, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:20:05', '2017-09-15 07:20:05'),
(37, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 4, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:23:19', '2017-09-15 07:23:19'),
(38, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 4, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:24:36', '2017-09-15 07:24:36'),
(39, 10, 0, 1, 'update campus post', 'this is updatesdsadas', 'No-Image-Basic-1500363987664.png', '', 0, 0, 4, 0, 0, 0, 0, 16, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:26:25', '2017-09-15 07:26:25'),
(40, 10, 0, 1, 'this is socity', 'this is desc', 'No-Image-Basic-1500982235756.png', '', 0, 0, 4, 0, 0, 0, 0, 31, 10, 'akki Sharma', 'akki@gmail.com', 1, '2017-09-15 07:26:57', '2017-09-15 07:26:57'),
(41, 10, 0, 1, 'this is socity', 'this is desc', 'No-Image-Basic-1500982235756.png', '', 0, 0, 4, 0, 0, 0, 0, 31, 10, 'akki Sharma', 'akki@gmail.com', 1, '2017-09-15 07:28:14', '2017-09-15 07:28:14'),
(42, 10, 0, 0, '', '', '', '', 0, 0, 4, 0, 0, 0, 0, 21, 14, 'heena trivedi', 'salonimalhotra1ind@gmail.com', 1, '2017-09-15 07:29:25', '2017-09-15 07:29:25'),
(43, 10, 0, 1, 'demo', '#this is for testing', 'favicon-16x16-1505476336675.png', '', 0, 0, 1, 0, 0, 0, 0, 0, 0, '', '', 1, '2017-09-15 11:52:16', '2017-09-15 11:52:16'),
(44, 10, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:51:00', '2017-09-15 12:51:00'),
(45, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:51:18', '2017-09-15 12:51:18'),
(46, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:51:42', '2017-09-15 12:51:42'),
(47, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:52:11', '2017-09-15 12:52:11'),
(48, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:52:12', '2017-09-15 12:52:12'),
(49, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:52:13', '2017-09-15 12:52:13'),
(50, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:52:14', '2017-09-15 12:52:14'),
(51, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:52:48', '2017-09-15 12:52:48'),
(52, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:52:49', '2017-09-15 12:52:49'),
(53, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:53:08', '2017-09-15 12:53:08'),
(54, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:54:17', '2017-09-15 12:54:17'),
(55, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:54:18', '2017-09-15 12:54:18'),
(56, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:54:19', '2017-09-15 12:54:19'),
(57, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:54:20', '2017-09-15 12:54:20'),
(58, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:54:21', '2017-09-15 12:54:21'),
(59, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:54:21', '2017-09-15 12:54:21'),
(60, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:56:47', '2017-09-15 12:56:47'),
(61, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:56:59', '2017-09-15 12:56:59'),
(62, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:57:03', '2017-09-15 12:57:03'),
(63, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:58:50', '2017-09-15 12:58:50'),
(64, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 12:58:52', '2017-09-15 12:58:52'),
(65, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:02:02', '2017-09-15 13:02:02'),
(66, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:02:03', '2017-09-15 13:02:03'),
(67, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:02:53', '2017-09-15 13:02:53'),
(68, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:02:54', '2017-09-15 13:02:54'),
(69, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:02:55', '2017-09-15 13:02:55'),
(70, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:02:56', '2017-09-15 13:02:56'),
(71, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:03:46', '2017-09-15 13:03:46'),
(72, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:06:16', '2017-09-15 13:06:16'),
(73, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:06:38', '2017-09-15 13:06:38'),
(74, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:06:41', '2017-09-15 13:06:41'),
(75, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:08:15', '2017-09-15 13:08:15'),
(76, 27, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:10:06', '2017-09-15 13:10:06'),
(77, 34, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:11:14', '2017-09-15 13:11:14'),
(78, 34, 0, 1, 'demo', '#this is for testing', 'computerbild-logo_web_fluxport-1490361240684.jpg', '', 0, 0, 1, 0, 0, 0, 0, 13, 34, 'Tester One', 'prashant.techindustan@gmail.com', 1, '2017-09-15 13:11:30', '2017-09-15 13:11:30'),
(79, 34, 0, 1, 'this is update admin post', 'this is desc', 'No-Image-Basic-3d73b45f-8172-4107-96d1-1f8df380e183.png', '', 0, 0, 4, 0, 0, 0, 0, 32, 26, 'Sansha Dogra', 'admin@gmail.com', 1, '2017-09-20 06:13:07', '2017-09-20 06:13:07'),
(80, 34, 0, 1, 'this is update admin post', 'this is desc', 'No-Image-Basic-3d73b45f-8172-4107-96d1-1f8df380e183.png', '', 0, 0, 4, 0, 0, 0, 0, 32, 26, 'Sansha Dogra', 'admin@gmail.com', 1, '2017-09-20 06:14:07', '2017-09-20 06:14:07');

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `user_id`, `post_id`) VALUES
(11, 10, 9),
(13, 10, 16),
(14, 9, 13),
(15, 11, 9),
(40, 48, 9),
(42, 48, 17),
(46, 48, 22),
(48, 22, 22),
(51, 10, 30),
(53, 10, 34),
(55, 34, 31);

-- --------------------------------------------------------

--
-- Table structure for table `post_ratting`
--

CREATE TABLE `post_ratting` (
  `ratingId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `rating` float NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_ratting`
--

INSERT INTO `post_ratting` (`ratingId`, `postId`, `rating`, `userId`) VALUES
(1, 22, 4, 10),
(2, 22, 3, 8),
(3, 22, 1, 11),
(4, 22, 4, 10),
(5, 22, 4, 10),
(6, 22, 4, 10),
(7, 22, 4, 10),
(8, 22, 4, 10),
(9, 22, 4, 10),
(10, 22, 4, 10),
(11, 11, 4, 10),
(12, 11, 4, 14),
(13, 11, 4, 34),
(14, 11, 4, 28),
(15, 11, 4, 28),
(16, 34, 4, 28),
(17, 34, 4, 28),
(18, 34, 4, 28),
(19, 34, 4, 28),
(20, 34, 4, 28),
(21, 34, 4, 28),
(22, 34, 4, 28),
(23, 34, 4, 28);

-- --------------------------------------------------------

--
-- Table structure for table `post_replies`
--

CREATE TABLE `post_replies` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `hide_comment` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0-hide,1-show'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_replies`
--

INSERT INTO `post_replies` (`id`, `user_id`, `post_id`, `comment`, `hide_comment`) VALUES
(201, 14, 34, 'Dummy Text ', 1),
(202, 14, 45, 'Dummy Text ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `userID` int(11) NOT NULL,
  `communityId` int(11) NOT NULL,
  `is_checked` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(456) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`userID`, `communityId`, `is_checked`, `id`, `email`, `name`, `created_at`, `updated_at`) VALUES
(22, 3, 0, 13, 'ronku987@gmail.com', 'anmol', '2017-09-08 13:12:03', '2017-09-08 13:57:40'),
(10, 3, 0, 14, 'salonimalhotra.techindustan@gmail.com', 'saloni', '2017-09-08 13:12:03', '2017-09-11 09:37:57'),
(14, 3, 0, 15, 'salonimalhotra1ind@gmail.com', 'heena', '2017-09-08 13:12:03', '0000-00-00 00:00:00'),
(9, 3, 0, 16, 'heena1.techindustan@gmail.com', 'Heena', '2017-09-08 13:27:28', '0000-00-00 00:00:00'),
(26, 3, 0, 18, 'harshittechindustan@gmail.com', 'Harshit', '2017-09-08 13:46:07', '0000-00-00 00:00:00'),
(11, 3, 0, 19, 'testerone@gmail.com', 'Tester', '2017-09-08 13:46:40', '0000-00-00 00:00:00'),
(48, 1, 0, 20, 'salonimalhotra.techindustan@gmail.com', 'Akki', '2017-09-12 08:57:46', '0000-00-00 00:00:00'),
(49, 1, 0, 21, 'ram@techindustan.com', 'Ram', '2017-09-12 08:57:46', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `report_post`
--

CREATE TABLE `report_post` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `reported_by` int(11) NOT NULL,
  `reason` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `report_post`
--

INSERT INTO `report_post` (`id`, `post_id`, `reported_by`, `reason`) VALUES
(1, 9, 14, 2),
(3, 14, 10, 1),
(4, 14, 10, 1),
(5, 14, 10, 1),
(6, 14, 10, 1),
(7, 14, 10, 1),
(8, 14, 10, 1),
(9, 14, 10, 1),
(10, 14, 10, 1),
(11, 14, 10, 1),
(12, 14, 10, 1),
(13, 14, 10, 1),
(14, 14, 10, 1),
(15, 34, 10, 1),
(16, 34, 34, 1),
(17, 34, 34, 1),
(18, 30, 34, 1),
(19, 17, 34, 0),
(20, 17, 34, 0);

-- --------------------------------------------------------

--
-- Table structure for table `report_user`
--

CREATE TABLE `report_user` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reported_by` int(11) NOT NULL,
  `reason` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `report_user`
--

INSERT INTO `report_user` (`id`, `user_id`, `reported_by`, `reason`) VALUES
(1, 10, 10, 1),
(2, 10, 10, 1),
(3, 10, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `socitiesclubs`
--

CREATE TABLE `socitiesclubs` (
  `socitiesclubsId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `instituteId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `cretaed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updtaed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `socitiesclubs`
--

INSERT INTO `socitiesclubs` (`socitiesclubsId`, `userId`, `instituteId`, `name`, `description`, `image`, `cretaed_at`, `updtaed_at`) VALUES
(25, 11, 6, 'Happy club', 'this is an Happy clubSociety', 'favicon-32x32-92a79b95-4e30-4581-bb1b-fd52d0032ec6.png', '2017-09-20 09:58:16', '2017-09-20 09:58:16');

-- --------------------------------------------------------

--
-- Table structure for table `socitiesclubsFollows`
--

CREATE TABLE `socitiesclubsFollows` (
  `socitifollowId` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `socitiesclubsId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `socitiesclubsFollows`
--

INSERT INTO `socitiesclubsFollows` (`socitifollowId`, `userID`, `socitiesclubsId`) VALUES
(25, 9, 18),
(26, 22, 18),
(27, 34, 18),
(28, 48, 18),
(29, 26, 18),
(30, 11, 18),
(31, 10, 18),
(38, 26, 18),
(39, 26, 18),
(40, 26, 18),
(41, 26, 20),
(42, 26, 20),
(43, 26, 20),
(44, 26, 20),
(45, 26, 18),
(46, 26, 18);

-- --------------------------------------------------------

--
-- Table structure for table `subinterests`
--

CREATE TABLE `subinterests` (
  `id` int(11) NOT NULL,
  `interest_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subinterests`
--

INSERT INTO `subinterests` (`id`, `interest_id`, `title`) VALUES
(1, '1', 'Artificial intelligence'),
(2, '1', 'Algorithms'),
(3, '1', 'Computer Science'),
(4, '1', 'Security'),
(5, '1', 'Wearable Tech'),
(6, '1', 'Electronics'),
(7, '1', 'Information Technology'),
(8, '1', 'Web development'),
(9, '2', 'Gernes'),
(10, '2', 'Actors'),
(11, '2', 'Netflix'),
(12, '3', 'Biology'),
(13, '3', 'Chemistry'),
(14, '3', 'Physics'),
(15, '3', 'Computer Science'),
(16, '3', 'Archaeology'),
(17, '3', 'Zoology'),
(18, '3', 'Pharmaceutical'),
(19, '3', 'Meta- physics'),
(20, '3', 'Nature'),
(21, '4', 'International Law'),
(22, '4', 'Vic Law'),
(23, '4', 'Us Law'),
(24, '4', 'Canadian Law'),
(25, '4', 'Contracts'),
(26, '4', 'Corporate Law'),
(27, '4', 'Cyber Law'),
(28, '4', 'IP & Patents'),
(29, '4', 'Top Law Firms'),
(30, '5', 'Stock Market'),
(31, '5', 'Interest Rates'),
(32, '5', 'E-commerce'),
(33, '5', 'Business Strategy'),
(34, '5', 'Knowledge Management'),
(35, '5', 'Social Media Marketing'),
(36, '5', 'Start Ups-\r\nLean startups'),
(37, '5', 'Internet Advertising'),
(38, '5', 'Investing'),
(39, '5', 'Borrowing'),
(40, '5', 'E-commerce'),
(41, '6', 'LIFE'),
(42, '6', 'Philosophy of everyday life'),
(43, '7', 'Dieting'),
(44, '7', 'Healthy Recipes'),
(45, '7', 'Yoga'),
(46, '7', 'Healthy Eating'),
(47, '7', 'Cross Fitness'),
(48, '7', 'Calories'),
(49, '7', 'Eating Disorder'),
(50, '7', 'Exercise'),
(51, '7', 'Obesity'),
(52, '7', 'Low Carb diet'),
(53, '7', 'Transfat'),
(54, '8', 'Airline Surcharges'),
(55, '9', 'Information Technology'),
(56, '9', 'Intelligence Quotient'),
(57, '9', 'Theology'),
(58, '10', 'Balance of Trade'),
(59, '10', 'GDP'),
(60, '10', 'Inflation'),
(61, '10', 'Interest Rates'),
(62, '10', 'Economy Blogs'),
(63, '10', 'Currencies'),
(64, '10', 'Price:\r\nOil Prices'),
(65, '11', 'Elect Engineering'),
(66, '11', 'Motorcycle Motorcar'),
(67, '12', 'Recipes'),
(68, '12', 'Nutrition'),
(69, '13', 'Barclays Premier League'),
(70, '13', 'Champions League'),
(71, '13', 'NFL'),
(72, '13', 'NBA'),
(73, '13', 'ICC'),
(74, '13', 'Tennis'),
(75, '13', 'Boxing'),
(76, '13', 'MMA'),
(77, '13', 'Nascar'),
(78, '13', 'Ice Hockey'),
(79, '13', 'MLB'),
(80, '13', 'Snow Barbing'),
(81, '13', 'F 1'),
(82, '14', 'Motors'),
(83, '14', 'Architecture'),
(84, '14', 'Home Doctor'),
(85, '14', 'Interior Designs'),
(86, '14', 'Designs'),
(87, '15', ''),
(88, '16', 'Accountancy'),
(89, '16', 'ACCA'),
(90, '16', 'Big Four'),
(91, '16', 'COMA'),
(92, '17', 'Quotes'),
(93, '18', 'Hip hop'),
(94, '18', 'Rock'),
(95, '18', 'Pop'),
(96, '18', 'RnB'),
(97, '18', 'Alternative'),
(98, '18', 'Classics'),
(99, '18', 'Blues'),
(100, '18', 'Country'),
(101, '18', 'Dance'),
(102, '18', 'House'),
(103, '18', 'Electronic'),
(104, '18', 'Jazz'),
(105, '18', 'Metal'),
(106, '19', 'C'),
(107, '19', 'C + +'),
(108, '19', 'Node JS'),
(109, '19', 'Php'),
(110, '19', 'Java'),
(111, '19', 'Java Script'),
(112, '19', 'Phython'),
(113, '19', 'K'),
(114, '19', 'C#'),
(115, '19', 'scala'),
(116, '19', 'Django'),
(117, '20', 'Media & Advertising'),
(118, '20', 'Social Media Marketing'),
(119, '20', 'S E O'),
(120, '20', 'Athlete Marketing'),
(121, '20', 'Tele Marketing'),
(122, '20', 'Mobile Marketing'),
(123, '20', 'Professional Course'),
(124, '21', 'Investment Banking'),
(125, '21', 'Flotation/IPO’S'),
(126, '21', 'Mergers & Acquisition Private Equity'),
(127, '21', 'Venture Capital'),
(128, '21', 'Bonds'),
(129, '21', 'Stock Markets'),
(130, '21', 'Hedge Funds'),
(131, '21', 'Banking'),
(132, '21', 'Personal Finance'),
(133, '21', 'Currencies'),
(134, '22', 'Algorithms'),
(135, '23', 'Men’s Fashion'),
(136, '23', 'Beauty'),
(137, '23', 'Hair'),
(138, '23', 'Make Up'),
(139, '23', 'Clothing & Apparel'),
(140, '24', ''),
(141, '25', 'Writing'),
(142, '25', 'Books'),
(143, '25', 'Novels'),
(144, '25', 'Comics'),
(145, '26', 'Crime'),
(146, '26', 'Environment'),
(147, '26', 'Natural Disasters'),
(148, '26', 'War & Terrorism'),
(149, '26', 'Severe Weather Events'),
(150, '27', ''),
(151, '28', ''),
(152, '29', 'Comedy'),
(153, '29', 'Celebrity'),
(154, '29', 'X Factor'),
(155, '29', 'Series'),
(156, '29', 'Britain got talent'),
(157, '29', 'Gambling'),
(158, '29', 'Gaming'),
(159, '29', 'Reality Television'),
(160, '30', ''),
(161, '31', 'Car Brands'),
(162, '32', ''),
(163, '33', 'Oil & Gas'),
(164, '33', 'Natural Gas'),
(165, '33', 'Coal'),
(166, '33', 'Renewable Energy'),
(167, '33', 'Water'),
(168, '34', 'Games of Throne'),
(169, '34', 'House of Cards'),
(170, '34', 'Orange is the New'),
(171, '34', 'Black Power'),
(172, '34', 'Black Suits'),
(173, '34', 'The Simpsons'),
(174, '34', 'Friends'),
(175, '34', 'Homeland'),
(176, '34', '24'),
(177, '34', 'Two and a half men'),
(178, '34', 'Greys Anatomy'),
(179, '34', 'Tyrant'),
(180, '34', 'Veep'),
(181, '34', 'The Walking Dead'),
(182, '34', 'Dr Who'),
(183, '34', 'Netflix Series'),
(184, '34', 'The Saturday Night live'),
(185, '34', 'Prison Break'),
(186, '51', 'Dieting'),
(187, '51', 'Chinese Cuisine'),
(188, '51', 'African Cuisine'),
(189, '51', 'Nutrition'),
(190, '51', 'Healthy Recipes'),
(191, '51', 'Low carb diets'),
(192, '51', 'Recipes'),
(193, '51', 'Grilling Recipes'),
(194, '51', 'Desserts'),
(195, '51', 'Healthy diets'),
(196, '7', 'Yoga'),
(197, '7', 'Aerobic exercises'),
(198, '7', 'Balance exercises'),
(199, '7', 'Strength exercises'),
(200, '7', 'Healthy Recipes'),
(201, '7', 'Calories'),
(202, '7', 'Cross Fitness workouts'),
(203, '7', 'Cardio workouts'),
(204, '7', 'Squat workout'),
(205, '7', 'Chest Workout'),
(206, '7', 'Circuit Training'),
(207, '7', 'Total Body workout'),
(208, '7', 'Insanity workout'),
(209, '37', 'Atlanta Hawks'),
(210, '37', 'Boston Celtics'),
(211, '37', 'Brooklyn Nets'),
(212, '37', 'Charlotte Hornets'),
(213, '37', 'Chicago Bulls'),
(214, '37', 'Cleveland Cavaliers'),
(215, '37', 'Dallas Mavericks'),
(216, '37', 'Denver Nuggets'),
(217, '37', 'Detroit Pistons'),
(218, '37', 'Golden State Warriors'),
(219, '37', 'Houston Rockets'),
(220, '37', 'Indiana Pacers'),
(221, '37', 'LA Clippers'),
(222, '37', 'Los Angeles Lakers'),
(223, '37', 'Memphis Grizzlies'),
(224, '37', 'Miami Heat'),
(225, '37', 'Milwaukee Bucks'),
(226, '37', 'Minnesota Timberwolves'),
(227, '37', 'New Orleans Pelicans'),
(228, '37', 'New York Knicks'),
(229, '37', 'Oklahoma City Thunder'),
(230, '37', 'Orlando Magic'),
(231, '37', 'Philadelphia 76ers'),
(232, '37', 'Phoenix Suns'),
(233, '37', 'Portland Trail Blazers'),
(234, '37', 'Sacramento Kings'),
(235, '37', 'San Antonio Spurs'),
(236, '37', 'Toronto Raptors'),
(237, '37', 'Utah Jazz'),
(238, '37', 'Washington Wizards'),
(239, '52', 'Microsoft Xbox 360'),
(240, '52', 'Bingo'),
(241, '52', 'PC Games'),
(242, '52', 'FIFA'),
(243, '52', 'Pro Evolution Soccer'),
(244, '52', 'Call Of Duty'),
(245, '52', 'Nintendo Wii U'),
(246, '52', 'Sony PlayStation Ps 4'),
(247, '52', 'Assassin Creed '),
(248, '52', 'Pokemon'),
(249, '52', 'Halo'),
(250, '52', 'Batman'),
(251, '52', 'Far Cry'),
(252, '52', 'Battlefield'),
(253, '52', 'Bioshock'),
(254, '52', 'Destiny'),
(255, '52', 'Football Manager'),
(256, '52', 'Need For Speed'),
(257, '52', 'Lego'),
(258, '52', 'Dragon Age '),
(259, '52', 'Final Fantasy'),
(260, '52', 'Mario'),
(261, '52', 'Tomb Raider'),
(262, '52', 'Meta Gear'),
(263, '52', 'Pokemon Go'),
(264, '52', 'Elder Scrolls'),
(265, '52', 'Fallout'),
(266, '53', 'Science & Fiction'),
(267, '53', 'Biography'),
(268, '53', 'History'),
(269, '53', 'Romance'),
(270, '53', 'Marvel Comics'),
(271, '53', 'Love Quotes'),
(272, '53', 'Funny Quotes'),
(273, '14', 'Art'),
(274, '14', 'Tattoos'),
(275, '14', 'Cars'),
(276, '14', 'Sport Cars'),
(277, '14', 'Interior Decor'),
(278, '14', 'Home Décor'),
(279, '14', 'Modern Architecture'),
(280, '14', 'Yachts'),
(281, '14', 'Landscape'),
(282, '14', '3D Printing'),
(283, '14', 'Outdoor Gardening'),
(284, '14', 'Beards'),
(285, '14', 'Furniture'),
(286, '14', 'Custom Motorcycles'),
(287, '14', 'Nature'),
(288, '14', 'Animals and Pets '),
(289, '14', 'Graphic Designs'),
(290, '42', 'Arizona Cardinals'),
(291, '42', 'Atlanta Falcons'),
(292, '42', 'Baltimore Ravens'),
(293, '42', 'Buffalo Bills'),
(294, '42', 'Carolina Panthers'),
(295, '42', 'Chicago Bears'),
(296, '42', 'Cincinnati Bengals'),
(297, '42', 'Cleveland Browns'),
(298, '42', 'Dallas Cowboys'),
(299, '42', 'Denver Broncos'),
(300, '42', 'Detroit Lions'),
(301, '42', 'Green Bay Packers'),
(302, '42', 'Houston Texans'),
(303, '42', 'Indianapolis Colts'),
(304, '42', 'Jacksonville Jaguars'),
(305, '42', 'Kansas City Chiefs'),
(306, '42', 'Los Angeles Rams'),
(307, '42', 'Los Angeles Chargers'),
(308, '42', 'Miami Dolphins'),
(309, '42', 'Minnesota Vikings'),
(310, '42', 'New England Patriots'),
(311, '42', 'New Orleans Saints'),
(312, '42', 'New York Giants'),
(313, '42', 'New York Jets'),
(314, '42', 'Oakland Raiders'),
(315, '42', 'Philadelphia Eagles'),
(316, '42', 'Pittsburgh Steelers'),
(317, '42', 'San Francisco 49ers'),
(318, '42', 'Seattle Seahawks'),
(319, '42', 'Tampa Bay Buccaneers'),
(320, '42', 'Tennessee Titans'),
(321, '42', 'Washington Redskins'),
(322, '40', 'Arsenal'),
(323, '40', 'Chelsea'),
(324, '40', 'Manchester United'),
(325, '40', 'Liverpool'),
(326, '40', 'Manchester City'),
(327, '40', 'Everton'),
(328, '40', 'Totenham Hotspurs'),
(329, '40', 'Westham'),
(330, '40', 'Southampton'),
(331, '3', 'Anthropology'),
(332, '3', 'Web development'),
(333, '3', 'Artificial Intelligence'),
(334, '3', 'Geology'),
(335, '3', 'Neuroscience'),
(336, '3', 'Robotics'),
(337, '29', 'Humor'),
(338, '29', 'Comedians'),
(339, '29', 'Funny Clips'),
(340, '29', 'Opera'),
(341, '29', 'Art'),
(342, '29', 'Dance'),
(343, '29', 'Poetry'),
(344, '29', 'Theatre'),
(345, '29', 'Radio'),
(346, '29', 'Casino'),
(347, '29', 'Poker'),
(348, '29', 'Music'),
(349, '29', 'Hip Hop'),
(350, '29', 'Soul'),
(351, '29', 'Neo-Soul'),
(352, '29', 'Pop'),
(353, '29', 'Rock'),
(354, '29', 'Classical'),
(355, '29', 'Blues'),
(356, '29', 'Afro-Beat'),
(357, '29', 'Reggae'),
(358, '44', 'Airlines'),
(359, '44', 'Boeing '),
(360, '44', 'Aerospace Engineering'),
(361, '41', 'Mercedes Benz'),
(362, '41', 'Ferrari'),
(363, '41', 'Toyota'),
(364, '41', 'Aston Martin'),
(365, '41', 'Range Rover'),
(366, '41', 'Rolls Royce'),
(367, '41', 'Bentley'),
(368, '41', 'Lamborghini'),
(369, '41', 'Audi'),
(370, '41', 'BMW'),
(371, '41', 'Ford'),
(372, '41', 'Porsche'),
(373, '41', 'Honda'),
(374, '41', 'Volvo'),
(375, '41', 'Nissan'),
(376, '41', 'Land Rover'),
(377, '41', 'Mazda'),
(378, '41', 'Maserati'),
(379, '41', 'Lexus'),
(380, '41', 'Tesla'),
(381, '41', 'Motor Shows'),
(382, '41', 'Motor Bikes'),
(383, '45', 'Christianity'),
(384, '45', 'Islamism'),
(385, '45', 'Hinduism'),
(386, '45', 'Theology'),
(387, '45', 'Atheist'),
(388, '45', 'Buddhism'),
(389, '45', 'Scientology'),
(390, '45', 'Sikhism'),
(391, '46', 'Cruise Holiday'),
(392, '46', 'Travel'),
(393, '4', 'Patents'),
(394, '4', 'Copyright'),
(395, '4', 'Criminal law'),
(396, '21', 'Fintech'),
(397, '21', 'Mergers & Acquisition '),
(398, '21', 'Private Equity'),
(399, '35', 'Fashion weeks'),
(400, '35', 'Men’s fashion'),
(401, '35', 'Women’s fashion'),
(402, '35', 'Women apparel'),
(403, '35', 'Men’s apparel '),
(404, '35', 'Men’s Suit'),
(405, '35', 'Women’s Hairstyles'),
(406, '35', 'Men’s Hairstyles'),
(407, '35', 'Make up'),
(408, '50', 'Marriage'),
(409, '50', 'Social work'),
(410, '50', 'Sex'),
(411, '50', 'LGBT'),
(412, '50', 'Weddings'),
(413, '50', 'Relationships'),
(414, '50', 'Kids and Parenting'),
(415, '54', 'Anime'),
(416, '54', 'Comedy'),
(417, '54', 'Crime'),
(418, '54', 'Suspense'),
(419, '54', 'Korean'),
(420, '54', 'Musical'),
(421, '54', 'Film Directors'),
(422, '54', 'Sci-Fi-films'),
(423, '38', 'Celebrity Gossip'),
(424, '38', 'Beyoncé'),
(425, '38', 'Rihanna'),
(426, '38', 'Katy Perry'),
(427, '38', 'Drake'),
(428, '38', 'Jay-Y'),
(429, '38', 'The Weekend'),
(430, '38', 'Future'),
(431, '38', 'Kanye West'),
(432, '38', 'Ciara'),
(433, '38', 'Kylie Jenner'),
(434, '38', 'Kim Kardashian'),
(435, '38', 'Lebron James'),
(436, '38', 'Cristiano Ronaldo'),
(437, '38', 'Roger Federer'),
(438, '38', 'Lionel Messi'),
(439, '38', 'Barack Obama'),
(440, '38', 'Nicki Minaj'),
(441, '38', 'Selena Gomez'),
(442, '38', 'Jenifer Lopez'),
(443, '38', 'Justin Bieber '),
(444, '38', 'Taylor Swift'),
(445, '38', 'Stephen Curry'),
(446, '38', 'Kevin Durant'),
(447, '38', 'Michael Jordan'),
(448, '38', '2pac'),
(449, '43', 'Apple'),
(450, '43', 'Samsung'),
(451, '43', 'Microsoft'),
(452, '43', 'Google'),
(453, '43', 'Sony'),
(454, '43', 'LG'),
(455, '43', 'Panasonic'),
(456, '43', 'Uber'),
(457, '43', 'Facebook'),
(458, '43', 'Amazon'),
(459, '43', 'Acer'),
(460, '43', 'HP'),
(461, '43', 'IBM'),
(462, '43', 'Yahoo'),
(463, '43', 'DELL'),
(464, '43', 'Lenovo'),
(465, '43', 'Blackberry'),
(466, '43', 'Adobe'),
(467, '43', 'Intell'),
(468, '43', 'Toshiba'),
(469, '43', 'Bitcoin'),
(470, '43', 'Netflix'),
(471, '43', 'AirBnB'),
(472, '39', 'Artificial intelligence'),
(473, '39', 'Wearable Tech'),
(474, '39', 'Apple watch'),
(475, '39', 'Iphones'),
(476, '39', 'Driverless Cars'),
(477, '5', 'Start Ups'),
(478, '5', 'Lean startups'),
(479, '5', 'Accounting'),
(480, '5', 'ACCA'),
(481, '5', 'Deloittes'),
(482, '5', 'EY'),
(483, '5', 'PWC'),
(484, '5', 'KPMG'),
(485, '5', 'Forensic Accounting'),
(486, '13', 'Gymnastics'),
(487, '13', 'Cricket'),
(488, '13', 'Swimming'),
(489, '13', 'Athletics'),
(490, '13', 'WWE/Wrestling'),
(491, '13', 'Cycling '),
(492, '36', 'Anaheim Ducks'),
(493, '36', 'Arizona Coyotes'),
(494, '36', 'Boston Bruins'),
(495, '36', 'Buffalo Sabres'),
(496, '36', 'Calgary Flames'),
(497, '36', 'Carolina Hurricanes'),
(498, '36', 'Chicago Blackhawks'),
(499, '36', 'Colorado Avalanche'),
(500, '36', 'Columbus Blue Jackets'),
(501, '36', 'Dallas Stars'),
(502, '36', 'Detroit Red Wings'),
(503, '36', 'Edmonton Oilers'),
(504, '36', 'Florida Panthers'),
(505, '36', 'Los Angeles Kings'),
(506, '36', 'Minnesota Wild'),
(507, '36', 'Montreal Canadiens'),
(508, '36', 'Nashville Predators'),
(509, '36', 'New Jersey Devils'),
(510, '36', 'New York Islanders'),
(511, '36', 'New York Rangers'),
(512, '36', 'Ottawa Senators'),
(513, '36', 'Philadelphia Flyers'),
(514, '36', 'Pittsburgh Penguins'),
(515, '36', 'San Jose Sharks'),
(516, '36', 'St. Louis Blues'),
(517, '36', 'Tampa Bay Lightning'),
(518, '36', 'Toronto Maple Leafs'),
(519, '36', 'Vancouver Canucks'),
(520, '36', 'Washington Capitals'),
(521, '36', 'Winnipeg Jets'),
(522, '30', 'Government & Politics'),
(523, '30', 'Crime'),
(524, '30', 'Environment'),
(525, '30', 'War & Terrorism'),
(526, '30', 'Severe Weather Events'),
(527, '30', 'Immigration'),
(528, '30', 'Energy'),
(529, '30', 'Health'),
(530, '30', 'Oil prices'),
(531, '47', 'Barcelona'),
(532, '47', 'Real Madrid'),
(533, '47', 'Atletico Madrid'),
(534, '47', 'Valencia'),
(535, '47', 'Seville'),
(536, '49', 'Stephen King'),
(537, '49', 'J. K. Rowling'),
(538, '49', 'Dan Brown'),
(539, '49', 'David Baldacci'),
(540, '49', 'John Grisham'),
(541, '55', 'Atlanta Braves'),
(542, '55', 'Florida Marlins'),
(543, '55', 'New York Mets'),
(544, '55', 'Philadelphia Phillies'),
(545, '55', 'Washington'),
(546, '55', 'Nationals Central'),
(547, '55', 'Chicago Cubs'),
(548, '55', 'Cincinnati Reds'),
(549, '55', 'Houston Astros'),
(550, '55', 'Milwaukee Brewers'),
(551, '55', 'Pittsburgh Pirates'),
(552, '55', 'St. Louis Cardinals West Arizona'),
(553, '55', 'Diamondbacks'),
(554, '55', 'Colorado Rockies'),
(555, '55', 'Los Angeles Dodgers'),
(556, '55', 'San Diego Padres'),
(557, '55', 'San Francisco Giants'),
(558, '55', 'American League'),
(559, '55', 'East Baltimore'),
(560, '55', 'Orioles Boston Red Sox New York'),
(561, '55', 'Yankees Tampa Bay'),
(562, '55', 'Rays Toronto Blue'),
(563, '55', 'Jays Central Chicago'),
(564, '55', 'White Sox Cleveland'),
(565, '55', 'Indians Detroit'),
(566, '55', 'Tigers Kansas City'),
(567, '55', 'Royals Minnesota'),
(568, '55', 'Twins West Los Angeles Angels'),
(569, '55', 'Oakland Athletics'),
(570, '55', 'Seattle Mariners');

-- --------------------------------------------------------

--
-- Table structure for table `suspended_user`
--

CREATE TABLE `suspended_user` (
  `suspended_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `uni_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suspended_user`
--

INSERT INTO `suspended_user` (`suspended_id`, `user_id`, `uni_id`) VALUES
(1, 9, 1),
(2, 10, 1),
(3, 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `threadReplies`
--

CREATE TABLE `threadReplies` (
  `thread_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `hide_thread` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `threadReplies`
--

INSERT INTO `threadReplies` (`thread_id`, `question_id`, `user_id`, `comment`, `hide_thread`, `created_at`, `updated_at`) VALUES
(1, 10, 10, 'this is demo comment', 1, '2017-04-19 11:23:53', '2017-04-19 11:23:53'),
(2, 10, 10, 'this is demo comment', 1, '2017-04-19 11:24:15', '2017-04-19 11:24:15'),
(3, 8, 10, 'this is demo comment', 1, '2017-04-19 11:24:22', '2017-04-19 11:24:22'),
(4, 8, 10, 'this is updated comment', 1, '2017-04-19 11:24:23', '2017-04-19 11:42:27');

-- --------------------------------------------------------

--
-- Table structure for table `topstories`
--

CREATE TABLE `topstories` (
  `id` int(11) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `root_url` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topstories`
--

INSERT INTO `topstories` (`id`, `headline`, `root_url`, `category`, `created_at`, `update_at`) VALUES
(3, 'testing Profile', 'www.facebook.com', 'Pta nahi', '2017-09-06 08:34:48', '2017-09-06 10:18:15'),
(5, 'top stories', 'www.google.com', 'dowry', '2017-09-06 09:42:47', '2017-09-06 09:42:47'),
(6, 'top stories', 'www.google.com', 'dowry', '2017-09-07 06:10:33', '2017-09-07 06:10:33');

-- --------------------------------------------------------

--
-- Table structure for table `userClasses`
--

CREATE TABLE `userClasses` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `classIds` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userClasses`
--

INSERT INTO `userClasses` (`id`, `userID`, `classIds`) VALUES
(1, 10, '3,4,5,1,2,6,7'),
(2, 9, '3,4,5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `city` varchar(100) NOT NULL,
  `website` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `propic` varchar(255) NOT NULL DEFAULT 'genericAvtar.png',
  `language` varchar(255) NOT NULL DEFAULT 'English',
  `about_me` text NOT NULL,
  `accomplishments` text NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `protect_post` tinyint(1) NOT NULL DEFAULT '1',
  `profile_privacy` int(11) NOT NULL DEFAULT '0',
  `contact_privacy` int(11) NOT NULL DEFAULT '0',
  `is_active` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `course_type` int(11) NOT NULL COMMENT '1-graduate, 2-underGraduate',
  `interests` text NOT NULL,
  `institution_name` varchar(255) NOT NULL,
  `student_type` tinyint(1) NOT NULL COMMENT '1 for student 2 for ex student',
  `area_of_expertise` varchar(255) NOT NULL,
  `employment_place` varchar(200) NOT NULL,
  `facebook_id` varchar(255) NOT NULL,
  `linkedin_id` varchar(255) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `email_me_when` int(11) NOT NULL,
  `activity_related_to_account` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1 for email , 2  for fb , 3 for google',
  `password_reset_token` varchar(500) NOT NULL,
  `token_active_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `billing_method` int(11) NOT NULL COMMENT '1 - Paypal, 2 - Visa, 3 - Mastercard',
  `name_on_card` varchar(255) NOT NULL,
  `card` varchar(100) NOT NULL,
  `card_expiry` date NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `linkedin` varchar(255) NOT NULL,
  `twitter` varchar(255) NOT NULL,
  `snapchat` varchar(255) NOT NULL,
  `change_pwd` tinyint(4) NOT NULL DEFAULT '0',
  `is_verified` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `new_followers` int(12) NOT NULL,
  `page_view` int(12) NOT NULL,
  `post_media_like` int(12) NOT NULL,
  `tags_post_media` int(12) NOT NULL,
  `events` int(12) NOT NULL,
  `account_suggestions` int(12) NOT NULL,
  `account_follow` int(12) NOT NULL,
  `community_notify` int(12) NOT NULL,
  `top_post_interest` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `DOB`, `city`, `website`, `gender`, `propic`, `language`, `about_me`, `accomplishments`, `password`, `token`, `protect_post`, `profile_privacy`, `contact_privacy`, `is_active`, `course_id`, `course_type`, `interests`, `institution_name`, `student_type`, `area_of_expertise`, `employment_place`, `facebook_id`, `linkedin_id`, `google_id`, `email_me_when`, `activity_related_to_account`, `user_type`, `password_reset_token`, `token_active_date`, `billing_method`, `name_on_card`, `card`, `card_expiry`, `facebook`, `linkedin`, `twitter`, `snapchat`, `change_pwd`, `is_verified`, `created_at`, `updated_at`, `new_followers`, `page_view`, `post_media_like`, `tags_post_media`, `events`, `account_suggestions`, `account_follow`, `community_notify`, `top_post_interest`) VALUES
(9, 'Heena', 'Trivedi', 'heena1.techindustan@gmail.com', '0000-00-00', 'FZR', '', 'male', 'genericAvtar.png', 'English', '', '', 'e10adc3949ba59abbe56e057f20f883e', 'FsXoj9Q8CeSWhcoCjZ0DQ1zOOKDMSwAp', 1, 0, 0, 0, 0, 0, '0', '', 0, '', 'Fzr', '', '', '', 0, 0, 0, '6ddAHxf4gTbfXztGfKCWEytHFjs6I2AL', '2017-09-07 06:25:30', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-02-17 07:58:36', '2017-09-07 06:25:30', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 'akki', 'Sharma', 'akki@gmail.com', '1992-08-07', 'Delhi', 'peersview.com', 'male', 'imgpsh_fullsize-1503562837070.jpg', 'English', 'Tell People about yourself', 'C,C++,Java', '7488e331b8b64e5794da3fa4eb10ad5d', 'rsiOk4uuczDEFfujQU6kA4S5xo2ZAP36', 0, 1, 2, 0, 1, 0, '1,2,3,4,5,9,10,11', 'ABC', 2, 'C++', 'Delhi', '1234567890', '1234567890', '3333333333', 0, 0, 0, '', '2017-09-15 09:04:10', 0, 'Heena Trivedi', '1234567890123456', '2017-12-00', 'https://www.facebook.com', 'https://www.linkedin.com', 'https://www.twitter.com', 'https://www.snapchat.com', 0, 0, '2017-02-17 07:58:54', '2017-09-15 09:04:10', 0, 1, 0, 1, 1, 0, 0, 0, 0),
(11, 'Tester', 'One', 'testerone@gmail.com', '0000-00-00', 'FZR', '', 'male', 'genericAvtar.png', 'English', '', '', '8768273bad6a7c0a8e794c1107d760e8', 'JkXpQzGnv3W31T3iC1qdMhsS0RW6jSJT', 1, 0, 0, 0, 0, 0, '0', '', 0, '', 'Fzr', '', '', '', 0, 0, 0, '', '2017-08-30 06:20:02', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-03-02 06:47:56', '2017-08-30 06:20:02', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 'saloni', 'malhotra', 'salonimalhotra1ind@gmail.com', '0000-00-00', 'mumbai', '', 'female', 'genericAvtar.png', 'English', '', '', '', 'OakJ8LF4bWQZbxL5tWSDytNANu1sykgZ', 1, 0, 0, 0, 0, 0, '0', '', 0, '', 'Mumbai', '', '', '3333333333', 0, 0, 0, '', '2017-09-20 05:37:15', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-03-08 07:27:57', '2017-09-20 05:37:15', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 'anmol', 'Sharma', 'ronku987@gmail.com', '0000-00-00', 'mumbai', '', 'male', 'genericAvtar.png', 'English', '', '', '', 'GbFqtxTRNTrhgAxCwIc5na8UuMXcJy5h', 1, 0, 0, 0, 0, 0, '', '', 0, '', 'Mumbai', '423486491351549', '', '', 0, 0, 0, '', '2017-09-20 05:34:10', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-05-25 07:56:35', '2017-09-20 05:34:10', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 'Sansha', 'Dogra', 'admin@gmail.com', '0000-00-00', 'mumbai', '', 'male', 'genericAvtar.png', 'English', '', '', '', 'M7ZlJc3c27Rr1lHMhJguM87RzykoiXuP', 1, 0, 0, 0, 0, 0, '', '', 0, '', 'Mumbai', '', '', '109493987883934146890', 0, 0, 3, '', '2017-09-20 05:35:00', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-05-29 07:13:01', '2017-09-20 05:35:00', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 'Harshit', 'Vaid', 'harshit.techindustan@gmail.com', '0000-00-00', 'delhi', '', 'male', 'genericAvtar.png', 'English', '', '', '25f9e794323b453885f5181f1b624d0b', 'o0PYiQzwG8qVVXn58ZO1ZjdHFMuXtLBW', 1, 0, 0, 0, 0, 0, '', '', 0, '', 'Delhi', '', '', '109493987883934146890', 0, 0, 3, '', '2017-09-20 05:35:04', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-05-29 07:27:29', '2017-09-20 05:35:04', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(28, 'Amandeep', 'Kaur', 'heenatechindustan1@gmail.com', '0000-00-00', 'delhi', '', 'female', 'genericAvtar.png', 'English', '', '', '', 'Cxp5y7k6wcK8UaIDlMKvZU2I3jS6eIf3', 1, 0, 0, 0, 0, 0, '', '', 0, '', 'Delhi', '423486491351549', '_HWiGSf-hT', '', 0, 0, 2, '', '2017-09-08 11:43:45', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-05-29 08:20:24', '2017-09-08 11:43:45', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(34, 'Tester', 'One', 'prashant.techindustan@gmail.com', '0000-00-00', 'delhi', '', 'female', 'genericAvtar.png', 'English', '', '', '6e9bece1914809fb8493146417e722f6', 'kU2ZlUIqZJrJ29jK2OIDe46xmorqe5z0', 1, 0, 0, 0, 0, 0, '', '', 0, '', 'Delhi', '', '', '', 0, 0, 0, '', '2017-09-08 08:16:16', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-08-10 08:10:36', '2017-09-08 08:16:16', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(48, 'sansha', 'om', 'salonimalhotra.techindustan@gmail.com', '0000-00-00', '', '', '', 'genericAvtar.png', 'English', '', '', '358a09e62f84bf90cdbb6b4994d3bf72', 'fNwlheJwqikhyvesWWSExwvL3BOJka8f', 1, 0, 0, 0, 0, 0, '', '', 0, '', '', '', '', '', 0, 0, 0, '', '2017-09-12 10:37:52', 0, '', '', '0000-00-00', '', '', '', '', 0, 0, '2017-09-12 08:29:01', '2017-09-12 10:37:52', 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------
UPDATE `users` set `password` = '5f4dcc3b5aa765d61d8327deb882cf99';
--
-- Table structure for table `userspolls`
--

CREATE TABLE `userspolls` (
  `userpollsId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `pollId` int(11) NOT NULL,
  `optionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userspolls`
--

INSERT INTO `userspolls` (`userpollsId`, `userId`, `pollId`, `optionId`) VALUES
(1, 10, 5, 5),
(3, 10, 5, 5),
(4, 10, 5, 5),
(5, 10, 5, 6),
(6, 10, 6, 9);

-- --------------------------------------------------------

--
-- Table structure for table `user_block`
--

CREATE TABLE `user_block` (
  `id` int(11) NOT NULL,
  `blocked_by` int(11) NOT NULL,
  `blocked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_block`
--

INSERT INTO `user_block` (`id`, `blocked_by`, `blocked`) VALUES
(2, 10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `user_comuunity`
--

CREATE TABLE `user_comuunity` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `communityId` int(11) NOT NULL,
  `is_approved` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_comuunity`
--

INSERT INTO `user_comuunity` (`id`, `userID`, `communityId`, `is_approved`) VALUES
(1, 34, 3, 1),
(2, 22, 5, 0),
(4, 34, 6, 0),
(6, 48, 3, 0),
(7, 10, 1, 0),
(8, 10, 5, 0),
(9, 10, 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_credits`
--

CREATE TABLE `user_credits` (
  `creditsId` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_credits`
--

INSERT INTO `user_credits` (`creditsId`, `userID`, `credits`) VALUES
(1, 10, 12);

-- --------------------------------------------------------

--
-- Table structure for table `vipGuest_list`
--

CREATE TABLE `vipGuest_list` (
  `vipguestId` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vipGuest_list`
--

INSERT INTO `vipGuest_list` (`vipguestId`, `userID`, `eventID`, `name`, `email`, `phone`, `created_at`) VALUES
(1, 10, 4, 'Manoj ja', 'ma@test.com', '123456789', '2017-08-02 14:09:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book_event`
--
ALTER TABLE `book_event`
  ADD PRIMARY KEY (`order_ID`);

--
-- Indexes for table `book_trans`
--
ALTER TABLE `book_trans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brainStroming`
--
ALTER TABLE `brainStroming`
  ADD PRIMARY KEY (`nodeId`);

--
-- Indexes for table `brainStromingDetails`
--
ALTER TABLE `brainStromingDetails`
  ADD PRIMARY KEY (`diagramId`);

--
-- Indexes for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`communityId`);

--
-- Indexes for table `cources`
--
ALTER TABLE `cources`
  ADD PRIMARY KEY (`courseId`);

--
-- Indexes for table `courseClasses`
--
ALTER TABLE `courseClasses`
  ADD PRIMARY KEY (`classId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_Id`);

--
-- Indexes for table `event_media`
--
ALTER TABLE `event_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follow_thread`
--
ALTER TABLE `follow_thread`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`forum_id`);

--
-- Indexes for table `forumDetails`
--
ALTER TABLE `forumDetails`
  ADD PRIMARY KEY (`forumDetails_Id`);

--
-- Indexes for table `forummembers`
--
ALTER TABLE `forummembers`
  ADD PRIMARY KEY (`forumMemberId`);

--
-- Indexes for table `forumPolls`
--
ALTER TABLE `forumPolls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forumpolls_options`
--
ALTER TABLE `forumpolls_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forumuserspolls`
--
ALTER TABLE `forumuserspolls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupId`);

--
-- Indexes for table `guest_list`
--
ALTER TABLE `guest_list`
  ADD PRIMARY KEY (`guestId`);

--
-- Indexes for table `inbox`
--
ALTER TABLE `inbox`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`jobId`);

--
-- Indexes for table `landing_emails`
--
ALTER TABLE `landing_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marketPlace`
--
ALTER TABLE `marketPlace`
  ADD PRIMARY KEY (`marketplaceId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsnow_data`
--
ALTER TABLE `newsnow_data`
  ADD PRIMARY KEY (`ips`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_viewd`
--
ALTER TABLE `page_viewd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Platform_notifications`
--
ALTER TABLE `Platform_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`pollId`);

--
-- Indexes for table `polls_options`
--
ALTER TABLE `polls_options`
  ADD PRIMARY KEY (`optionId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_ratting`
--
ALTER TABLE `post_ratting`
  ADD PRIMARY KEY (`ratingId`);

--
-- Indexes for table `post_replies`
--
ALTER TABLE `post_replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reminder`
--
ALTER TABLE `reminder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_post`
--
ALTER TABLE `report_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_user`
--
ALTER TABLE `report_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `socitiesclubs`
--
ALTER TABLE `socitiesclubs`
  ADD PRIMARY KEY (`socitiesclubsId`);

--
-- Indexes for table `socitiesclubsFollows`
--
ALTER TABLE `socitiesclubsFollows`
  ADD PRIMARY KEY (`socitifollowId`);

--
-- Indexes for table `subinterests`
--
ALTER TABLE `subinterests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suspended_user`
--
ALTER TABLE `suspended_user`
  ADD PRIMARY KEY (`suspended_id`);

--
-- Indexes for table `threadReplies`
--
ALTER TABLE `threadReplies`
  ADD PRIMARY KEY (`thread_id`);

--
-- Indexes for table `topstories`
--
ALTER TABLE `topstories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userClasses`
--
ALTER TABLE `userClasses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userspolls`
--
ALTER TABLE `userspolls`
  ADD PRIMARY KEY (`userpollsId`);

--
-- Indexes for table `user_block`
--
ALTER TABLE `user_block`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_comuunity`
--
ALTER TABLE `user_comuunity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_credits`
--
ALTER TABLE `user_credits`
  ADD PRIMARY KEY (`creditsId`);

--
-- Indexes for table `vipGuest_list`
--
ALTER TABLE `vipGuest_list`
  ADD PRIMARY KEY (`vipguestId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book_event`
--
ALTER TABLE `book_event`
  MODIFY `order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `book_trans`
--
ALTER TABLE `book_trans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `brainStroming`
--
ALTER TABLE `brainStroming`
  MODIFY `nodeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `brainStromingDetails`
--
ALTER TABLE `brainStromingDetails`
  MODIFY `diagramId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `comment_likes`
--
ALTER TABLE `comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `community`
--
ALTER TABLE `community`
  MODIFY `communityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `cources`
--
ALTER TABLE `cources`
  MODIFY `courseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `courseClasses`
--
ALTER TABLE `courseClasses`
  MODIFY `classId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;
--
-- AUTO_INCREMENT for table `event_media`
--
ALTER TABLE `event_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;
--
-- AUTO_INCREMENT for table `follow_thread`
--
ALTER TABLE `follow_thread`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `forum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `forumDetails`
--
ALTER TABLE `forumDetails`
  MODIFY `forumDetails_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `forummembers`
--
ALTER TABLE `forummembers`
  MODIFY `forumMemberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `forumPolls`
--
ALTER TABLE `forumPolls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `forumpolls_options`
--
ALTER TABLE `forumpolls_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `forumuserspolls`
--
ALTER TABLE `forumuserspolls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `groupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `guest_list`
--
ALTER TABLE `guest_list`
  MODIFY `guestId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `interests`
--
ALTER TABLE `interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `jobId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `landing_emails`
--
ALTER TABLE `landing_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `marketPlace`
--
ALTER TABLE `marketPlace`
  MODIFY `marketplaceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `newsnow_data`
--
ALTER TABLE `newsnow_data`
  MODIFY `ips` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26204;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `page_viewd`
--
ALTER TABLE `page_viewd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `Platform_notifications`
--
ALTER TABLE `Platform_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=661;
--
-- AUTO_INCREMENT for table `polls`
--
ALTER TABLE `polls`
  MODIFY `pollId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `polls_options`
--
ALTER TABLE `polls_options`
  MODIFY `optionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT for table `post_ratting`
--
ALTER TABLE `post_ratting`
  MODIFY `ratingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `post_replies`
--
ALTER TABLE `post_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;
--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `report_post`
--
ALTER TABLE `report_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `report_user`
--
ALTER TABLE `report_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `socitiesclubs`
--
ALTER TABLE `socitiesclubs`
  MODIFY `socitiesclubsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `socitiesclubsFollows`
--
ALTER TABLE `socitiesclubsFollows`
  MODIFY `socitifollowId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `subinterests`
--
ALTER TABLE `subinterests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=571;
--
-- AUTO_INCREMENT for table `suspended_user`
--
ALTER TABLE `suspended_user`
  MODIFY `suspended_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `threadReplies`
--
ALTER TABLE `threadReplies`
  MODIFY `thread_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `topstories`
--
ALTER TABLE `topstories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `userClasses`
--
ALTER TABLE `userClasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `userspolls`
--
ALTER TABLE `userspolls`
  MODIFY `userpollsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `user_block`
--
ALTER TABLE `user_block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user_comuunity`
--
ALTER TABLE `user_comuunity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `user_credits`
--
ALTER TABLE `user_credits`
  MODIFY `creditsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vipGuest_list`
--
ALTER TABLE `vipGuest_list`
  MODIFY `vipguestId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

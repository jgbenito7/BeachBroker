-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Sep 16, 2016 at 11:22 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `beachbroker`
--

-- --------------------------------------------------------

--
-- Table structure for table `listingPictures`
--

CREATE TABLE `listingPictures` (
  `id` int(255) NOT NULL,
  `idListing` int(255) NOT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `thumbPath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listingPictures`
--

INSERT INTO `listingPictures` (`id`, `idListing`, `filePath`, `thumbPath`) VALUES
(47, 39, '1473793484651.jpg', NULL),
(48, 39, '1473793484654.jpg', NULL),
(49, 39, '1473793484655.jpg', NULL),
(50, 39, '1473793484657.jpg', NULL),
(51, 39, '1473793484659.jpg', NULL),
(52, 39, '1473793484660.jpg', NULL),
(53, 39, '1473793484662.jpg', NULL),
(54, 39, '1473793484664.jpg', NULL),
(55, 39, '1473793484667.jpg', NULL),
(56, 39, '1473793484669.jpg', NULL),
(57, 39, '1473793484671.jpg', NULL),
(58, 39, '1473793484674.jpg', NULL),
(59, 40, '1473793615328.jpg', NULL),
(60, 40, '1473793615331.jpg', NULL),
(61, 40, '1473793615332.jpg', NULL),
(62, 40, '1473793615334.jpg', NULL),
(63, 40, '1473793615336.jpg', NULL),
(64, 40, '1473793615338.jpg', NULL),
(65, 40, '1473793615345.jpg', NULL),
(66, 40, '1473793615347.jpg', NULL),
(67, 40, '1473793615349.jpg', NULL),
(68, 40, '1473793615351.jpg', NULL),
(69, 40, '1473793615353.jpg', NULL),
(70, 40, '1473793615355.jpg', NULL),
(71, 41, '1473809745060.jpg', NULL),
(72, 41, '1473809745067.jpg', NULL),
(73, 41, '1473809745071.jpg', NULL),
(74, 41, '1473809745073.jpg', NULL),
(75, 41, '1473809745075.jpg', NULL),
(76, 41, '1473809745076.jpg', NULL),
(77, 42, '1473907919437.jpg', NULL),
(78, 43, '1473908973660.png', NULL),
(79, 44, '1473957301421.jpg', NULL),
(80, 44, '1473957301429.jpg', NULL),
(81, 44, '1473957301432.jpg', NULL),
(82, 44, '1473957301433.jpg', NULL),
(83, 44, '1473957301436.jpg', NULL),
(84, 44, '1473957301437.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `fullAddress` varchar(255) DEFAULT NULL,
  `streetNumber` int(255) NOT NULL,
  `streetName` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zipcode` varchar(15) DEFAULT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `cost` decimal(30,2) NOT NULL DEFAULT '0.00',
  `sqft` int(255) DEFAULT NULL,
  `beds` int(10) DEFAULT NULL,
  `baths` int(10) DEFAULT NULL,
  `beachDistance` int(11) NOT NULL,
  `homeType` varchar(255) DEFAULT NULL,
  `description` text,
  `published` enum('yes','no') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `userId`, `fullAddress`, `streetNumber`, `streetName`, `city`, `state`, `country`, `zipcode`, `latitude`, `longitude`, `cost`, `sqft`, `beds`, `baths`, `beachDistance`, `homeType`, `description`, `published`) VALUES
(40, 'test@testing.com', NULL, 0, NULL, 'Morro Bay', 'California', NULL, '93442', '0.00000000', '0.00000000', '10295000.00', 2000, 234, 2345, 40, NULL, 'Rare opportunity to purchase a freshly renovated Boutique Hotel on the Central Coast of California. With 33 spectacular ocean view rooms, many with gas fireplaces and onsite spa, 456 Embarcadero Inn & Suites is a premier destination. Renovations completed in Q1 of 2016 makes this hotel a turn-key investment opportunity. Additionally, there is a 2 bedroom family suite that can be converted to an on-site managers quarters. Otherwise we have referrals for professional hotel management firms.\r\n\r\nLocated halfway between Los Angeles and San Francisco, Morro Bay is an ideal year-round tourism destination for guests from these two major metropolitan areas, as well as international travelers exploring the coastline. Home to the world-famous Morro Rock, the charming town serves as the ideal destination for activities such as golfing, kayaking, hiking and biking. With a tremendous variety of festivals, events and delicious dining options, Morro Bay continues to be a growing favorite for travelers.', 'no'),
(42, 'test@testing.com', '2455 Cochran St, Simi Valley, CA 93065, USA', 2455, 'Cochran Street', 'Simi Valley', 'CA', 'United States', '93065', '34.27924000', '-118.74889000', '0.00', 1234, 1234, 1234, 34, NULL, 'test', 'no'),
(43, 'test@testing.com', '1234 Pride St, Simi Valley, CA 93065, USA', 1234, 'Pride Street', 'Simi Valley', 'CA', 'United States', '93065', '34.26150300', '-118.77464800', '10000000.00', 10, 1, 1, 1234, 'House', 'Yes', 'no'),
(44, 'test@testing.com', '579 Oldstone Pl, Simi Valley, CA 93065, USA', 579, 'Oldstone Place', 'Simi Valley', 'CA', 'United States', '93065', '34.24917170', '-118.79186420', '300000.00', 2000, 2, 3, 145, 'House', 'This is a test description to see how it looks. This property is pretty sweet and you should buy it and stuff.... Okay cool have a nice day.', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `facebookToken` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT 'UserProfile.png',
  `phone` varchar(25) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `password`, `firstName`, `lastName`, `facebookId`, `facebookToken`, `token`, `imagePath`, `phone`, `contactEmail`) VALUES
('bob@test.com', 'cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90', 'Bob', 'Testerson', NULL, NULL, 'BmyKzmmxhPKBoJtqv3wIoZL64dR1HafrPwJz9IcErhQhMcUHLoTtob5lGI0GsmwqgEt9OrzDJBECNWMXkXnA1oknouKjmt2JSdo4ja9aXuWGyVsgewRfeMQzDOJ1ZrAtWh6nj1H4nhhkeDoc1HxguMpSmjBwosFTX9bBXYJCcmGaz3l3llxxUnBlaOBAp6R8AwasnmeD8R136vNX7wxt7oji4gOQTCoitK95ZFgiclylzG2Txo6Fe91YxBZun3N', 'UserProfile.png', NULL, NULL),
('jgbenito7@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Joey', 'Gomez-Benito', NULL, NULL, '9AKoo0Y2xLsGSWVnt8tMDQerpgMN1kzHItpAJtD2XvauRdih1AYXN0JqS8oUG4FNH3aNcgX78eg9eCvw8OpKvoYJAc8JM33IGE3rQeuoIJjTRB7z2QIMWqN5PlYAM371rZH7t0rokD1gEVlcFqbmIiPTl6z7Li5baepeJ1I9jWe6QbpXa8gLE51ddu8BFq2pTh7CIZ1qSvbNLIm224SGYRX21eB6eEDCZjwbDCko69CN6XGSvAy0daQFCAHHFAS', 'UserProfile.png', NULL, NULL),
('jingle@test.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'John', 'Jacob', NULL, NULL, 'Zjr9X0aaU0T7dHFp5Q7P85UlS2B9WcfObmdpyIjdtZCNz3XxZMoOOhxZUJtKsCraqvcSAakzUAFircFmOLmr4w8z7bRA5FLOYJqAU9KjDKypLnywnPl1rIdcsqmV4vCg4tN6CP2bzvzg6hduHGK1pq1AXgCLePAx8jNCzDeBJpTgga3u7zXiUJNP4U98QgcUsy2JefpNjnrmpU7PkgkWxPUiyv5DLPgHdbbd6QoSloZJD5eQbHeM3M4uU2CQsAb', 'UserProfile.png', NULL, NULL),
('sue@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Sue', 'Gomez-Benito', NULL, NULL, '4MkS5VMnMmX3ddHoVLXh36MV6GfMU4QVPt6sANpzQMSuMoEpqABH0pU0Y1qgZFuxHiiut33aGLtlRacyj6haKpQp1vB4bkNka8cvnWoLft56Psh8tqlW0BwcMYntQOpDeQ3S3KUqajUgwPHl6fXFeZrNDsmmpxDRVlnQxWfkBmysK3qpBt5zkgHxr5WvzpKME4NzGLlmaE231TJP7TVk3Dkp80fVwabvxA1gRZJ52d93meebQNZU1nEDx8zfN6c', 'UserProfile.png', NULL, NULL),
('test@test.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Robert', 'Harris', NULL, NULL, 'eKFGy0cg5KKgGBjrC5VV5BCn3pDv69S5QWkyhZLJhYViHAGQFta0uj6kdzsNCsVUnMD3oqzbSIlpKerRugg3ZMPoOeCUeT6Xc6WsS5f3SNQuSiNwM6E24oaAAfiVf8zmEafoLBd4YJksnRXZZExpXWKCqzglcjvh1EzAPaHH1cfUHc9U9bRK3Dv2B29bSzb2hWivWnqYx0eFnPa0WqAAAvrv8MB5SfWxIMULn9cYamzKaqfLOGhwTc3cuqfvbxD', 'UserProfile.png', NULL, NULL),
('test@testing.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Joey', 'Gomez-Benito', NULL, NULL, '9ABh6bvR0IPoV2v8aAmJbwNw6kejJhT48nVCTqX4gscrR2PLOgfaORzRMsDbht7wKjJZs6GMFLXK6HtgCp0nLjOObGUfN88otMyvCNHHm97viPWI2NFgEWT7qRhIkyhiIsKWMgH3Ix4g9gbgi9biT4YSbNQPpGJhEkriwH8XZG7djte86K6CoAo7ZWhuOf0Anetbb8ynANLuUOV3fa60GRG9RVXwikpLqRucbxRU86Msy6dILstHWXnzrun1nHg', '1474040499345.png', '(805) 304-7028', 'jgbenito7@gmail.com'),
('tester@test.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test', 'Testerson', NULL, NULL, 'K2EPPllJgTqTxh3IGXUmuGMRY3T2eWskGcazfDQpmexcuVJfTrGBR4ywEEL6qz1HWCdVZJ2iwWcBOBVY1UyHXQ4J7sckwghmuyJyBbfHyYYjobEiRntRxfvujnnraT3LBHqAWC5ydlrABsqPCpB69yzz7UKh7LGj7m6HVuwO1haGo2E4xRmQUrW7wIdx9iQ7hXZ5UvFcsgsZQBZN2NBVxCP7mVnA9Yd7RvmxTv9eOAiC01uBQjbcmKsxCEsdrpc', 'UserProfile.png', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `listingPictures`
--
ALTER TABLE `listingPictures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `listingPictures`
--
ALTER TABLE `listingPictures`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=45;

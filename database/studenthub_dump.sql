-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Oct 10, 2026 at 07:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studenthub`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(150) NOT NULL,
  `event_date` date NOT NULL,
  `category` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `event_date`, `category`, `description`, `created_at`) VALUES
(1, 'Tech Fest 2026', '2026-09-05', 'technical', 'Annual technical festival with hackathons, coding contests, and project exhibitions.', '2026-10-10 04:59:15'),
(2, 'Freshers\' Welcome Party', '2026-08-20', 'cultural', 'A fun evening of music, games, and introductions for new students.', '2026-10-10 04:59:15'),
(3, 'Inter-College Cricket Cup', '2026-09-12', 'sports', 'Annual cricket tournament between CSE, IT, and CE departments.', '2026-10-10 04:59:15'),
(4, 'AI & Machine Learning Workshop', '2026-09-18', 'workshop', 'Hands-on workshop covering the basics of Python, ML models, and real datasets.', '2026-10-10 04:59:15'),
(5, 'Guest Lecture: Careers in Cloud Computing', '2026-09-22', 'seminar', 'Industry expert talk on career paths in AWS, Azure, and GCP.', '2026-10-10 04:59:15'),
(6, 'Code Sprint 24hr Hackathon', '2026-10-03', 'technical', 'A 24-hour team hackathon to build and pitch a working prototype.', '2026-10-10 04:59:15'),
(7, 'Annual Cultural Night', '2026-10-10', 'cultural', 'Dance, music, and drama performances by students across all years.', '2026-10-10 04:59:15'),
(8, 'Badminton Championship', '2026-10-15', 'sports', 'Singles and doubles badminton matches open to all students.', '2026-10-10 04:59:15'),
(9, 'Git & GitHub Workshop', '2026-10-20', 'workshop', 'Learn version control basics, branching, and collaborative workflows.', '2026-10-10 04:59:15'),
(10, 'Resume & Interview Prep Seminar', '2026-10-25', 'seminar', 'Tips from alumni and placement cell on resumes and interview rounds.', '2026-10-10 04:59:15'),
(11, 'Web Development Bootcamp', '2026-11-02', 'workshop', 'Two-day intensive session on HTML, CSS, JavaScript, and deployment.', '2026-10-10 04:59:15'),
(12, 'Robotics Expo', '2026-11-08', 'technical', 'Showcase of student-built robots and automation projects.', '2026-10-10 04:59:15'),
(13, 'Football Tournament', '2026-11-14', 'sports', 'Knockout-format football tournament across all departments.', '2026-10-10 04:59:15'),
(14, 'Diwali Celebration', '2026-11-20', 'cultural', 'Campus-wide Diwali celebration with rangoli and lighting competitions.', '2026-10-10 04:59:15'),
(15, 'Alumni Connect Meetup', '2026-11-28', 'seminar', 'Networking session with graduated alumni working across the industry.', '2026-10-10 04:59:15');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `student_id`, `event_id`, `registered_at`) VALUES
(1, 1, 6, '2026-10-10 04:59:15'),
(2, 2, 9, '2026-10-10 04:59:15'),
(3, 3, 12, '2026-10-10 04:59:15');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `mobile` char(10) NOT NULL,
  `idno` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `course` enum('cse','ce','it') NOT NULL,
  `study_year` tinyint(3) UNSIGNED NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `fullname`, `email`, `mobile`, `idno`, `password_hash`, `course`, `study_year`, `gender`, `created_at`) VALUES
(1, 'Aarav Shah', 'aarav.shah@example.com', '9876543210', 'STU1001', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'cse', 2, 'male', '2026-10-10 04:59:15'),
(2, 'Diya Patel', 'diya.patel@example.com', '9876543211', 'STU1002', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'it', 2, 'female', '2026-10-10 04:59:15'),
(3, 'Krish Desai', 'krish.desai@example.com', '9876543212', 'STU1003', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ce', 3, 'male', '2026-10-10 04:59:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_events_date` (`event_date`),
  ADD KEY `idx_events_category` (`category`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_student_event` (`student_id`,`event_id`),
  ADD KEY `idx_registrations_event` (`event_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_students_email` (`email`),
  ADD UNIQUE KEY `uq_students_idno` (`idno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `fk_registrations_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registrations_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

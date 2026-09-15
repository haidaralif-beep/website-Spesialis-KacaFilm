-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2026 at 04:49 AM
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
-- Database: `kaca_film_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `hasil_pemasangan`
--

CREATE TABLE `hasil_pemasangan` (
  `id` int(11) NOT NULL,
  `nama_tempat` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `foto_url` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil_pemasangan`
--

INSERT INTO `hasil_pemasangan` (`id`, `nama_tempat`, `deskripsi`, `foto_url`, `created_at`) VALUES
(1, 'Bandung', 'Pemasangan film kaca dengan motif hexagon/sarang lebah memberikan tampilan yang lebih modern dan elegan pada area kaca. Pola geometris terlihat menyatu dengan permukaan kaca sehingga menciptakan kesan dekoratif sekaligus memberikan privasi.', '/uploads/material_1789352084253_WhatsApp Image 2026-09-08 at 09.44.25.jpeg', '2026-09-14 02:16:42'),
(2, 'bandung', 'Pemasangan pada area pintu kaca memberikan tampilan yang lebih rapi, modern, dan profesional. Film dekoratif diaplikasikan dengan kombinasi bidang transparan dan garis horizontal, sehingga tetap memberikan visibilitas pada kaca sekaligus membantu menciptakan batas visual dan privasi.', '/uploads/material_1789353937329_WhatsApp Image 2026-09-08 at 09.44.25 (1).jpeg', '2026-09-14 02:46:23');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `nama_bahan` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `spesifikasi` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `nama_bahan`, `deskripsi`, `spesifikasi`, `created_at`, `updated_at`) VALUES
(1, 'OWD 60% AG K', '\n✅Tampak luar efek cermin\n✅Mampu Meredam Panas\n✅Tidak Gosong\n✅Tidak Susut\n✅Tidak Berjamur\n✅Tidak Menguning\n✅Tidak Gelembung', 'Kaca film privasi dan Anti UV hingga 100% dengan kegelapan 60%.', '2026-09-14 03:28:27', '2026-09-14 03:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `material_photos`
--

CREATE TABLE `material_photos` (
  `id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `caption` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_photos`
--

INSERT INTO `material_photos` (`id`, `material_id`, `url`, `caption`, `created_at`) VALUES
(1, 1, '/uploads/material_1789356485839_Screenshot_2021_0822_091716.png', 'privasi', '2026-09-14 03:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `rating` int(11) DEFAULT 5,
  `testimoni` text NOT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `password`, `role`, `created_at`) VALUES
(1, 'admin', '$2b$10$GVQw40DoHJS63lcNCtfd1uQSt/JGIC8PT6pwb9onlJl8aLpwY9yKG', 'admin', '2026-09-11 04:00:28'),
(2, 'haidar', 'adalahaku', 'admin', '2026-09-11 04:04:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hasil_pemasangan`
--
ALTER TABLE `hasil_pemasangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_photos`
--
ALTER TABLE `material_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hasil_pemasangan`
--
ALTER TABLE `hasil_pemasangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `material_photos`
--
ALTER TABLE `material_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `material_photos`
--
ALTER TABLE `material_photos`
  ADD CONSTRAINT `material_photos_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

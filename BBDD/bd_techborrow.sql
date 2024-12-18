CREATE DATABASE  IF NOT EXISTS `techborrow` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `techborrow`;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 05:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techborrow`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `categoria` set('Laptop','Mouse','Teclado','Pantalla','Adaptador','Libro','Herramienta') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `devolucion`
--

CREATE TABLE `devolucion` (
  `id_devolucion` int(11) NOT NULL,
  `id_solicitante` int(11) DEFAULT NULL,
  `id_material` int(11) DEFAULT NULL,
  `comentarios` varchar(255) DEFAULT NULL,
  `fechaH` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `estado` set('Disponible','Prestado','Reparacion','Guardado','Reserva') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado_reporte`
--

CREATE TABLE `estado_reporte` (
  `id_estadoreporte` int(11) NOT NULL,
  `estado_reporte` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `id_material` int(11) DEFAULT NULL,
  `Totalmaterial` int(11) DEFAULT NULL,
  `Enuso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `id_material` int(11) NOT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `id_ubicacion` int(11) DEFAULT NULL,
  `nombre_material` varchar(255) DEFAULT NULL,
  `numserie` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `permiso` set('Maestros','Alumnos','Ambos') DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `id_solicitante` int(11) DEFAULT NULL,
  `id_material` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reporte`
--

CREATE TABLE `reporte` (
  `id_reporte` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  `id_solicitante` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_estadoreporte` int(11) DEFAULT NULL,
  `fechaH` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `solicitante`
--

CREATE TABLE `solicitante` (
  `id_solicitante` int(11) NOT NULL,
  `matricula_numeroempleado` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `activo` int(11) DEFAULT NULL,
  `adeudos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ubicacion`
--

CREATE TABLE `ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `ubicacion` set('Aula','Laboratorio','Cubiculos','Almacen') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `matricula` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidoP` varchar(255) DEFAULT NULL,
  `apellidoM` varchar(255) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `fecha_registro` date DEFAULT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `matricula`, `nombre`, `apellidoP`, `apellidoM`, `password`, `correo`, `fecha_registro`, `tipo`) VALUES
(2, 1187894, 'Alan Eduardo', 'Ocegueda', 'Turrubiartez', '1234', 'alan@gmail.com', '2024-12-16', 'administrador'),
(28, 1166796, 'Rafael', 'Castellanos', 'Armenta', 'superboy', 'boytelas8@hotmail.com', '2024-12-17', 'usuario'),
(31, 345345, 'Jesús', 'González', 'Martínez', 'chaparro', 'chaparro11@correo.com', '2024-12-17', 'usuario'),
(32, 345345, 'Maricela', 'Alaniz', 'Ochoa', 'flaca123', 'flaquita23@correo.com', '2024-12-17', 'usuario'),
(34, 35412342, 'Vivian Julieta', 'Ocegueda', 'Turrubiartez', '1234', 'vivianoceguedat@gmail.com', '2024-12-17', 'usuario'),
(36, 35412375, 'Rafael', 'Castellanos', 'Armenta', '4321', 'vicboypro@hotmail.com', '2024-12-17', 'usuario'),
(37, 1478945, 'Roberto', 'Soto', 'Gallegos', '1234', 'chikis21@correo.com', '2024-12-17', 'usuario');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indexes for table `devolucion`
--
ALTER TABLE `devolucion`
  ADD PRIMARY KEY (`id_devolucion`),
  ADD KEY `FK_material_devolucion_idx` (`id_material`),
  ADD KEY `FK_solicitante_devolucion_idx` (`id_solicitante`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indexes for table `estado_reporte`
--
ALTER TABLE `estado_reporte`
  ADD PRIMARY KEY (`id_estadoreporte`);

--
-- Indexes for table `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `FK_material_inventario_idx` (`id_material`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id_material`),
  ADD KEY `FK_ubicacion_idx` (`id_ubicacion`),
  ADD KEY `FK_categoria_idx` (`id_categoria`),
  ADD KEY `FK_estado_idx` (`id_estado`);

--
-- Indexes for table `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `FK_material_idx` (`id_material`),
  ADD KEY `FK_solicitante_idx` (`id_solicitante`);

--
-- Indexes for table `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `FK_material_idx` (`id_material`),
  ADD KEY `FK_solicitante_idx` (`id_solicitante`),
  ADD KEY `FK_estadoreporte_idx` (`id_estadoreporte`);

--
-- Indexes for table `solicitante`
--
ALTER TABLE `solicitante`
  ADD PRIMARY KEY (`id_solicitante`);

--
-- Indexes for table `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `devolucion`
--
ALTER TABLE `devolucion`
  MODIFY `id_devolucion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estado_reporte`
--
ALTER TABLE `estado_reporte`
  MODIFY `id_estadoreporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reporte`
--
ALTER TABLE `reporte`
  MODIFY `id_reporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `solicitante`
--
ALTER TABLE `solicitante`
  MODIFY `id_solicitante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `devolucion`
--
ALTER TABLE `devolucion`
  ADD CONSTRAINT `FK_material_devolucion` FOREIGN KEY (`id_material`) REFERENCES `prestamo` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_solicitante_devolucion` FOREIGN KEY (`id_solicitante`) REFERENCES `prestamo` (`id_solicitante`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `FK_material_inventario` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `FK_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ubicacion` FOREIGN KEY (`id_ubicacion`) REFERENCES `ubicacion` (`id_ubicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `FK_material` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_solicitante` FOREIGN KEY (`id_solicitante`) REFERENCES `solicitante` (`id_solicitante`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `FK_estadoreporte_reporte` FOREIGN KEY (`id_estadoreporte`) REFERENCES `estado_reporte` (`id_estadoreporte`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_material_reporte` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_solicitante_reporte` FOREIGN KEY (`id_solicitante`) REFERENCES `solicitante` (`id_solicitante`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

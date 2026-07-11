-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `caracteristicas_habitacion`
--

DROP TABLE IF EXISTS `caracteristicas_habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caracteristicas_habitacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caracteristicas_habitacion`
--

LOCK TABLES `caracteristicas_habitacion` WRITE;
/*!40000 ALTER TABLE `caracteristicas_habitacion` DISABLE KEYS */;
INSERT INTO `caracteristicas_habitacion` VALUES (1,'Wifi','Conexión inalámbrica a internet',1),(2,'Television','Televisor estándar',1),(3,'Smart TV','Televisor inteligente con streaming',1),(4,'Aire Acondicionado','Sistema de climatización frío/calor',1),(5,'Vista al Mar','Habitación con vista al mar',1),(6,'Caja Fuerte','Caja de seguridad para objetos de valor',1),(7,'Detector de humo','Prevencion de incendios en habitaciones',1),(8,'Balcon','Balcon amplio con mesa para tomar las comidas al aire libre',0),(9,'','',1);
/*!40000 ALTER TABLE `caracteristicas_habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkin`
--

DROP TABLE IF EXISTS `checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reserva_id` int NOT NULL,
  `fecha_checkin` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('ACTIVO','FINALIZADO','ANULADO') NOT NULL DEFAULT 'ACTIVO',
  `observaciones` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reserva_id` (`reserva_id`),
  CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkin`
--

LOCK TABLES `checkin` WRITE;
/*!40000 ALTER TABLE `checkin` DISABLE KEYS */;
INSERT INTO `checkin` VALUES (1,3,'2026-05-28 08:45:00','FINALIZADO','Ingreso realizado correctamente'),(2,4,'2026-05-15 13:10:00','FINALIZADO','Check-in completado sin inconvenientes'),(3,1,'2026-06-01 13:00:00','ACTIVO','Pareja hospedada'),(4,6,'2026-06-14 15:30:00','ACTIVO','Grupo familiar'),(5,8,'2026-06-20 14:10:00','FINALIZADO','Ingreso de varios huéspedes'),(6,9,'2026-06-13 14:00:00','ACTIVO','Check-in grupo familiar');
/*!40000 ALTER TABLE `checkin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkin_huespedes`
--

DROP TABLE IF EXISTS `checkin_huespedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkin_huespedes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `checkin_id` int NOT NULL,
  `huesped_id` int NOT NULL,
  `observaciones` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `checkin_id` (`checkin_id`,`huesped_id`),
  KEY `huesped_id` (`huesped_id`),
  CONSTRAINT `checkin_huespedes_ibfk_1` FOREIGN KEY (`checkin_id`) REFERENCES `checkin` (`id`),
  CONSTRAINT `checkin_huespedes_ibfk_2` FOREIGN KEY (`huesped_id`) REFERENCES `huespedes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkin_huespedes`
--

LOCK TABLES `checkin_huespedes` WRITE;
/*!40000 ALTER TABLE `checkin_huespedes` DISABLE KEYS */;
INSERT INTO `checkin_huespedes` VALUES (1,1,3,'Titular de la reserva'),(2,2,4,'Titular de la reserva'),(3,2,1,'Acompañante'),(4,3,1,'Titular de la reserva'),(5,3,9,'Acompañante'),(6,4,6,'Titular de la reserva'),(7,4,10,'Acompañante'),(8,4,11,'Hija menor'),(9,5,8,'Titular de la reserva'),(10,5,12,'Acompañante'),(11,5,2,'Invitado adicional'),(12,6,1,'Titular'),(13,6,9,'Acompañante'),(14,6,10,'Hijo');
/*!40000 ALTER TABLE `checkin_huespedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkout`
--

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `checkin_id` int NOT NULL,
  `fecha_checkout` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inspeccion` enum('LIMPIEZA','MANTENIMIENTO','NO_OPERATIVA') NOT NULL DEFAULT 'LIMPIEZA',
  `total_estadia` decimal(10,2) NOT NULL,
  `total_pagado` decimal(10,2) NOT NULL DEFAULT '0.00',
  `saldo_pendiente` decimal(10,2) NOT NULL DEFAULT '0.00',
  `estado` enum('PENDIENTE_PAGO','PAGADO','ANULADO') NOT NULL DEFAULT 'PENDIENTE_PAGO',
  `observaciones` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `checkin_id` (`checkin_id`),
  CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`checkin_id`) REFERENCES `checkin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout`
--

LOCK TABLES `checkout` WRITE;
/*!40000 ALTER TABLE `checkout` DISABLE KEYS */;
INSERT INTO `checkout` VALUES (1,2,'2026-06-14 11:00:00','LIMPIEZA',500000.00,500000.00,0.00,'PAGADO','Habitación liberada correctamente');
/*!40000 ALTER TABLE `checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacion_caracteristicas`
--

DROP TABLE IF EXISTS `habitacion_caracteristicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion_caracteristicas` (
  `habitacion_id` int NOT NULL,
  `caracteristica_id` int NOT NULL,
  PRIMARY KEY (`habitacion_id`,`caracteristica_id`),
  KEY `caracteristica_id` (`caracteristica_id`),
  CONSTRAINT `habitacion_caracteristicas_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`),
  CONSTRAINT `habitacion_caracteristicas_ibfk_2` FOREIGN KEY (`caracteristica_id`) REFERENCES `caracteristicas_habitacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion_caracteristicas`
--

LOCK TABLES `habitacion_caracteristicas` WRITE;
/*!40000 ALTER TABLE `habitacion_caracteristicas` DISABLE KEYS */;
INSERT INTO `habitacion_caracteristicas` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(1,2),(2,2),(3,2),(4,2),(10,2),(11,2),(19,2),(5,3),(6,3),(7,3),(8,3),(9,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(5,4),(6,4),(14,4),(15,4),(17,4),(18,4),(19,4),(9,5),(16,5),(17,5),(18,5),(19,5),(2,6),(4,6),(19,6),(19,7);
/*!40000 ALTER TABLE `habitacion_caracteristicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) NOT NULL,
  `tipo_habitacion_id` int NOT NULL,
  `estado` enum('DISPONIBLE','OCUPADA','LIMPIEZA','MANTENIMIENTO','FUERA_SERVICIO') NOT NULL DEFAULT 'DISPONIBLE',
  `observaciones` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`numero`),
  KEY `tipo_habitacion_id` (`tipo_habitacion_id`),
  CONSTRAINT `habitaciones_ibfk_1` FOREIGN KEY (`tipo_habitacion_id`) REFERENCES `tipos_habitacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES (1,'101',1,'OCUPADA',NULL),(2,'102',1,'OCUPADA','Incluye caja fuerte'),(3,'103',1,'LIMPIEZA',NULL),(4,'104',1,'OCUPADA','Incluye caja fuerte'),(5,'201',2,'MANTENIMIENTO',NULL),(6,'202',2,'OCUPADA',NULL),(7,'203',2,'OCUPADA',NULL),(8,'204',2,'LIMPIEZA',NULL),(9,'205',2,'DISPONIBLE',NULL),(10,'301',3,'OCUPADA',NULL),(11,'302',3,'OCUPADA',NULL),(12,'303',3,'OCUPADA',NULL),(13,'304',3,'LIMPIEZA',NULL),(14,'401',4,'OCUPADA',NULL),(15,'402',4,'OCUPADA',NULL),(16,'403',4,'DISPONIBLE',NULL),(17,'501',5,'OCUPADA','Vista panorámica al mar'),(18,'502',5,'DISPONIBLE','Suite premium con jacuzzi'),(19,'601',2,'DISPONIBLE','Testing Editar');
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huespedes`
--

DROP TABLE IF EXISTS `huespedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `huespedes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_documento` enum('DNI','PASAPORTE','CI') NOT NULL,
  `numero_documento` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nacionalidad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo_documento` (`tipo_documento`,`numero_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huespedes`
--

LOCK TABLES `huespedes` WRITE;
/*!40000 ALTER TABLE `huespedes` DISABLE KEYS */;
INSERT INTO `huespedes` VALUES (1,'DNI','32145678','Juan','Pérez','2235123456','juan.perez@gmail.com','Av. Colón 1234','Argentina','1988-05-12','2026-05-29 08:48:30',1),(2,'PASAPORTE','AR998877','Emily','Johnson','2235987412','emily.johnson@gmail.com','742 Evergreen St','Estados Unidos','1992-09-20','2026-05-29 08:48:30',1),(3,'DNI','28765432','Carlos','Gómez','2234778899','carlos.gomez@gmail.com','San Martín 456','Argentina','1985-01-10','2026-05-29 08:48:30',1),(4,'CI','UY445566','Lucía','Fernández','2234661122','luciaf@gmail.com','Calle Rivera 987','Uruguay','1990-07-15','2026-05-29 08:48:30',1),(5,'DNI','40111222','Martín','Suárez','2234332211','martin.suarez@gmail.com','Belgrano 222','Argentina','1998-03-18','2026-05-29 08:48:30',1),(6,'PASAPORTE','BR554433','Ana','Silva','2235447788','ana.silva@gmail.com','Rua Paulista 101','Brasil','1991-11-22','2026-05-29 08:48:30',1),(7,'DNI','35666777','Sofía','Ramírez','2234001122','sofia.ramirez@gmail.com','Independencia 321','Argentina','1995-06-30','2026-05-29 08:48:30',1),(8,'DNI','29999111','Federico','López','2235778899','fede.lopez@gmail.com','Moreno 555','Argentina','1987-12-05','2026-05-29 08:48:30',1),(9,'DNI','41222333','María','Pérez','2236001111','maria.perez@gmail.com','Av. Luro 123','Argentina','1993-04-15','2026-05-29 08:48:31',1),(10,'DNI','39888777','Tomás','Gómez','2236112222','tomas.gomez@gmail.com','Brown 456','Argentina','2001-09-10','2026-05-29 08:48:31',1),(11,'PASAPORTE','CL778899','Camila','Rojas','2236223333','camila.rojas@gmail.com','Santiago Centro','Chile','1995-12-01','2026-05-29 08:48:31',1),(12,'DNI','35555111','Valentina','Suárez','2236334444','valentina.s@gmail.com','Falucho 789','Argentina','1998-07-21','2026-05-29 08:48:31',1);
/*!40000 ALTER TABLE `huespedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `limpieza`
--

DROP TABLE IF EXISTS `limpieza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `limpieza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habitacion_id` int NOT NULL,
  `fecha_inicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_fin` datetime DEFAULT NULL,
  `estado` enum('PENDIENTE','EN_PROCESO','FINALIZADA','CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `habitacion_id` (`habitacion_id`),
  CONSTRAINT `limpieza_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `limpieza`
--

LOCK TABLES `limpieza` WRITE;
/*!40000 ALTER TABLE `limpieza` DISABLE KEYS */;
INSERT INTO `limpieza` VALUES (1,3,'2026-06-13 09:00:00',NULL,'PENDIENTE','Limpieza posterior al checkout'),(2,8,'2026-06-01 09:30:00',NULL,'PENDIENTE','Pendiente asignación de personal'),(3,13,'2026-06-01 10:00:00',NULL,'EN_PROCESO','Cambio completo de ropa de cama y sanitización'),(4,2,'2026-05-31 10:00:00','2026-05-31 10:35:00','FINALIZADA','Habitación lista para nuevos huéspedes'),(5,9,'2026-05-31 11:00:00','2026-06-12 11:40:00','FINALIZADA','Limpieza estándar'),(6,16,'2026-05-31 14:00:00','2026-05-31 14:55:00','FINALIZADA','Limpieza posterior a estadía familiar'),(7,18,'2026-05-31 15:30:00','2026-05-31 16:25:00','FINALIZADA','Preparación de suite premium');
/*!40000 ALTER TABLE `limpieza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mantenimiento`
--

DROP TABLE IF EXISTS `mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mantenimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habitacion_id` int NOT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_fin` datetime DEFAULT NULL,
  `estado` enum('PENDIENTE','EN_PROCESO','FINALIZADO','CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `habitacion_id` (`habitacion_id`),
  CONSTRAINT `mantenimiento_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mantenimiento`
--

LOCK TABLES `mantenimiento` WRITE;
/*!40000 ALTER TABLE `mantenimiento` DISABLE KEYS */;
INSERT INTO `mantenimiento` VALUES (2,6,'REPARACIÓN GENERAL','La habitación 202 ingresa a mantenimiento por revisión de instalaciones eléctricas y sanitarias','2026-06-12 18:21:59',NULL,'EN_PROCESO','Ingreso programado para el día de hoy');
/*!40000 ALTER TABLE `mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reserva_id` int NOT NULL,
  `fecha_pago` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` enum('EFECTIVO','TARJETA','TRANSFERENCIA','MERCADOPAGO') NOT NULL,
  `tipo_pago` enum('RESERVA','ESTADIA','EXTRA','PENALIDAD','DEVOLUCION') NOT NULL,
  `referencia_pago` varchar(100) DEFAULT NULL,
  `observaciones` text,
  `estado` enum('PENDIENTE','APROBADO','RECHAZADO','ANULADO','REASIGNADO') NOT NULL DEFAULT 'PENDIENTE',
  `pago_origen_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reserva_id` (`reserva_id`),
  KEY `fk_pago_origen` (`pago_origen_id`),
  CONSTRAINT `fk_pago_origen` FOREIGN KEY (`pago_origen_id`) REFERENCES `pagos` (`id`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,1,'2026-05-20 10:30:00',100000.00,'TARJETA','RESERVA','TXN-1001','Seña del 30% abonada\nPago reasignado a reserva RES-000006. Motivo: El huesped solicito cambio de habitacion.','REASIGNADO',NULL),(2,1,'2026-06-01 14:20:00',240000.00,'TRANSFERENCIA','ESTADIA','TRF-8891','Pago restante al realizar check-in','APROBADO',NULL),(3,2,'2026-05-21 15:00:00',150000.00,'MERCADOPAGO','RESERVA','MP-551122','Pago inicial de reserva','PENDIENTE',NULL),(4,3,'2026-05-28 09:40:00',140000.00,'EFECTIVO','ESTADIA',NULL,'Pago total en recepción','APROBADO',NULL),(5,4,'2026-05-15 12:10:00',475000.00,'TARJETA','ESTADIA','VISA-7788','Pago completo estadía familiar','APROBADO',NULL),(6,4,'2026-05-19 19:00:00',25000.00,'EFECTIVO','EXTRA',NULL,'Consumo minibar','APROBADO',NULL),(7,5,'2026-05-23 13:15:00',50000.00,'TRANSFERENCIA','RESERVA','TRF-778899','Reserva cancelada posteriormente','ANULADO',NULL),(8,5,'2026-05-24 11:45:00',50000.00,'TRANSFERENCIA','DEVOLUCION','DEV-1122','Reintegro por cancelación','APROBADO',NULL),(11,7,'2026-05-25 12:30:00',65000.00,'TARJETA','PENALIDAD','PEN-7788','Cargo por no presentarse','RECHAZADO',NULL),(12,8,'2026-05-26 09:10:00',200000.00,'EFECTIVO','RESERVA',NULL,'Entrega de efectivo en recepción','APROBADO',NULL),(13,1,'2026-07-09 11:15:23',250000.00,'EFECTIVO','DEVOLUCION','','','REASIGNADO',NULL),(14,1,'2026-07-09 11:16:25',2800000.00,'EFECTIVO','RESERVA','','','APROBADO',NULL),(19,6,'2026-07-10 12:26:04',100000.00,'TRANSFERENCIA','RESERVA',NULL,'Pago parcial de prueba','APROBADO',NULL),(20,6,'2026-07-10 12:28:09',100000.00,'TRANSFERENCIA','DEVOLUCION',NULL,'Devolución por cancelación de reserva RES-000006. Pago parcial devuelto íntegramente.','APROBADO',NULL),(21,9,'2026-07-10 12:32:01',360000.00,'TRANSFERENCIA','RESERVA',NULL,'Pago total de prueba','APROBADO',NULL),(22,9,'2026-07-10 12:33:15',252000.00,'TRANSFERENCIA','DEVOLUCION',NULL,'Devolución por cancelación de reserva RES-000009. Política aplicada: 70% devolución.','APROBADO',NULL),(23,9,'2026-07-10 12:33:15',108000.00,'TRANSFERENCIA','PENALIDAD',NULL,'Penalidad por cancelación de reserva RES-000009. Política aplicada: 30% penalidad.','APROBADO',NULL),(24,18,'2026-07-11 05:48:30',250000.00,'EFECTIVO','RESERVA','','','APROBADO',NULL),(25,18,'2026-07-11 05:49:32',250000.00,'TRANSFERENCIA','DEVOLUCION',NULL,'Devolución por cancelación de reserva RES-000018. Pago parcial devuelto íntegramente.','APROBADO',NULL),(26,10,'2026-07-11 05:50:18',1955000.00,'EFECTIVO','RESERVA','','pago total','APROBADO',NULL),(27,10,'2026-07-11 05:50:46',1368500.00,'TRANSFERENCIA','DEVOLUCION',NULL,'Devolución por cancelación de reserva RES-000010. Política aplicada: 70% devolución.','APROBADO',NULL),(28,10,'2026-07-11 05:50:46',586500.00,'TRANSFERENCIA','PENALIDAD',NULL,'Penalidad por cancelación de reserva RES-000010. Política aplicada: 30% penalidad.','APROBADO',NULL);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo_reserva` varchar(20) NOT NULL,
  `tipo_documento` enum('DNI','PASAPORTE','CI') NOT NULL,
  `numero_documento` varchar(50) NOT NULL,
  `nombre_contacto` varchar(100) NOT NULL,
  `apellido_contacto` varchar(100) NOT NULL,
  `telefono_contacto` varchar(50) DEFAULT NULL,
  `email_contacto` varchar(150) DEFAULT NULL,
  `habitacion_id` int NOT NULL,
  `fecha_reserva` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `check_in_previsto` date NOT NULL,
  `check_out_previsto` date NOT NULL,
  `adultos` int NOT NULL DEFAULT '1',
  `menores` int NOT NULL DEFAULT '0',
  `estado` enum('PROVISIONAL','CONFIRMADA','CHECK_IN','FINALIZADA','CANCELADA','NO_SHOW') NOT NULL DEFAULT 'PROVISIONAL',
  `precio_por_noche` decimal(10,2) NOT NULL,
  `total_estimado` decimal(10,2) NOT NULL,
  `observaciones` text,
  `fecha_expiracion_pago` datetime NOT NULL,
  `fecha_cancelacion` datetime DEFAULT NULL,
  `motivo_cancelacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_codigo_reserva` (`codigo_reserva`),
  KEY `habitacion_id` (`habitacion_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'RES-000001','DNI','32145678','Juan','Pérez','2235123456','juan.perez@gmail.com',1,'2026-05-20 10:15:00','2026-06-01','2026-07-05',1,0,'CONFIRMADA',85000.00,2890000.00,'Solicita habitación con vista al mar','2026-05-21 10:15:00',NULL,NULL),(2,'RES-000002','PASAPORTE','AR998877','Emily','Johnson','2235987412','emily.johnson@gmail.com',2,'2026-05-21 14:30:00','2026-06-10','2026-06-15',2,1,'CANCELADA',120000.00,600000.00,'Cancelada por no pago','2026-05-22 14:30:00',NULL,NULL),(3,'RES-000003','DNI','28765432','Carlos','Gómez','2234778899','carlos.gomez@gmail.com',3,'2026-05-18 09:20:00','2026-05-28','2026-05-30',1,0,'CHECK_IN',70000.00,140000.00,'Check-in realizado temprano','2026-05-19 09:20:00',NULL,NULL),(4,'RES-000004','CI','UY445566','Lucía','Fernández','2234661122','luciaf@gmail.com',4,'2026-05-10 18:40:00','2026-05-15','2026-05-20',2,2,'FINALIZADA',95000.00,475000.00,'Familia con niños','2026-05-11 18:40:00',NULL,NULL),(5,'RES-000005','DNI','40111222','Martín','Suárez','2234332211','martin.suarez@gmail.com',5,'2026-06-01 09:10:00','2026-06-03','2026-06-06',1,0,'CANCELADA',78000.00,234000.00,'Cancelada.\nSin pagos registrados.','2026-06-02 09:10:00','2026-07-10 12:03:49','Cliente solicita cancelar la reserva'),(6,'RES-000006','PASAPORTE','BR554433','Ana Loca','Silva','2235447788','ana.silva@gmail.com',6,'2026-05-24 16:00:00','2026-06-25','2026-07-18',2,0,'CANCELADA',110000.00,660000.00,'Cancelada.\nPago parcial devuelto íntegramente.','2026-05-25 16:00:00','2026-07-10 12:28:09','Cancelación solicitada'),(7,'RES-000007','DNI','35666777','Sofía','Ramírez','2234001122','sofia.ramirez@gmail.com',7,'2026-05-25 11:45:00','2026-06-08','2026-06-09',1,0,'NO_SHOW',65000.00,65000.00,'No se presentó al hotel','2026-05-26 11:45:00',NULL,NULL),(8,'RES-000008','DNI','29999111','Federico','López','2235778899','fede.lopez@gmail.com',8,'2026-05-26 08:30:00','2026-06-20','2026-06-25',3,1,'CANCELADA',135000.00,675000.00,'Cancelada por no pago','2026-05-27 08:30:00',NULL,NULL),(9,'RES-000009','DNI','44556677','Diego','Martínez','2235112233','diego.martinez@gmail.com',2,'2026-06-01 11:00:00','2026-06-12','2026-06-16',1,0,'CANCELADA',90000.00,360000.00,'Cancelada.\nSe aplica política de cancelación: 70% devolución / 30% penalidad.','2026-06-02 11:00:00','2026-07-10 12:33:15','Cliente solicita cancelar la reserva'),(10,'RES-000010','PASAPORTE','CH778899','Laura','Keller','2235443322','laura.keller@gmail.com',5,'2026-06-02 15:30:00','2026-06-13','2026-06-30',2,0,'CANCELADA',115000.00,1955000.00,'Cancelada.\nSe aplica política de cancelación: 70% devolución / 30% penalidad.','2026-06-03 15:30:00','2026-07-11 05:50:46','enfermedad'),(11,'RES-000011','DNI','22708446','Sergio','Genevrino','02235328067','sergiogenevrino@gmail.com',16,'2026-07-06 10:30:40','2026-07-07','2026-07-10',1,2,'PROVISIONAL',110000.00,330000.00,'Usa silla de ruedas.','2026-07-07 13:30:41',NULL,NULL),(12,'RES-000012','DNI','22708446','Sergio','Genevrino','02235328067','sergiogenevrino@gmail.com',9,'2026-07-06 10:31:57','2026-07-07','2026-07-10',1,0,'PROVISIONAL',70000.00,210000.00,NULL,'2026-07-07 13:31:57',NULL,NULL),(13,'RES-000013','DNI','22708446','Sebastian','Genevrino','02235328067','sergiogenevrino@gmail.com',19,'2026-07-06 10:43:30','2026-07-07','2026-07-10',1,0,'PROVISIONAL',70000.00,210000.00,NULL,'2026-07-07 13:43:30',NULL,NULL),(14,'RES-000014','DNI','22708446','Lucio','Genevrino','02235328067','sergiogenevrino@gmail.com',9,'2026-07-06 10:46:37','2026-07-12','2026-07-17',1,0,'PROVISIONAL',70000.00,350000.00,NULL,'2026-07-07 13:46:37',NULL,NULL),(15,'RES-000015','DNI','22708446','Sergio','Genevrino','02235328067','sergiogenevrino@gmail.com',19,'2026-07-06 10:52:06','2026-07-19','2026-07-24',1,0,'CANCELADA',70000.00,350000.00,'Cancelada.\nSin pagos registrados.','2026-07-07 13:52:06','2026-07-10 11:50:42','Cliente solicita cancelar la reserva'),(16,'RES-000016','DNI','22708446','Sergio','Genevrino','02235328067','sergiogenevrino@gmail.com',9,'2026-07-06 10:55:03','2026-07-26','2026-07-31',1,0,'PROVISIONAL',70000.00,350000.00,NULL,'2026-07-07 13:55:03',NULL,NULL),(17,'RES-000017','DNI','22708446','Gabriela','Genevrino','02235328067','sergiogenevrino@gmail.com',18,'2026-07-06 11:22:11','2026-07-26','2026-07-29',1,0,'PROVISIONAL',180000.00,540000.00,NULL,'2026-07-07 14:22:12',NULL,NULL),(18,'RES-000018','DNI','22708446','Sergio','Genevrino','02235328067','sergiogenevrino@gmail.com',9,'2026-07-06 22:30:29','2026-08-02','2026-08-10',2,0,'CANCELADA',70000.00,560000.00,'Cancelada.\nPago parcial devuelto íntegramente.','2026-07-08 01:30:30','2026-07-11 05:49:32','enfermedad'),(19,'RES-000019','DNI','22708446','Lucio','Genevrino','02235328067','sergiogenevrino@gmail.com',16,'2026-07-11 05:46:17','2026-08-03','2026-08-07',2,1,'CANCELADA',110000.00,440000.00,'Cancelada.\nSin pagos registrados.','2026-07-12 08:46:16','2026-07-11 05:47:30','enfermedad');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_habitacion`
--

DROP TABLE IF EXISTS `tipos_habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_habitacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `configuracion_camas` varchar(100) DEFAULT NULL,
  `capacidad_maxima` int NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_habitacion`
--

LOCK TABLES `tipos_habitacion` WRITE;
/*!40000 ALTER TABLE `tipos_habitacion` DISABLE KEYS */;
INSERT INTO `tipos_habitacion` VALUES (1,'Simple','1 cama individual',1,45000.00,'Habitación individual ideal para viajeros solos y ejecutivos.',1),(2,'Doble Matrimonial','1 cama matrimonial',2,70000.00,'Habitación ideal para parejas con cama matrimonial.',1),(3,'Doble Twin','2 camas individuales',2,70000.00,'Habitación con dos camas individuales ideal para amigos o compañeros de viaje.',1),(4,'Familiar','1 matrimonial + 2 individuales',4,110000.00,'Habitación amplia diseñada para familias.',1),(5,'Suite','1 cama matrimonial premium',4,180000.00,'Suite premium con jacuzzi y vista al mar.',1),(11,'Suite Testing','2 Camas simples',2,50000.00,'testing',0),(12,'Suite Walter Castro','2 Camas simples',2,140000.00,'Suite Bootcamp',1);
/*!40000 ALTER TABLE `tipos_habitacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-11  7:04:54

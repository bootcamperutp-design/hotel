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
  `estado` enum('INICIADO','ACTIVO','FINALIZADO','ANULADO') NOT NULL DEFAULT 'INICIADO',
  `observaciones` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reserva_id` (`reserva_id`),
  CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkin`
--

LOCK TABLES `checkin` WRITE;
/*!40000 ALTER TABLE `checkin` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkin_huespedes`
--

LOCK TABLES `checkin_huespedes` WRITE;
/*!40000 ALTER TABLE `checkin_huespedes` DISABLE KEYS */;
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
  `inspeccion` enum('LIMPIEZA','MANTENIMIENTO','FUERA_SERVICIO') DEFAULT NULL,
  `total_estadia` decimal(10,2) NOT NULL,
  `total_pagado` decimal(10,2) NOT NULL DEFAULT '0.00',
  `saldo_pendiente` decimal(10,2) NOT NULL DEFAULT '0.00',
  `estado` enum('PENDIENTE_PAGO','PAGADO','ANULADO') NOT NULL DEFAULT 'PENDIENTE_PAGO',
  `observaciones` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `checkin_id` (`checkin_id`),
  CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`checkin_id`) REFERENCES `checkin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout`
--

LOCK TABLES `checkout` WRITE;
/*!40000 ALTER TABLE `checkout` DISABLE KEYS */;
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
INSERT INTO `habitaciones` VALUES (1,'101',1,'DISPONIBLE',NULL),(2,'102',1,'DISPONIBLE','Incluye caja fuerte'),(3,'103',1,'DISPONIBLE',NULL),(4,'104',1,'DISPONIBLE','Incluye caja fuerte'),(5,'201',2,'DISPONIBLE',NULL),(6,'202',2,'DISPONIBLE',NULL),(7,'203',2,'DISPONIBLE',NULL),(8,'204',2,'DISPONIBLE',NULL),(9,'205',2,'DISPONIBLE',NULL),(10,'301',3,'DISPONIBLE',NULL),(11,'302',3,'DISPONIBLE',NULL),(12,'303',3,'DISPONIBLE',NULL),(13,'304',3,'DISPONIBLE',NULL),(14,'401',4,'DISPONIBLE',NULL),(15,'402',4,'DISPONIBLE',NULL),(16,'403',4,'DISPONIBLE',NULL),(17,'501',5,'DISPONIBLE','Vista panorámica al mar'),(18,'502',5,'DISPONIBLE','Suite premium con jacuzzi'),(19,'601',2,'DISPONIBLE','Testing Editar');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huespedes`
--

LOCK TABLES `huespedes` WRITE;
/*!40000 ALTER TABLE `huespedes` DISABLE KEYS */;
INSERT INTO `huespedes` VALUES (1,'DNI','32145678','Juan','Pérez','2235123456','juan.perez@gmail.com','Av. Colón 1234','Argentina','1988-05-12','2026-05-29 08:48:30',1),(2,'PASAPORTE','AR998877','Emily','Johnson','2235987412','emily.johnson@gmail.com','742 Evergreen St','Estados Unidos','1992-09-20','2026-05-29 08:48:30',1),(3,'DNI','28765432','Carlos','Gómez','2234778899','carlos.gomez@gmail.com','San Martín 456','Argentina','1985-01-10','2026-05-29 08:48:30',1),(4,'CI','UY445566','Lucía','Fernández','2234661122','luciaf@gmail.com','Calle Rivera 987','Uruguay','1990-07-15','2026-05-29 08:48:30',1),(5,'DNI','40111222','Martín','Suárez','2234332211','martin.suarez@gmail.com','Belgrano 222','Argentina','1998-03-18','2026-05-29 08:48:30',1),(6,'PASAPORTE','BR554433','Ana','Silva','2235447788','ana.silva@gmail.com','Rua Paulista 101','Brasil','1991-11-22','2026-05-29 08:48:30',1),(7,'DNI','35666777','Sofía','Ramírez','2234001122','sofia.ramirez@gmail.com','Independencia 321','Argentina','1995-06-30','2026-05-29 08:48:30',1),(8,'DNI','29999111','Federico','López','2235778899','fede.lopez@gmail.com','Moreno 555','Argentina','1987-12-05','2026-05-29 08:48:30',1),(9,'DNI','41222333','María','Pérez','2236001111','maria.perez@gmail.com','Av. Luro 123','Argentina','1993-04-15','2026-05-29 08:48:31',1),(10,'DNI','39888777','Tomás','Gómez','2236112222','tomas.gomez@gmail.com','Brown 456','Argentina','2001-09-10','2026-05-29 08:48:31',1),(11,'PASAPORTE','CL778899','Camila','Rojas','2236223333','camila.rojas@gmail.com','Santiago Centro','Chile','1995-12-01','2026-05-29 08:48:31',1),(12,'DNI','35555111','Valentina','Suárez','2236334444','valentina.s@gmail.com','Falucho 789','Argentina','1998-07-21','2026-05-29 08:48:31',1),(13,'DNI','22708446','Sergio','Genevrino','02235328067','sergio@gmail.com',NULL,'Argentina',NULL,'2026-07-11 19:40:48',1),(14,'DNI','55200400','Lucio','Genevrino','02235328067','lucio@gmail.com',NULL,NULL,NULL,'2026-07-12 12:32:21',1),(15,'DNI','55200401','Sebastian','Genevrino','02235328067','sebas@gmail.com',NULL,NULL,NULL,'2026-07-12 12:33:20',1);
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
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `estado` enum('PENDIENTE','EN_PROCESO','FINALIZADA','CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `habitacion_id` (`habitacion_id`),
  CONSTRAINT `limpieza_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `limpieza`
--

LOCK TABLES `limpieza` WRITE;
/*!40000 ALTER TABLE `limpieza` DISABLE KEYS */;
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
  `descripcion` text NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `estado` enum('PENDIENTE','EN_PROCESO','FINALIZADO','CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `habitacion_id` (`habitacion_id`),
  CONSTRAINT `mantenimiento_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mantenimiento`
--

LOCK TABLES `mantenimiento` WRITE;
/*!40000 ALTER TABLE `mantenimiento` DISABLE KEYS */;
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
  `metodo_pago` enum('EFECTIVO','TARJETA','TRANSFERENCIA','MERCADO_PAGO') NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
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

-- Dump completed on 2026-07-15 20:27:23

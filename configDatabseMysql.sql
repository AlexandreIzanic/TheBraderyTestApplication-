-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sql_thebradery
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `amount_total` decimal(10,2) DEFAULT '0.00',
  `status` varchar(50) DEFAULT 'Pending',
  `stripe_session_id` varchar(255) DEFAULT NULL,
  `order_desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (26,NULL,NULL,'2023-11-13 12:36:43',0.00,'Pending','cs_test_b1yoLPGNqPainhqaz6EleCp2dgwYocMW6o9y3S376aE4QeqxJTc2Niq1qm',NULL),(27,'alexandre.izanic@gmail.com','22 Rue de l\'aulne, Ormoy, 75001, FR','2023-11-13 12:38:20',454.96,'Pending','cs_test_b1GR1J59bVJwlBp1OXjHdTk2zQUL6kFcWwLAYGV1Km06CeblK72QsjZWi9','ID: 5, Name: Robe d\'Été, Price: 29.99, Quantity: 1\nID: 6, Name: Cravate en Soie, Price: 24.99, Quantity: 1\nID: 4, Name: Veste en Cuir, Price: 199.99, Quantity: 2');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `inventory` int NOT NULL,
  `stripe_product_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'T-shirt Blanc',19.99,95,'prod_Ozd69poEdURrma'),(2,'Jean Slim Noir',49.99,73,'prod_OzdAXNkHwHEf9m'),(3,'Chaussures de Sport',89.99,47,'prod_OzdA4Fxro00ehM'),(4,'Veste en Cuir',199.99,20,'prod_OzdBQRTW8D49F4'),(5,'Robe d\'Été',29.99,56,'prod_OzdCgoqjRYs42E'),(6,'Cravate en Soie',24.99,38,'prod_OzdDbvGAZwYqNp'),(7,'Sac à Main',59.99,24,'prod_OzdFyCrLl0QtxW'),(8,'Chapeau Panama',34.99,20,'prod_OzdF2b6XzCXqns'),(9,'Écharpe en Laine',29.99,45,'prod_OzdGFSVf5qcYZA'),(10,'Ceinture en Cuir',39.99,70,'prod_OzdHtURHo3JPJo'),(11,'Montre Classique',149.99,0,'prod_OzdHO7K3Sz4NSR'),(12,'Bottes en Cuir',99.99,40,'prod_OzdIg6FANtqLn0'),(13,'Lunettes de Soleil',79.99,50,'prod_OzdJmohLhLGG3S'),(14,'Chemise à Carreaux',44.99,55,'prod_OzdJYKOCTylUG8'),(15,'Pull-over Gris',64.99,35,'prod_OzdKFxctoT9fcg'),(16,'Short en Jean',39.99,60,'prod_OzdKcTfZxfDDAV'),(17,'Sandales d\'Été',49.99,40,'prod_OzdLE68QUn8r9y'),(18,'Bijoux Fantaisie',14.99,85,'prod_OzdMABpBNgEpBz'),(19,'Pantalon Chino',54.99,50,'prod_OzdMOpQAltfdZj'),(20,'Blouse Florale',39.99,40,'prod_OzdNI3ZojAVTTe');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sql_thebradery'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13 16:04:54

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) DEFAULT NULL,
  `over_head_costs` decimal(10,2) NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;

INSERT INTO `departments` (`department_id`, `department_name`, `over_head_costs`)
VALUES
	(1,'Dog Food',500232.00),
	(2,'Cat Supplies',32422.00),
	(3,'Cat Food',454344.00),
	(4,'Fish & Aquatic Pets',23243.00),
	(5,'Birds',877543.00),
	(6,'Bird Accessories',5400.00);

/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `items_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(10) DEFAULT NULL,
  `product_sales` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`items_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`items_id`, `product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES
	(1,'AvoDerm','Dog Food',31.50,655,0.00),
	(2,'Beggin\' Strips','Dog Food',49.30,325,0.00),
	(3,'Beneful','Dog Food',42.50,652,0.00),
	(4,'Bonio','Dog Food',25.00,34,0.00),
	(5,'Dog Chow','Dog Food',45.00,124,0.00),
	(6,'9Lives','Cat Food',40.50,34,0.00),
	(7,'AvoDerm','Cat Food',57.40,124,0.00),
	(8,'Essential Foods','Cat Food',57.50,365,0.00),
	(9,'Eukanuba','Cat Food',36.50,564,0.00),
	(10,'Fancy Feast','Cat Food',46.50,734,0.00),
	(11,'Felix','Cat Food',64.50,235,0.00),
	(12,'Freshpet','Cat Food',50.60,376,0.00),
	(13,'Friskies','Cat Food',65.30,476,0.00),
	(14,'Iams','Cat Food',24.30,365,0.00),
	(15,'Meow Mix','Cat Food',64.20,132,0.00),
	(16,'Nature\'s Variety','Cat Food',34.50,100,0.00),
	(17,'Royal Canin ','Cat Food',46.50,54,0.00),
	(18,'Sheba','Cat Food',45.00,333,0.00),
	(19,'Bowls','Cat Supplies',20.99,34,0.00),
	(20,'Litter Box','Cat Supplies',80.00,56,0.00),
	(21,'Kitty Litter','Cat Supplies',34.00,23,0.00),
	(22,'Collar','Cat Supplies',20.00,56,0.00),
	(23,'Nail clippers','Cat Supplies',25.00,32,0.00),
	(24,'Fish Food','Fish & Aquatic Pets',57.40,365,0.00),
	(25,'Feeding Accessories kit','Fish & Aquatic Pets',57.50,564,0.00),
	(26,'Aquarium','Fish & Aquatic Pets',36.50,734,0.00),
	(27,'DŽcor','Fish & Aquatic Pets',46.50,235,0.00),
	(28,'Sand & Gravel','Fish & Aquatic Pets',64.50,376,0.00),
	(29,'Water Heaters','Fish & Aquatic Pets',50.60,476,0.00);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



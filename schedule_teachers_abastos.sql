

CREATE TABLE `classrooms` (
  `name` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `state` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


INSERT INTO classrooms VALUES
("201","desc","perfect","1"),
("204","desc","perfect","1"),
("205","desc","perfect","1"),
("206","desc","perfect","1"),
("207","desc","perfect","1"),
("208","desc","perfect","1"),
("209","desc","perfect","1");




CREATE TABLE `events` (
  `username` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL,
  `orderId` tinyint(4) NOT NULL,
  `year` date NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `selectedDay` date NOT NULL,
  `classRoomName` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`orderId`,`year`,`selectedDay`,`classRoomName`),
  KEY `username` (`username`),
  KEY `classRoomName` (`classRoomName`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`orderId`, `year`) REFERENCES `schedules` (`orderId`, `year`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `events_ibfk_3` FOREIGN KEY (`classRoomName`) REFERENCES `classrooms` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


INSERT INTO events VALUES
("teste","1","2019-02-02","test","2020-02-13","205"),
("teste","1","2019-02-02","Test","2020-02-16","205"),
("jofaval","1","2019-02-02","wegwe","2020-02-21","205"),
("jofaval","2","2019-02-02","wegewgwegw","2020-02-04","205"),
("teste","2","2019-02-02","Test","2020-02-10","205"),
("teste","2","2019-02-02","Test","2020-02-10","207"),
("teste","2","2019-02-02","Test","2020-02-12","205"),
("jofaval","3","2019-02-02","prueba","2020-02-12","205"),
("jofaval","3","2019-02-02","Escogido","2020-02-14","205"),
("jofaval","4","2019-02-02","clase de pi ano","2020-02-24","205"),
("jofaval","7","2019-02-02","wehwehwe","2020-02-12","205");




CREATE TABLE `nonworkweeklydays` (
  `nonWorkDay` int(11) NOT NULL,
  `year` date NOT NULL,
  PRIMARY KEY (`nonWorkDay`,`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;






CREATE TABLE `schedules` (
  `orderId` tinyint(4) NOT NULL,
  `startHour` varchar(5) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `endHour` varchar(5) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `year` date NOT NULL,
  PRIMARY KEY (`orderId`,`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


INSERT INTO schedules VALUES
("1","7:55","8:50","2019-02-02"),
("2","8:50","9:45","2019-02-02"),
("3","9:45","10:40","2019-02-02"),
("4","11:00","11:55","2019-02-02"),
("5","11:55","12:50","2019-02-02"),
("6","12:50","13:45","2019-02-02"),
("7","14:05","15:00","2019-02-02"),
("8","15:00","15:55","2019-02-02"),
("9","15:55","16:50","2019-02-02"),
("10","16:50","17:45","2019-02-02"),
("11","18:05","19:00","2019-02-02"),
("12","19:00","19:55","2019-02-02"),
("13","19:55","20:50","2019-02-02"),
("14","20:50","21:10","2019-02-02"),
("15","21:10","22:05","2019-02-02");




CREATE TABLE `specialdays` (
  `specialDay` date NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`specialDay`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


INSERT INTO specialdays VALUES
("2020-02-23","0"),
("2020-10-09","1"),
("2020-12-29","2");




CREATE TABLE `users` (
  `username` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fullname` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `type` tinyint(4) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`username`),
  UNIQUE KEY `ui_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


INSERT INTO users VALUES
("jofaval","Pepe Fabra","$2a$09$esternocleidomastoideetywGL9Sf5TXyFHwilEcX5OTB5tlZG6e","./img_usuarios/bg2.jpg","3","jofaval","1"),
("jofaval2","Pepe Fabra","$2a$09$esternocleidomastoideetywGL9Sf5TXyFHwilEcX5OTB5tlZG6e","./img_usuarios/1581777008_blurred-tulips - copia.jpeg","1","jofaval2","1"),
("newUser","Pepe Fabra","$2a$09$esternocleidomastoideetywGL9Sf5TXyFHwilEcX5OTB5tlZG6e","./img_usuarios/1581778987_blurred-tulips - copia.jpeg","1","newTest","1"),
("teste","Pepe Fabra","$2a$09$esternocleidomastoideetywGL9Sf5TXyFHwilEcX5OTB5tlZG6e","test.jph","3","teste@iesabastos.org","1"),
("wehwehwehwe","ewghweghwehwehweh","$2a$09$esternocleidomastoideeTA.ozyFa9xjzxkCo6VpXsNb2J2HdHt.","./img_usuarios/blurred-tulips.jpg","1","wehwehwehwh","1");



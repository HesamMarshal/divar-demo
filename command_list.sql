CREATE DATABASE IF NOT EXISTS  world;
-- DROP DATABASE IF EXIST world;

-- CREATE DATABASE IF NOT EXISTS db1 DEFAULT CHARACTER SET utf8mb4;
CREATE DATABASE IF NOT EXISTS db2_english DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE DATABASE IF NOT EXISTS db2_persian DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;
-- CREATE DATABASE IF NOT EXISTS db2_mixed DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci; -- Good for persian and english mixed databases



-- Tables
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user(
id INT PRIMARY KEY AUTO_INCREMENT,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
bio TEXT
);

DROP TABLE IF EXISTS city;
CREATE TABLE IF NOT EXISTS city(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL DEFAULT 'city_name'
);

DROP TABLE IF EXISTS student;
CREATE TABLE student(
    id INT PRIMARY KEY AUTO_INCREMENT,
    national_code VARCHAR(10) UNIQUE NOT NULL,
    age INT NOT NULL DEFAULT 18,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK(age>=18)
);

-- Insert

INSERT INTO user(firstname, lastname, bio) 
VALUES ("Hesam", "Akrami", "test");


INSERT INTO user(firstname, lastname, bio) 
VALUES 
  ("Sohrab", "Rostami", "test"),
  ("Rostam", "Zali", "test"),
  ("Milad", "Alaki", "test"),
  ("FArid", "Haghdan", "test");


UPDATE db1.`user` 
SET firstname = "Mahta", lastname = "Shokooh"
WHERE id = 3;


DELETE FROM db1.`user`
WHERE id=5



ALTER TABLE db1.`user`
ADD age INT DEFAULT 18, Add city VARCHAR(30), ADD balance INT DEFAULT 0;


INSERT INTO db1.`user`
(firstname, lastname, bio, age, balance, city)
VALUES
("Hesam", "Akrami", "some text", 40, 0,"Shiraz"),
('John', 'Doe', 'Bio of John Doe', 25, 1000.50, 'New York'),
('Jane', 'Smith', 'Bio of Jane Smith', 30, 1500.75, 'Los Angeles'),
('Alice', 'Johnson', 'Bio of Alice Johnson', 28, 2000.00, 'Chicago'),
('Bob', 'Brown', 'Bio of Bob Brown', 35, 2500.25, 'Houston'),
('Charlie', 'Davis', 'Bio of Charlie Davis', 22, 3000.50, 'Phoenix'),
('David', 'Wilson', 'Bio of David Wilson', 27, 3500.75, 'Philadelphia'),
('Eve', 'Taylor', 'Bio of Eve Taylor', 32, 4000.00, 'San Antonio'),
('Frank', 'Anderson', 'Bio of Frank Anderson', 29, 4500.25, 'San Diego'),
('Grace', 'Thomas', 'Bio of Grace Thomas', 26, 5000.50, 'Dallas'),
('Hank', 'Moore', 'Bio of Hank Moore', 31, 5500.75, 'San Jose'),
('Ivy', 'Martin', 'Bio of Ivy Martin', 24, 6000.00, 'Austin'),
('Jack', 'Lee', 'Bio of Jack Lee', 33, 6500.25, 'Jacksonville'),
('Karen', 'Perez', 'Bio of Karen Perez', 21, 7000.50, 'Fort Worth'),
('Leo', 'White', 'Bio of Leo White', 34, 7500.75, 'Columbus'),
('Mia', 'Harris', 'Bio of Mia Harris', 23, 8000.00, 'Charlotte'),
('Nina', 'Clark', 'Bio of Nina Clark', 36, 8500.25, 'San Francisco'),
('Oscar', 'Lewis', 'Bio of Oscar Lewis', 20, 9000.50, 'Indianapolis'),
('Paul', 'Walker', 'Bio of Paul Walker', 37, 9500.75, 'Seattle'),
('Quinn', 'Hall', 'Bio of Quinn Hall', 38, 10000.00, 'Denver'),
('Rose', 'Allen', 'Bio of Rose Allen', 39, 10500.25, 'Washington'),
('Sam', 'Young', 'Bio of Sam Young', 40, 11000.50, 'Boston'),
('Tina', 'King', 'Bio of Tina King', 41, 11500.75, 'El Paso'),
('Uma', 'Scott', 'Bio of Uma Scott', 42, 12000.00, 'Detroit'),
('Vince', 'Green', 'Bio of Vince Green', 43, 12500.25, 'Nashville'),
('Wendy', 'Adams', 'Bio of Wendy Adams', 44, 13000.50, 'Memphis'),
('Xander', 'Baker', 'Bio of Xander Baker', 45, 13500.75, 'Portland'),
('Yara', 'Gonzalez', 'Bio of Yara Gonzalez', 46, 14000.00, 'Oklahoma City'),
('Zane', 'Carter', 'Bio of Zane Carter', 47, 14500.25, 'Las Vegas'),
('Amy', 'Mitchell', 'Bio of Amy Mitchell', 48, 15000.50, 'Louisville'),
('Brian', 'Roberts', 'Bio of Brian Roberts', 49, 15500.75, 'Baltimore');

DELETE FROM db1.`user` WHERE id <9


SELECT * FROM `user`
WHERE age >25 
ORDER BY firstname DESC;


SELECT * FROM `user`
WHERE firstname LIKE 'J%'  -- J%n  %n   %n% %_n_%
;


SELECT * FROM `user`
WHERE age BETWEEN 25 and 30
ORDER BY age DESC
;


SELECT * FROM `user`
WHERE age in ( 25, 26,27 , 45)
ORDER BY age DESC
;


SELECT * FROM `user`
WHERE age in ( SELECT age FROM user where age >25 and age <32)
ORDER BY age DESC
;

SELECT * FROM `user`
WHERE age = any ( SELECT age FROM Student)
ORDER BY age DESC
;

 
SELECT * FROM `user`
WHERE age > ALL ( SELECT age FROM Student)
ORDER BY age DESC
;

SELECT firstname, lastname, balance + IFNULL(age,2) FROM `user`
ORDER BY age DESC
;

SELECT firstname, lastname,balance ,age, balance + COALESCE(age,2) FROM `user`
ORDER BY age 
;


-- Pagination
SELECT * FROM `user`
ORDER BY id
LIMIT 3
OFFSET 6
;


-- ENUM
CREATE TABLE IF NOT EXISTS ticket (
id INT PRIMARY KEY auto_increment,
title VARCHAR(50) NOT NULL ,
description TEXT NOT NULL,
priority ENUM ('Low', 'Medium','High') NOT NULL
);

INSERT INTO db1.ticket (title, description, priority)
VALUES ("Node JS", "about update of course", "21");



-- SET
CREATE TABLE IF NOT EXISTS student_course (
id INT PRIMARY KEY auto_increment,
course_list SET ("Node js", "Nest JS" , "PHP", "Python")
);





INSERT INTO db1.student_course(course_list)
VALUES 
("Node js,Node js,PHP"),
("Node js,PHP,Python,PHP,Golang");



-- TRUNCATE Delete rows and start auto increment from 1
TRUNCATE TABLE db1.student_course;

INSERT INTO db1.student_course(course_list)
VALUES 
("Node js,Node js,PHP"),
("Node js,PHP,Python,PHP,Golang");



-- index

CREATE TABLE contacts (
id INT PRIMARY KEY auto_increment,
fullname VARCHAR(100),
mobile VARCHAR(20),
INDEX (fullname, mobile)
)



-- Index after create the table
CREATE TABLE IF NOT EXISTS contacts (
id INT PRIMARY KEY auto_increment,
fullname VARCHAR(100),
mobile VARCHAR(20),
);


CREATE INDEX IF NOT EXISTS Inx_fullname ON db1.contacts (fullname);
CREATE INDEX IF NOT EXISTS Inx_mobile ON db1.contacts (mobile);

-- DROP INDEX
DROP INDEX IF EXISTS Inx_fullname ON db1.contacts ;


-- Triger
CREATE TRIGGER IF NOT EXISTS before_insert_user BEFORE INSERT ON db1.`user`
 FOR EACH ROW
BEGIN
  IF ISNULL(NEW.city) THEN SET NEW.CITY = "Tehran";
  END IF;
END;


INSERT INTO db1.`user`
(firstname, lastname, bio, age, balance )
VALUES
("Hesam", "Akrami5", "some text", 40, 0);



-- after insert
CREATE TRIGGER IF NOT EXISTS aftter_insert_student AFTER INSERT ON db1.student
FOR EACH ROW
BEGIN
  INSERT INTO db1.student (national_code,age,crearted_at)
  VALUES (New.id, new.age, CURRENT_TIMESTAMP());
END;

INSERT INTO db1.`user`
(firstname, lastname, bio, age, balance )
VALUES
("Mina", "Ramazani", "some text", 40, 0);




-- Triger on Update
CREATE TRIGGER IF NOT EXISTS after_update_user AFTER UPDATE ON db1.`user`
FOR EACH ROW
BEGIN
  IF (NEW.age > OLD.age *2 ) THEN 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'The new age is too old';
  END IF;
END;


-- Realations

CREATE TABLE IF NOT EXISTS user2(
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Profile(
  id INT PRIMARY KEY AUTO_INCREMENT,
  age INT,
  bio TEXT, 
  image VARCHAR(50) DEFAULT 'default.png',
  bg_image VARCHAR(150),
  city VARCHAR(30),
  userId INT NOT NULL UNIQUE,
  FOREIGN KEY (userId)  REFERENCES user2(id )
);





-- inner Join
-- Left Inner Join 
-- Right Inner Join
-- Full outer Join






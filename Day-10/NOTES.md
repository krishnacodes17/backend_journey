# Day-10: SQL Database - Comprehensive Notes

## 1. INTRODUCTION TO DATABASES

### What is a Database?
- Organized collection of structured data stored and accessed electronically
- Managed by a Database Management System (DBMS)
- Used to store, retrieve, and manage large amounts of data efficiently
- Provides security, consistency, and reliability
- Can be accessed by multiple users simultaneously

### Need for Databases
✓ Centralized data storage
✓ Quick retrieval of specific data
✓ Data integrity and consistency
✓ Multi-user access with security
✓ Backup and recovery capabilities
✓ Data can be easily updated and modified

---

## 2. TYPES OF DATABASES

### A. Relational Databases (RDBMS)
**Definition:** Data organized in tables (rows and columns)

**Characteristics:**
- Uses Structured Query Language (SQL)
- Data in tables with relationships
- ACID properties (Atomicity, Consistency, Isolation, Durability)
- Primary keys and foreign keys
- Enforces data integrity

**Popular RDBMS:**
- **MySQL**: Open-source, easy to use, widely supported
- **PostgreSQL**: Advanced, open-source, powerful features
- **SQL Server**: Microsoft's enterprise database
- **Oracle**: Enterprise-level database
- **MariaDB**: MySQL fork with additional features
- **SQLite**: Lightweight, file-based database

**When to use:**
- Structured data with clear relationships
- Complex queries needed
- ACID compliance required
- Transactional systems

### B. Non-Relational Databases (NoSQL)

#### Document Database (MongoDB, CouchDB)
- Stores data in JSON/BSON documents
- Flexible schema
- Good for hierarchical data

#### Key-Value Database (Redis, Memcached)
- Simple key-value pairs
- Fast retrieval
- Used for caching

#### Graph Database (Neo4j)
- Stores data as nodes and relationships
- Excellent for social networks
- Complex relationship queries

#### Column-Family Database (Cassandra, HBase)
- Data organized by columns
- High scalability
- Good for time-series data

**When to use NoSQL:**
- Unstructured or semi-structured data
- High scalability needed
- Flexible schema required
- Real-time data processing

---

## 3. SQL DATABASE FUNDAMENTALS

### Core Concepts

#### Table
- Collection of rows and columns
- Each row represents a record
- Each column represents a field

#### Row/Record
- Single instance of data
- Contains values for all columns

#### Column/Field
- Named attribute of data
- Has a specific data type

#### Schema
- Structure of database and tables
- Defines columns, data types, constraints

---

## 4. SQL COMMAND TYPES

### A. Data Definition Language (DDL)
Commands for defining and modifying database structure

#### CREATE
```sql
-- Create Database
CREATE DATABASE database_name;

-- Create Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT CHECK (age >= 18),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### ALTER
```sql
-- Add Column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Modify Column
ALTER TABLE users MODIFY COLUMN age INT NOT NULL;

-- Drop Column
ALTER TABLE users DROP COLUMN phone;

-- Add Constraint
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email);
```

#### DROP
```sql
-- Drop Table
DROP TABLE users;

-- Drop Database
DROP DATABASE database_name;

-- Drop Column
ALTER TABLE users DROP COLUMN email;
```

### B. Data Manipulation Language (DML)
Commands for modifying data in tables

#### INSERT
```sql
-- Insert single record
INSERT INTO users (username, email, age) 
VALUES ('john_doe', 'john@example.com', 25);

-- Insert multiple records
INSERT INTO users (username, email, age) 
VALUES 
    ('jane_doe', 'jane@example.com', 28),
    ('bob_smith', 'bob@example.com', 35);
```

#### UPDATE
```sql
-- Update specific record
UPDATE users 
SET age = 26 
WHERE username = 'john_doe';

-- Update multiple columns
UPDATE users 
SET age = 30, email = 'newemail@example.com' 
WHERE id = 1;

-- Update all records
UPDATE users SET age = 21;
```

#### DELETE
```sql
-- Delete specific record
DELETE FROM users WHERE username = 'john_doe';

-- Delete multiple records
DELETE FROM users WHERE age < 18;

-- Delete all records
DELETE FROM users;
```

### C. Data Query Language (DQL)
Commands for retrieving data

#### SELECT
```sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT username, email FROM users;

-- Select with alias
SELECT username AS 'User Name', email FROM users;

-- Select distinct values
SELECT DISTINCT age FROM users;
```

### D. Data Control Language (DCL)
Commands for controlling access and permissions

#### GRANT
```sql
-- Grant privileges to user
GRANT SELECT, INSERT ON database_name.* TO 'user'@'localhost';
GRANT ALL PRIVILEGES ON database_name.* TO 'admin'@'localhost';
```

#### REVOKE
```sql
-- Revoke privileges from user
REVOKE SELECT ON database_name.* FROM 'user'@'localhost';
REVOKE ALL PRIVILEGES ON database_name.* FROM 'admin'@'localhost';
```

### E. Transaction Control Language (TCL)
Commands for managing transactions

#### COMMIT
```sql
-- Save all changes permanently
COMMIT;
```

#### ROLLBACK
```sql
-- Undo changes to last commit point
ROLLBACK;

-- Example transaction
START TRANSACTION;
UPDATE users SET age = 30 WHERE id = 1;
UPDATE users SET age = 25 WHERE id = 2;
COMMIT;  -- Both updates are saved
```

#### SAVEPOINT
```sql
-- Create recovery point within transaction
SAVEPOINT point_1;
UPDATE users SET age = 35 WHERE id = 1;
ROLLBACK TO SAVEPOINT point_1;  -- Undo to savepoint
```

---

## 5. CONSTRAINTS & DATA INTEGRITY

### PRIMARY KEY
```sql
-- Unique identifier for each record
-- Cannot be NULL, must be unique
-- Only one per table

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(100)
);

-- Or add later
ALTER TABLE users ADD PRIMARY KEY (id);
```

**Properties:**
- Ensures uniqueness
- Automatically indexed
- Used for relationships
- Cannot contain NULL values

### FOREIGN KEY
```sql
-- Links to primary key in another table
-- Maintains referential integrity

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Or add later
ALTER TABLE orders 
ADD CONSTRAINT fk_user_id 
FOREIGN KEY (user_id) REFERENCES users(id);
```

**Properties:**
- Maintains data consistency
- Prevents orphaned records
- Can have multiple foreign keys
- Can reference same table (self-reference)

### UNIQUE CONSTRAINT
```sql
-- Ensures all values in column are unique
-- Can have multiple per table
-- Can accept NULL values

CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100) UNIQUE
);

-- Or add later
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email);
```

### CHECK CONSTRAINT
```sql
-- Validates data before insertion
-- Enforces business rules

CREATE TABLE users (
    id INT PRIMARY KEY,
    age INT CHECK (age >= 18 AND age <= 100),
    salary DECIMAL(10, 2) CHECK (salary > 0)
);

-- Or add later
ALTER TABLE users ADD CONSTRAINT age_check CHECK (age >= 18);
```

### DEFAULT VALUE
```sql
-- Provides default value if none specified

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    age INT DEFAULT 18
);

-- Update with default
INSERT INTO users (username) VALUES ('john');
-- status will be 'active', created_at will be current timestamp
```

### NOT NULL CONSTRAINT
```sql
-- Ensures column always has a value

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

---

## 6. SELECT STATEMENT & CLAUSES

### Basic SELECT
```sql
-- Select all data
SELECT * FROM users;

-- Select specific columns
SELECT id, username, email FROM users;

-- Select with column alias
SELECT username AS 'User Name', email AS 'Email Address' FROM users;
```

### WHERE Clause
```sql
-- Filter rows based on condition
SELECT * FROM users WHERE age > 18;

-- Multiple conditions
SELECT * FROM users WHERE age > 18 AND country = 'USA';
SELECT * FROM users WHERE age > 18 OR age < 13;

-- NOT operator
SELECT * FROM users WHERE NOT age = 18;

-- IN operator
SELECT * FROM users WHERE country IN ('USA', 'Canada', 'Mexico');

-- BETWEEN operator
SELECT * FROM users WHERE age BETWEEN 18 AND 65;

-- LIKE operator (pattern matching)
SELECT * FROM users WHERE username LIKE 'john%';  -- Starts with john
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- Ends with @gmail.com
SELECT * FROM users WHERE username LIKE '%doe%';  -- Contains doe
```

### GROUP BY Clause
```sql
-- Group rows that have same values
SELECT country, COUNT(*) as user_count 
FROM users 
GROUP BY country;

-- Multiple columns
SELECT age, country, COUNT(*) as count 
FROM users 
GROUP BY age, country;

-- With aggregate functions
SELECT department, AVG(salary) as avg_salary 
FROM employees 
GROUP BY department;
```

### HAVING Clause
```sql
-- Filter groups based on aggregate function result
-- Similar to WHERE but for grouped data

SELECT country, COUNT(*) as user_count 
FROM users 
GROUP BY country 
HAVING COUNT(*) > 5;

-- Multiple conditions
SELECT department, AVG(salary) as avg_salary 
FROM employees 
GROUP BY department 
HAVING AVG(salary) > 50000 AND COUNT(*) > 3;
```

### ORDER BY Clause
```sql
-- Sort results in ascending or descending order
-- ASC (default), DESC

-- Ascending (default)
SELECT * FROM users ORDER BY age;

-- Descending
SELECT * FROM users ORDER BY age DESC;

-- Multiple columns
SELECT * FROM users 
ORDER BY country ASC, age DESC;

-- With alias
SELECT username, age FROM users 
ORDER BY age DESC;
```

### LIMIT Clause
```sql
-- Restrict number of rows returned
SELECT * FROM users LIMIT 10;  -- First 10 rows

-- Limit with offset
SELECT * FROM users LIMIT 10 OFFSET 5;  -- 10 rows starting from 6th
SELECT * FROM users LIMIT 5, 10;  -- Equivalent syntax
```

### OFFSET Clause
```sql
-- Skip specified number of rows
-- Usually used with LIMIT for pagination

SELECT * FROM users 
LIMIT 10 OFFSET 20;  -- Skip first 20, return next 10 (rows 21-30)

-- Pagination example
-- Page 1: OFFSET 0 LIMIT 10
-- Page 2: OFFSET 10 LIMIT 10
-- Page 3: OFFSET 20 LIMIT 10
```

### DISTINCT Clause
```sql
-- Remove duplicate rows
SELECT DISTINCT country FROM users;

-- Multiple columns
SELECT DISTINCT country, age FROM users;

-- With COUNT
SELECT COUNT(DISTINCT country) FROM users;
```

---

## 7. AGGREGATE FUNCTIONS

### COUNT()
```sql
-- Count number of rows
SELECT COUNT(*) FROM users;
SELECT COUNT(id) FROM users;
SELECT COUNT(DISTINCT country) FROM users;
```

### SUM()
```sql
-- Sum of numeric values
SELECT SUM(salary) FROM employees;
SELECT SUM(amount) FROM orders WHERE year = 2024;
```

### AVG()
```sql
-- Average of numeric values
SELECT AVG(salary) FROM employees;
SELECT AVG(age) FROM users WHERE country = 'USA';
```

### MIN()
```sql
-- Minimum value
SELECT MIN(salary) FROM employees;
SELECT MIN(age) FROM users;
```

### MAX()
```sql
-- Maximum value
SELECT MAX(salary) FROM employees;
SELECT MAX(age) FROM users;
```

---

## 8. JOINS

### INNER JOIN
```sql
-- Returns matching records from both tables
SELECT users.username, orders.order_id 
FROM users 
INNER JOIN orders ON users.id = orders.user_id;
```

### LEFT JOIN
```sql
-- Returns all from left table + matching from right
SELECT users.username, orders.order_id 
FROM users 
LEFT JOIN orders ON users.id = orders.user_id;
```

### RIGHT JOIN
```sql
-- Returns all from right table + matching from left
SELECT users.username, orders.order_id 
FROM users 
RIGHT JOIN orders ON users.id = orders.user_id;
```

### FULL JOIN
```sql
-- Returns all from both tables
SELECT users.username, orders.order_id 
FROM users 
FULL OUTER JOIN orders ON users.id = orders.user_id;
```

---

## 9. DATABASE NORMALIZATION

### Purpose
- Eliminate data redundancy
- Improve data integrity
- Reduce anomalies in updates, insertions, deletions

### Normal Forms

#### First Normal Form (1NF)
- All attributes contain atomic (indivisible) values
- No repeating groups
- Each cell contains only one value

#### Second Normal Form (2NF)
- Meets 1NF
- All non-key attributes depend on entire primary key
- No partial dependencies

#### Third Normal Form (3NF)
- Meets 2NF
- No transitive dependencies
- Non-key attributes depend only on primary key

---

## 10. DATA TYPES IN MYSQL

### Numeric Types
```
INT - Integers from -2147483648 to 2147483647
BIGINT - Large integers
SMALLINT - Small integers
FLOAT - Single precision decimals
DOUBLE - Double precision decimals
DECIMAL(size, d) - Fixed precision decimals
```

### String Types
```
VARCHAR(size) - Variable length string
CHAR(size) - Fixed length string
TEXT - Large text data
BLOB - Binary large object
ENUM - One value from predefined list
```

### Date & Time Types
```
DATE - Format YYYY-MM-DD
TIME - Format HH:MM:SS
DATETIME - Format YYYY-MM-DD HH:MM:SS
TIMESTAMP - Seconds since 1970
YEAR - 4-digit year
```

---

## 11. INSTALLATION & SETUP

### Download MySQL
- Visit: https://dev.mysql.com/downloads/
- Choose appropriate version for your OS
- Windows: MySQL installer
- Mac: DMG archive
- Linux: YUM/APT packages

### Installation Steps
1. Download MySQL Community Edition
2. Run installer
3. Configure MySQL Server
4. Set port (default 3306)
5. Configure MySQL as service
6. Set root password
7. Apply configuration
8. Complete installation

### Verify Installation
```bash
mysql --version
mysql -u root -p
```

---

## 12. COMMON SQL PATTERNS

### Pagination
```sql
SELECT * FROM users 
LIMIT 10 OFFSET (page_number - 1) * 10;
```

### Find Duplicates
```sql
SELECT username, COUNT(*) as count 
FROM users 
GROUP BY username 
HAVING COUNT(*) > 1;
```

### Update with Condition
```sql
UPDATE users 
SET status = 'inactive' 
WHERE last_login < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### Backup Concept
```sql
-- Export data
mysqldump -u root -p database_name > backup.sql

-- Import data
mysql -u root -p database_name < backup.sql
```

---

## 13. BEST PRACTICES

✓ Use appropriate data types for columns
✓ Define primary keys for all tables
✓ Use foreign keys to maintain referential integrity
✓ Normalize database structure
✓ Create indexes on frequently searched columns
✓ Use transactions for related operations
✓ Implement proper backup strategy
✓ Use parameterized queries to prevent SQL injection
✓ Document table structure and relationships
✓ Regularly monitor and optimize queries
✓ Use meaningful column and table names
✓ Implement user roles and permissions
✓ Always validate and sanitize input data

---

## 14. QUICK REFERENCE

| Command | Purpose |
|---------|---------|
| CREATE | Create new database/table |
| ALTER | Modify existing table structure |
| DROP | Delete database/table |
| INSERT | Add new records |
| UPDATE | Modify existing records |
| DELETE | Remove records |
| SELECT | Retrieve data |
| WHERE | Filter rows |
| GROUP BY | Group rows by column(s) |
| HAVING | Filter groups |
| ORDER BY | Sort results |
| LIMIT | Limit number of rows |
| DISTINCT | Remove duplicates |
| JOIN | Combine tables |

---

## 15. PRACTICE EXERCISES

### Exercise 1: Create Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age >= 18),
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Exercise 2: Create Orders Table
```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Exercise 3: Insert Data
```sql
INSERT INTO users (username, email, age, country) VALUES
('john_doe', 'john@example.com', 25, 'USA'),
('jane_smith', 'jane@example.com', 30, 'Canada'),
('bob_wilson', 'bob@example.com', 35, 'USA');
```

### Exercise 4: Complex Query
```sql
SELECT users.username, COUNT(orders.order_id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.username
HAVING COUNT(orders.order_id) > 0
ORDER BY order_count DESC;
```

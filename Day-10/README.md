# Day-10: SQL Database - Quick Reference Guide

## What is a Database?
A **Database** is an organized collection of structured data that is stored and accessed electronically through a Database Management System (DBMS). It allows efficient storage, retrieval, and management of large amounts of data.

---

## Types of Databases

### 1. Relational Database (RDBMS)
- Uses **Structured Query Language (SQL)**
- Data organized in tables with rows and columns
- Maintains relationships between tables using keys
- Examples: MySQL, PostgreSQL, SQL Server, Oracle, MariaDB, SQLite

### 2. Non-Relational Database (NoSQL)
- **Document Database**: MongoDB, CouchDB (JSON-like documents)
- **Key-Value Database**: Redis, Memcached (fast retrieval)
- **Graph Database**: Neo4j (relationships and networks)
- **Column-Family**: Cassandra, HBase (scalability)

---

## SQL Command Types

### Data Definition Language (DDL)
Define and modify database structure
- **CREATE** - Create database/table
- **ALTER** - Modify table structure
- **DROP** - Delete database/table

### Data Manipulation Language (DML)
Modify data in tables
- **INSERT** - Add new records
- **UPDATE** - Modify existing records
- **DELETE** - Remove records

### Data Query Language (DQL)
Retrieve data
- **SELECT** - Query and retrieve data

### Data Control Language (DCL)
Control access and permissions
- **GRANT** - Give user privileges
- **REVOKE** - Remove user privileges

### Transaction Control Language (TCL)
Manage transactions
- **COMMIT** - Save changes permanently
- **ROLLBACK** - Undo changes
- **SAVEPOINT** - Recovery point in transaction

---

## Key Constraints & Concepts

| Concept | Purpose |
|---------|---------|
| **PRIMARY KEY** | Unique identifier for each record (NOT NULL, UNIQUE) |
| **FOREIGN KEY** | Links to primary key in another table (referential integrity) |
| **UNIQUE** | Ensures all values in column are unique |
| **CHECK** | Validates data before insertion |
| **NOT NULL** | Column must always have a value |
| **DEFAULT** | Provides default value if none specified |

---

## SQL Clauses

| Clause | Purpose |
|--------|---------|
| **WHERE** | Filter rows based on condition |
| **GROUP BY** | Group rows with same values |
| **HAVING** | Filter groups based on aggregate function |
| **ORDER BY** | Sort results (ASC/DESC) |
| **LIMIT** | Restrict number of rows returned |
| **OFFSET** | Skip specified number of rows |
| **DISTINCT** | Remove duplicate rows |

---

## Common Aggregate Functions

```sql
COUNT(*) - Count number of rows
SUM(column) - Sum of numeric values
AVG(column) - Average of numeric values
MIN(column) - Minimum value
MAX(column) - Maximum value
```

---

## Joins

```sql
INNER JOIN - Matching records from both tables
LEFT JOIN - All from left + matching from right
RIGHT JOIN - All from right + matching from left
FULL JOIN - All records from both tables
```

---

## Database Normalization

Process to eliminate data redundancy and improve integrity

- **1NF (First Normal Form)** - Atomic values, no repeating groups
- **2NF (Second Normal Form)** - Meets 1NF + no partial dependencies
- **3NF (Third Normal Form)** - Meets 2NF + no transitive dependencies

---

## MySQL Installation

### Download
Visit: https://dev.mysql.com/downloads/

### Installation Steps
1. Download MySQL Community Edition
2. Run installer
3. Configure MySQL Server (port: 3306)
4. Set root password
5. Apply configuration
6. Complete installation

### Verify Installation
```bash
mysql --version
mysql -u root -p
```

---

## Important Tips & Best Practices

✓ Always use appropriate data types for columns
✓ Define PRIMARY KEY for all tables
✓ Use FOREIGN KEY to maintain referential integrity
✓ Follow database normalization rules
✓ Use indexes on frequently searched columns
✓ Use transactions for related operations
✓ Implement proper backup strategy
✓ Use parameterized queries (prevent SQL injection)
✓ Validate and sanitize all input data
✓ Use meaningful table and column names
✓ Implement user roles and permissions
✓ Regular monitoring and query optimization

---

## File Reference

📄 **NOTES.md** - Complete detailed notes with examples and exercises
📄 **README.md** - Quick reference guide (this file)

---

## Quick Example: Create & Query Table

```sql
-- Create table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age >= 18),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (username, email, age) 
VALUES ('john_doe', 'john@example.com', 25);

-- Query data
SELECT * FROM users WHERE age > 18 ORDER BY created_at DESC;

-- Update data
UPDATE users SET age = 26 WHERE username = 'john_doe';

-- Delete data
DELETE FROM users WHERE username = 'john_doe';
```

---

## Next Steps
1. Download and install MySQL
2. Create your first database
3. Practice creating tables with constraints
4. Learn joins and complex queries
5. Practice data manipulation operations
6. Study optimization techniques

For detailed explanations and more examples, see **NOTES.md**



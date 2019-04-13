-- table: "products"

-- columns: 
-- 1. items_id (unique id for each product)
-- 2. product_name (Name of product)
-- 3. department_name
-- 4. price (cost to customer)
-- 5. stock_quantity (how much of the product is available in stores)


CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    items_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(10),
    product_sales DECIMAL(10, 2) DEFAULT 0.00
);

-- table departments
-- columns:
-- 1. department_id
-- 2. department_name
-- 3. over_head_costs (dummy number)

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100),
    over_head_costs DECIMAL(10, 2) NOT NULL
);
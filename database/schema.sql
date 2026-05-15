-- Database creation script for appdb
-- Run these commands in your PostgreSQL query tool (like pgAdmin or psql)

-- Create the database if it doesn't exist
-- CREATE DATABASE appdb;

-- Table structure for 'items' (Generic Template)
-- Note: Hibernate will create this automatically due to spring.jpa.hibernate.ddl-auto=update
-- But here is the SQL for reference or manual creation

CREATE TABLE IF NOT EXISTS items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(19, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO items (name, description, category, price, quantity, status) VALUES 
('Enterprise Laptop', 'High-performance laptop for developers', 'Electronics', 1500.00, 10, 'Active'),
('Wireless Mouse', 'Ergonomic wireless mouse', 'Accessories', 25.50, 50, 'Active'),
('Office Chair', 'Ergonomic office chair with lumbar support', 'Furniture', 299.99, 5, 'Active'),
('Monitor 27"', '4K UHD Monitor', 'Electronics', 450.00, 15, 'Active');

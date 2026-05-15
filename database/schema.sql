-- Database creation script for appdb
-- Run these commands in your PostgreSQL query tool (like pgAdmin or psql)

-- Create the database if it doesn't exist
-- CREATE DATABASE appdb;

-- Table structure for 'items' (Generic Template)
-- Note: Hibernate will create this automatically due to spring.jpa.hibernate.ddl-auto=update
-- But here is the SQL for reference or manual creation

CREATE TABLE IF NOT EXISTS tickets (
    id BIGSERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email TEXT,
    department VARCHAR(50),
    issueTitle VARCHAR(255) NOT NULL,
    issueDescription TEXT,
    priority VARCHAR(20) DEFAULT 'Low',
    status VARCHAR(30) DEFAULT 'OPEN',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO tickets (fullname, email, department, issueTitle, issueDescription, priority, status) VALUES 
('isaac', 'isaac@gmail.com', 'accounts', 'bursor', 'you are good to go', 'Low' , 'OPEN');

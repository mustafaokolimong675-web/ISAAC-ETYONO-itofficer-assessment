

CREATE TABLE IF NOT EXISTS tickets (
    id BIGSERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email TEXT,
    department VARCHAR(50),
    issueTitle VARCHAR(255) NOT NULL,
    issueDescription TEXT,
    priority VARCHAR(20) DEFAULT 'Low',
    status VARCHAR(30) DEFAULT 'open',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO tickets (fullname, email, department, issueTitle, issueDescription, priority, status) VALUES 
('isaac', 'isaac@gmail.com', 'accounts', 'bursor', 'you are good to go', 'Low' , 'OPEN');

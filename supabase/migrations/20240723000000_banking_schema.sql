-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    customer_number VARCHAR(20) UNIQUE NOT NULL,
    balance NUMERIC(18,2) DEFAULT 0,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Transaction Types Table
CREATE TABLE transaction_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    transaction_type_id INT REFERENCES transaction_types(id),
    description TEXT,
    amount NUMERIC(18,2) NOT NULL,
    performed_by VARCHAR(100),
    performed_on VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ATM Transactions Table
CREATE TABLE atm_transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    balance NUMERIC(18,2),
    banknote JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Loans Table
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(18,2) NOT NULL,
    late_fee NUMERIC(18,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User Loans Table
CREATE TABLE user_loans (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    loan_id INT REFERENCES loans(id) ON DELETE CASCADE,
    principal_amount NUMERIC(18,2),
    remaining_amount NUMERIC(18,2),
    installment_count INT,
    interest_amount NUMERIC(18,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Banks Table
CREATE TABLE banks (
    id SERIAL PRIMARY KEY,
    balance NUMERIC(18,2),
    banknote JSONB
);

-- Indexes and Constraints
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_user_loans_user_id ON user_loans(user_id);

-- Insert default transaction types
INSERT INTO transaction_types (name) VALUES 
('Transfer'),
('Deposit'),
('Withdrawal'),
('Payment'),
('Loan'),
('Interest');

-- Insert default bank record
INSERT INTO banks (balance, banknote) VALUES 
(1000000.00, '{"100": 1000, "50": 2000, "20": 5000, "10": 10000, "5": 20000, "1": 50000}');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transaction_types_updated_at BEFORE UPDATE ON transaction_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_atm_transactions_updated_at BEFORE UPDATE ON atm_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_loans_updated_at BEFORE UPDATE ON user_loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
CREATE TABLE IF NOT EXISTS tenant_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    amount DOUBLE NOT NULL,
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tenant_transactions (account_id, transaction_type, amount)
VALUES (1, 'INITIAL', 0.0);

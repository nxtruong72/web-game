DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_visited_at TIMESTAMP,
    ip_created VARCHAR(45),
    ip_visited VARCHAR(45),
    device_used_for_login VARCHAR(255),
    device_used_for_register VARCHAR(255),
    account_status VARCHAR(45) DEFAULT 'INACTIVATE'
);

CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_phone ON users(phone);

DROP TABLE IF EXISTS tokens;

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(512) NOT NULL UNIQUE,
    type VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    expire_at TIMESTAMP,
    used BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_token ON tokens(token);
ALTER TABLE tokens ADD CONSTRAINT fk_tokens_users FOREIGN KEY (user_id) REFERENCES users (id);
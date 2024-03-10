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
    roles VARCHAR(1024) NOT NULL,
    account_status VARCHAR(45) DEFAULT 'INACTIVATE'
);

CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_phone ON users(phone);
ALTER SEQUENCE users_id_seq MINVALUE 100 RESTART WITH 100 START WITH 100;

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

DROP TABLE IF EXISTS wallets;

CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    version INTEGER,
    balance NUMERIC(32,5) NOT NULL CHECK(balance >= 0),
    blocked_balance NUMERIC(32,5) NOT NULL CHECK(blocked_balance >= 0),
    reward NUMERIC(32,5) NOT NULL CHECK(reward >= 0),
    blocked_reward NUMERIC(32,5) NOT NULL CHECK(blocked_reward >= 0),
    user_id INTEGER NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE wallets ADD CONSTRAINT fk_wallet_users FOREIGN KEY (user_id) REFERENCES users (id);
CREATE INDEX user_id_wallets ON wallets(user_id);
ALTER SEQUENCE wallets_id_seq MINVALUE 100 RESTART WITH 100 START WITH 100;

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
     id SERIAL PRIMARY KEY,
     amount NUMERIC(32,5) NOT NULL CHECK ( amount > 0 ),
     transaction_status VARCHAR(45) DEFAULT 'PENDING' NOT NULL,
     transaction_type VARCHAR(45) NOT NULL,
     transaction_method VARCHAR(45) DEFAULT 'BANK' NOT NULL,
     notes VARCHAR(1024)  NOT NULL,
     wallet_id INTEGER NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE transactions ADD CONSTRAINT fk_transactions_wallets FOREIGN KEY (wallet_id) REFERENCES wallets (id);
CREATE INDEX wallet_id_transactions ON transactions(wallet_id);

CREATE TABLE games (
     id SERIAL PRIMARY KEY,
     name VARCHAR(1024) NOT NULL,
     game_status VARCHAR(45) DEFAULT 'PENDING' NOT NULL,
     team_one VARCHAR(255) NOT NULL,
     team_two VARCHAR(255) NOT NULL,
     game_types VARCHAR(1024) NOT NULL,
     total_bet BIGINT NOT NULL CHECK ( total_bet >= 0 ),
     profit NUMERIC(32,5) NOT NULL CHECK ( profit >= 0 ),
     stream_url VARCHAR(1024) NOT NULL,
     avatar_url VARCHAR(1024),
     plan_start_time TIMESTAMP,
     start_time TIMESTAMP,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rounds (
    id SERIAL PRIMARY KEY,
    team_win INTEGER NOT NULL CHECK ( team_win >= 0 ),
    round_status VARCHAR(45) DEFAULT 'START' NOT NULL,
    profit NUMERIC(32,5) NOT NULL CHECK ( profit >= 0 ),
    total_bet_team_one NUMERIC(32,5) NOT NULL CHECK ( total_bet_team_one >= 0 ),
    total_bet_team_two NUMERIC(32,5) NOT NULL CHECK ( total_bet_team_two >= 0 ),
    game_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE rounds ADD CONSTRAINT fk_rounds_games FOREIGN KEY (game_id) REFERENCES games (id);
CREATE INDEX game_id_rounds ON rounds(game_id);

CREATE TABLE bets (
    id SERIAL PRIMARY KEY,
    team_bet INTEGER NOT NULL CHECK ( team_bet > 0 ),
    bet_status VARCHAR(45) DEFAULT 'PENDING' NOT NULL,
    amount NUMERIC(32,5) NOT NULL CHECK ( amount > 0 ),
    round_id INTEGER NOT NULL,
    wallet_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE bets ADD CONSTRAINT fk_bets_rounds FOREIGN KEY (round_id) REFERENCES rounds (id);
ALTER TABLE bets ADD CONSTRAINT fk_bets_wallets FOREIGN KEY (wallet_id) REFERENCES wallets (id);

CREATE INDEX round_id_bets ON bets(round_id);
CREATE INDEX wallet_id_bets ON bets(wallet_id);
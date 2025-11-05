CREATE TABLE IF NOT EXISTS users (
    id varchar(46) PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(20) DEFAULT 'User' CHECK(role IN ('User', 'Admin')),
    status varchar(20) DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Deleted')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id varchar(46) PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role enum ('User', 'Admin') DEFAULT 'User',
    status enum('Active', 'Inactive', 'Deleted') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
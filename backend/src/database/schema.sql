CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(255) not null,
    email varchar(255) UNIQUE not null,
    hash_password varchar(500) not null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ebooks(
    book_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_title varchar(255) not null,
    cover_image_url varchar(500),
    description text,
    user_id uuid NOT NULL REFERENCES users(user_id) on DELETE CASCADE,
    cover_image_key varchar(100),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chapters(
    chapter_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_title varchar(200) not null,
    chapter_number int,
    chapter_content text,
    book_id uuid NOT NULL REFERENCES ebooks(book_id) on DELETE CASCADE,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP 
);

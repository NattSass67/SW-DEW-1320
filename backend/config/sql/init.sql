CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),  -- Use a UUID generator function
    name VARCHAR(100) NOT NULL,
    telephone VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS dentists (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    experience INTEGER NOT NULL,
    expertise VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(36) REFERENCES users(id),
    dentist_id VARCHAR(36) REFERENCES dentists(id),
    booking_date DATE NOT NULL
);

INSERT INTO
    dentists (name, experience, expertise)
VALUES
    ('Dentist 1', 5, 'General Dentistry'),
    ('Dentist 2', 8, 'Orthodontics'),
    ('Dentist 3', 10, 'Pediatric Dentistry'),
    ('Dentist 4', 6, 'Endodontics'),
    ('Dentist 5', 7, 'Periodontics'),
    ('Dentist 6', 9, 'Oral Surgery'),
    ('Dentist 7', 4, 'Prosthodontics'),
    ('Dentist 8', 12, 'Orthodontics'),
    ('Dentist 9', 11, 'Endodontics'),
    ('Dentist 10', 8, 'General Dentistry');

INSERT INTO
    users (name, telephone, email, password, is_admin)
VALUES
    (
        'Admin',
        '000-0000000',
        'admin@admin.com',
        '$2b$10$Y0iyEsgzHy8oLuFp5aZsZup9a2pGZQKmXdRgfa24ACByToFmwvf5W',
        TRUE
    );
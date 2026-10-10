
CREATE DATABASE IF NOT EXISTS studenthub
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE studenthub;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    mobile CHAR(10) NOT NULL,
    idno VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    course ENUM('cse', 'ce', 'it') NOT NULL,
    study_year TINYINT UNSIGNED NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_students_email UNIQUE (email),
    CONSTRAINT uq_students_idno UNIQUE (idno),
    CONSTRAINT chk_students_year
        CHECK (study_year BETWEEN 1 AND 4)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    category VARCHAR(40) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_events_date (event_date),
    INDEX idx_events_category (category)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS registrations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    event_id BIGINT UNSIGNED NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_student_event
        UNIQUE (student_id, event_id),

    CONSTRAINT fk_registrations_student
        FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_registrations_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_registrations_event (event_id)
) ENGINE=InnoDB;

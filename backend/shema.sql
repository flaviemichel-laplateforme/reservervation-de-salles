============================================================
-- SCRIPT D'INITIALISATION DE LA BASE DE DONNÉES : TECHSPACE
-- Date : 2026-02-09
-- ============================================================

-- 1. CRÉATION DE LA BASE DE DONNÉES
-- On supprime l'ancienne si elle existe pour repartir de zéro (DEV ONLY)
DROP DATABASE IF EXISTS techspace_db;

CREATE DATABASE techspace_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE techspace_db;

-- ============================================================
-- 2. CRÉATION DES TABLES
-- ============================================================

-- Table : UTILISATEURS
CREATE TABLE UTILISATEURS (
id INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(50) NOT NULL,
prenom VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table : RESERVATIONS
CREATE TABLE RESERVATIONS (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
date_resa DATE NOT NULL,
heure_debut TIME NOT NULL,
heure_fin TIME NOT NULL,
objet VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- Contrainte de Clé Étrangère
CONSTRAINT fk_reservation_user
    FOREIGN KEY (user_id) 
    REFERENCES UTILISATEURS(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE

) ENGINE=InnoDB;

-- 
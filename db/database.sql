-- Create Pokemon table
CREATE TABLE Pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    front_default VARCHAR(255),
    type_name VARCHAR(255),
    type_slot INT
);

-- Insert dummy data into Pokemon table
INSERT INTO Pokemon (name, front_default, type_name, type_slot)
VALUES 
    ('Bulbasaur', 'bulbasaur.png', 'grass', 1),
    ('Charmander', 'charmander.png', 'fire', 1),
    ('Squirtle', 'squirtle.png', 'water', 1);

-- Create PokemonDetails table
CREATE TABLE PokemonDetails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    front_default VARCHAR(255),
    front_female VARCHAR(255),
    front_shiny VARCHAR(255),
    front_shiny_female VARCHAR(255),
    back_default VARCHAR(255),
    back_female VARCHAR(255),
    back_shiny VARCHAR(255),
    back_shiny_female VARCHAR(255),
    height FLOAT,
    weight FLOAT,
    species VARCHAR(255),
    order_num INT
);

-- Insert dummy data into PokemonDetails table
INSERT INTO PokemonDetails (name, front_default, height, weight, species, order_num)
VALUES 
    ('Bulbasaur', 'bulbasaur.png', 0.7, 6.9, 'Seed Pokémon', 1),
    ('Charmander', 'charmander.png', 0.6, 8.5, 'Lizard Pokémon', 4),
    ('Squirtle', 'squirtle.png', 0.5, 9, 'Tiny Turtle Pokémon', 7);

-- Create Team table
CREATE TABLE Team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert dummy data into Team table
INSERT INTO Team (name)
VALUES 
    ('Team Rocket'),
    ('Team Magma'),
    ('Team Aqua');

-- Create User table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data into User table
INSERT INTO "User" (name, email, password)
VALUES 
    ('Ash Ketchum', 'ash@example.com', 'pikachu123'),
    ('Misty Waterflower', 'misty@example.com', 'starmie456'),
    ('Brock Harrison', 'brock@example.com', 'geodude789');


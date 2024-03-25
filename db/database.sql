-- Create Pokemon table
CREATE TABLE Pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    base_experience INT,
    height FLOAT,
    order_num INT,
    species_name VARCHAR(255),
    sprites JSONB,
    weight FLOAT,
    abilities JSONB,
    forms JSONB,
    game_indices JSONB,
    held_items JSONB,
    is_default BOOLEAN,
    location_area_encounters VARCHAR(255),
    moves JSONB,
    past_types JSONB,
    stats JSONB,
    types JSONB
);

-- Insert dummy data into Pokemon table
INSERT INTO Pokemon (name, base_experience, height, order_num, species_name, sprites, weight, abilities, forms, game_indices, held_items, is_default, location_area_encounters, moves, past_types, stats, types)
VALUES
  ('Bulbasaur', 64, 0.7, 1, 'bulbasaur', '{"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}', 6.9, '[{"ability": "overgrow", "is_hidden": false, "slot": 1}]', '[{"name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon-form/1/"}]', '[{"game_index": 1, "version": {"name": "red"}}]', '[]', true, 'https://pokeapi.co/api/v2/pokemon/1/encounters', '[]', '[]', '[]', '[]'),
  ('Ivysaur', 142, 1, 2, 'ivysaur', '{"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"}', 13, '[{"ability": "overgrow", "is_hidden": false, "slot": 1}]', '[{"name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon-form/2/"}]', '[{"game_index": 9, "version": {"name": "red"}}]', '[]', true, 'https://pokeapi.co/api/v2/pokemon/2/encounters', '[]', '[]', '[]', '[]'),
  ('Charmander', 62, 0.6, 4, 'charmander', '{"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}', 8.5, '[{"ability": "blaze", "is_hidden": false, "slot": 1}]', '[{"name": "charmander", "url": "https://pokeapi.co/api/v2/pokemon-form/4/"}]', '[{"game_index": 5, "version": {"name": "red"}}]', '[]', true, 'https://pokeapi.co/api/v2/pokemon/4/encounters', '[]', '[]', '[]', '[]');
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


CREATE TABLE PokemonTeam (
    team_id INT,
    pokemon_id INT,
    PRIMARY KEY (team_id, pokemon_id),
    FOREIGN KEY (team_id) REFERENCES Team(id),
    FOREIGN KEY (pokemon_id) REFERENCES Pokemon(id)
);

INSERT INTO PokemonTeam (team_id, pokemon_id)
VALUES 
    (1, 1), -- Bulbasaur to Team Rocket
    (2, 2), -- Charmander to Team Magma
    (3, 3); -- Squirtle to Team Aqua
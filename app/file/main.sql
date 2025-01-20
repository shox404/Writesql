CREATE DATABASE project;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  username TEXT NONE
);

INSERT INTO users (username) VALUES 
  ('user1'),
  ('Oberon'),
  ('Amelia'),
  ('Morvenna'),
  ('Malachi'),
  ('Breccan'),
  ('Tivellas'),
  ('Elowyn'),
  ('Milo'),
  ('Riley'),
  ('Torrence');

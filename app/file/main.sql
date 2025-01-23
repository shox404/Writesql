CREATE DATABASE company;

CREATE TABLE staff (
  id BIGSERIAL PRIMARY KEY,
  'name' VARCHAR ,
  salary INTEGER 
);

INSERT INTO staff (name,salary) VALUES 
  ('Andrew', 1200),
  ('Arista', 1500),
  ('Sylindra', 1100);

CREATE TABLE position (
  id BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
  employee_id INTEGER NOT NULL,
  position_name VARCHAR 
);

INSERT INTO position (employee_id,position_name) VALUES 
  (1,'Kellan'),
  (2,'Geneva'),
  (3,'Velorinor');

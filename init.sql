DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS sources;

CREATE TABLE sources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  density_kg_m3 DOUBLE PRECISION,
  youngs_modulus_gpa DOUBLE PRECISION,
  compressive_strength_mpa DOUBLE PRECISION,
  tensile_strength_mpa DOUBLE PRECISION,
  carbon_footprint_kgco2e_per_kg DOUBLE PRECISION,
  biodegradable_natural BOOLEAN
);

ALTER TABLE materials
  ADD COLUMN source_id INT REFERENCES sources(id);


INSERT INTO sources (name) VALUES
('Typical textbook values (unverified)'),
('ICE Database'),
('Own testing');


INSERT INTO materials
(name, category, density_kg_m3, youngs_modulus_gpa, compressive_strength_mpa,
 tensile_strength_mpa, carbon_footprint_kgco2e_per_kg, biodegradable_natural, source_id)
VALUES
('Softwood (pine)', 'wood', 500, 10, 35, 80, NULL, true, 1),
('Bamboo', 'wood', 650, 15, 50, 150, NULL, true, 1),
('Cork', 'wood', 160, NULL, NULL, NULL, NULL, true, 1),
('Concrete (C30)', 'mineral', 2400, 30, 30, 3, 0.159, false, 1),
('Recycled steel', 'metal', 7850, 200, 250, 400, NULL, false, 1),
('Aluminium', 'metal', 2700, 70, 100, 150, NULL, false, 1),
('PET', 'plastic', 1380, 2.8, 80, 55, NULL, false, 1),
('PLA', 'bioplastic', 1240, 3.5, 80, 50, NULL, false, 1),
('Mycelium composite (hemp)', 'biomaterial', 200, 0.0012, 0.15, NULL, NULL, true, 1);
DROP DATABASE IF EXISTS review_this;

CREATE DATABASE review_this;

CREATE TABLE restaurant (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    name VARCHAR(75) NOT NULL,
    location VARCHAR(75) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurant (name, location, price_range) VALUES ('Domino Pizza', 'Berlin', 3) RETURNING id;
INSERT INTO restaurant (name, location, price_range) VALUES ('KFC', 'Stuttgart', 4) RETURNING id;
INSERT INTO restaurant (name, location, price_range) VALUES ('MacDonalds', 'Munich', 1) RETURNING id;
INSERT INTO restaurant (name, location, price_range) VALUES ('Asia Garden', 'Hamburg', 2) RETURNING id;
INSERT INTO restaurant (name, location, price_range) VALUES ('Rustico', 'Chemnitz', 4) RETURNING id;
INSERT INTO restaurant (name, location, price_range) VALUES ('Seven Oaks', 'Frankfurt', 5) RETURNING id;
INSERT INTO restaurant (name, location, price_range) VALUES ('Mamas and Papas', 'Rostock', 3) RETURNING id;
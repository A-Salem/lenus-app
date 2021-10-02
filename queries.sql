CREATE TABLE meal (
  id uuid PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  procedure_text VARCHAR ( 255 ) NOT NULL, 
  coach_owned boolean, 
  created_at TIMESTAMP NOT NULL
);

/* use gen_random_uuid() for generating uuid */
INSERT INTO meal (id, name, procedure_text, coach_owned, created_at)
VALUES ('1c58909d-fe7d-41d5-baff-71e4818e721a', 'test meal', 'test meal procedure', false, current_timestamp);


CREATE TABLE meal_i18n (
  id uuid NOT NULL,
  locale VARCHAR ( 255 ) NOT NULL,
  name VARCHAR ( 255 ) NOT NULL,
  procedure_text VARCHAR ( 255 ) NOT NULL, 
  coach_owned boolean, 
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY(id, locale),
  FOREIGN KEY (id) REFERENCES meal(id) ON DELETE CASCADE
);


INSERT INTO meal_i18n (id, locale, name, procedure_text, coach_owned, created_at)
VALUES ('1c58909d-fe7d-41d5-baff-71e4818e721a', 'da-DK', 'test meal i18n', 'test meal procedure i18n', false, current_timestamp);

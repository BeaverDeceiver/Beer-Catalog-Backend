INSERT INTO "roles" ("name") VALUES
('admin'),	/*1*/
('user' );  /*2*/

INSERT INTO "users" ("email", "first_name". "last_name", "password", "created_date") VALUES
('admin@gmail.com'   ,  'John', 'Doe', '$2b$10$QlBd4kNf8hX3qKHXqgcwu.jes8/cYb3Fz3LiFCTY/K6WZ8PcJE4cO', '2013-09-16'),
('user@gmail.com'    , 	'Jane', 'Doe', '$2b$10$DIzD1YvgZwlfAgzHTkNo/.Og8Ve6qBZH2uANLuXpF9.OKCrS3jjC2', '2019-09-20');

INSERT INTO "users_roles" ("user_id", "role_id") VALUES
(1  ,   1), /*admin*/
(2  ,   2); /*user*/
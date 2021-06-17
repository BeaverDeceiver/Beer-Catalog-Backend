INSERT INTO "roles" ("name") VALUES
('admin'),	/*1*/
('user' );  /*2*/

INSERT INTO "users" ("email", "password", "status", "last_login", "created_date") VALUES
('admin@gmail.com'   , '$2b$10$QlBd4kNf8hX3qKHXqgcwu.jes8/cYb3Fz3LiFCTY/K6WZ8PcJE4cO', 1,  '2013-09-16', '2013-09-16'),
('user@gmail.com'    , '$2b$10$DIzD1YvgZwlfAgzHTkNo/.Og8Ve6qBZH2uANLuXpF9.OKCrS3jjC2', 1,          NULL, '2019-09-20');

INSERT INTO "users_roles" ("user_id", "role_id") VALUES
(1  ,   1), /*admin*/
(2  ,   2), /*user*/
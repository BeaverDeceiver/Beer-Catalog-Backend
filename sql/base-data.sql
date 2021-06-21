INSERT INTO "roles" ("name") VALUES
('admin'),	/*1*/
('user' );  /*2*/

INSERT INTO "users" ("email", "first_name", "last_name", "password") VALUES
('admin@gmail.com'   ,  'John', 'Doe', '$2b$10$QlBd4kNf8hX3qKHXqgcwu.jes8/cYb3Fz3LiFCTY/K6WZ8PcJE4cO'),
('user@gmail.com'    , 	'Jane', 'Doe', '$2b$10$DIzD1YvgZwlfAgzHTkNo/.Og8Ve6qBZH2uANLuXpF9.OKCrS3jjC2');

INSERT INTO "users_info" ("user_id", "dob", "avatar_url") VALUES
(1	,	'1970-01-01', 	'https://www.hdnicewallpapers.com/Walls/Big/Rainbow/Rainbow_on_Mountain_HD_Image.jpg'),
(2	,	'1992-04-21',	'https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg');

INSERT INTO "users_roles" ("user_id", "role_id") VALUES
(1  ,   1), /*admin*/
(2  ,   2); /*user*/

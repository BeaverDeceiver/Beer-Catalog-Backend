/*
  'method': {
    'GET': 1,
    'POST': 2,
    'PUT': 4,
    'DELETE': 8
  }
*/

INSERT INTO "endpoints"(url) VALUES

('/'          ), 	/* 1 */
('/beer/\d'   ), 	/* 2 */
('/user/\d'   ), 	/* 3 */
('/favorites' );

INSERT INTO "endpoints_roles"(endpoint_id, role_id, permission_mask) VALUES

/* ADMIN */

(	1	,	1   ,   1 + 2 + 4 + 8	),	
(	2	,	1   ,   1 + 2 + 4 + 8	),	
(	3	,	1   ,   1 + 2 + 4 + 8	),	
(	4	,	1   ,   1 + 2 + 4 + 8	),

/* USER */

(	1	,	1   ,   1 ),
(	2	,	2   ,   1 ),
(	3	,	1   ,   1 + 2 + 4 ),	
(	3	,	1   ,   1 + 2 + 8 );
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
('/favorites' );  /* 4 */

INSERT INTO "endpoints_roles"(endpoint_id, role_id, permission_mask) VALUES

/* ADMIN */

(	1	,	1   ,   1 + 2 + 4 + 8	),	/* 1 */
(	2	,	1   ,   1 + 2 + 4 + 8	),	/* 2 */
(	3	,	1   ,   1 + 2 + 4 + 8	),	/* 3 */
(	4	,	1   ,   1 + 2 + 4 + 8	),  /* 4 */

/* USER */

(	1	,	2   ,   1 ),              /* 1 */
(	2	,	2   ,   1 ),              /* 2 */
(	3	,	2   ,   1 + 2 + 4 ),	    /* 3 */
(	4	,	2   ,   1 + 2 + 8 );      /* 4 */
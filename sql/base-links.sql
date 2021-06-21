ALTER TABLE "users_info"

    ADD CONSTRAINT "FK_users_info_to_users" FOREIGN KEY("user_id")
        REFERENCES "users"("id")
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
;

ALTER TABLE "users_roles"

    ADD CONSTRAINT "FK_users_roles_to_roles" FOREIGN KEY("role_id")
        REFERENCES "roles"("id")
        ON DELETE RESTRICT
        ON UPDATE RESTRICT,

    ADD CONSTRAINT "FK_users_roles_to_users" FOREIGN KEY("user_id")
        REFERENCES "users"("id")
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
;

ALTER TABLE "endpoints_roles"

    ADD CONSTRAINT "FK_endpoints_roles_to_roles" FOREIGN KEY("role_id")
        REFERENCES "roles"("id")
        ON DELETE RESTRICT
        ON UPDATE RESTRICT,

    ADD CONSTRAINT "FK_endpoints_roles_to_enpoints" FOREIGN KEY("endpoint_id")
        REFERENCES "endpoints"("id")
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
;

ALTER TABLE "favorites" 

    ADD CONSTRAINT "FK_favorites_to_users" FOREIGN KEY("user_id")
        REFERENCES "users"("id")
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
;
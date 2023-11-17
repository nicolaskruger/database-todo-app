import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sql`ALTER TABLE "User" 
                  drop CONSTRAINT lengthName,
                  drop CONSTRAINT validEmail, 
                  drop CONSTRAINT validPassword;`;

  await sql`ALTER TABLE "User" 
                  ADD CONSTRAINT lengthName CHECK (length(name) > 2),
                  ADD CONSTRAINT validEmail CHECK( email LIKE '%@%'), 
                  ADD CONSTRAINT validPassword CHECK( length(password) > 2);`;

  await sql`DROP VIEW "viewToDoInfo"`;
  await sql`CREATE VIEW "viewToDoInfo" AS 
      SELECT t.id id, t.description description, t.done done, s.id "idSub", s.description "sDescription", s.done "sDone", t."idUser" "idUser"  
                        FROM "ToDo" t 
                    INNER JOIN "SubToDo" s on t.id = s."idToDo"`;

  await sql`DROP TRIGGER "deleteCascadeOnDeleteToDo" on "ToDo"`;
  await sql`DROP FUNCTION "deleteSubToDo"()`;
  await sql`
    CREATE FUNCTION "deleteSubToDo"() RETURNS trigger AS $$
        BEGIN
            DELETE FROM "SubToDo" s where old.id = s."idToDo";
            RETURN old;
        END;
    $$ LANGUAGE plpgsql; 
  `;

  await sql`
            CREATE TRIGGER "deleteCascadeOnDeleteToDo"
            BEFORE DELETE ON "ToDo"
            FOR EACH row
            EXECUTE FUNCTION "deleteSubToDo"()            
            ;
            `;

  res.status(200).json({
    msg: "add constraint, vision and trigger to the project to the project",
  });
}

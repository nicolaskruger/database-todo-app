import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await sql`ALTER TABLE "User" 
                  ADD CONSTRAINT lengthName CHECK (length(name) > 2), 
                  ADD CONSTRAINT validPassword CHECK( password LIKE '%@%');`;
  } catch (e) {
    console.log(e);
  }

  try {
    await sql`CREATE VIEW "viewToDoInfo" AS 
      SELECT t.id id, t.description description, t.done done, s.id "idSub", s.description "sDescription", s.done "sDone"  
                        FROM "ToDo" t 
                    INNER JOIN "SubToDo" s on t.id = s."idToDo"`;
  } catch (e) {
    console.log(e);
  }

  await sql`DROP FUNCTION "deleteSubToDo"()`;

  await sql`
    CREATE FUNCTION "deleteSubToDo"() RETURNS trigger AS $$
        BEGIN
            DELETE FROM "SubToDo" s where new.id = s."idToDo";
            RETURN new;
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

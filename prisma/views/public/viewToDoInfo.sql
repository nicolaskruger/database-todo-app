SELECT
  t.id,
  t.description,
  t.done,
  s.id AS "idSub",
  s.description AS "sDescription",
  s.done AS "sDone"
FROM
  (
    "ToDo" t
    JOIN "SubToDo" s ON ((t.id = s."idToDo"))
  );
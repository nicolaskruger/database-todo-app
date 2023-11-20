# Trabalho de banco de dados GB

Desenvolver uma aplicação completa utilizando a linguagem de programação orientada a objetos de sua preferência, que faça uso de um sistema de gerenciamento de banco de dados. A aplicação pode ter qualquer finalidade, desde que atenda aos requisitos abaixo:

- Utilizar uma linguagem orientada a objetos de sua preferência
- Utilizar um SGBD relacional
- Possuir alguma forma de interface (ex.: Terminal, web, GUI ... )
- Fazer uso de visão
- Fazer uso de gatilhos
- Fazer uso de restrição de tabela (CHECK)
- Implementar as funções básicas do CRUD (Criar, Ler, Atualizar, Deletar) (Pode ser utilizado um ORM)

## O que foi feito

Foi feito um aplicativo de ToDo list(lista de tarefas) com Login

## Check list

- [x] Utilizar uma linguagem orientada a objetos de sua preferência

A linguagem utilizada foi o **TypeScript** que é uma linguagem multi paradigma q também pode ser utilizada com orientada a objeto

- [x] Utilizar um SGBD relacional

O SGBD relacinal utilizado é o **Postgress**

- [x] Possuir alguma forma de interface (ex.: Terminal, web, GUI ... )

A interface utilizada é um frontend utilizando o framework **Next**

- [x] Fazer uso de visão

Foi feita a seguinte visão:

```sql
        CREATE VIEW "viewToDoInfo" AS
        SELECT t.id id, t.description description, t.done done, s.id "idSub", s.description "sDescription", s.done "sDone", t."idUser" "idUser"
        FROM "ToDo" t
        INNER JOIN "SubToDo" s on t.id = s."idToDo"
```

- [x] Fazer uso de gatilhos

Foi feito o seguinte gatilho

```sql

CREATE FUNCTION "deleteSubToDo"() RETURNS trigger AS $$
        BEGIN
            DELETE FROM "SubToDo" s where old.id = s."idToDo";
            RETURN old;
        END;
    $$ LANGUAGE plpgsql;

CREATE TRIGGER "deleteCascadeOnDeleteToDo"
            BEFORE DELETE ON "ToDo"
            FOR EACH row
            EXECUTE FUNCTION "deleteSubToDo"()
```

- [x] Fazer uso de restrição de tabela (CHECK)

Foi feita as seguintes restrições

```sql
ALTER TABLE "User"
    ADD CONSTRAINT lengthName CHECK (length(name) > 2),
    ADD CONSTRAINT validEmail CHECK( email LIKE '%@%'),
    ADD CONSTRAINT validPassword CHECK( length(password) > 2);
```

- [x] Implementar as funções básicas do CRUD (Criar, Ler, Atualizar, Deletar) (Pode ser utilizado um ORM)

Para funções basicas do crud foi utilizado o ORM **Prisma**

## Site do app

[link](https://database-todo-htvns6z7c-nicolaskruger.vercel.app/)

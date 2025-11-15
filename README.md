## Run Migrations:

Apply your schema changes to the database to create tables:
Install my-project with npm

```bash
    npx prisma migrate dev --name init
```

#### This command does two things:

- It creates a new SQL migration file for this migration
- It runs the SQL migration file against the database

## DOCKER - First time (build + run)

```bash
    docker-compose up --build
```

#### To run later (without rebuilding)

```bash
    docker-compose up
```

#### To stop:

```bash
    docker-compose down
```

#### To stop & remove volumes (⚠️ delete db data):

```bash
    docker-compose down -v
```

#### Check containers

```bash
    docker ps
```

#### Check logs (for app or db)

```bash
    docker logs schoolmanage_app
    docker logs schoolmanage_postgres
```

#### Test connection to Postgres

```bash
    psql -h localhost -p 5005 -U postgres -d schoolmanage
```

#### Run Prisma Seed

```bash
    npx prisma db seed
```

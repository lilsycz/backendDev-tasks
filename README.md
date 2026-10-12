# Materials Library API

A small REST API for building materials. It stores data in PostgreSQL, and has a simple web page for viewing, adding and deleting materials.

## Data note

The values in `init.sql` are rough textbook-style numbers and have not been checked against a source. The carbon footprint column is mostly empty on purpose. Do not use these numbers for design decisions.

## Tech

Node.js, Express, `pg`, `dotenv`, PostgreSQL and pgAdmin in Docker.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file next to `compose.yml`. Do not commit it.

   ```
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_DATABASE=library
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3000

   PGADMIN_DEFAULT_EMAIL=admin@admin.com
   PGADMIN_DEFAULT_PASSWORD=your_password
   PGADMIN_PORT=8080
   ```

3. Start the database:

   ```
   docker compose up -d
   ```

4. Open pgAdmin at `http://localhost:8080`, connect with host `db` and the user and password from `.env`, and run `init.sql` on the `library` database. This creates the tables and adds sample data.

5. Start the server:

   ```
   node --watch index.js
   ```

The API runs at `http://localhost:3000`. The web page is at `http://localhost:3000/app`.

## Files

```
compose.yml   Postgres and pgAdmin containers
.env          settings (not on GitHub)
init.sql      tables and sample data
db.js         database connection
index.js      server and routes
public/       web page (index.html, script.js)
```

## Endpoints

| Method | Path | What it does |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/materials` | List all materials. Optional: `?category=wood`, `?sort=density_kg_m3` |
| GET | `/materials/:id` | Get one material |
| POST | `/materials` | Add a material. `name` is required |
| PUT | `/materials/:id` | Replace a material. Fields you leave out become empty |
| PATCH | `/materials/:id` | Change only the fields you send |
| DELETE | `/materials/:id` | Delete a material |
| GET | `/sources` | List all sources |
| POST | `/sources` | Add a source. `name` is required |
| GET | `/sources/:id/materials` | List the materials from one source |

Each material can point to one source through `source_id`. A source can have many materials.

Allowed `sort` values: `name`, `category`, `density_kg_m3`, `youngs_modulus_gpa`, `compressive_strength_mpa`, `tensile_strength_mpa`, `carbon_footprint_kgco2e_per_kg`. Anything else returns 400.

## Errors

| Status | Meaning |
|---|---|
| 400 | Bad input: id is not a number, name is missing, empty update, wrong `sort` value, or `source_id` does not exist |
| 404 | The material or source was not found |
| 500 | Unexpected server or database error |

Success returns 200, or 201 when something was created.
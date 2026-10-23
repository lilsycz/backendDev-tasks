import express from "express";
import pg from "pg";
import { z } from "zod";
import { pool } from "./db.js";
import { env } from "./env.js";
import {
  idParamSchema,
  materialPatchSchema,
  materialQuerySchema,
  materialSchema,
  type Material,
} from "./schemas.js";

const app = express();

app.use(express.json());
app.use("/app", express.static("public"));

type Source = { id: number; name: string };

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown error";
}

function isForeignKeyError(err: unknown): boolean {
  return err instanceof pg.DatabaseError && err.code === "23503";
}

app.get("/", (req, res) => {
  res.send("Materials Library API is running. Frontend: /app");
});

app.get("/materials", async (req, res) => {
  const parsed = materialQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ errors: z.flattenError(parsed.error) });
    return;
  }
  const { category, sort } = parsed.data;

  try {
    let query = "SELECT * FROM materials";
    const values: string[] = [];

    if (category) {
      values.push(category);
      query += ` WHERE category = $${values.length}`;
    }

    query += ` ORDER BY ${sort ?? "id"}`;

    const result = await pool.query<Material>(query, values);
    res.json(result.rows);
  } catch (err) {
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

// Read one by id
app.get("/materials/:id", async (req, res) => {
  const params = idParamSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ errors: z.flattenError(params.error) });
    return;
  }
  const { id } = params.data;
  try {
    const result = await pool.query<Material>("SELECT * FROM materials WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Material not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

// Create
app.post("/materials", async (req, res) => {
  const parsed = materialSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: z.flattenError(parsed.error) });
    return;
  }
  const m = parsed.data;
  try {
    const result = await pool.query<Material>(
      `INSERT INTO materials
       (name, category, density_kg_m3, youngs_modulus_gpa, compressive_strength_mpa,
        tensile_strength_mpa, carbon_footprint_kgco2e_per_kg, biodegradable_natural, source_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [m.name, m.category, m.density_kg_m3, m.youngs_modulus_gpa, m.compressive_strength_mpa,
        m.tensile_strength_mpa, m.carbon_footprint_kgco2e_per_kg, m.biodegradable_natural, m.source_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (isForeignKeyError(err)) {
      res.status(400).json({ error: "source_id does not exist" });
      return;
    }
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

// Update by id
app.put("/materials/:id", async (req, res) => {
  const params = idParamSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ errors: z.flattenError(params.error) });
    return;
  }
  const { id } = params.data;
  const parsed = materialSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: z.flattenError(parsed.error) });
    return;
  }
  const m = parsed.data;
  try {
    const result = await pool.query<Material>(
      `UPDATE materials SET
         name = $1, category = $2, density_kg_m3 = $3, youngs_modulus_gpa = $4,
         compressive_strength_mpa = $5, tensile_strength_mpa = $6,
         carbon_footprint_kgco2e_per_kg = $7, biodegradable_natural = $8, source_id = $9
       WHERE id = $10 RETURNING *`,
      [m.name, m.category, m.density_kg_m3, m.youngs_modulus_gpa, m.compressive_strength_mpa,
        m.tensile_strength_mpa, m.carbon_footprint_kgco2e_per_kg, m.biodegradable_natural,
        m.source_id, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Material not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (isForeignKeyError(err)) {
      res.status(400).json({ error: "source_id does not exist" });
      return;
    }
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

// Update by id (partially)
app.patch("/materials/:id", async (req, res) => {
  const params = idParamSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ errors: z.flattenError(params.error) });
    return;
  }
  const { id } = params.data;
  const parsed = materialPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: z.flattenError(parsed.error) });
    return;
  }
  const m = parsed.data;
  try {
    const result = await pool.query<Material>(
      `UPDATE materials SET
         name = COALESCE($1, name),
         category = COALESCE($2, category),
         density_kg_m3 = COALESCE($3, density_kg_m3),
         youngs_modulus_gpa = COALESCE($4, youngs_modulus_gpa),
         compressive_strength_mpa = COALESCE($5, compressive_strength_mpa),
         tensile_strength_mpa = COALESCE($6, tensile_strength_mpa),
         carbon_footprint_kgco2e_per_kg = COALESCE($7, carbon_footprint_kgco2e_per_kg),
         biodegradable_natural = COALESCE($8, biodegradable_natural),
         source_id = COALESCE($9, source_id)
       WHERE id = $10 RETURNING *`,
      [m.name, m.category, m.density_kg_m3, m.youngs_modulus_gpa, m.compressive_strength_mpa,
        m.tensile_strength_mpa, m.carbon_footprint_kgco2e_per_kg, m.biodegradable_natural,
        m.source_id, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Material not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (isForeignKeyError(err)) {
      res.status(400).json({ error: "source_id does not exist" });
      return;
    }
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

// Delete by id
app.delete("/materials/:id", async (req, res) => {
  const params = idParamSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ errors: z.flattenError(params.error) });
    return;
  }
  const { id } = params.data;
  try {
    const result = await pool.query<Material>(
      "DELETE FROM materials WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Material not found" });
      return;
    }
    res.json({ message: "Material deleted" });
  } catch (err) {
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/sources", async (req, res) => {
  try {
    const result = await pool.query<Source>("SELECT * FROM sources ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/sources", async (req, res) => {
  const { name } = (req.body ?? {}) as { name?: string };
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  try {
    const result = await pool.query<Source>(
      "INSERT INTO sources (name) VALUES ($1) RETURNING *",
      [name],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/sources/:id/materials", async (req, res) => {
  const params = idParamSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ errors: z.flattenError(params.error) });
    return;
  }
  const { id } = params.data;
  try {
    const source = await pool.query<Source>("SELECT * FROM sources WHERE id = $1", [id]);
    if (source.rows.length === 0) {
      res.status(404).json({ error: "Source not found" });
      return;
    }
    const result = await pool.query<Material & { source_name: string }>(
      `SELECT materials.*, sources.name AS source_name
       FROM materials
       JOIN sources ON materials.source_id = sources.id
       WHERE sources.id = $1
       ORDER BY materials.id`,
      [id],
    );
    res.json(result.rows);
  } catch (err) {
    console.log(getErrorMessage(err));
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}!`);
});

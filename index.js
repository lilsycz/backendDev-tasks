import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/app", express.static("public"));

const isValidId = (id) => Number.isInteger(Number(id));

const allowedSorts = [
  "name", "category", "density_kg_m3", "youngs_modulus_gpa",
  "compressive_strength_mpa", "tensile_strength_mpa",
  "carbon_footprint_kgco2e_per_kg",
];

app.get("/", (req, res) => {
  res.send("Materials Library API is running. Frontend: /app");
});

app.get("/materials", async (req, res) => {
  const { category, sort } = req.query;

  if (sort && !allowedSorts.includes(sort)) {
    return res.status(400).json({
      error: `Sort must be one of: ${allowedSorts.join(", ")}`,
    });
  }

  try {
    let query = "SELECT * FROM materials";
    const values = [];

    if (category) {
      values.push(category);
      query += ` WHERE category = $${values.length}`;
    }

    query += ` ORDER BY ${sort || "id"}`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Read one by id
app.get("/materials/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id must be a number" });
  }
  try {
    const result = await pool.query("SELECT * FROM materials WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Create
app.post("/materials", async (req, res) => {
  const {
    name, category, density_kg_m3, youngs_modulus_gpa,
    compressive_strength_mpa, tensile_strength_mpa,
    carbon_footprint_kgco2e_per_kg, biodegradable_natural, source_id,
  } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO materials
       (name, category, density_kg_m3, youngs_modulus_gpa, compressive_strength_mpa,
        tensile_strength_mpa, carbon_footprint_kgco2e_per_kg, biodegradable_natural, source_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, category, density_kg_m3, youngs_modulus_gpa, compressive_strength_mpa,
       tensile_strength_mpa, carbon_footprint_kgco2e_per_kg, biodegradable_natural, source_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "source_id does not exist" });
    }
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update by id
app.put("/materials/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id must be a number" });
  }
  const {
    name, category, density_kg_m3, youngs_modulus_gpa,
    compressive_strength_mpa, tensile_strength_mpa,
    carbon_footprint_kgco2e_per_kg, biodegradable_natural,
  } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const result = await pool.query(
      `UPDATE materials SET
         name = $1, category = $2, density_kg_m3 = $3, youngs_modulus_gpa = $4,
         compressive_strength_mpa = $5, tensile_strength_mpa = $6,
         carbon_footprint_kgco2e_per_kg = $7, biodegradable_natural = $8
       WHERE id = $9 RETURNING *`,
      [name, category, density_kg_m3, youngs_modulus_gpa, compressive_strength_mpa,
       tensile_strength_mpa, carbon_footprint_kgco2e_per_kg, biodegradable_natural, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update by id (partially)
app.patch("/materials/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id must be a number" });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Body is empty" });
  }
  const {
    name, category, density_kg_m3, youngs_modulus_gpa,
    compressive_strength_mpa, tensile_strength_mpa,
    carbon_footprint_kgco2e_per_kg, biodegradable_natural,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE materials SET
         name = COALESCE($1, name),
         category = COALESCE($2, category),
         density_kg_m3 = COALESCE($3, density_kg_m3),
         youngs_modulus_gpa = COALESCE($4, youngs_modulus_gpa),
         compressive_strength_mpa = COALESCE($5, compressive_strength_mpa),
         tensile_strength_mpa = COALESCE($6, tensile_strength_mpa),
         carbon_footprint_kgco2e_per_kg = COALESCE($7, carbon_footprint_kgco2e_per_kg),
         biodegradable_natural = COALESCE($8, biodegradable_natural)
       WHERE id = $9 RETURNING *`,
      [name, category, density_kg_m3, youngs_modulus_gpa, compressive_strength_mpa,
       tensile_strength_mpa, carbon_footprint_kgco2e_per_kg, biodegradable_natural, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete by id
app.delete("/materials/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id must be a number" });
  }
  try {
    const result = await pool.query(
      "DELETE FROM materials WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.json({ message: "Material deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/sources", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sources ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/sources", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO sources (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/sources/:id/materials", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id must be a number" });
  }
  try {
    const source = await pool.query("SELECT * FROM sources WHERE id = $1", [id]);
    if (source.rows.length === 0) {
      return res.status(404).json({ error: "Source not found" });
    }
    const result = await pool.query(
      `SELECT materials.*, sources.name AS source_name
       FROM materials
       JOIN sources ON materials.source_id = sources.id
       WHERE sources.id = $1
       ORDER BY materials.id`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
})
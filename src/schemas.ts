import { z } from "zod";

const optionalNumber = z.number().nonnegative().nullable().optional();

export const materialSchema = z.object({
  name: z
    .string({
      error: (issue) => (issue.input === undefined ? "A material needs a name" : "Name must be text"),
    })
    .trim()
    .min(1, "A material needs a name")
    .max(100, "Name can be at most 100 characters"),
  category: z.string().max(50).nullable().optional(),
  density_kg_m3: optionalNumber,
  youngs_modulus_gpa: optionalNumber,
  compressive_strength_mpa: optionalNumber,
  tensile_strength_mpa: optionalNumber,
  carbon_footprint_kgco2e_per_kg: optionalNumber,
  biodegradable_natural: z.boolean().nullable().optional(),
  source_id: z.number().int().positive().nullable().optional(),
});

export type Material = z.infer<typeof materialSchema> & { id: number };

export const idParamSchema = z.object({
  id: z.coerce
    .number({ error: "Id must be a number" })
    .int("Id must be a whole number")
    .positive("Id must be a positive number"),
});

export const materialPatchSchema = materialSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be sent",
  });

export const sortableColumns = [
  "name", "category", "density_kg_m3", "youngs_modulus_gpa",
  "compressive_strength_mpa", "tensile_strength_mpa",
  "carbon_footprint_kgco2e_per_kg",
] as const;

export const materialQuerySchema = z.object({
  category: z.string().max(50).optional(),
  sort: z
    .enum(sortableColumns, { error: `Sort must be one of: ${sortableColumns.join(", ")}` })
    .optional(),
});

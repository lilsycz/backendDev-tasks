import express from "express";
import { z } from "zod";
const app = express();
const PORT = 3000;

app.use (express.json());

app.get("/ping", (req, res) => {
    res.status(200).json ({message: "Pong"});
});

const randomPersonResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
      country: z.string(),
    }),
  ),
});

app.get("/random-person", async (req, res) => {
    try {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        const validatedRandomPerson = randomPersonResponseSchema.safeParse(data);

        if (!validatedRandomPerson.success) {
        return res.status(500).json({
            error: "Invalid data from RandomUser API",
            details: validatedRandomPerson.error,
        });
        }
        const randomPerson = validatedRandomPerson.data.results[0];
        res.json({
            name: `${randomPerson?.name.first} ${randomPerson?.name.last}`,
            country: `${randomPerson?.country}`,
        });
    } catch (error) {
        res.status(500).json({
        error: "Failed to fetch random user",
        });
    }
});

const userSchema = z.object({
    name: z
        .string()
        .min(3)
        .max(12),
    age: z
        .number()
        .min(18, { message: "You must be at least 18 years old" })
        .max(100, { message: "You can not be older than 100!" })
        .optional()
        .default(28),
    email: z
        .email()
        .toLowerCase(),
});


app.post("/users", (req, res) => {
    const validatedUser = userSchema.safeParse(req.body);

    if (!validatedUser.success) {
        return res.status(400).json({
            error: "Invalid input data",
            details: validatedUser.error,
        });
    }
    res.status(201).json({ user: validatedUser.data});
});

const randomLoginResponseSchema = z.object({
  results: z.array(
    z.object({
      login: z.object({
        username: z.string(),
      }),
      registered: z.object({
        date: z.string(),
      }),
    }),
  ),
});

app.get("/random-login", async (req, res) => {
    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const validated = randomLoginResponseSchema.safeParse(data);

        if (!validated.success) {
            return res.status(500).json({
                error: "Invalid data from RandomUser API",
                details: validated.error,
            });
        }

        const user = validated.data.results[0];
        const registeredDate = user?.registered.date.split("T")[0];

        res.status(200).json({
            summary: `${user?.login.username} (registered on ${registeredDate})`,
        });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: "Failed to fetch random user" });
    }
});

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}!`);
});
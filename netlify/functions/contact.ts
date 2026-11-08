import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { contactMessages } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 30) {
    return Response.json({ error: "Le nom est requis et ne doit pas dépasser 30 caractères." }, { status: 400 });
  }
  if (!/^[^@\s]+@gmail\.com$/.test(email)) {
    return Response.json({ error: "L'email doit se terminer par @gmail.com." }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return Response.json({ error: "Le message est requis (5000 caractères maximum)." }, { status: 400 });
  }

  const [saved] = await db
    .insert(contactMessages)
    .values({ name, email, message })
    .returning({ id: contactMessages.id });

  return Response.json({ ok: true, id: saved.id }, { status: 201 });
};

export const config: Config = {
  path: "/api/contact",
};

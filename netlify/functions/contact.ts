import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { contactMessages } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Accept JSON (sent by code.js) and classic HTML form posts (fallback when JavaScript is unavailable)
  const isJson = (req.headers.get("content-type") || "").includes("application/json");
  const reply = (status: number, payload: { ok?: boolean; id?: number; error?: string }) => {
    if (isJson) return Response.json(payload, { status });
    const url = new URL("/", req.url);
    url.searchParams.set(payload.error ? "erreur" : "envoye", payload.error ? payload.error : "1");
    url.hash = "contact";
    return Response.redirect(url.toString(), 303);
  };

  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = isJson ? await req.json() : Object.fromEntries(await req.formData());
  } catch {
    return reply(400, { error: "Requête invalide." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 30) {
    return reply(400, { error: "Le nom est requis et ne doit pas dépasser 30 caractères." });
  }
  if (!/^[^@\s]+@gmail\.com$/.test(email)) {
    return reply(400, { error: "L'email doit se terminer par @gmail.com." });
  }
  if (!message || message.length > 5000) {
    return reply(400, { error: "Le message est requis (5000 caractères maximum)." });
  }

  const [saved] = await db
    .insert(contactMessages)
    .values({ name, email, message })
    .returning({ id: contactMessages.id });

  return reply(201, { ok: true, id: saved.id });
};

export const config: Config = {
  path: "/api/contact",
};

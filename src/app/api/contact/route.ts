import { NextResponse } from "next/server";

/** Réception des formulaires (estimation + contact). Maquette : validé et journalisé. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (typeof body.site === "string" && body.site.trim() !== "") return NextResponse.json({ ok: true });
  const nom = String(body.nom ?? "").trim();
  const telephone = String(body.telephone ?? "").trim();
  if (!nom || !telephone) return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  const { site: _site, ...rest } = body;
  void _site;
  console.log("[lead]", { ...rest, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

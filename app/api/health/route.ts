export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { ok: true, application: "gameplayaddict", revision: process.env.GAMEPLAYADDICT_REVISION ?? "local" },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}

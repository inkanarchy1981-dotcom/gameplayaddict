export async function POST() {
  return Response.json({ ok: false, message: "Alert service is not connected yet. Nothing was sent or stored." }, { status: 503, headers: { "cache-control": "no-store" } });
}

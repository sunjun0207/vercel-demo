export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "请发送 JSON" }, { status: 400 });
  }

  const text = typeof payload?.text === "string" ? payload.text.trim() : "";
  if (!text) {
    return Response.json({ error: "请先写一句话" }, { status: 400 });
  }
  if (Array.from(text).length > 280) {
    return Response.json({ error: "最多 280 个字" }, { status: 400 });
  }

  return Response.json({
    text,
    length: Array.from(text).length,
    receivedAt: new Date().toISOString(),
  });
}

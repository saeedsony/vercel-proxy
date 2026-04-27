export default async function handler(req, res) {
  const target = "https://212.43.144.189/armp";

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "content-type": req.headers["content-type"] || "",
      },
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
    });

    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (!["content-encoding", "transfer-encoding", "connection", "content-length"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const data = Buffer.from(await response.arrayBuffer());
    res.send(data);

  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy Error");
  }
}

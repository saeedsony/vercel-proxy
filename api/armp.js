export default async function handler(req, res) {
  const target = "https://81.91.176.222:443/armp";

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "81.91.176.222",
      },
      body: req.method === "GET" || req.method === "HEAD"
        ? undefined
        : req.body,
    });

    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (!["content-encoding", "transfer-encoding", "connection"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).send("Proxy Error");
  }
}

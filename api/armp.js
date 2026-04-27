import https from "https";

export default async function handler(req, res) {
  const targetUrl = "https://212.43.144.189:443/armp";

  try {
    const options = {
      method: req.method,
      headers: {
        ...req.headers,
        host: "212.43.144.189",
      },
      rejectUnauthorized: false, // مهم برای IP بدون SSL معتبر
    };

    const proxyReq = https.request(targetUrl, options, (proxyRes) => {
      res.statusCode = proxyRes.statusCode;

      // فوروارد هدرها
      Object.entries(proxyRes.headers).forEach(([key, value]) => {
        if (
          !["content-encoding", "transfer-encoding", "connection"].includes(
            key.toLowerCase()
          )
        ) {
          res.setHeader(key, value);
        }
      });

      // استریم مستقیم (بدون مصرف RAM)
      proxyRes.pipe(res);
    });

    proxyReq.on("error", (err) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy Error");
    });

    // ارسال body (برای POST/PUT)
    if (req.method !== "GET" && req.method !== "HEAD") {
      proxyReq.write(req.body || "");
    }

    proxyReq.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy Fatal Error");
  }
}

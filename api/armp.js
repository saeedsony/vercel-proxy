export default async function handler(req, res) {
const target = "[http://](http://81.91.176.222:443/armp)[81.91.176.222](http://81.91.176.222:443/armp)[:443/armp](http://81.91.176.222:443/armp)";

try {
const response = await fetch(target, {
method: req.method,
headers: req.headers,
body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
});

```
res.status(response.status);

response.headers.forEach((value, key) => {
  res.setHeader(key, value);
});

const data = await response.arrayBuffer();
res.send(Buffer.from(data));
```

} catch (err) {
res.status(500).send("Proxy Error");
}
}

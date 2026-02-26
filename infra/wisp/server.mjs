import { createServer } from "node:http";
import wisp from "wisp-server-node";

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4000);
const wispPath = process.env.WISP_PATH || "/wisp/";

const server = createServer((req, res) => {
    if (req.url === "/healthz") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("ok");
        return;
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
});

server.on("upgrade", (req, socket, head) => {
    if (req.url?.startsWith(wispPath)) {
        wisp.routeRequest(req, socket, head);
        return;
    }

    socket.end();
});

server.listen(port, host, () => {
    console.log(`Wisp server listening on http://${host}:${port}${wispPath}`);
});

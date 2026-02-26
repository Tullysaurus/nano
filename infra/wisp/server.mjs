import { createServer } from "node:http";
import wisp from "@mercuryworkshop/wisp-js/server";

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4000);
const wispPath = process.env.WISP_PATH || "/wisp/";
const normalizedWispPath = wispPath.endsWith("/") ? wispPath.slice(0, -1) : wispPath;

const server = createServer((req, res) => {
    console.log(`[http] ${req.method} ${req.url}`);

    if (req.url === "/healthz") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("ok");
        return;
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
});

server.on("upgrade", (req, socket, head) => {
    console.log(`[ws-upgrade] ${req.url}`);

    if (
        req.url?.startsWith(wispPath) ||
        req.url?.startsWith(normalizedWispPath)
    ) {
        console.log(`[ws-accepted] ${req.url}`);
        wisp.routeRequest(req, socket, head);
        return;
    }

    console.log(`[ws-rejected] ${req.url}`);
    socket.end();
});

server.listen(port, host, () => {
    console.log(`Wisp server listening on http://${host}:${port}${wispPath}`);
});

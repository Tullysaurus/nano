# Wisp Server + Cloudflare Tunnel

This project frontend is already configured to use:

- `wss://wisp.tully.sh/wisp/`

Use this runbook to stand up a minimal Wisp backend with Docker and Cloudflare Tunnel.

## 1) Create a tunnel in Cloudflare dashboard

1. Go to `Zero Trust` -> `Networks` -> `Tunnels`.
2. Create a new tunnel of type `Cloudflared`.
3. Pick Docker as the connector.
4. Copy the generated tunnel token.
5. Add a Public Hostname:
   - Hostname: `wisp.tully.sh`
   - Service Type: `HTTP`
   - URL: `http://wisp:4000`

Notes:
- Cloudflare handles TLS at the edge for `wss://`.
- `wisp` is the Docker service name from compose, reachable by `cloudflared` on the same Docker network.

## 2) Configure environment

Create `.env.wisp` from the example and set your token:

```bash
copy .env.wisp.example .env.wisp
```

Set:

```bash
CLOUDFLARE_TUNNEL_TOKEN=<your-token>
```

## 3) Start services

```bash
docker compose -f docker-compose.wisp.yml --env-file .env.wisp up -d --build
```

## 4) Verify locally

```bash
curl http://localhost:4000/healthz
```

Expected response: `ok`

## 5) Verify through Cloudflare

After DNS/tunnel propagation, open browser devtools on `https://proxy.tully.sh` and confirm websocket connection to:

- `wss://wisp.tully.sh/wisp/`

If it fails:
- Check tunnel status in Zero Trust dashboard.
- Confirm Public Hostname points to `http://wisp:4000`.
- Check logs:

```bash
docker logs nano-wisp --tail 100
docker logs nano-wisp-tunnel --tail 100
```

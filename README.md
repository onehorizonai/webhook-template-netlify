# One Horizon webhook template for Netlify

Use this repo if you want a One Horizon webhook receiver on Netlify. No Vercel, Heroku, or Cloudflare files.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/onehorizonai/webhook-template-netlify)

## Included

- Netlify Function at `netlify/functions/webhook.ts`
- `/webhook` endpoint
- webhook key checks
- JSON validation with a 256 KB limit
- retry-safe event ID handling
- Sample payloads
- optional SDK helper in `src/sdk.ts`

## Run locally

```bash
yarn install
cp .env.example .env
yarn dev
```

```bash
curl http://localhost:8888/webhook \
  -X POST \
  -H "content-type: application/json" \
  -H "x-one-webhook-key: paste-one-horizon-webhook-key-here" \
  -H "x-one-event-id: evt_task_created" \
  -H "x-one-event-type: task.created" \
  --data @sample-payloads/task-created.json
```

## Configure One Horizon

1. Add your deployed `/webhook` URL in **Settings -> Apps**.
2. Set `ONE_WEBHOOK_KEY` in Netlify.
3. Choose events.
4. Click **Verify**.

## Before production

- Keep `ONE_WEBHOOK_KEY` secret.
- Return `2xx` quickly.
- Store event IDs in Redis, Postgres, or another durable store before doing side effects.
- Queue slow work. One Horizon delivery requests time out after 3 seconds.

## Checks

```bash
yarn typecheck
yarn test
yarn build
```

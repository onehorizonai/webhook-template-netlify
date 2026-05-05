# One Horizon Webhook Template for Netlify

A small TypeScript webhook receiver for One Horizon apps on Netlify. It checks the verification key, validates the event, logs the useful IDs, and returns quickly.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/onehorizonai/webhook-template-netlify)

## What's included

- `/webhook` endpoint for One Horizon app events
- Netlify Function in `netlify/functions/webhook.ts`
- `X-One-Webhook-Key` verification
- `HEAD` and `GET` support for endpoint checks
- JSON-only `POST` handling with a 256 KB payload limit
- Basic validation for `one.webhook.event.v1`
- A small idempotency hook so retries do not run the same work twice
- Optional SDK helper in `src/sdk.ts`

## Local setup

```bash
yarn install
cp .env.example .env
yarn dev
```

Send a sample event:

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

1. Open **Settings -> Apps** in One Horizon.
2. Create or open a custom app.
3. Add your deployed `/webhook` URL.
4. Add the verification key to Netlify as `ONE_WEBHOOK_KEY`.
5. Choose the events your app should receive.
6. Click **Verify**.

## Handler flow

The Netlify file only adapts the request. The webhook logic lives in `src/webhook.ts`.

1. Check `X-One-Webhook-Key` with a timing-safe comparison.
2. Accept `HEAD` and `GET` verification requests.
3. Require `POST` requests to use `application/json`.
4. Reject payloads larger than 256 KB.
5. Validate the required event fields and schema.
6. Skip duplicate event IDs with the configured event store.
7. Log the event ID, type, resource, actor, and retry headers. Return `200`.

The default event store is memory. That is fine for local testing. In production, use Redis, Postgres, or another database keyed by event ID.

## Checks

```bash
yarn typecheck
yarn test
yarn build
```

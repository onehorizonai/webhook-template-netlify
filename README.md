# One Horizon webhooks on Netlify

Netlify version of the One Horizon webhook starter. It has the Netlify Function, the rewrite, and no Vercel or Heroku cleanup waiting for you.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/onehorizonai/webhook-template-netlify)

## Files to look at

- `netlify/functions/webhook.ts`: the Netlify Function
- `src/webhook.ts`: key check, CloudEvents JSON parsing, event validation, idempotency
- `netlify.toml`: `/webhook` rewrite
- `sample-payloads/`: example One Horizon events
- `src/sdk.ts`: optional API calls after receiving an event

Netlify rewrites `/webhook` to `netlify/functions/webhook.ts`. The function accepts `HEAD`, `GET`, and CloudEvents JSON `POST`.

## One Horizon links

- [One Horizon](https://onehorizon.ai)
- [Webhook docs](https://onehorizon.ai/docs/integrations/webhooks)
- [REST API docs](https://onehorizon.ai/docs/reference)
- [JavaScript SDK](https://www.npmjs.com/package/@onehorizon/sdk-js)

```bash
npm i @onehorizon/sdk-js
```

## Run it locally

Use Node 24. The repo includes `.nvmrc` and `.node-version`.

```bash
yarn install
cp .env.example .env
yarn dev
```

```bash
curl http://localhost:8888/webhook \
  -X POST \
  -H "content-type: application/cloudevents+json; charset=utf-8" \
  -H "x-one-webhook-key: paste-one-horizon-webhook-key-here" \
  -H "x-one-event-id: evt_task_created" \
  -H "x-one-event-type: task.created" \
  --data @sample-payloads/task-created.json
```

## Connect it to One Horizon

1. Deploy this repo to Netlify.
2. Set `ONE_WEBHOOK_KEY` in Netlify.
3. In One Horizon, open **Settings -> Apps**.
4. Add the deployed `/webhook` URL.
5. Pick the events you want.
6. Click **Verify**.

## Replace before real use

The event store is just memory. Before this does anything real, save processed event IDs in Redis, Postgres, or another durable store. Keep the handler quick; One Horizon times out after 3 seconds.

## Checks

```bash
yarn typecheck
yarn test
yarn build
```

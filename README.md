# One Horizon webhook receiver for Netlify

A small Netlify Function that receives One Horizon app webhooks. It uses the One Horizon SDK types, checks the webhook key, reads the raw CloudEvents JSON body, and returns quickly.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/onehorizonai/webhook-template-netlify)

## Files to look at

- `netlify/functions/webhook.ts`: the Netlify Function
- `public/index.html`: the root deployment status page
- `src/webhook.ts`: key check, CloudEvents JSON parsing, SDK event typing, idempotency
- `netlify.toml`: build settings and deploy-button environment fields
- `sample-payloads/`: example One Horizon events
- `src/sdk.ts`: optional follow-up call that loads the first document attached to the task

The function is mounted at `/webhook` and accepts `HEAD`, `GET`, and CloudEvents JSON `POST`.

## One Horizon links

- [One Horizon](https://onehorizon.ai)
- [Webhook docs](https://onehorizon.ai/docs/integrations/webhooks)
- [REST API docs](https://onehorizon.ai/docs/reference)
- [JavaScript SDK](https://www.npmjs.com/package/@onehorizon/sdk-js)

```bash
npm i @onehorizon/sdk-js@latest
```

Webhook event and payload types come from `@onehorizon/sdk-js`. Resource payloads are flat: read task events from `event.data.task`, comment events from `event.data.comment`, and bulk task IDs from `event.data.resource.taskIds`.

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
3. In One Horizon, open <a href="https://onehorizon.ai/app/my/settings/apps" rel="nofollow">Settings -> Apps</a>.
4. Add the deployed `/webhook` URL.
5. Pick the events you want.
6. Click **Verify**.

## Before real use

The event store is just memory. Before this does anything real, save processed event IDs in Redis, Postgres, or another durable store. Keep the handler quick; One Horizon times out after 3 seconds.

## Checks

```bash
yarn typecheck
yarn test
yarn build
```

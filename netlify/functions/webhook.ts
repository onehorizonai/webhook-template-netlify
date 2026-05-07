import type { Config } from '@netlify/functions'
import { handleWebhookRequest } from '../../src/webhook.js'

export default function webhook(request: Request): Promise<Response> {
  return handleWebhookRequest(request)
}

export const config = {
  path: '/webhook'
} satisfies Config

import type { Handler } from '@netlify/functions'
import { handleWebhook } from '../../src/webhook.js'

export const handler: Handler = async (event) => {
  const result = await handleWebhook({
    method: event.httpMethod,
    headers: event.headers,
    rawBody: event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : event.body || ''
  })

  return {
    statusCode: result.status,
    headers: result.headers,
    body: result.body === undefined ? '' : JSON.stringify(result.body)
  }
}

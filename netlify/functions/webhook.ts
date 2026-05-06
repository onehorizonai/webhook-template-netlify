import { handleWebhook } from '../../src/webhook.js'

interface NetlifyEvent {
  body: string | null
  headers: Record<string, string>
  httpMethod: string
  isBase64Encoded: boolean
}

export const handler = async (event: NetlifyEvent) => {
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

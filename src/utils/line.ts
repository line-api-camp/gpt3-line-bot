import { Client, ClientConfig, Message, MiddlewareConfig } from '@line/bot-sdk'

import { LINE_ACCESS_TOKEN, LINE_SECRET } from './secrets'

export const lineMiddlewareConfig: MiddlewareConfig = {
  channelSecret: LINE_SECRET
}

export const lineConfig: ClientConfig = {
  ...lineMiddlewareConfig,
  channelAccessToken: LINE_ACCESS_TOKEN
}

export const lineClient = new Client(lineConfig)

export const makeReplyMessage = (text: string): Message => {
  return {
    type: 'text',
    text: text.replace(/<br>/g, '\n')
  }
}

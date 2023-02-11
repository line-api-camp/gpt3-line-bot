import { MessageEvent, TextEventMessage } from '@line/bot-sdk'

import { getCompletion } from '~/domains/opneai.domain'
import { lineClient, makeReplyMessage } from '~/utils/line'
import { errorLogger } from '~/utils/util'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage
    const newText = await getCompletion(text)

    if (newText === null) {
      await lineClient.replyMessage(event.replyToken, makeReplyMessage('お前とは会話したくない。'))
    } else {
      await lineClient.replyMessage(event.replyToken, makeReplyMessage(newText))
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}

import { MessageEvent, TextEventMessage } from '@line/bot-sdk'

import { getCompletion } from '~/domains/opneai.domain'
import { getInitUserData } from '~/types/models'
import { createUser, getUser } from '~/types/users'
import { lineClient, makeReplyMessage } from '~/utils/line'
import { errorLogger } from '~/utils/util'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  const userId = event.source.userId as string

  try {
    let user = await getUser(userId)
    if (user === null) {
      user = await createUser(userId, getInitUserData())
    }

    if (!user.isActive) {
      await lineClient.replyMessage(
        event.replyToken,
        makeReplyMessage('リッチメニューより課金してくれい')
      )
      return
    }

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

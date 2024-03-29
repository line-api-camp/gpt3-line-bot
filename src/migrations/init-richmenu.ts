import '../alias'
import '~/utils/firebase/index'

import { readFileSync } from 'fs'

import { getUsersByIsActive } from '~/types/users'
import { lineClient } from '~/utils/line'

import { activeRichMenu } from './richmenu-data/active'
import { defaultRichMenu } from './richmenu-data/default'

const deleteAllRichMenus = async () => {
  const richmenuIds = (await lineClient.getRichMenuList()).map(({ richMenuId }) => richMenuId)
  await Promise.all(richmenuIds.map((richmenuId) => lineClient.deleteRichMenu(richmenuId)))
}

const main = async () => {
  try {
    // delete all richmenu.
    await deleteAllRichMenus()

    // create default richmenu.
    const defaultRichMenuId = await lineClient.createRichMenu(defaultRichMenu)
    const defaultImgBuffer = readFileSync('./assets/default.png')
    await lineClient.setRichMenuImage(defaultRichMenuId, defaultImgBuffer)

    // create active richmenu.
    const activeRichMenuId = await lineClient.createRichMenu(activeRichMenu)
    const activeImgBuffer = readFileSync('./assets/active.png')
    await lineClient.setRichMenuImage(activeRichMenuId, activeImgBuffer)

    // set default richmenu.
    await lineClient.setDefaultRichMenu(defaultRichMenuId)

    // set active richmenu.
    const activeUsers = await getUsersByIsActive(true)
    await Promise.all(
      activeUsers.map((user) => lineClient.linkRichMenuToUser(user.id!, activeRichMenuId))
    )
  } catch (err) {
    console.error(err)
  }
}

main()

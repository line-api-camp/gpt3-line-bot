import { lineClient } from '~/utils/line'

export const getRichMenuId = async (richMenuType: 'active' | 'default'): Promise<string | null> => {
  try {
    const richMenuList = await lineClient.getRichMenuList()

    for (const richMenu of richMenuList) {
      if (richMenu.name === richMenuType) return richMenu.richMenuId
    }

    return null
  } catch (err) {
    console.error(`💢💢💢::getRichMenuId::💢💢💢`)
    console.error(err)
    return null
  }
}

import Avatar from '@/assets/avatar.svg'
import AvatarIcecream from '@/assets/avatar_icecream.svg'
import AvatarGreen from '@/assets/avatar_green.svg'
import AvatarOrange from '@/assets/avatar_orange.svg'

export function useBees() {
  const beeAvatars = [
    {
      id: 1,
      image: AvatarGreen,
      name: 'Shrek Bee',
    },
    {
      id: 2,
      image: AvatarIcecream,
      name: 'Iced Bee',
    },
    {
      id: 3,
      image: AvatarOrange,
      name: 'Tiger Bee',
    },
    {
      id: 4,
      image: Avatar,
      name: 'Honey Bee',
    },
  ]

  const getBeeAvatar = id => {
    return beeAvatars.find(bee => bee.id === id)
  }

  return { beeAvatars, getBeeAvatar }
}

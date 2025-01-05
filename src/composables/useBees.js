import Avatar from '@/assets/avatar.svg'
import AvatarIcecream from '@/assets/avatar_icecream.svg'
import AvatarGreen from '@/assets/avatar_green.svg'
import AvatarOrange from '@/assets/avatar_orange.svg'
import AvatarMayakovsky from '@/assets/avatar_mayakovski.svg'

export function useBees() {
  const beeAvatars = [
    {
      id: 1,
      image: Avatar,
      name: 'Honey Bee',
    },
    {
      id: 2,
      image: AvatarMayakovsky,
      name: 'Mayakovsky Bee',
    },
    {
      id: 3,
      image: AvatarIcecream,
      name: 'Iced Bee',
    },
    {
      id: 4,
      image: AvatarOrange,
      name: 'Tiger Bee',
    },
    {
      id: 5,
      image: AvatarGreen,
      name: 'Shrek Bee',
    },
  ]

  const getBeeAvatar = id => {
    return beeAvatars.find(bee => bee.id === id)
  }

  return { beeAvatars, getBeeAvatar }
}


import { useRoute, useRouter } from 'vue-router'

export function useNavigation() {
  const route = useRoute()
  const router = useRouter()

  function goBack() {
    router.back()
  }

  return { goBack }
}

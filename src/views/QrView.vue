<template>
  <Content title="Add friends" bgColor="#60617c" titleColor="white" backroute="/profile">
    <div class="flex flex-col gap-2">
      <p class="text-center text-lg">Show your QR code</p>
      <qrcode-vue
        style="padding: 0 2rem; width: 100%; height: auto; max-height: 60vh"
        level="H"
        :render-as="renderAs"
        :value="authStore.userData.user_id"
        :image-settings="imageSettings"
        foreground="#333"
        />
      <p class="text-center text-lg">Or</p>
      <Button
        class="w-20 m-auto text-lg"
        @click="scan_qr"
        severity="info" label="Scan" />
    </div>
    <Dialog v-model:visible="newfriend_visible" modal header="New friend!"
            :style="{ width: '25rem' }">
      <div class="relative h-64">
        <img class="w-full absolute -top-12" :src=friendBeeImage />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-center">{{ friendName }} </p>
        <Button class="m-auto w-24" severity="info" @click="newfriend_visible = false"> Poggers </Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="friend_fail_visible" modal header="Invalid QR code"
            :style="{ width: '25rem' }">
      <div class="flex flex-col gap-2">
        <p class="text-center">You scanned an invalid QR code</p>
        <Button class="m-auto w-24" severity="danger" @click="friend_fail_visible = false"> Sorry </Button>
      </div>
    </Dialog>
  </Content>
  <MenuBar />
</template>

<script setup lang="ts">
import Content from '@/components/Content.vue'
import MenuBar from '@/components/MenuBar.vue'
import { Button } from 'primevue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, ImageSettings } from 'qrcode.vue'
import { Camera, CameraResultType } from '@capacitor/camera'
import { useAuthStore } from '@/stores/auth'
import { useFriendsStore } from '@/stores/friends'
import { useBees } from '@/composables/useBees'
import { toRaw } from 'vue'
import Dialog from 'primevue/dialog'
import { QrScanner } from '@diningcity/capacitor-qr-scanner'
const toast = useToast()
const authStore = useAuthStore()
const friendsStore = useFriendsStore()
const bees = useBees()

const newfriend_visible = ref(false);
const friend_fail_visible = ref(false);
const friendBeeImage = ref(null); 
const friendName = ref(null); 

const scan_qr = async () => {
  const { result } = await QrScanner.scanQrCode();
  const server_response = await friendsStore.addFriend(result);
  friend_fail_visible.value = (server_response.error)
  friendBeeImage.value = bees.getBeeAvatar(4).image
  friendName.value = server_response.name
  newfriend_visible.value = (!server_response.error)
}

const renderAs = ref<RenderAs>('svg');
let beeID = toRaw(authStore.userData).beeID
if (!beeID) beeID = 1
const beeImage = bees.getBeeAvatar(beeID).image
console.log(beeImage)
const imageSettings = ref<ImageSettings>({
    src: beeImage,
    width: 70,
    height: 70,
    excavate: false,
    })

</script>

<style lang="scss" scoped></style>

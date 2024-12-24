<template>
  <div class="min-h-screen bg-[#803049] p-4 relative">
    <div class="overflow-hidden absolute top-0 left-0 right-0 z-0 max-w-full">
      <img :src="honeycomb" class="object-cover -translate-y-40 translate-x-12 opacity-45 scale-150" />
    </div>
  </div>

  <div class="absolute top-4 left-4 z-10 mt-12 gap-3">
    <RouterLink to="/profile" class="pi pi-arrow-left text-white text-lg mr-8"></RouterLink>
    <div class="flex flex-row items-center mt-3">
      <i class="pi-cog pi text-2xl text-white"></i>
      <h1 class="text-white ml-2 text-2xl">Settings</h1>
    </div>
  </div>

  <div class="bg-white w-full rounded-t-[2rem] px-4 pt-6 mt-36 mb-0 absolute top-0 left-0 z-10 h-full">

    <div class="flex flex-row items-center mb-2">
      <img :src="profileData.profilePhoto" class="w-20 h-20 rounded-lg mb-4" />
      <h2 class="text-gray-600 ml-3 text-2xl">{{profileData.name}}</h2>
      <i @click="nameInputMode = true" class="pi-pencil pi text-lg text-gray-600 pl-1"></i>
    </div>

    <div class="mx-1 mb-4 border-t-2 border-[#E2E1E1]"></div>

    <RouterLink to="/customize-bee"
      class="w-full bg-[#BCD5E6] text-[#31556E] text-2xl rounded-lg mb-4 flex items-center justify-center">
      <img :src="bee" alt="Icon" class="w-24 h-24 mr-2" />
      Customize Your Bee
    </RouterLink>

    <div class="mx-1 mb-4 border-t-2 border-[#E2E1E1]"></div>

    <div class="text-[#ADADAD] ml-2 mb-3 text-xl">Account Settings</div>

    <div class="flex flex-col ml-2 mt-2 gap-4">
      <RouterLink to="/change-email" class="flex items-center justify-between">
        <p class="text-gray-700 text-lg">Change Email</p>
        <i class="pi-angle-right pi text-lg text-black"></i>
      </RouterLink>
      <RouterLink to="/change-password" class="flex items-center justify-between">
        <p class="text-gray-700 text-lg">Change Password</p>
        <i class="pi-angle-right pi text-lg text-black"></i>
      </RouterLink>
      <div class="flex items-center justify-between">
        <p class="text-gray-700 text-lg">Push Notifications</p>
        <ToggleSwitch v-model="checked" />
      </div>
    </div>

    <div class="text-[#ADADAD] ml-2 mt-3 mb-3 text-xl">More</div>

    <div class="flex flex-col ml-2 mt-2 gap-4">
      <RouterLink to="/about-us" class="flex items-center justify-between">
        <p class="text-gray-700 text-lg">About Us</p>
        <i class="pi-angle-right pi text-lg text-black"></i>
      </RouterLink>
      <RouterLink to="/privacy-policy" class="flex items-center justify-between">
        <p class="text-gray-700 text-lg">Privacy Policy</p>
        <i class="pi-angle-right pi text-lg text-black"></i>
      </RouterLink>
    </div>


  </div>

  <!-- Dialogs -->
  <Dialog v-model:visible="nameInputMode" :draggable="false" modal header="Edit name" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <InputText :modelValue="profileData.name" v-model="nameBuffer" id="username" class="flex-auto flex-1 border rounded-md" required />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="nameInputMode = false"></Button>
      <Button type="button" label="Save" @click="updateName();"></Button>
    </div>
  </Dialog>

</template>
  
  <script setup>
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue';
    import ToggleSwitch from 'primevue/toggleswitch';
    import { InputText } from 'primevue'
    import { Button } from 'primevue'

    import honeycomb from '@/assets/bw-honeycomb.png'
    import imageFallback from '@/assets/image-fallback.jpg'
    import bee from '@/assets/avatar.svg'
    import Dialog from 'primevue/dialog';
    
    const profileData = ref({
    name: 'Susan Clay',
    profilePhoto: imageFallback
    })

    const nameBuffer = ref(null);
    const nameInputMode = ref(false);

    function openEditName() {
      nameBuffer.value = profileData.name;
      nameBuffer.value = "d";
      nameInputMode.value = true;
    }
    
    function updateName() {
      profileData.value.name = nameBuffer.value;
      nameInputMode.value = false;
    }
    const visible = ref(false);
    const checked = ref(false);

  </script>
  

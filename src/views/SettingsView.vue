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
      <img @click="openEditImage" :src="authStore.userData.profilePhoto" class="cursor-pointer w-20 h-20 rounded-lg mb-4" />
      <h2 @click="openEditName" class="cursor-pointer text-gray-600 ml-3 text-2xl">{{authStore.userData.name}}</h2>
      <i @click="openEditName" class="cursor-pointer pi-pencil pi text-lg text-gray-600 pl-1"></i>
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
      <div class="cursor-pointer flex flex-col ml-2 mt-2 gap-4">
        <div @click="openEditEmail()" class="flex items-center justify-between">
          <p class="text-gray-700 text-lg">Change Email</p>
          <i class="pi-angle-right pi text-lg text-black"></i>
        </div>
        <div @click="openEditPassword()" class="cursor-pointer flex items-center justify-between">
          <p class="text-gray-700 text-lg">Change Password</p>
          <i class="pi-angle-right pi text-lg text-black"></i>
        </div>
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
        <p @click="visible = true" class="text-red-700 text-lg">
          Log Out
        </p>
      </div>
    </div>
  </div>

  <!-- Dialogs -->
  <Dialog v-model:visible="visible" modal header="Log Out of Your Account" :style="{ width: '50rem' }">
    <div class="flex flex-col gap-2">
      <hr class="border-[#b2b1b1]" />
      <button class="text-red-700 text-lg" @click="logOutAndRedirect"> Log Out </button>
      <hr class="border-[#b2b1b1]" />
      <button class="text-black text-lg" @click="visible = false"> Cancel </button>
    </div>
  </Dialog>

  <Dialog v-model:visible="imageInputMode" modal header="Change profile picture" :style="{ width: '50rem' }">
    <div class="flex items-center gap-4 mb-4">
      <FileUpload ref="imageUploadRef" mode="basic" name="image[]" url="/user/profile_picture/upload" accept="image/*" :maxFileSize="1000000"
        @upload="onImageUpload" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="imageInputMode = false"></Button>
      <Button type="button" label="Save" @click="updateImage"></Button>
    </div>
  </Dialog>

  <Dialog v-model:visible="nameInputMode" :draggable="false" modal header="Change name" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <InputText :modelValue="authStore.userData.name" v-model="nameBuffer" class="flex-auto flex-1 border rounded-md"
        required />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="nameInputMode = false"></Button>
      <Button type="button" label="Save" @click="updateName"></Button>
    </div>
  </Dialog>

  <Dialog v-model:visible="emailInputMode" :draggable="false" modal header="Change Email" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <InputText :modelValue="authStore.userData.email" v-model="emailBuffer" class="flex-auto flex-1 border rounded-md"
        required />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="emailInputMode = false"></Button>
      <Button type="button" label="Save" @click="updateEmail"></Button>
    </div>
  </Dialog>

  <Dialog v-model:visible="passwordInputMode" :draggable="false" modal header="Change password"
    :style="{ width: '25rem' }">
    <Form v-slot="$form" :initialValues :resolver @submit="onPasswordSubmit">
      <div class="flex items-center gap-4 mb-4">
        <label for="password" class="font-semibold w-24"> Enter current password</label>
        <Password name="password" placeholder="********" class="flex-auto flex-1 border rounded-md" fluid
          :feedback="false" :toggleMask="true" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="password_new" class="font-semibold w-24"> Enter new password</label>
        <Password name="password_new" placeholder="********" class="flex-auto flex-1 border rounded-md" fluid
          :feedback="false" :toggleMask="true" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="password_confirm" class="font-semibold w-24"> Confirm new password</label>
        <Password name="password_confirm" placeholder="********" class="flex-auto flex-1 border rounded-md" fluid
          :feedback="false" :toggleMask="true" />
      </div>

      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
        $form.password.error?.message }}
      </Message>

      <Message v-if="$form.password_new?.invalid" severity="error" size="small" variant="simple">{{
        $form.password_new.error?.message }}
      </Message>

      <Message v-if="$form.password_confirm?.invalid" severity="error" size="small" variant="simple">{{
        $form.password_confirm.error?.message }}
      </Message>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="passwordInputMode = false"></Button>
        <Button type="submit" label="Save" @click="updatePassword"></Button>
      </div>
    </Form>
  </Dialog>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ToggleSwitch from 'primevue/toggleswitch'
import { InputText } from 'primevue'
import { Button } from 'primevue'
import Dialog from 'primevue/dialog'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { Form } from '@primevue/forms'
import { Password } from 'primevue'
import { Message } from 'primevue'
import FileUpload from 'primevue/fileupload';

import honeycomb from '@/assets/bw-honeycomb.png'
import imageFallback from '@/assets/image-fallback.jpg'
import bee from '@/assets/avatar.svg'
const authStore = useAuthStore()
const toast = useToast()

const imageInputMode = ref(false);
const imageUploadRef = ref();

function openEditImage() {
  imageInputMode.value = true;
}

const updateImage = () => {
    imageUploadRef.value.upload();
    imageInputMode.value = false;
};

const onImageUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const nameBuffer = ref(null);
const nameInputMode = ref(false);

function openEditName() {
  nameBuffer.value = authStore.userData.name;
  nameInputMode.value = true;
}

function updateName() {
  authStore.userData.name = nameBuffer.value;
  nameInputMode.value = false;
}

const emailBuffer = ref(null);
const emailInputMode = ref(false);

function openEditEmail() {
  emailBuffer.value = authStore.userData.email;
  emailInputMode.value = true;
}

function updateEmail() {
  authStore.userData.email = emailBuffer.value;
  emailInputMode.value = false;
}

const passwordInputMode = ref(false);

const initialValues = reactive({
  password: '',
  password_new: '',
  password_confirm: '',
})

function openEditPassword() {
  passwordInputMode.value = true;
}

const onPasswordSubmit = ({ valid, st }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
    passwordInputMode.value = false;
  }
}

const resolver = ({ values }) => {
  const errors = {}

  if (!values.password) {
    errors.password = [{ message: 'Current password is required.' }]
  }

  if (!values.password_new) {
    errors.password_new = [{ message: 'New password is required.' }]
  }

  if (!values.password_confirm) {
    errors.password_confirm = [
      { message: 'New password confirmation is required.' },
    ]
  }

  if (values.password_new !== values.password_confirm) {
    errors.password_confirm = [{ message: 'Passwords do not match.' }]
  }

  return {
    errors,
  }
}

const router = useRouter();

const logOutAndRedirect = async () => {
  await authStore.logout();
  router.push('/login');
};

const checked = ref(false);
const visible = ref(false);

  
  

if (authStore.userData.profilePhoto == '') {
  authStore.userData.profilePhoto = '/src/assets/image-fallback.jpg';
}
</script>

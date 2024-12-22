<template>
  <div class="flex items-center justify-normal h-screen bg-white">
    <div class="px-5 flex flex-col flex-1">
      <img src="@/assets/avatar.svg" class="w-16 aspect-square" />
      <h1 class="text-2xl font-bold">Join The Campus Quest!</h1>
      <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
        <div class="flex flex-col">
          <h2 class="font-bold text-center border-b-4 border-red-600 my-4">
            Login
          </h2>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label for="username">ITU E-Mail</label>
              <InputText
                name="username"
                type="text"
                placeholder="user@itu.edu.tr"
                autocapitalize="none"
              />
            </div>
            <div class="flex flex-col">
              <label for="password">Password</label>
              <Password
                name="password"
                placeholder="********"
                fluid
                :feedback="false"
                :toggleMask="true"
              />
            </div>
            <div class="flex flex-col">
              <label for="re-password">Confirm Password</label>
              <Password
                name="password_confirm"
                placeholder="********"
                fluid
                :feedback="false"
                :toggleMask="true"
              />
            </div>
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error?.message }}</Message
            >
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error?.message }}</Message
            >
            <Message
              v-if="$form.password_confirm?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password_confirm.error?.message }}</Message
            >
            <Button type="submit" severity="primary" label="Register" />
          </div>
        </div>
      </Form>

      <hr color="black" width="100%" class="h-0.5 my-8" />
      <Button severity="danger" @click="router.push({ name: 'login' })"
        >Login</Button
      >
    </div>
  </div>
</template>

<script setup>
import { Form } from '@primevue/forms'
import { InputText } from 'primevue'
import { Password } from 'primevue'
import { Message } from 'primevue'
import { Button } from 'primevue'
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const initialValues = reactive({
  username: '',
  password: '',
  password_confirm: '',
})

const resolver = ({ values }) => {
  const errors = {}

  if (!values.username) {
    errors.username = [{ message: 'Username is required.' }]
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required.' }]
  }

  if (!values.password_confirm) {
    errors.password_confirm = [
      { message: 'Password confirmation is required.' },
    ]
  }

  if (values.password !== values.password_confirm) {
    errors.password_confirm = [{ message: 'Passwords do not match.' }]
  }

  return {
    errors,
  }
}

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })

    router.push({ name: 'email_check' })
  }
}
</script>

<style scoped></style>

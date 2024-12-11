<template>
  <div class="flex items-center justify-normal h-screen bg-white">
    <div class="px-5 flex flex-col flex-1 gap-4">
      <h1 class="text-xl font-bold my-4 border-b-4 border-red-600">
        We have sent a verification code to your ITU mail
      </h1>
      <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
        <div class="flex flex-col">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label for="verification">Verification Code</label>
              <InputText name="verification" type="text" placeholder="" />
            </div>
            <Message
              v-if="$form.verification?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.verification.error?.message }}</Message
            >
            <Button type="submit" severity="danger" label="Enter" />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from '@primevue/forms'
import { InputText } from 'primevue'
import { Message } from 'primevue'
import { Button } from 'primevue'
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const initialValues = reactive({
  verification: '',
})

const resolver = ({ values }) => {
  const errors = {}

  if (!values.verification) {
    errors.verification = [{ message: 'Verification code is required.' }]
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

    router.push({ name: 'login' })
  }
}
</script>

<style scoped></style>

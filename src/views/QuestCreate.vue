<template>
<Content title="Create a new quest" bgColor="#54af7d" titleColor="white">
  <Form v-slot="$form" @submit="onFormSubmit" class="flex flex-col gap-4 p-4">
    <div class="flex items-top gap-2">
      <label class="w-24 p-1 text-right" for="quest_title">Quest title</label>
      <InputText class="flex-1 border rounded-md px-2 py-1" id="quest_title" required />
    </div>
    <div class="flex items-top gap-2">
      <label class="w-24 p-1 text-right" for="quest_description">Description</label>
      <TextArea rows="4" class="flex-1 border rounded-md px-2 py-1" id="quest_description" required />
    </div>
    <div class="flex items-top gap-2">
      <label class="w-24 p-1 text-right" for="select_icon">Icon</label>
      <div class="flex flex-1 flex-wrap items-center">
        <div
          v-for="(icon, index) in icons"
          :key="index"
          class=""
          >
          <img
            @click="selectedIconIndex = index" :src="icon.path" :alt="icon.name"
            :class="{ 'outline outline-2 outline-black' : index == selectedIconIndex }"
            class="w-16 p-1 cursor-pointer"
            />
        </div>
      </div>
    </div>
    
    <Button class="w-24 mx-auto" type="submit" severity="primary" label="Create" />
    </Form>
  </Content>
  <MenuBar />
</template>

<script setup>
import Content from '@/components/Content.vue'
import MenuBar from '@/components/MenuBar.vue'
import { Form } from '@primevue/forms'
import { InputText } from 'primevue'
import { Button } from 'primevue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const selectedIconIndex = ref(0);

const icons = ref([
    { name: 'regular', path: "/quest_icon.png" },
    { name: 'golden', path: "/quest_icon_golden.png" }
]);

const toast = useToast()
const onFormSubmit = ({ valid }) => {
  if (valid) {
    console.log("Success");
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  }
}

</script>

<style lang="scss" scoped></style>

<template>
<div class="w-screen h-screen bg-white">
  <!-- Header -->
  <header
    class="fixed top-[0%] w-full px-[4%] bg-emerald-500 text-white py-7 rounded-b-3xl shadow-md overflow-hidden"
    >
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-2xl font-bold">Quest page</div>
    </div>
    <img
      src="/honeycomb.png" 
      class="absolute top-0 right-0 opacity-40 transform scale-100 -translate-y-40"
      />
  </header>
  
  <!-- Quest List -->
  <main class="container mx-auto px-4 mt-6">
  <div class="min-h-[80px] overflow-y-auto"> </div>

  <div
    class="flex mb-3">
  <button
    @click="display_filter = 0"
    :class="[(display_filter === 0) ? 'bg-emerald-500' : 'bg-gray-500']"
    class="text-white text-sm font-medium px-4 py-1 rounded-full ml-1"
    >
    Show all
  </button>
  <button
    @click="display_filter = 1"
    :class="[(display_filter === 1) ? 'bg-emerald-500' : 'bg-gray-500']"
    class="text-white text-sm font-medium px-4 py-1 rounded-full ml-1"
    >
    Show active
  </button>
  <button
    @click="display_filter = 2"
    :class="[(display_filter === 2) ? 'bg-emerald-500' : 'bg-gray-500']"
    class="text-white text-sm font-medium px-4 py-1 rounded-full ml-1"
    >
    Show completed
  </button>
  </div>

    <ul class="space-y-4">
      <li
        v-for="quest in quests_displayed"
        :key="quest.id"
        class="bg-white p-4 shadow rounded-md"
        >
        <div
          class="flex items-center justify-between"
          >
          <div
              @click="toggle_details(quest)"
            class="flex space-x-4 items-center">
            <img
              class="h-11 w-11 text-gray-500"
              :src="quest_icon_src[quest.type]"
              />
            <h3 :class="{'line-through decoration-2' : quest.completed }" class="text-xl font-bold">{{ quest.title }}</h3>
          </div>
          <div
            class="flex space-x-4"
            >
            <button
              @click="toggle_completed(quest)"
              :class="{'line-through decoration-1' : quest.completed}"
              class="mt-2 bg-emerald-500 text-white text-sm font-medium px-4 py-1 rounded-full"
              >
              Done
            </button>
            <button
              @click="toggle_details(quest)"
              class="mt-3 text-emerald-500 hover:text-emerald-700 text-sm py-1"
              >
              <i :class="[quest.expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down']" style="font-size: 1rem"></i>
            </button>      
          </div>
        </div>
        <div>
          <p :class="{'line-through decoration-1' : quest.completed}" class="mt-2 text-sm text-gray-500">
            {{ quest.expanded ? quest.details : '' }}
          </p>
        </div>
      </li>
    </ul>
    <div class="min-h-[150px] overflow-y-auto"> </div>
  </main>
  
  <MenuBar />
</div>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue'
import { ref, computed } from 'vue'

const quest_icon_src = ref({
    regular : "/quest_icon.png",
    golden : "/quest_icon_golden.png",
});

const quests = ref([
  {
    title: "Find the Hidden Pond",
    type: "regular",
    details: "Explore the campus to discover the hidden pond near the science building. It's a peaceful spot, perfect for some quiet time.",
    expanded: false, completed: false
  },
  {
    title: "Library Challenge",
    type: "regular",
    details: "Visit the library and find a book on your favorite subject. Take a picture of it and show it to the librarian to complete this quest.",
    expanded: false, completed: false
  },
  {
    title: "Campus Fitness Walk",
    type: "regular",
    details: "Walk around the entire campus and snap a selfie in front of the main statue. Share the picture in the group to earn points.",
    expanded: false, completed: false
  },
  {
    title: "Professor's Secret",
    type: "regular",
    details: "Ask a professor about a topic they are passionate about, and write down the most interesting thing you learned. Share it with your classmates.",
    expanded: false, completed: false
  },
  {
    title: "Art Gallery Hunt",
    type: "golden",
    details: "Find three pieces of art on campus that you find inspiring. Take a photo with each and add them to your quest report.",
    expanded: false, completed: false
  },
  {
    title: "Community Service",
    type: "golden",
    details: "Volunteer at the community center for at least one hour. Snap a picture while helping out and share it with the group to complete the quest.",
    expanded: false, completed: false
  }
]);

const display_filter = ref(0); // 0 - show all, 1 - show active, 2 - show completed

function toggle_details(quest) {
  quest.expanded = !quest.expanded;
}

function toggle_completed(quest) {
  quest.completed = !quest.completed;
}

const quests_displayed = computed(() => {
   if (display_filter.value === 0) return quests.value;
    return quests.value.filter((e) => {
        if (display_filter.value === 1)
            return e.completed === false;
        return e.completed === true;
    });
});

</script>

<style lang="scss" scoped></style>

<template>
    <div class="min-h-screen bg-[#803049] p-4 relative">
      <div class="overflow-hidden absolute top-0 left-0 right-0 z-0 max-w-full">
        <img :src="honeycomb" class="object-cover -translate-y-40 translate-x-12 opacity-45 scale-150" />
      </div>
    </div>
  
    <div class="absolute top-4 left-4 z-10 mt-12 gap-3">
      <RouterLink to="/settings" class="pi pi-arrow-left text-white text-lg mr-8"></RouterLink>
      <div class="flex flex-row items-center mt-3">
        <i class="pi-sparkles pi text-2xl text-white"></i>
        <h1 class="text-white ml-2 text-2xl">About Us</h1>
      </div>
    </div>
  
    <div class="bg-white w-full rounded-t-[2rem] px-4 pt-6 mt-36 mb-0 absolute top-0 left-0 z-10 h-full">
      <div class="flex flex-col justify-center items-center mb-4 w-full">
        <img :src="bee" alt="Icon" class="w-24 h-24 rounded-lg" />
        <p class="text-gray-600 text-2xl ">Welcome to QuestCampus</p>
      </div>
      
      <p class="text-gray-600 ml-2 mb-2 text-lg">
        This is a platform created by a team of seven students from Istanbul Technical University. Our goal is to make campus life more fun by combining technology and social engagement.
      </p>
      <p class="text-gray-600 ml-2 mb-2 text-lg">
        With QuestCampus, students can complete exciting daily quests, and connect with friends in a social network. Our app features achievements and a point system to make campus interactions fun and rewarding.
      </p>
      <p class="text-gray-600 ml-2 mb-2 text-lg">
        The application fosters real world connections, promotes campus exploration, and creates an inclusive, secure environment for all users. Built with modern technologies like FastAPI, Vue.js, and PostgreSQL, QuestCampus ensures an engaging experience for its users.
      </p>
      <p class="text-gray-600 ml-2 mb-2 text-lg">
        Whether you're earning badges for completing quests or showcasing achievements on your profile, QuestCampus has something for all ITU students. We're excited to bring this unique project to life and invite you to join our journey!
      </p>
  
      <hr class="border-gray-400 mt-2 mx-1" />
      <div class="mt-2 ml-2">
        <h2 class="text-xl font-semibold text-gray-600">Our Team Members</h2>
        <div class="mt-2">
          <h3 class="text-lg text-gray-500">Backend</h3>
          <ul class="list-disc ml-5 text-gray-600">
            <li>Kanan Bandaliyev</li>
            <li>MHD Kamal Rushdi</li>
            <li>Firat Kizilboğa</li>
            <li>Dana Al Jasem</li>
          </ul>
        </div>
        <div class="mt-2">
          <h3 class="text-lg text-gray-500">Frontend</h3>
          <ul class="list-disc ml-5 text-gray-600">
            <li>Mert Bozkurtlar</li>
            <li>Denis Davidoglu</li>
            <li>Erblina Nivokazi</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  import bee from '@/assets/avatar.svg'
  import honeycomb from '@/assets/bw-honeycomb.png'
  </script>
  
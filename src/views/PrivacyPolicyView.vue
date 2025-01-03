<template>
  <div class="min-h-screen bg-[#803049] p-4 relative">
    <div class="overflow-hidden absolute top-0 left-0 right-0 z-0 max-w-full">
      <img :src="honeycomb" class="object-cover -translate-y-40 translate-x-12 opacity-45 scale-150" />
    </div>
  </div>

  <div class="absolute top-4 left-4 z-10 mt-12 gap-3">
    <RouterLink to="/settings" class="pi pi-arrow-left text-white text-lg mr-8"></RouterLink>
    <div class="flex flex-row items-center mt-3">
      <i class="pi-lock pi text-2xl text-white"></i>
      <h1 class="text-white ml-2 text-2xl">Privacy Policy</h1>
    </div>
  </div>

  <div class="bg-white w-full rounded-t-[2rem] px-4 pt-6 mt-36 mb-0 absolute top-0 left-0 z-10 h-full">
    <p class="text-gray-600 ml-2 text-lg">
      Your privacy is important to us. This Privacy Policy explains how QuestCampus collects, uses, and protects your personal data in compliance with the General Data Protection Regulation (GDPR).
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>Information We Collect:</strong> We collect personal information such as your name, email address, and university ID for registration purposes. We may also gather location and activity data to provide features such as quests and friend connections.
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>Legal Basis for Data Processing:</strong> We process your data based on your consent, the necessity to perform a contract, our legitimate interests, or compliance with legal obligations.
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>How We Use Your Data:</strong> We use your data to enable and improve features like quest tracking and friend connections, ensuring a secure and personalized experience.
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>Data Sharing:</strong> Your data is not shared with third parties, except for essential services such as secure storage providers or legal compliance. We ensure that third parties meet GDPR requirements.
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>Data Retention:</strong> Your data is retained only as long as necessary for the purposes stated or as required by law. Once no longer needed, data is securely deleted or anonymized.
    </p>
    <div class="text-gray-600 ml-2 text-lg">
      <strong>Your Rights:</strong> Under GDPR, you have the right to:
      <ul class="list-disc ml-4">
        <li>Access, correct, or delete your personal data.</li>
        <li>Withdraw consent at any time.</li>
        <li>Request data portability in a commonly used format.</li>
        <li>Restrict or object to data processing in certain situations.</li>
        <li>Lodge a complaint with your local data protection authority.</li>
      </ul>
      To exercise your rights, contact us at [email address].
    </div>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>Security Measures:</strong> We implement industry-standard security practices to protect your personal data from unauthorized access, alteration, or misuse.
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      <strong>Policy Updates:</strong> This Privacy Policy may be updated periodically. We will notify users of any significant changes.
    </p>
    <p class="text-gray-600 ml-2 text-lg">
      For any questions or concerns about this Privacy Policy, contact us at [email address].
    </p>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import honeycomb from '@/assets/bw-honeycomb.png'
</script>

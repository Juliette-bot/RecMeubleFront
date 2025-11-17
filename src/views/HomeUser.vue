<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Ici s’affichent les routes enfants : dashboard, Mes meubles, etc. -->
    <RouterView />
  </main>
</template>

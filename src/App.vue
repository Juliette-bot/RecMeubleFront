<style scoped></style>
<script setup lang="ts">
import FooterCompo from './components/FooterCompo.vue'

import NavBar from './components/NavBar.vue'

import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.path === '/' || route.path === '') {
    router.push('/')
  }
})
</script>

<template>
  <header class="m-0 p-0">
    <NavBar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <FooterCompo />
  </footer>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>

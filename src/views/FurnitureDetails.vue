<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Furniture } from '@/types/Furniture' // adapte le chemin si besoin

const route = useRoute()
const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const rawId = route.params.id
    console.log('route.params.id = ', rawId)

    if (!rawId) {
      throw new Error('ID du meuble manquant dans l’URL')
    }

    const id = Array.isArray(rawId) ? rawId[0] : rawId

    const res = await fetch(`/api/furniture/${id}`)
    console.log('status détail meuble', res.status)

    if (!res.ok) throw new Error('Impossible de charger ce meuble')

    furniture.value = (await res.json()) as Furniture
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e)
    error.value = e.message ?? 'Erreur inconnue'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6">
    <RouterLink to="/" class="underline text-sm mb-4 inline-block">
      ← Retour à la liste
    </RouterLink>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="furniture" class="grid md:grid-cols-2 gap-6">
      <!--    <img
        :src="furniture.imageUrl" -->
      <!--   :alt="furniture.name"
        class="w-full rounded-2xl shadow"
      />  -->

      <div>
        <h1 class="text-3xl font-bold mb-2">{{ furniture.name }}</h1>
        <p class="text-xl font-semibold mb-2">{{ furniture.price }} €</p>
        <p class="text-sm mb-3">État : {{ furniture.status }}</p>
        <p>{{ furniture.description }}</p>
      </div>
    </div>
  </div>
</template>

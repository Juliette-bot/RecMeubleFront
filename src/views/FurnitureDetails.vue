<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Furniture } from '@/types/Furniture' // adapte le chemin si besoin

const route = useRoute()
const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const BACKEND_URL = 'http://localhost:8080'

const getImageUrl = (url: string | undefined) => {
  if (!url) return ''

  if (url.startsWith('http')) return url

  if (url.startsWith('/')) return BACKEND_URL + url

  return `${BACKEND_URL}/uploads/furniture/${url}`
}

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
      <!-- COLONNE GAUCHE : image principale + galerie -->
      <div>
        <!-- IMAGE PRINCIPALE -->
        <div v-if="furniture?.pictures?.length">
          <img
            :src="getImageUrl(furniture.pictures[0].url)"
            :alt="furniture.pictures[0].altText"
            class="w-full rounded-2xl shadow"
          />
        </div>

        <!-- GALERIE DE MINIATURES -->
        <div class="flex gap-2 mt-3" v-if="furniture?.pictures?.length > 1">
          <img
            v-for="p in furniture.pictures"
            :key="p.id"
            :src="getImageUrl(p.url)"
            :alt="p.altText"
            class="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Les meubles disponibles</h1>
        <p class="mt-2 text-sm text-gray-600">
          Découvrez notre sélection de meubles de seconde main
        </p>
      </div>

      <!-- Chargement -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"
          ></div>
          <p class="mt-4 text-sm text-gray-600">Chargement des meubles...</p>
        </div>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="rounded-lg bg-red-50 p-4">
        <div class="flex gap-3">
          <svg
            class="h-5 w-5 flex-shrink-0 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>
      </div>

      <!-- Aucun meuble -->
      <div
        v-else-if="furniture.length === 0"
        class="rounded-lg bg-white p-12 text-center shadow-sm"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <h2 class="mt-4 text-lg font-medium text-gray-900">Aucun meuble disponible</h2>
        <p class="mt-2 text-sm text-gray-500">
          Revenez plus tard pour découvrir de nouvelles offres
        </p>
      </div>

      <!-- Grille de meubles -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RouterLink
          v-for="item in furniture"
          :key="item.id"
          :to="`/furniture/${item.id}`"
          class="group block"
        >
          <article
            class="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
          >
            <!-- Image -->
            <div class="relative aspect-square overflow-hidden bg-gray-100">
              <img
                v-if="item.pictures && item.pictures.length"
                :src="getImageUrl(item.pictures[0].url)"
                :alt="item.pictures[0].altText"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
                <svg
                  class="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Badge localisation (optionnel) -->
              <div
                v-if="item.cityName"
                class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm"
              >
                <span class="flex items-center gap-1">
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {{ item.cityName }}
                </span>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-4">
              <!-- Titre et type -->
              <div class="mb-2">
                <h3
                  class="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition"
                >
                  {{ item.name }}
                </h3>
                <p v-if="item.typeName" class="mt-1 text-xs text-gray-500">
                  {{ item.typeName }}
                </p>
              </div>

              <!-- Description -->
              <p class="mb-3 text-sm text-gray-600 line-clamp-2">
                {{ item.description }}
              </p>

              <!-- Détails -->
              <div class="mb-3 flex flex-wrap gap-2 text-xs text-gray-500">
                <span v-if="item.height && item.width" class="flex items-center gap-1">
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  {{ item.height }} × {{ item.width }} cm
                </span>
              </div>

              <!-- Prix -->
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-indigo-600">
                  {{ formatPrice(item.price) }}
                </span>
                <span
                  class="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all"
                >
                  Voir
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Furniture } from '@/types/Furniture'

const furniture = ref<Furniture[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const BACKEND_URL = 'http://localhost:8080'

const getImageUrl = (url: string | undefined) => {
  if (!url) return ''

  let finalUrl: string

  if (url.startsWith('http')) {
    finalUrl = url
  } else if (url.startsWith('/')) {
    finalUrl = BACKEND_URL + url
  } else {
    finalUrl = `${BACKEND_URL}/uploads/furniture/${url}`
  }

  return finalUrl
}

const fetchFurniture = async () => {
  try {
    const res = await fetch('/api/furniture')
    if (!res.ok) {
      throw new Error('Erreur HTTP ' + res.status)
    }
    furniture.value = (await res.json()) as Furniture[]
    console.log('Furniture reçus :', furniture.value)
  } catch (e) {
    console.error(e)
    error.value = 'Impossible de charger les meubles'
  } finally {
    loading.value = false
  }
}

onMounted(fetchFurniture)

const formatPrice = (price: number) => price.toFixed(2) + ' €'
</script>

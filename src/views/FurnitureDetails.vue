<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Furniture } from '@/types/Furniture' // adapte le chemin si besoin
import { useCart } from '@/stores/cart'
import AddToCartModal from '@/components/AddToCartModal.vue'

const carts = useCart()
const route = useRoute()
const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showModal = ref(false)
const BACKEND_URL = 'http://localhost:8080'

const getImageUrl = (url: string | undefined) => {
  if (!url) return ''

  if (url.startsWith('http')) return url

  if (url.startsWith('/')) return BACKEND_URL + url

  return `${BACKEND_URL}/uploads/furniture/${url}`
}
const formatPrice = (price: number) => price.toFixed(2) + ' €'

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

const handleAddToCart = () => {
  if (furniture.value) {
    carts.addItems(furniture.value)
    showModal.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Bouton retour -->
      <RouterLink
        to="/"
        class="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <svg
          class="h-4 w-4 transition group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour à la liste
      </RouterLink>

      <!-- Loading / Error states -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"
          ></div>
          <p class="mt-4 text-sm text-gray-600">Chargement...</p>
        </div>
      </div>

      <div v-else-if="error" class="rounded-lg bg-red-50 p-4">
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>

      <!-- Contenu principal -->
      <div v-else-if="furniture" class="grid gap-8 lg:grid-cols-2">
        <!-- COLONNE GAUCHE : Images -->
        <div class="space-y-4">
          <!-- Image principale -->
          <div
            v-if="furniture?.pictures?.length"
            class="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              :src="getImageUrl(furniture.pictures[0].url)"
              :alt="furniture.pictures[0].altText"
              class="aspect-square w-full object-cover"
            />
          </div>

          <!-- Galerie de miniatures -->
          <div
            v-if="furniture.pictures && furniture.pictures.length > 1"
            class="grid grid-cols-4 gap-3"
          >
            <button
              v-for="p in furniture.pictures"
              :key="p.id"
              class="group relative overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200 transition hover:ring-indigo-500"
            >
              <img
                :src="getImageUrl(p.url)"
                :alt="p.altText"
                class="aspect-square w-full object-cover transition group-hover:scale-110"
              />
            </button>
          </div>
        </div>

        <!-- COLONNE DROITE : Informations -->
        <div class="flex flex-col gap-6">
          <!-- Card principale -->
          <div class="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
            <!-- Titre et prix -->
            <div class="mb-6 border-b border-gray-200 pb-6">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ furniture.name }}
              </h1>
              <p class="mt-3 text-3xl font-bold text-indigo-600">
                {{ formatPrice(furniture.price) }}
              </p>
            </div>

            <!-- Description -->
            <div class="mb-6 space-y-4">
              <p class="text-gray-600 leading-relaxed">
                {{ furniture.description }}
              </p>
            </div>

            <!-- Détails -->
            <div class="mb-6 space-y-3 rounded-lg bg-gray-50 p-4">
              <div v-if="furniture.typeName" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Type</span>
                <span class="text-sm font-semibold text-gray-900">{{ furniture.typeName }}</span>
              </div>

              <div v-if="furniture.cityName" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Localisation</span>
                <span class="text-sm font-semibold text-gray-900">
                  {{ furniture.cityName }}
                  <span v-if="furniture.zipcode" class="text-gray-600"
                    >({{ furniture.zipcode }})</span
                  >
                </span>
              </div>
            </div>

            <!-- Bouton ajouter au panier -->
            <button
              type="button"
              @click="handleAddToCart"
              class="group flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                class="h-5 w-5 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddToCartModal v-model="showModal" :furniture="furniture" />
  </div>
</template>

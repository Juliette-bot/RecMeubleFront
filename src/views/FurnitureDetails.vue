<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Bouton retour -->
      <RouterLink
        to="/"
        class="group mb-8 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-gray-900 hover:shadow-sm"
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
        Retour à l'accueil
      </RouterLink>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"
          ></div>
          <p class="mt-4 text-sm text-gray-600">Chargement du meuble...</p>
        </div>
      </div>

      <!-- Error -->
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

      <!-- Contenu principal -->
      <div v-else-if="furniture" class="grid gap-8 lg:grid-cols-2">
        <!-- COLONNE GAUCHE : Images -->
        <div class="space-y-4">
          <!-- Image principale -->
          <div
            v-if="furniture?.pictures?.length"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              :src="getImageUrl(currentImage.url)"
              :alt="currentImage.altText"
              class="aspect-square w-full object-cover transition duration-500"
            />

            <!-- Navigation d'images (si plusieurs) -->
            <template v-if="furniture.pictures.length > 1">
              <button
                @click="previousImage"
                class="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100"
              >
                <svg
                  class="h-6 w-6 text-gray-700"
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
              </button>
              <button
                @click="nextImage"
                class="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100"
              >
                <svg
                  class="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <!-- Indicateurs -->
              <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                <button
                  v-for="(pic, index) in furniture.pictures"
                  :key="pic.id"
                  @click="currentImageIndex = index"
                  class="h-2 w-2 rounded-full transition"
                  :class="
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'
                  "
                />
              </div>
            </template>
          </div>

          <!-- Placeholder si pas d'image -->
          <div
            v-else
            class="flex aspect-square items-center justify-center rounded-2xl bg-white shadow-sm"
          >
            <svg
              class="h-24 w-24 text-gray-300"
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

          <!-- Galerie de miniatures -->
          <div
            v-if="furniture.pictures && furniture.pictures.length > 1"
            class="grid grid-cols-4 gap-3"
          >
            <button
              v-for="(p, index) in furniture.pictures"
              :key="p.id"
              @click="currentImageIndex = index"
              class="group relative overflow-hidden rounded-lg bg-white shadow-sm ring-2 transition"
              :class="
                index === currentImageIndex
                  ? 'ring-indigo-500'
                  : 'ring-gray-200 hover:ring-indigo-300'
              "
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
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-4xl font-bold text-indigo-600">
                  {{ formatPrice(furniture.price) }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div v-if="furniture.description" class="mb-6">
              <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Description
              </h2>
              <p class="leading-relaxed text-gray-700">
                {{ furniture.description }}
              </p>
            </div>

            <!-- Détails avec icônes -->
            <div class="mb-6 space-y-3 rounded-lg bg-gray-50 p-4">
              <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Caractéristiques
              </h2>

              <div v-if="furniture.height && furniture.width" class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                <span class="text-sm text-gray-700">
                  <span class="font-medium">Dimensions :</span> {{ furniture.height }} ×
                  {{ furniture.width }} cm
                </span>
              </div>

              <div v-if="furniture.typeName" class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span class="text-sm text-gray-700">
                  <span class="font-medium">Type :</span> {{ furniture.typeName }}
                </span>
              </div>

              <div v-if="furniture.cityName" class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                <span class="text-sm text-gray-700">
                  <span class="font-medium">Localisation :</span>
                  {{ furniture.cityName }}
                  <span v-if="furniture.zipcode" class="text-gray-500"
                    >({{ furniture.zipcode }})</span
                  >
                </span>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="space-y-3">
              <!-- Ajouter au panier -->
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

              <!-- Ajouter aux favoris (optionnel) -->
              <button
                type="button"
                class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <HeartLucide class="h-5 w-5" />
                Ajouter aux favoris
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <AddToCartModal v-model="showModal" :furniture="furniture" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Furniture } from '@/types/Furniture'
import { useCart } from '@/stores/cart'
import AddToCartModal from '@/components/AddToCartModal.vue'
import HeartLucide from '@/components/icons/HeartLucide.vue'

const carts = useCart()
const route = useRoute()
const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showModal = ref(false)
const currentImageIndex = ref(0)
const BACKEND_URL = 'http://localhost:8080'

const currentImage = computed(() => {
  if (!furniture.value?.pictures?.length) return { url: '', altText: '' }
  return furniture.value.pictures[currentImageIndex.value]
})

const nextImage = () => {
  if (!furniture.value?.pictures) return
  currentImageIndex.value = (currentImageIndex.value + 1) % furniture.value.pictures.length
}

const previousImage = () => {
  if (!furniture.value?.pictures) return
  currentImageIndex.value =
    (currentImageIndex.value - 1 + furniture.value.pictures.length) %
    furniture.value.pictures.length
}

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
      throw new Error('ID du meuble manquant dans l"URL')
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

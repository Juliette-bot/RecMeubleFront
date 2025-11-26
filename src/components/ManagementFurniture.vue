<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <svg
              class="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Modération des meubles</h1>
            <p class="mt-1 text-sm text-gray-600">
              {{ furniture.length }} meuble{{ furniture.length > 1 ? 's' : '' }} en attente de
              validation
            </p>
          </div>
        </div>
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

      <!-- Liste vide -->
      <div
        v-else-if="furniture.length === 0"
        class="rounded-2xl bg-white p-12 text-center shadow-sm"
      >
        <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg
            class="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="mt-6 text-xl font-semibold text-gray-900">Tout est à jour !</h2>
        <p class="mt-2 text-sm text-gray-500">Aucun meuble en attente de modération</p>
      </div>

      <!-- Tableau -->
      <div v-else class="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-50">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Image
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Meuble
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Prix
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Description
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Vendeur
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Statut
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="item in furniture" :key="item.id" class="transition hover:bg-gray-50">
                <!-- Image -->
                <td class="px-6 py-4">
                  <div class="h-16 w-16 overflow-hidden rounded-lg">
                    <img
                      v-if="item?.pictures?.length"
                      :src="getImageUrl(item.pictures[0].url)"
                      :alt="item.pictures[0].altText"
                      class="h-full w-full object-cover"
                    />
                    <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
                      <svg
                        class="h-6 w-6 text-gray-400"
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
                  </div>
                </td>

                <!-- Nom -->
                <td class="px-6 py-4">
                  <p class="font-semibold text-gray-900">{{ item.name }}</p>
                  <p v-if="item.cityName" class="mt-1 text-xs text-gray-500">
                    {{ item.cityName }}
                  </p>
                </td>

                <!-- Type -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    {{ item.typeName }}
                  </span>
                </td>

                <!-- Prix -->
                <td class="px-6 py-4">
                  <span class="text-lg font-bold text-indigo-600">{{
                    formatPrice(item.price)
                  }}</span>
                </td>

                <!-- Description -->
                <td class="px-6 py-4">
                  <p class="max-w-xs truncate text-sm text-gray-600" :title="item.description">
                    {{ item.description }}
                  </p>
                </td>

                <!-- Vendeur -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100"
                    >
                      <span class="text-xs font-semibold text-indigo-600">
                        {{ getInitials(item) }}
                      </span>
                    </div>
                    <div class="text-sm">
                      <p class="font-medium text-gray-900">
                        {{ item.sellerFirstname }} {{ item.sellerLastname }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Statut -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                    :class="{
                      'bg-yellow-100 text-yellow-800': item.status === 'PENDING_REVIEW',
                      'bg-green-100 text-green-800': item.status === 'PUBLISHED',
                      'bg-red-100 text-red-800': item.status === 'REJECTED',
                    }"
                  >
                    <span
                      class="h-1.5 w-1.5 rounded-full"
                      :class="{
                        'bg-yellow-600': item.status === 'PENDING_REVIEW',
                        'bg-green-600': item.status === 'PUBLISHED',
                        'bg-red-600': item.status === 'REJECTED',
                      }"
                    ></span>
                    {{ getStatusLabel(item.status) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      type="button"
                      @click="putFurnitureStatusValidated(item.id)"
                      :disabled="processingId === item.id"
                      class="inline-flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg
                        v-if="processingId === item.id"
                        class="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Valider
                    </button>
                    <button
                      type="button"
                      @click="putFurnitureStatusRejected(item.id)"
                      :disabled="processingId === item.id"
                      class="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Rejeter
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Furniture } from '@/types/Furniture'
import { apiFetch } from '@/utils/api'
import { ref, onMounted } from 'vue'

const furniture = ref<Furniture[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const processingId = ref<number | null>(null)

const formatPrice = (price: number) => price.toFixed(2) + ' €'
const BACKEND_URL = 'http://localhost:8080'

const getImageUrl = (url: string | undefined) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) return BACKEND_URL + url
  return `${BACKEND_URL}/uploads/furniture/${url}`
}

/* const getInitials = (item: Furniture) => {
  const first = item.sellerFirstname?.[0] || ''
  const last = item.sellerLastname?.[0] || ''
  return (first + last).toUpperCase() || 'U'
} */

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    PENDING_REVIEW: 'En attente',
    PUBLISHED: 'Publié',
    REJECTED: 'Rejeté',
  }
  return labels[status] || status
}

async function getFurnitureByStatus() {
  loading.value = true
  error.value = null

  try {
    const res = await apiFetch(`/api/admin/furniture/pending_review`)

    if (!res.ok) throw new Error('Impossible de charger les meubles.')

    furniture.value = (await res.json()) as Furniture[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e)
    error.value = e.message || 'Erreur lors du chargement'
  } finally {
    loading.value = false
  }
}

onMounted(getFurnitureByStatus)

async function putFurnitureStatusValidated(furnitureId: number): Promise<void> {
  processingId.value = furnitureId
  try {
    const res = await apiFetch(`/api/admin/furniture/${furnitureId}/validated`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'PUBLISHED',
      }),
    })

    if (!res.ok) throw new Error('Impossible de valider le meuble.')

    await getFurnitureByStatus()
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la validation')
  } finally {
    processingId.value = null
  }
}

async function putFurnitureStatusRejected(furnitureId: number) {
  processingId.value = furnitureId
  try {
    const res = await apiFetch(`/api/admin/furniture/${furnitureId}/rejected`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'REJECTED',
      }),
    })

    if (!res.ok) throw new Error('Impossible de rejeter le meuble.')

    await getFurnitureByStatus()
  } catch (error) {
    console.error(error)
    alert('Erreur lors du rejet')
  } finally {
    processingId.value = null
  }
}
</script>

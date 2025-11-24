<template>
  <section class="p-6">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Modération des meubles</h2>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Nom
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Prix
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="item in furniture" :key="item.id" class="hover:bg-gray-50 transition">
              <td v-if="item?.pictures?.length" class="px-6 py-4">
                <img
                  :src="getImageUrl(item.pictures[0].url)"
                  :alt="item.pictures[0].altText"
                  class="w-16 h-16 object-cover rounded-lg"
                />
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-900">{{ item.name }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-600">{{ item.typeName }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="font-semibold text-gray-900">{{ formatPrice(item.price) }}</span>
              </td>
              <td class="px-6 py-4 max-w-xs">
                <p class="text-sm text-gray-600 truncate">{{ item.description }}</p>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-yellow-100 text-yellow-800': item.status === 'PENDING_REVIEW',
                    'bg-green-100 text-green-800': item.status === 'PUBLISHED',
                    'bg-red-100 text-red-800': item.status === 'REJECTED',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="putFurnitureStatusValidated(item.id)"
                    class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                  >
                    Valider
                  </button>
                  <button
                    type="button"
                    @click="putFurnitureStatusRejected(item.id)"
                    class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                  >
                    Rejeter
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="furniture.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Aucun meuble en attente de modération</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Furniture } from '@/types/Furniture'
import { apiFetch } from '@/utils/api'
import { ref, onMounted } from 'vue'

const furniture = ref<Furniture[]>([])

const formatPrice = (price: number) => price.toFixed(2) + ' €'
const BACKEND_URL = 'http://localhost:8080'

const getImageUrl = (url: string | undefined) => {
  if (!url) return ''

  if (url.startsWith('http')) return url

  if (url.startsWith('/')) return BACKEND_URL + url

  return `${BACKEND_URL}/uploads/furniture/${url}`
}

async function getFurnitureByStatus() {
  const res = await apiFetch(`/api/admin/furniture/pending_review`)
  console.log(res.status)

  if (!res.ok) throw new Error('Impossible de charger les meubles.')

  furniture.value = (await res.json()) as Furniture[]
}

onMounted(getFurnitureByStatus)

async function putFurnitureStatusValidated(furnitureId: number): Promise<void> {
  try {
    const res = await apiFetch(`/api/admin/furniture/${furnitureId}/validated`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'PUBLISHED',
      }),
    })

    if (!res.ok) throw new Error('Impossible de valider le meuble.')

    // Recharge la liste après validation
    await getFurnitureByStatus()
  } catch (error) {
    console.error(error)
  }
}

async function putFurnitureStatusRejected(furnitureId: number) {
  try {
    const res = await apiFetch(`/api/admin/furniture/${furnitureId}/rejected`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'REJECTED',
      }),
    })

    if (!res.ok) throw new Error('Impossible de rejeter le meuble.')

    // Recharge la liste après rejet
    await getFurnitureByStatus()
  } catch (error) {
    console.error(error)
  }
}
</script>

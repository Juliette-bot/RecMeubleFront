<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Furniture } from '@/types/Furniture'

const furniture = ref<Furniture[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchFurniture = async () => {
  try {
    const res = await fetch('/api/furniture') // via proxy Vite comme pour /api/register
    if (!res.ok) {
      throw new Error('Erreur HTTP ' + res.status)
    }
    furniture.value = (await res.json()) as Furniture[]
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

<template>
  <section class="p-6">
    <h2 class="text-2xl font-bold mb-4">Les meubles disponibles</h2>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="item in furniture"
        :key="item.id"
        :to="`/furniture/${item.id}`"
        class="block"
      >
        <article
          class="rounded-2xl shadow bg-white p-4 flex flex-col gap-2 hover:shadow-lg transition cursor-pointer"
        >
          <h3 class="text-lg font-semibold">
            {{ item.name }}
          </h3>

          <p class="text-sm text-gray-600">
            {{ item.description }}
          </p>

          <p class="text-sm text-gray-700" v-if="item.typeName">
            Type : <span class="font-medium">{{ item.typeName }}</span>
          </p>

          <p class="text-sm text-gray-700" v-if="item.cityName">
            Localisation :
            <span class="font-medium">
              {{ item.cityName }}
              <span v-if="item.zipcode">({{ item.zipcode }})</span>
            </span>
          </p>

          <p class="mt-auto text-right font-bold text-indigo-700">
            {{ formatPrice(item.price) }}
          </p>
        </article>
      </RouterLink>
    </div>
  </section>
</template>

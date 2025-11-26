<!-- components/AddToCartModal.vue -->
<template>
  <BaseModal v-model="isOpen" size="md" @close="handleClose">
    <!-- Icône de succès -->
    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
      <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Contenu -->
    <div class="mt-4 text-center">
      <h3 class="text-lg font-semibold text-gray-900">Produit ajouté au panier</h3>
      <p class="mt-2 text-sm text-gray-600">{{ furniture?.name }}</p>
      <p class="mt-1 text-base font-semibold text-indigo-600">
        {{ furniture?.price?.toFixed(2) }} €
      </p>
    </div>

    <!-- Image du produit -->
    <div v-if="furniture?.pictures?.[0]" class="mt-4 flex justify-center">
      <img
        :src="getImageUrl(furniture.pictures[0].url)"
        :alt="furniture.name"
        class="h-32 w-32 rounded-lg object-cover"
      />
    </div>

    <!-- Boutons d'action -->
    <div class="mt-6 flex gap-3">
      <button
        @click="closeModal"
        class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Continuer mes achats
      </button>
      <RouterLink
        to="/user/cart"
        class="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Voir le panier
      </RouterLink>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import type { Furniture } from '@/types/Furniture'

interface Props {
  modelValue: boolean
  furniture: Furniture | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = ref(props.modelValue)
const BACKEND_URL = 'http://localhost:8080'

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal
  },
)

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const getImageUrl = (url: string | undefined) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) return BACKEND_URL + url
  return `${BACKEND_URL}/uploads/furniture/${url}`
}

const closeModal = () => {
  isOpen.value = false
}

const handleClose = () => {
  closeModal()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Votre panier</h1>
        <p class="mt-2 text-sm text-gray-500">{{ counter }} article{{ counter > 1 ? 's' : '' }}</p>
      </div>

      <!-- Debug visuel (tu peux le supprimer après) -->
      <!--  <div class="mb-4 rounded bg-yellow-100 p-4">
        <p>🛒 Nombre d'items: {{ cart.length }}</p>
        <p>📊 Counter: {{ counter }}</p>
        <p>💾 LocalStorage: {{ localStorage.getItem('cart')?.substring(0, 100) }}...</p>
      </div> -->

      <!-- Panier vide -->
      <div v-if="cart.length === 0" class="rounded-lg bg-white p-12 text-center shadow">
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 class="mt-4 text-lg font-medium text-gray-900">Votre panier est vide</h2>
        <p class="mt-2 text-sm text-gray-500">Ajoutez des articles pour commencer</p>
        <RouterLink
          to="/"
          class="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Continuer mes achats
        </RouterLink>
      </div>

      <!-- Contenu du panier -->
      <div v-else class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Liste des produits -->
        <div class="lg:col-span-2">
          <div class="rounded-lg bg-white shadow">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="product in cart" :key="product.id" class="flex p-6">
                <div class="size-32 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    v-if="product?.pictures?.length"
                    :src="product.pictures[0].url"
                    :alt="product.pictures[0].altText"
                    class="size-full object-cover"
                  />
                </div>

                <div class="ml-6 flex flex-1 flex-col">
                  <div class="flex justify-between">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {{ product.name }}
                      </h3>
                    </div>
                    <p class="text-lg font-medium text-gray-900">
                      {{ product.price.toFixed(2) }} €
                    </p>
                  </div>

                  <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center">
                      <p class="text-sm text-gray-500">Quantité: {{ product.quantity }}</p>
                    </div>

                    <button
                      type="button"
                      @click="cartStore.removeItem(product)"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Résumé de la commande -->
        <div class="lg:col-span-1">
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="text-lg font-medium text-gray-900">Résumé de la commande</h2>

            <div class="mt-6 space-y-4">
              <div class="flex items-center justify-between text-sm">
                <p class="text-gray-600">Sous-total ({{ counter }} articles)</p>
                <p class="font-medium text-gray-900">{{ itemsPrice.toFixed(2) }} €</p>
              </div>
              <div class="flex items-center justify-between text-sm">
                <p class="text-gray-600">Frais de livraison</p>
                <p class="font-medium text-gray-900">{{ shippingCost.toFixed(2) }} €</p>
              </div>

              <div class="border-t border-gray-200 pt-4">
                <div class="flex items-center justify-between">
                  <p class="text-base font-medium text-gray-900">Total</p>
                  <p class="text-base font-medium text-gray-900">{{ totalPrice.toFixed(2) }} €</p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <button
                class="w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Passer la commande
              </button>
            </div>

            <div class="mt-6 text-center">
              <RouterLink to="/" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Retour à l'accueil
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

// 👇 CORRECTION 1 : Ordre inversé !
const cartStore = useCart()
const { cart, counter } = storeToRefs(cartStore)

// Debug au montage
onMounted(() => {
  console.log('🛒 Panier chargé:', cart.value)
  console.log('📊 Counter:', counter.value)
  console.log('💾 LocalStorage:', localStorage.getItem('cart'))
})

// 👇 CORRECTION 2 : Utilise cart.value (réactif)
const itemsPrice = computed(() => {
  return cart.value.reduce((sum, furniture) => {
    return sum + furniture.price * furniture.quantity
  }, 0)
})

const shippingCost = computed(() => {
  // Calcul intelligent : un seul frais de livraison global
  return cart.value.length > 0 ? 15 : 0
})

const totalPrice = computed(() => {
  return itemsPrice.value + shippingCost.value
})
</script>

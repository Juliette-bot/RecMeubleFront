<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Votre panier</h1>
        <p class="mt-2 text-sm text-gray-600">
          {{ counter }} article{{ counter > 1 ? 's' : '' }} dans votre panier
        </p>
      </div>

      <!-- Panier vide -->
      <div v-if="cart.length === 0" class="rounded-2xl bg-white p-12 text-center shadow-sm">
        <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 class="mt-6 text-xl font-semibold text-gray-900">Votre panier est vide</h2>
        <p class="mt-2 text-sm text-gray-500">
          Découvrez nos meubles et ajoutez-les à votre panier
        </p>
        <RouterLink
          to="/"
          class="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour à l'accueil
        </RouterLink>
      </div>

      <!-- Contenu du panier -->
      <div v-else class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Liste des produits -->
        <div class="space-y-4 lg:col-span-2">
          <!-- En-tête de la liste -->
          <div class="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900">Articles ({{ cart.length }})</h2>
            <button
              v-if="cart.length > 0"
              @click="clearCart"
              class="text-sm font-medium text-red-600 hover:text-red-500 transition"
            >
              Vider le panier
            </button>
          </div>

          <!-- Liste des articles -->
          <div class="rounded-2xl bg-white shadow-sm">
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="product in cart"
                :key="product.id"
                class="flex gap-6 p-6 transition hover:bg-gray-50"
              >
                <!-- Image -->
                <RouterLink :to="`/furniture/${product.id}`" class="flex-shrink-0">
                  <div
                    class="h-32 w-32 overflow-hidden rounded-lg border border-gray-200 transition hover:border-indigo-300"
                  >
                    <img
                      v-if="product?.pictures?.length"
                      :src="product.pictures[0].url"
                      :alt="product.pictures[0].altText"
                      class="h-full w-full object-cover transition hover:scale-105"
                    />
                    <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
                      <svg
                        class="h-8 w-8 text-gray-400"
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
                </RouterLink>

                <!-- Détails -->
                <div class="flex flex-1 flex-col">
                  <div class="flex flex-1 flex-col justify-between sm:flex-row">
                    <div class="flex-1">
                      <RouterLink :to="`/furniture/${product.id}`">
                        <h3
                          class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition"
                        >
                          {{ product.name }}
                        </h3>
                      </RouterLink>
                      <p v-if="product.typeName" class="mt-1 text-sm text-gray-500">
                        {{ product.typeName }}
                      </p>
                      <p v-if="product.description" class="mt-2 text-sm text-gray-600 line-clamp-2">
                        {{ product.description }}
                      </p>
                    </div>

                    <!-- Prix -->
                    <div class="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                      <p class="text-xl font-bold text-indigo-600">
                        {{ product.price.toFixed(2) }} €
                      </p>
                      <p class="mt-1 text-xs text-gray-500">Prix unitaire</p>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <!-- Quantité -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-600">Quantité :</span>
                      <div
                        class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1"
                      >
                        <button
                          @click="decreaseQuantity(product)"
                          class="text-gray-600 hover:text-gray-900 transition"
                        >
                          <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span class="w-8 text-center font-medium text-gray-900">{{
                          product.quantity
                        }}</span>
                        <button
                          @click="increaseQuantity(product)"
                          class="text-gray-600 hover:text-gray-900 transition"
                        >
                          <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- Supprimer -->
                    <button
                      type="button"
                      @click="cartStore.removeItem(product)"
                      class="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-500"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
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
          <div class="sticky top-8 space-y-6">
            <div class="rounded-2xl bg-white p-6 shadow-sm">
              <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-4">
                Résumé de la commande
              </h2>

              <div class="mt-6 space-y-4">
                <div class="flex items-center justify-between text-sm">
                  <p class="text-gray-600">
                    Sous-total ({{ counter }} article{{ counter > 1 ? 's' : '' }})
                  </p>
                  <p class="font-semibold text-gray-900">{{ itemsPrice.toFixed(2) }} €</p>
                </div>

                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    Frais de livraison
                  </div>
                  <p class="font-semibold text-gray-900">{{ shippingCost.toFixed(2) }} €</p>
                </div>

                <div class="border-t border-gray-200 pt-4">
                  <div class="flex items-center justify-between">
                    <p class="text-lg font-bold text-gray-900">Total</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ totalPrice.toFixed(2) }} €</p>
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <button
                  class="w-full rounded-lg bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Passer la commande
                </button>
              </div>

              <div class="mt-4 text-center">
                <RouterLink
                  to="/"
                  class="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continuer mes achats
                </RouterLink>
              </div>
            </div>

            <!-- Info livraison -->
            <div class="rounded-lg bg-blue-50 p-4">
              <div class="flex gap-3">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="text-xs text-blue-900">
                  <p class="font-medium">Livraison gratuite</p>
                  <p class="mt-1">à partir de 100€ d'achat</p>
                </div>
              </div>
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
import { computed } from 'vue'
import type { Furniture } from '@/types/Furniture'

const cartStore = useCart()
const { cart, counter } = storeToRefs(cartStore)

const itemsPrice = computed(() => {
  return cart.value.reduce((sum, furniture) => {
    return sum + furniture.price * furniture.quantity
  }, 0)
})

const shippingCost = computed(() => {
  return cart.value.length > 0 ? 15 : 0
})

const totalPrice = computed(() => {
  return itemsPrice.value + shippingCost.value
})

// Fonctions de gestion de quantité
const increaseQuantity = (product: Furniture) => {
  product.quantity = (product.quantity || 1) + 1
}

const decreaseQuantity = (product: Furniture) => {
  if (product.quantity > 1) {
    product.quantity--
  }
}

const clearCart = () => {
  if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
    cartStore.clearCart()
  }
}
</script>

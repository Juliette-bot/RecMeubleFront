<template>
  <nav class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="group flex items-center gap-3">
          <div class="rounded-lg bg-indigo-50 p-2 transition group-hover:bg-indigo-100">
            <LightLucide class="h-6 w-6 text-indigo-600" />
          </div>
          <span
            class="hidden sm:block text-xl font-bold text-gray-900 transition group-hover:text-indigo-600"
          >
            RecMeuble
          </span>
        </RouterLink>

        <!-- Navigation centrale -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            to="/"
            class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Accueil
          </RouterLink>
          <RouterLink
            to="/my-furniture"
            class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Mes meubles
          </RouterLink>
        </div>

        <!-- Actions droite -->
        <div class="flex items-center gap-4">
          <!-- Favoris 👇 NOUVEAU -->
          <RouterLink
            to="/favorites"
            class="group relative flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-50"
          >
            <HeartLucide class="h-6 w-6 text-gray-700 group-hover:text-red-500 transition" />
            <span
              class="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-red-500 transition"
            >
              Favoris
            </span>
          </RouterLink>

          <!-- Panier -->
          <RouterLink
            to="/cart"
            class="group relative flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-50"
          >
            <CartLucide class="h-6 w-6 text-gray-700 group-hover:text-indigo-600 transition" />
            <span
              class="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition"
            >
              Panier
            </span>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
            >
              {{ cartCount }}
            </span>
          </RouterLink>

          <!-- Menu utilisateur -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-50"
            >
              <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span class="text-sm font-semibold text-indigo-600">
                  {{ userInitials }}
                </span>
              </div>
              <svg
                class="h-4 w-4 text-gray-500 transition"
                :class="{ 'rotate-180': showUserMenu }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <div
                v-if="showUserMenu"
                @click="showUserMenu = false"
                class="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div class="p-2">
                  <RouterLink
                    to="/profil"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Mon profil
                  </RouterLink>

                  <RouterLink
                    v-if="isAdmin"
                    to="/admin"
                    class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Administration
                  </RouterLink>

                  <div class="my-1 h-px bg-gray-200"></div>

                  <button
                    @click="handleLogout"
                    class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Menu mobile burger -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-50"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-3">
          <div class="space-y-1 px-2">
            <RouterLink
              to="/"
              @click="showMobileMenu = false"
              class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Accueil
            </RouterLink>
            <RouterLink
              to="/my-furniture"
              @click="showMobileMenu = false"
              class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Mes meubles
            </RouterLink>
            <RouterLink
              to="/favorites"
              @click="showMobileMenu = false"
              class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Favoris
            </RouterLink>
            <RouterLink
              to="/cart"
              @click="showMobileMenu = false"
              class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Panier
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { useCart } from '@/stores/cart'
import LightLucide from '@/components/icons/LightLucide.vue'
import CartLucide from '@/components/icons/CartLucide.vue'
import HeartLucide from '@/components/icons/HeartLucide.vue'

const router = useRouter()
const auth = useAuth()
const cart = useCart()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const cartCount = computed(() => cart.counter)
const isAdmin = computed(() => auth.user?.role === 'ADMIN')

const userInitials = computed(() => {
  if (!auth.user) return 'U'
  const first = auth.user.firstName?.[0] || ''
  const last = auth.user.lastName?.[0] || ''
  return (first + last).toUpperCase() || 'U'
})

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

// Fermer les menus quand on clique ailleurs
const closeMenus = () => {
  showUserMenu.value = false
  showMobileMenu.value = false
}

// Optionnel : fermer au scroll
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', closeMenus)
}
</script>

<template>
  <Disclosure
    as="nav"
    class="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
          >
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- Logo -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center space-x-2">
            <!-- ton logo -->
            <span class="text-white text-lg font-semibold tracking-wide">RecMeuble</span>
          </div>
        </div>

        <!-- Menu principal -->
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <Menu as="div" class="relative ml-3">
            <MenuButton
              class="relative flex items-center justify-center rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              title="Compte"
            >
              <!-- Icône visible -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 16.042A9.956 9.956 0 0110 12c3.315 0 6.262 1.61 8.042 4.042A10 10 0 10.458 16.042z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Ouvrir le menu utilisateur</span>
            </MenuButton>

            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline outline-1 -outline-offset-1 outline-white/10"
              >
                <!-- Anonyme -->
                <template v-if="auth.user.role === 'ANONYMOUS' && can('login')">
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                      to="/login"
                      :class="[
                        active ? 'bg-white/5 text-white' : 'text-gray-300',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      Connexion
                    </RouterLink>
                  </MenuItem>
                </template>

                <!-- Connectée : profil (quand la route existera) -->
                <template v-else-if="auth.user?.role === 'USER'">
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                      :to="{ name: 'profil' }"
                      :class="[
                        active ? 'bg-white/5 text-white' : 'text-gray-300',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      Mon profil
                    </RouterLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                      :to="{ name: 'my-furniture' }"
                      :class="[
                        active ? 'bg-white/5 text-white' : 'text-gray-300',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      Mes meubles
                    </RouterLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                      :to="{ name: 'cart' }"
                      :class="[
                        active ? 'bg-white/5 text-white' : 'text-gray-300',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      Panier
                    </RouterLink>
                  </MenuItem>
                </template>

                <template v-else-if="auth.user?.role === 'ADMIN' && can('dashboard')">
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                      :to="{ name: 'dashboard' }"
                      :class="[
                        active ? 'bg-white/5 text-white' : 'text-gray-300',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      Dashboard
                    </RouterLink>
                  </MenuItem>
                </template>

                <!-- Connectée : déconnexion -->
                <template v-if="auth.user.role !== 'ANONYMOUS'">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="logout"
                      :class="[
                        active ? 'bg-white/5 text-white' : 'text-gray-300',
                        'block w-full text-left px-4 py-2 text-sm',
                      ]"
                    >
                      Déconnexion
                    </button>
                  </MenuItem>
                </template>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { RouterLink, useRouter } from 'vue-router' // ← important

import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const auth = useAuth()
const router = useRouter()

const can = (nameOrPath: string) =>
  nameOrPath.startsWith('/')
    ? router.getRoutes().some((r) => r.path === nameOrPath)
    : router.hasRoute(nameOrPath)

function logout() {
  auth.logout()
  if (router.hasRoute('login')) router.push({ name: 'login' })
}
console.log('auth.role =', auth.user.role)
</script>

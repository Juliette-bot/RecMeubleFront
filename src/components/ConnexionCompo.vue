<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo et titre -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100"
        >
          <LightLucide class="h-8 w-8 text-indigo-600" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Bienvenue sur RecMeuble</h1>
        <p class="mt-2 text-sm text-gray-600">Connectez-vous pour continuer</p>
      </div>

      <!-- Formulaire -->
      <div class="rounded-2xl bg-white p-8 shadow-lg">
        <form @submit.prevent="connexion" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Adresse email <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                required
                autocomplete="email"
                placeholder="exemple@email.com"
                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <!-- Message d'erreur -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="error" class="rounded-lg bg-red-50 p-3">
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
          </Transition>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
              Connexion en cours...
            </span>
            <span v-else>Se connecter</span>
          </button>
        </form>

        <!-- Lien vers inscription -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Pas encore de compte ?
            <RouterLink
              to="/register"
              class="font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Créer un compte
            </RouterLink>
          </p>
        </div>
      </div>

      <!-- Footer optionnel -->
      <p class="mt-8 text-center text-xs text-gray-500">
        En vous connectant, vous acceptez nos conditions d'utilisation
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth'
import LightLucide from '@/components/icons/LightLucide.vue'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const auth = useAuth()
const router = useRouter()
const route = useRoute()

function normalizeRole(raw?: string) {
  const r = (raw || '').toUpperCase()
  return r === 'ADMIN' ? 'ADMIN' : r === 'USER' ? 'USER' : 'ANONYMOUS'
}

async function connexion() {
  error.value = ''
  loading.value = true
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail: email.value, password: password.value }),
    })

    if (!res.ok) {
      error.value = 'Email ou mot de passe incorrect'
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await res.json()) as any

    // supporte différents formats de réponse serveur
    const token = data.accessToken || data.token
    const serverRole = normalizeRole(data.role)

    if (!token) {
      error.value = 'Réponse serveur inattendue (token manquant)'
      return
    }

    // 1) on stocke le token (la store déduira le rôle via la claim "roles")
    auth.setToken(token)

    // 2) compat: si le back fournit un rôle, on peut l'utiliser pour l'UI
    if (serverRole !== 'ANONYMOUS') {
      auth.user.role = serverRole
    }

    // 3) redirection
    const redirect = (route.query.redirect as string | undefined) || '/'
    router.push(redirect)
    console.log(token)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error.value = 'Impossible de contacter le serveur'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>

      <form @submit.prevent="connexion" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 w-full rounded-xl border-gray-300 p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 w-full rounded-xl border-gray-300 p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition"
        >
          Se connecter
        </button>

        <RouterLink to="/register" class="text-red-600 text-sm text-center">
          Je n'ai pas encore de compte
        </RouterLink>

        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth'

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

    // 2) compat: si le back fournit un rôle, on peut l’utiliser pour l’UI
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

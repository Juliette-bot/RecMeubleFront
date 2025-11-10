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

        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../stores/auth'

const URL = 'http://localhost:8080'

const email = ref('')
const password = ref('')
const error = ref('')

const auth = useAuth()
const router = useRouter()
const route = useRoute()

async function connexion() {
  error.value = ''

  const res = await fetch(`${URL}/api/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mail: email.value, password: password.value }),
  })

  if (!res.ok) {
    error.value = 'Email ou mot de passe incorrect'
    return
  }

  // le back devrait renvoyer { token, role }
  const { token, role } = await res.json()

  // par sécurité si le back renvoie "ADMIN"/"USER" en majuscules
  const normalizedRole = role?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER'
  auth.setAuth(token, normalizedRole)

  // si on venait d’une page protégée, on y retourne, sinon accueil
  const redirect = (route.query.redirect as string | undefined) || '/'
  router.push(redirect)
}
</script>

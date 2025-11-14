<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Création du compte</h1>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            v-model="lastname"
            type="text"
            required
            class="mt-1 w-full rounded-xl border-gray-300 p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            v-model="firstname"
            type="text"
            required
            class="mt-1 w-full rounded-xl border-gray-300 p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

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
          S'enregister
        </button>

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
const firstname = ref('')
const lastname = ref('')
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

async function register() {
  error.value = ''
  loading.value = true
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstname.value,
        lastname: lastname.value,
        mail: email.value,
        password: password.value,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Erreur /api/register :', res.status, text)
      if (res.status === 400 && text.includes('Mail déjà utilisé')) {
        error.value = 'Un compte existe déjà avec cet email, connecte-toi 😉'
      } else {
        error.value = text || 'Inscription impossible'
      }
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await res.json()) as any

    const token = data.token // selon le nom que tu choisis
    const serverRole = normalizeRole(data.role)
    console.log(data.role)
    console.log(token)
    if (!token) {
      error.value = 'Réponse serveur inattendue (token manquant)'
      return
    }

    auth.setToken(token)

    if (serverRole !== 'ANONYMOUS') {
      auth.role = serverRole
    }

    const redirect = (route.query.redirect as string | undefined) || '/'
    router.push(redirect)
  } catch (e) {
    console.error(e)
    error.value = 'Impossible de contacter le serveur'
  } finally {
    loading.value = false
  }
}
</script>

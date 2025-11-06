<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
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
import { useAuth } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuth()

async function onSubmit() {
  try {
    error.value = ''
    await auth.login(email.value, password.value)
    alert('Connexion réussie ✅') // tu peux rediriger ici
  } catch (e: unknown) {
    error.value = e.message ?? 'Erreur de connexion'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mon profil</h1>
        <p class="mt-2 text-sm text-gray-600">
          Gérez vos informations personnelles et votre sécurité
        </p>
      </div>

      <!-- Formulaire d'informations personnelles -->
      <div class="mb-8 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
        <div class="mb-6 flex items-center gap-3 border-b border-gray-200 pb-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <svg
              class="h-6 w-6 text-indigo-600"
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
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Informations personnelles</h2>
            <p class="text-sm text-gray-600">Mettez à jour vos données de compte</p>
          </div>
        </div>

        <form @submit.prevent="updateProfilUser" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- Prénom -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Prénom <span class="text-red-500">*</span>
              </label>
              <input
                v-model="userFormData.firstName"
                type="text"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Jean"
              />
            </div>

            <!-- Nom -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nom <span class="text-red-500">*</span>
              </label>
              <input
                v-model="userFormData.lastName"
                type="text"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Dupont"
              />
            </div>
          </div>

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
                v-model="userFormData.mail"
                type="email"
                required
                class="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <!-- Message de feedback -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="profileMessage"
              class="rounded-lg p-4"
              :class="profileError ? 'bg-red-50' : 'bg-green-50'"
            >
              <div class="flex gap-3">
                <svg
                  v-if="profileError"
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
                <svg
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm" :class="profileError ? 'text-red-800' : 'text-green-800'">
                  {{ profileMessage }}
                </p>
              </div>
            </div>
          </Transition>

          <!-- Bouton -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>

      <!-- Formulaire de changement de mot de passe -->
      <div class="mb-8 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
        <div class="mb-6 flex items-center gap-3 border-b border-gray-200 pb-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <svg
              class="h-6 w-6 text-amber-600"
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
          <div>
            <h2 class="text-xl font-bold text-gray-900">Sécurité</h2>
            <p class="text-sm text-gray-600">Modifiez votre mot de passe</p>
          </div>
        </div>

        <form @submit.prevent="updatePassword" class="space-y-6">
          <!-- Mot de passe actuel -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel <span class="text-red-500">*</span>
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
                v-model="passwordForm.currentPassword"
                type="password"
                required
                class="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- Nouveau mot de passe -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe <span class="text-red-500">*</span>
              </label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                required
                minlength="8"
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <p class="mt-1 text-xs text-gray-500">Minimum 8 caractères</p>
            </div>

            <!-- Confirmer mot de passe -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe <span class="text-red-500">*</span>
              </label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Message d'erreur mot de passe -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="passwordError" class="rounded-lg bg-red-50 p-4">
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
                <p class="text-sm text-red-800">{{ passwordError }}</p>
              </div>
            </div>
          </Transition>

          <!-- Bouton -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Changer le mot de passe
            </button>
          </div>
        </form>
      </div>

      <!-- Zone de danger -->
      <div class="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-sm lg:p-8">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-red-600">Zone de danger</h2>
            <p class="text-sm text-gray-600">Actions irréversibles</p>
          </div>
        </div>

        <div class="rounded-lg bg-red-50 p-4">
          <p class="text-sm text-red-800">
            <strong>Attention :</strong> La suppression de votre compte est définitive. Toutes vos
            données, y compris vos annonces et votre historique, seront perdues.
          </p>
        </div>

        <div class="mt-6">
          <button
            @click="deleteProfilUser"
            class="rounded-lg border-2 border-red-600 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Supprimer définitivement mon compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiFetch } from '@/utils/api'
import { onMounted, ref } from 'vue'
import { useAuth } from '@/stores/auth'
import router from '@/router'

const auth = useAuth()

// Formulaire de profil
const userFormData = ref({
  firstName: '',
  lastName: '',
  mail: '',
})

const profileMessage = ref('')
const profileError = ref(false)

// Formulaire de mot de passe
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordError = ref('')

// 🔹 Charger le profil utilisateur
async function getProfilUser() {
  try {
    const res = await apiFetch('/api/user/profile')

    if (!res.ok) throw new Error('Impossible de charger les informations du profil.')

    const userData = await res.json()

    userFormData.value = {
      firstName: userData.firstname,
      lastName: userData.lastname,
      mail: userData.mail,
    }
  } catch (error) {
    console.error(error)
    profileMessage.value = 'Erreur lors du chargement du profil'
    profileError.value = true
  }
}

onMounted(getProfilUser)

// 🔹 Mettre à jour le profil
async function updateProfilUser() {
  profileMessage.value = ''
  profileError.value = false

  try {
    const res = await apiFetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFormData.value),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Impossible de mettre à jour le profil.')
    }

    const updatedUser = await res.json()

    userFormData.value = {
      firstName: updatedUser.firstname,
      lastName: updatedUser.lastname,
      mail: updatedUser.mail,
    }

    profileMessage.value = 'Profil mis à jour avec succès !'
    profileError.value = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    profileMessage.value = error.message || 'Erreur lors de la mise à jour'
    profileError.value = true
  }
}

// 🔹 Changer le mot de passe
async function updatePassword() {
  passwordError.value = ''

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Les mots de passe ne correspondent pas'
    return
  }

  if (passwordForm.value.newPassword.length < 8) {
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }

  try {
    const res = await apiFetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
        confirmPassword: passwordForm.value.confirmPassword,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Erreur lors du changement de mot de passe')
    }

    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    alert('Mot de passe modifié avec succès !')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    passwordError.value = error.message || 'Erreur lors du changement de mot de passe'
  }
}

// 🔹 Supprimer le compte
async function deleteProfilUser() {
  try {
    if (
      !confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')
    ) {
      return
    }

    const res = await apiFetch('/api/user/account', {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Impossible de supprimer ce compte.')

    auth.logout()
    router.push('/')
    alert('Votre compte a été supprimé avec succès')
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la suppression du compte')
  }
}
</script>

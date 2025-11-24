<template>
  <div class="mt-6 border rounded p-4 bg-gray-50">
    <h2 class="font-semibold mb-2">Modifier {{ userFormData.firstname }}</h2>

    <form class="space-y-4">
      <div>
        <label>Nom</label>
        <input
          type="text"
          v-model="userFormData.lastname"
          class="border rounded w-full px-2 py-1"
        />
      </div>

      <div>
        <label>Prénom</label>
        <input
          v-model="userFormData.firstname"
          type="text"
          class="border rounded w-full px-2 py-1"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label>Email</label>
          <input
            v-model.number="userFormData.mail"
            type="email"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            v-model.number="passwordForm"
            type="password"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>
      </div>

      <!-- ADDRESS  -->
      <!--   <div>
         <div>
        <label>Adresse</label>
        <select v-model="form.addressId" class="border rounded w-full px-2 py-1">
          <option :value="null">Aucune</option>
          <option v-for="a in addresses" :key="a.addressId" :value="a.addressId">
            {{ a.addressLabel }}
          </option>
        </select>
      </div>
        <div>
          <label>Numéro</label>
          <input
            v-model.number="form.price"
            type="number"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>
        <div>
          <label>Libellé de la rue</label>
          <input
            v-model.number="form.price"
            type="number"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>
         <label>Code postal</label>
          <input
            v-model.number="form.price"
            type="number"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>
         <label>Ville</label>
          <input
            v-model.number="form.price"
            type="number"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div> -->

      <div class="flex gap-2 justify-end">
        <button class="px-3 py-1 border rounded" @click="(updateProfilUser, updatePassword)">
          Modifier
        </button>
        <button class="px-3 py-1 border rounded bg-red-50" @click="deleteProfilUser">
          Supprimer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { apiFetch } from '@/utils/api'
import type { UpdatePassword, UpdateUserProfile } from '@/types/UserProfil'
import { onMounted, ref } from 'vue'
import { useAuth } from '@/stores/auth'
import router from '@/router'

const auth = useAuth()
const userFormData = ref<UpdateUserProfile>({})
const passwordForm = ref<UpdatePassword>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordError = ref('')

async function getProfilUser() {
  const res = await apiFetch(`/api/profil/${auth.user.id}`)
  console.log(res)

  const userData = await res.json()
  userFormData.value = {
    firstname: userData.firstname,
    lastname: userData.lastname,
    mail: userData.mail,
  }
  if (!res.ok) throw new Error('Impossible de charger les infos du profile.')
}
onMounted(getProfilUser)

async function updatePassword() {
  passwordError.value = ''

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Les mots de passe ne correspondent pas'
    return
  }

  if (passwordForm.value.newPassword.length < 8) {
    passwordError.value = 'Le mot de passe n"est pas assez long'
    return
  }
  try {
    const res = await apiFetch(`/api/profil/${auth.user.id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
      }),
    })

    if (!res.ok) throw new Error('Mot de passe invalide')

    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  } catch (error) {
    console.log(error)
  }
}

async function updateProfilUser() {
  try {
    const res = await apiFetch(`/api/profil/${auth.user.id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFormData.value),
    })
    if (!res.ok) throw new Error('Impossible de mettre a jour le profile.')

    const updatedUser = await res.json()
    userFormData.value = updatedUser //permet de refresh les donné et mettre a jour de formdata si j'ai bien compris
  } catch (error) {
    console.log(error)
  }
}

async function deleteProfilUser() {
  try {
    if (
      !confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')
    )
      return

    const res = await apiFetch(`/api/profil/${auth.user.id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Impossible de supprimer ce compte.')

    // Déconnexion et redirection
    auth.logout()
    router.push('/')
    alert('Votre compte a été supprimé')
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la suppression du compte')
  }
}
</script>

<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
    <div class="mb-6 border-b border-gray-200 pb-6">
      <h2 class="text-2xl font-bold text-gray-900">Mettre un nouveau meuble en vente</h2>
      <p class="mt-2 text-sm text-gray-600">Remplissez les informations de votre meuble</p>
    </div>

    <form @submit.prevent="submit" class="space-y-6">
      <!-- Nom du meuble -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nom du meuble <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Ex: Canapé en cuir"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          v-model="form.description"
          rows="4"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Décrivez votre meuble..."
        ></textarea>
      </div>

      <!-- Dimensions -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hauteur (cm) <span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="form.height"
            type="number"
            min="0"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="150"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Largeur (cm) <span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="form.width"
            type="number"
            min="0"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="200"
            required
          />
        </div>
      </div>

      <!-- Prix -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Prix (€) <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            step="0.01"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="299.99"
            required
          />
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
        </div>
      </div>

      <!-- Type de meuble -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Type de meuble <span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.typeId"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option :value="null" disabled>Choisir un type...</option>
          <option v-for="t in furnitureTypes" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>

      <!-- Adresse -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Adresse (optionnel)</label>
        <select
          v-model="form.addressId"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option :value="null">Aucune adresse</option>
          <option v-for="a in addresses" :key="a.addressId" :value="a.addressId">
            {{ a.addressLabel }}
          </option>
        </select>
      </div>

      <!-- Upload des photos -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Photos du meuble</label>
        <div
          class="relative flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 transition hover:border-indigo-400"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="mt-4 flex text-sm text-gray-600">
              <label
                class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
              >
                <span>Télécharger des fichiers</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  @change="onFilesSelected"
                  class="sr-only"
                />
              </label>
              <p class="pl-1">ou glisser-déposer</p>
            </div>
            <p class="text-xs text-gray-500 mt-2">PNG, JPG, WEBP jusqu'à 10MB</p>
          </div>
        </div>

        <!-- Fichiers sélectionnés -->
        <div v-if="files && files.length" class="mt-3">
          <div class="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-3">
            <svg
              class="h-5 w-5 text-indigo-600"
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
            <span class="text-sm font-medium text-indigo-900">
              {{ files.length }} fichier{{ files.length > 1 ? 's' : '' }} sélectionné{{
                files.length > 1 ? 's' : ''
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div
        class="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end"
      >
        <button
          type="button"
          @click="$emit('cancel')"
          class="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Annuler
        </button>
        <button
          type="submit"
          :disabled="submitting"
          class="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span v-if="submitting" class="flex items-center justify-center gap-2">
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
            Enregistrement...
          </span>
          <span v-else>Créer le meuble</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiFetch } from '@/utils/api'

interface FurnitureTypeOption {
  id: number
  name: string
}

interface AddressOption {
  addressId: number
  addressLabel: string | null
}

interface CreateForm {
  name: string
  description: string
  height: number
  width: number
  price: number
  typeId: number | null
  addressId: number | null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  furnitureTypes: FurnitureTypeOption[]
  addresses: AddressOption[]
}>()

const emit = defineEmits<{
  created: []
  cancel: []
}>()

const submitting = ref(false)
const files = ref<FileList | null>(null)

const form = reactive<CreateForm>({
  name: '',
  description: '',
  height: 0,
  width: 0,
  price: 0,
  typeId: null,
  addressId: null,
})

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.height = 0
  form.width = 0
  form.price = 0
  form.typeId = null
  form.addressId = null
}

const onFilesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  files.value = target.files
}

const submit = async () => {
  if (!form.typeId) {
    alert('Merci de choisir un type de meuble.')
    return
  }

  submitting.value = true
  try {
    // 1️⃣ Création du meuble
    const res = await apiFetch('/api/my/furniture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      alert('Erreur lors de la création du meuble.')
      return
    }

    const created = (await res.json()) as { id: number }

    // 2️⃣ Upload des photos si des fichiers sont sélectionnés
    if (files.value && files.value.length > 0) {
      const formData = new FormData()
      Array.from(files.value).forEach((file) => {
        formData.append('files', file)
      })

      const uploadRes = await apiFetch(`/api/my/furniture/${created.id}/pictures`, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        console.error('Erreur upload photos', uploadRes.status)
        alert("Le meuble a été créé, mais il y a eu une erreur lors de l'upload des photos.")
      }
    }

    resetForm()
    files.value = null
    emit('created')
  } finally {
    submitting.value = false
  }
}
</script>

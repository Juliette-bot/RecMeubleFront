<template>
  <div class="mt-6 border rounded p-4 bg-gray-50">
    <h2 class="font-semibold mb-2">Mettre un nouveau meuble en vente</h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label>Nom</label>
        <input v-model="form.name" class="border rounded w-full px-2 py-1" required />
      </div>

      <div>
        <label>Description</label>
        <textarea
          v-model="form.description"
          class="border rounded w-full px-2 py-1"
          rows="3"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label>Hauteur (cm)</label>
          <input
            v-model.number="form.height"
            type="number"
            min="0"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label>Largeur (cm)</label>
          <input
            v-model.number="form.width"
            type="number"
            min="0"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>
      </div>

      <div>
        <label>Prix (€)</label>
        <input
          v-model.number="form.price"
          type="number"
          min="0"
          class="border rounded w-full px-2 py-1"
          required
        />
      </div>

      <div>
        <label>Type</label>
        <select v-model="form.typeId" class="border rounded w-full px-2 py-1" required>
          <option :value="null">Choisir un type...</option>
          <option v-for="t in furnitureTypes" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>

      <div>
        <label>Adresse</label>
        <select v-model="form.addressId" class="border rounded w-full px-2 py-1">
          <option :value="null">Aucune</option>
          <option v-for="a in addresses" :key="a.addressId" :value="a.addressId">
            {{ a.addressLabel }}
          </option>
        </select>
      </div>

      <!-- 📸 Upload des photos -->
      <div>
        <label>Photos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          @change="onFilesSelected"
          class="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
        />
        <p v-if="files && files.length" class="text-xs text-gray-600 mt-1">
          {{ files.length }} fichier(s) sélectionné(s).
        </p>
      </div>

      <div class="flex justify-end gap-2">
        <button type="button" class="px-3 py-1 border rounded" @click="$emit('cancel')">
          Annuler
        </button>
        <button type="submit" class="px-3 py-1 border rounded bg-green-100" :disabled="submitting">
          <span v-if="submitting">Enregistrement...</span>
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

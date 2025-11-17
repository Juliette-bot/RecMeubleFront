<template>
  <div class="mt-6 border rounded p-4 bg-gray-50">
    <h2 class="font-semibold mb-2">Modifier {{ form.name }}</h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label>Nom</label>
        <input v-model="form.name" class="border rounded w-full px-2 py-1" required />
      </div>

      <div>
        <label>Description</label>
        <textarea v-model="form.description" class="border rounded w-full px-2 py-1"></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label>Hauteur (cm)</label>
          <input
            v-model.number="form.height"
            type="number"
            class="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label>Largeur (cm)</label>
          <input
            v-model.number="form.width"
            type="number"
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

      <!-- Upload de nouvelles photos -->
      <div>
        <label>Ajouter des photos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          @change="onFilesSelected"
          class="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
        />
        <p class="text-xs text-gray-500 mt-1">
          Les nouvelles photos seront ajoutées à celles déjà existantes.
        </p>
      </div>

      <div class="flex gap-2 justify-end">
        <button type="button" class="px-3 py-1 border rounded" @click="$emit('cancel')">
          Annuler
        </button>
        <button type="submit" class="px-3 py-1 border rounded bg-green-100" :disabled="submitting">
          <span v-if="submitting">Enregistrement...</span>
          <span v-else>Enregistrer</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { apiFetch } from '@/utils/api'

// Types minimalistes pour les props
interface Furniture {
  id: number
  name: string
  description: string
  height: number
  width: number
  price: number
  typeId: number | null
  addressId: number | null
}

interface FurnitureTypeOption {
  id: number
  name: string
}

interface AddressOption {
  addressId: number
  addressLabel: string | null
}

interface EditForm {
  name: string
  description: string
  height: number
  width: number
  price: number
  typeId: number | null
  addressId: number | null
}

const props = defineProps<{
  furniture: Furniture
  furnitureTypes: FurnitureTypeOption[]
  addresses: AddressOption[]
}>()

const emit = defineEmits<{
  updated: []
  cancel: []
}>()

const submitting = ref(false)
const files = ref<FileList | null>(null)

const form = reactive<EditForm>({
  name: '',
  description: '',
  height: 0,
  width: 0,
  price: 0,
  typeId: null,
  addressId: null,
})

// on remplit le form quand la prop furniture change
watch(
  () => props.furniture,
  (f) => {
    if (!f) return
    form.name = f.name
    form.description = f.description
    form.height = Number(f.height)
    form.width = Number(f.width)
    form.price = Number(f.price)
    form.typeId = f.typeId
    form.addressId = f.addressId
  },
  { immediate: true },
)

const onFilesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  files.value = target.files
}

const submit = async () => {
  submitting.value = true
  try {
    // 1️⃣ PUT pour mettre à jour les infos du meuble
    const res = await apiFetch(`/api/my/furniture/${props.furniture.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      alert('Erreur lors de la mise à jour du meuble.')
      return
    }

    // 2️⃣ Upload des nouvelles photos (si sélectionnées)
    if (files.value && files.value.length > 0) {
      const formData = new FormData()
      Array.from(files.value).forEach((file) => {
        formData.append('files', file)
      })

      const uploadRes = await apiFetch(`/api/my/furniture/${props.furniture.id}/pictures`, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        console.error('Erreur upload photos', uploadRes.status)
        alert("Le meuble a été mis à jour, mais il y a eu une erreur lors de l'upload des photos.")
      }
    }

    files.value = null
    emit('updated')
  } finally {
    submitting.value = false
  }
}
</script>

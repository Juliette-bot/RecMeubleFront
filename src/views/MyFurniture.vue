<template>
  <div class="p-4 max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Mes meubles</h1>

      <button
        class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-sm"
        @click="creating = !creating"
      >
        {{ creating ? 'Fermer le formulaire' : 'Ajouter un meuble' }}
      </button>
    </div>

    <!-- FORMULAIRE DE CRÉATION -->
    <MyFurnitureCreateForm
      v-if="creating"
      :furniture-types="furnitureTypes"
      :addresses="uniqueAddresses"
      @created="onCreated"
      @cancel="creating = false"
    />

    <!-- CHARGEMENT / ERREUR -->
    <div v-if="loading" class="text-gray-500">Chargement...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- AUCUN MEUBLE -->
    <div v-else-if="furnitures.length === 0" class="text-gray-500">
      Aucun meuble pour l’instant.
    </div>

    <!-- LISTE -->
    <div v-else class="space-y-4">
      <div
        v-for="f in furnitures"
        :key="f.id"
        class="border rounded p-4 flex flex-col md:flex-row md:justify-between gap-2"
      >
        <div>
          <h2 class="text-lg font-semibold">{{ f.name }}</h2>
          <p class="text-sm text-gray-600">{{ f.description }}</p>

          <p class="text-sm">Taille : {{ f.height }} x {{ f.width }} cm</p>

          <p class="text-sm">
            Type : <strong>{{ f.typeName }}</strong>
          </p>

          <p class="text-sm">
            Prix : <strong>{{ f.price }} €</strong>
          </p>

          <p class="text-sm">
            Statut :
            <span class="px-2 py-0.5 border rounded text-xs">
              {{ humanStatus(f.status) }}
            </span>
          </p>
          <div v-if="f.pictures && f.pictures.length" class="mt-3">
            <div class="relative w-40 h-32">
              <img
                v-if="currentPicture(f)"
                :src="currentPicture(f)!.url"
                :alt="currentPicture(f)!.altText"
                class="w-full h-full object-cover rounded border"
              />

              <!-- Bouton précédent -->
              <button
                v-if="f.pictures.length > 1"
                type="button"
                class="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                @click.stop="prevImage(f)"
                title="Photo précédente"
              >
                ‹
              </button>

              <!-- Bouton suivant -->
              <button
                v-if="f.pictures.length > 1"
                type="button"
                class="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                @click.stop="nextImage(f)"
                title="Photo suivante"
              >
                ›
              </button>
            </div>

            <!-- Petits points de pagination -->
            <div v-if="f.pictures.length > 1" class="mt-1 flex justify-center gap-1">
              <span
                v-for="(p, idx) in f.pictures"
                :key="p.id"
                class="h-1.5 w-1.5 rounded-full"
                :class="idx === (carouselIndex[f.id] ?? 0) ? 'bg-gray-800' : 'bg-gray-300'"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <button class="px-3 py-1 border rounded" @click="startEdit(f)">Modifier</button>
          <button class="px-3 py-1 border rounded bg-red-50" @click="deleteFurniture(f.id)">
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- FORMULAIRE D’ÉDITION -->
    <MyFurnitureEditForm
      v-if="editing && furnitureBeingEdited"
      :furniture="furnitureBeingEdited"
      :furniture-types="furnitureTypes"
      :addresses="uniqueAddresses"
      @updated="onUpdated"
      @cancel="
        () => {
          editing = false
          furnitureBeingEdited = null
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'
import MyFurnitureEditForm from '@/components/MyFurnitureEditForm.vue'
import MyFurnitureCreateForm from '@/components/MyFurnitureCreateForm.vue'
import type { FurnitureStatus } from '../types/FurnitureStatus' // si tu l’as

const creating = ref(false)
const editing = ref(false)
const furnitureBeingEdited = ref<MyFurnitureResponse | null>(null)

const onCreated = async () => {
  creating.value = false
  await loadFurniture()
}

// Types correspondants EXACTEMENT à ta DTO ---------------------

interface MyFurnitureResponse {
  id: number
  name: string
  description: string
  height: number
  width: number
  price: number
  status: FurnitureStatus | string
  typeId: number | null
  typeName: string | null
  addressId: number | null
  addressLabel: string | null
  sellerId: number | null
  sellerFirstname: string | null
  sellerLastname: string | null
  createdAt: string
  updatedAt: string
  pictures?: PictureResponse[]
}

interface PictureResponse {
  id: number
  url: string
  altText: string
}

interface FurnitureTypeOption {
  id: number
  name: string
}

// -----------------------------------------------------------------
const furnitureTypes = ref<FurnitureTypeOption[]>([])
const furnitures = ref<MyFurnitureResponse[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const carouselIndex = reactive<{ [id: number]: number }>({})

const currentPicture = (f: MyFurnitureResponse): PictureResponse | null => {
  const pics = f.pictures ?? []
  if (!pics.length) return null
  const index = carouselIndex[f.id] ?? 0
  return pics[index]
}

const nextImage = (f: MyFurnitureResponse) => {
  const pics = f.pictures ?? []
  if (!pics.length) return
  const current = carouselIndex[f.id] ?? 0
  carouselIndex[f.id] = (current + 1) % pics.length
}

const prevImage = (f: MyFurnitureResponse) => {
  const pics = f.pictures ?? []
  if (!pics.length) return
  const current = carouselIndex[f.id] ?? 0
  carouselIndex[f.id] = (current - 1 + pics.length) % pics.length
}

const humanStatus = (status: FurnitureStatus | string): string => {
  const map: Record<string, string> = {
    PENDING_REVIEW: 'En validation',
    PUBLISHED: 'Publié',
    SOLD: 'Vendu',
    DRAFT: 'Brouillon',
  }
  return map[status] ?? status
}

const uniqueAddresses = computed(() => {
  const map = new Map()
  for (const f of furnitures.value) {
    if (f.addressId != null) {
      map.set(f.addressId, { addressId: f.addressId, addressLabel: f.addressLabel })
    }
  }
  return Array.from(map.values())
})

// --------------------------------------------------------------

const loadFurniture = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await apiFetch('/api/my/furniture')
    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
    furnitures.value = (await res.json()) as MyFurnitureResponse[]
    furnitures.value.forEach((f) => {
      if (f.pictures && f.pictures.length && carouselIndex[f.id] === undefined) {
        carouselIndex[f.id] = 0
      }
    })
  } catch (err) {
    console.error(err)
    error.value = 'Impossible de charger vos meubles.'
  } finally {
    loading.value = false
  }
}

const loadFurnitureTypes = async () => {
  try {
    const res = await apiFetch('/api/furniture-types')
    if (!res.ok) throw new Error()
    furnitureTypes.value = (await res.json()) as FurnitureTypeOption[]
  } catch (e) {
    console.error('Erreur chargement types', e)
  }
}

onMounted(() => {
  loadFurniture()
  loadFurnitureTypes()
})

const startEdit = (f: MyFurnitureResponse) => {
  furnitureBeingEdited.value = f
  editing.value = true
}

const onUpdated = async () => {
  editing.value = false
  furnitureBeingEdited.value = null
  await loadFurniture()
}

const deleteFurniture = async (id: number) => {
  if (!confirm('Supprimer ce meuble ?')) return

  const res = await apiFetch(`/api/my/furniture/${id}`, { method: 'DELETE' })

  if (!res.ok && res.status !== 204) {
    alert('Erreur lors de la suppression')
    return
  }

  furnitures.value = furnitures.value.filter((f) => f.id !== id)
}
</script>

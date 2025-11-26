<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Mes meubles</h1>
          <p class="mt-2 text-sm text-gray-600">
            {{ furnitures.length }} meuble{{ furnitures.length > 1 ? 's' : '' }} dans votre
            collection
          </p>
        </div>

        <button
          @click="creating = !creating"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            v-if="!creating"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          {{ creating ? 'Fermer le formulaire' : 'Ajouter un meuble' }}
        </button>
      </div>

      <!-- FORMULAIRE DE CRÉATION -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="creating" class="mb-8">
          <MyFurnitureCreateForm
            :furniture-types="furnitureTypes"
            :addresses="uniqueAddresses"
            @created="onCreated"
            @cancel="creating = false"
          />
        </div>
      </Transition>

      <!-- CHARGEMENT -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"
          ></div>
          <p class="mt-4 text-sm text-gray-600">Chargement de vos meubles...</p>
        </div>
      </div>

      <!-- ERREUR -->
      <div v-else-if="error" class="rounded-lg bg-red-50 p-4">
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
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>
      </div>

      <!-- AUCUN MEUBLE -->
      <div
        v-else-if="furnitures.length === 0"
        class="rounded-lg bg-white p-12 text-center shadow-sm"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <h2 class="mt-4 text-lg font-medium text-gray-900">Aucun meuble pour l'instant</h2>
        <p class="mt-2 text-sm text-gray-500">Commencez par ajouter votre premier meuble</p>
        <button
          @click="creating = true"
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Ajouter un meuble
        </button>
      </div>

      <!-- GRILLE DE MEUBLES -->
      <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div
          v-for="f in furnitures"
          :key="f.id"
          class="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
        >
          <div class="flex flex-col md:flex-row">
            <!-- Image avec carousel -->
            <div class="relative w-full md:w-48 lg:w-56 flex-shrink-0">
              <div
                v-if="f.pictures && f.pictures.length"
                class="relative h-48 md:h-full bg-gray-100"
              >
                <img
                  v-if="currentPicture(f)"
                  :src="currentPicture(f)!.url"
                  :alt="currentPicture(f)!.altText"
                  class="h-full w-full object-cover transition group-hover:scale-105"
                />

                <!-- Boutons de navigation -->
                <template v-if="f.pictures.length > 1">
                  <button
                    @click.stop="prevImage(f)"
                    class="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    @click.stop="nextImage(f)"
                    class="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </template>

                <!-- Indicateurs de pagination -->
                <div
                  v-if="f.pictures.length > 1"
                  class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1"
                >
                  <span
                    v-for="(p, idx) in f.pictures"
                    :key="p.id"
                    class="h-2 w-2 rounded-full transition"
                    :class="idx === (carouselIndex[f.id] ?? 0) ? 'bg-white' : 'bg-white/50'"
                  />
                </div>
              </div>

              <!-- Placeholder si pas d'image -->
              <div v-else class="flex h-48 md:h-full items-center justify-center bg-gray-100">
                <svg
                  class="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <!-- Contenu -->
            <div class="flex flex-1 flex-col justify-between p-6">
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <h2 class="text-xl font-bold text-gray-900">{{ f.name }}</h2>
                    <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ f.description }}</p>
                  </div>

                  <!-- Badge statut -->
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800': f.status === 'PENDING_REVIEW',
                      'bg-green-100 text-green-800': f.status === 'PUBLISHED',
                      'bg-gray-100 text-gray-800': f.status === 'SOLD',
                      'bg-blue-100 text-blue-800': f.status === 'DRAFT',
                    }"
                  >
                    {{ humanStatus(f.status) }}
                  </span>
                </div>

                <!-- Détails -->
                <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    <span>{{ f.height }} × {{ f.width }} cm</span>
                  </div>

                  <div v-if="f.typeName" class="flex items-center gap-2 text-gray-600">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>{{ f.typeName }}</span>
                  </div>
                </div>

                <!-- Prix -->
                <div class="mt-4">
                  <span class="text-2xl font-bold text-indigo-600">{{ f.price.toFixed(2) }} €</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-6 flex gap-3">
                <button
                  @click="startEdit(f)"
                  class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Modifier
                </button>
                <button
                  @click="deleteFurniture(f.id)"
                  class="flex-1 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FORMULAIRE D'ÉDITION (Modal overlay) -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="editing && furnitureBeingEdited"
          class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4"
          @click.self="editing = false"
        >
          <div class="my-8 w-full max-w-3xl">
            <MyFurnitureEditForm
              :furniture="furnitureBeingEdited"
              :furniture-types="furnitureTypes"
              :addresses="uniqueAddresses"
              @updated="onUpdated"
              @cancel="((editing = false), (furnitureBeingEdited = null))"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'
import MyFurnitureEditForm from '@/components/MyFurnitureEditForm.vue'
import MyFurnitureCreateForm from '@/components/MyFurnitureCreateForm.vue'
import type { FurnitureStatus } from '../types/FurnitureStatus'

const creating = ref(false)
const editing = ref(false)
const furnitureBeingEdited = ref<MyFurnitureResponse | null>(null)

const onCreated = async () => {
  creating.value = false
  await loadFurniture()
}

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
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce meuble ?')) return

  const res = await apiFetch(`/api/my/furniture/${id}`, { method: 'DELETE' })

  if (!res.ok && res.status !== 204) {
    alert('Erreur lors de la suppression')
    return
  }

  furnitures.value = furnitures.value.filter((f) => f.id !== id)
}
</script>

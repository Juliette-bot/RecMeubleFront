<template>
  <footer class="border-t border-gray-200 bg-gray-900 mt-auto">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <!-- Section principale -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <!-- Logo et description -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <LightLucide class="h-6 w-6 text-white" />
            </div>
            <span class="text-xl font-bold text-white">RecMeuble</span>
          </div>
          <p class="mt-4 text-sm text-gray-400">
            Votre marketplace de meubles de seconde main. Achetez et vendez en toute confiance.
          </p>
          <!-- Réseaux sociaux -->
          <div class="mt-6 flex gap-4">
            <a
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-indigo-600 hover:text-white"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-indigo-600 hover:text-white"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
            <a
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-indigo-600 hover:text-white"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="lg:col-span-1">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Navigation</h3>
          <ul class="space-y-3">
            <li>
              <RouterLink to="/" class="text-sm text-gray-400 transition hover:text-white">
                Accueil
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/my-furniture"
                class="text-sm text-gray-400 transition hover:text-white"
              >
                Mes meubles
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/favorites" class="text-sm text-gray-400 transition hover:text-white">
                Mes favoris
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cart" class="text-sm text-gray-400 transition hover:text-white">
                Mon panier
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Aide -->
        <div class="lg:col-span-1">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Aide</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white">
                Comment ça marche ?
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white"> FAQ </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white">
                Service client
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white">
                Livraison & Retours
              </a>
            </li>
          </ul>
        </div>

        <!-- Légal -->
        <div class="lg:col-span-1">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Légal</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white"> À propos </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white">
                Confidentialité
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-gray-400 transition hover:text-white"> CGU / CGV </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="mt-12 border-t border-gray-800 pt-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <!-- Copyright -->
          <p class="text-sm text-gray-400">
            © {{ new Date().getFullYear() }} RecMeuble. Tous droits réservés.
          </p>

          <!-- Badges de paiement (optionnel) -->
          <div class="flex items-center gap-4">
            <span class="text-xs text-gray-500">Paiement sécurisé</span>
            <div class="flex gap-2">
              <div class="flex h-8 w-12 items-center justify-center rounded bg-white">
                <svg class="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M11.343 18.031c.058.049.12.098.181.146-1.177.783-2.59 1.238-4.107 1.238C3.32 19.415 0 16.096 0 12c0-4.097 3.32-7.415 7.417-7.415 1.518 0 2.931.456 4.105 1.238-.06.051-.12.098-.18.146-1.132.992-1.84 2.442-1.84 4.032 0 1.59.708 3.04 1.84 4.031zm.827.184c1.207-1.066 1.967-2.618 1.967-4.346 0-1.729-.76-3.28-1.967-4.346.057-.047.114-.097.17-.146 1.177-.783 2.59-1.238 4.107-1.238 4.097 0 7.417 3.318 7.417 7.415 0 4.097-3.32 7.415-7.417 7.415-1.518 0-2.931-.456-4.105-1.238.057-.05.113-.098.17-.146-.056-.047-.113-.098-.17-.146z"
                  />
                </svg>
              </div>
              <div class="flex h-8 w-12 items-center justify-center rounded bg-white">
                <svg class="h-4 w-6" viewBox="0 0 24 24">
                  <path
                    fill="#1434CB"
                    d="M9.112 8.262L5.97 15.758h-2.39L2.08 9.232c-.13-.502-.305-.707-.762-.908C.766 8.093.038 7.85 0 7.79l.046-.313h3.913c.497 0 .946.328 1.065.896l.972 5.175 2.428-6.071h2.391l-3.703 8.472zM19.646 12.647c.008-2.158-2.985-2.278-2.962-3.242.008-.293.285-.604.893-.684.302-.039.948-.069 1.735.305l.31-1.443A4.723 4.723 0 0017.967 7.3c-2.251 0-3.833 1.197-3.847 2.912-.013 1.268 1.131 1.975 1.993 2.396.887.432 1.184.708 1.18 1.093-.007.59-.707.85-1.36.86-.998.018-1.579-.27-2.041-.486l-.361 1.683c.465.213 1.323.398 2.212.407 2.392 0 3.955-1.181 3.963-3.011z"
                  />
                  <path
                    fill="#1434CB"
                    d="M24 15.758l-1.848-8.496h-1.922c-.433 0-.795.252-.956.64L15.77 15.758h2.394l.476-1.316h2.923l.276 1.316H24zm-3.387-5.958l.69 3.31h-1.893l1.203-3.31z"
                  />
                  <path fill="#1434CB" d="M11.981 7.262l-1.884 8.496h-2.274l1.883-8.496h2.275z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import LightLucide from '@/components/icons/LightLucide.vue'
</script>

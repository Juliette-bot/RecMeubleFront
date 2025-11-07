<template>
  <footer class="bg-gray-100 border-t border-gray-200 py-6 mt-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Logo / Nom du site -->
        <span class="text-gray-700 font-semibold text-lg">RecMeuble</span>

        <!-- Liens -->
        <nav class="flex space-x-4">
          <a href="#" class="text-gray-500 hover:text-gray-800 text-sm">À propos</a>
          <a href="#" class="text-gray-500 hover:text-gray-800 text-sm">Contact</a>
          <a href="#" class="text-gray-500 hover:text-gray-800 text-sm">Mentions légales</a>
        </nav>

        <!-- Copyright -->
        <p class="text-gray-400 text-sm text-center sm:text-right">
          © {{ new Date().getFullYear() }} RecMeuble. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// rien de spécial ici — juste le template
</script>

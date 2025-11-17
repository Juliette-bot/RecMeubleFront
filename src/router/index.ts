// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../stores/auth'
import { isProtectedRole } from '@/utils/roles'

// ===== Composants =====
import HomeAnonymous from '../views/HomeAnonymous.vue'
/* import Furnitures from '@/views/Furnitures.vue'
import Product from '@/views/Product.vue'
import Login from '@/views/Login.vue' */

// Sections "protégées"

import { ProtectedRole } from '@/types/router'
import HomeAdmin from '@/views/HomeAdmin.vue'
import HomeUser from '@/views/HomeUser.vue'
import ConnexionCompo from '@/components/ConnexionCompo.vue'
import RegisterCompo from '@/components/RegisterCompo.vue'
import FurnitureDetails from '@/views/FurnitureDetails.vue'
import MyFurniture from '@/views/MyFurniture.vue'

// ===== Déclaration des routes =====
const routes = [
  // 🔓 Routes publiques
  { path: '/', name: 'home', component: HomeAnonymous },
  /* { path: '/furnitures', name: 'furnitures', component: Furnitures },
  { path: '/product/:id', name: 'product', component: Product, props: true }, */
  { path: '/login', name: 'login', component: ConnexionCompo },
  { path: '/register', name: 'register', component: RegisterCompo },
  { path: '/furniture/:id', name: 'FurnitureDetails', component: FurnitureDetails },

  // 🔐 Espace utilisateur
  {
    path: '/user',
    name: 'user',
    component: HomeUser,
    meta: { requiresAuth: true, roles: ['USER'] as ProtectedRole[] },
    children: [
      {
        path: 'furniture',
        name: 'my-furniture', // ✅ AJOUT
        component: MyFurniture,
      },
    ],
  },

  // 🔐 Espace admin
  {
    path: '/admin',
    name: 'admin',
    component: HomeAdmin,
    meta: { requiresAuth: true, roles: ['ADMIN'] as ProtectedRole[] },
    children: [
      // ex: { path: 'dashboard', component: AdminDashboard },
    ],
  },

  // 🚫 Route fallback (404)
  { path: '/:pathMatch(.*)*', name: 'error', redirect: '/' },
]

// ===== Création du routeur =====
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ===== Garde globale =====
router.beforeEach((to, _from, next) => {
  const auth = useAuth()

  // si la route n’exige pas d’auth → passe
  if (!to.meta?.requiresAuth) return next()

  // route protégée → il faut un token
  if (!auth.token) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // vérification du rôle
  if (to.meta?.roles) {
    if (!isProtectedRole(auth.role) || !to.meta.roles.includes(auth.role)) {
      return next({ path: '/' })
    }
  }

  next()
})

export default router

// src/main.ts
import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 👈 importe le router (export default)
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router) // 👈 installe le router AVANT mount
app.mount('#app')

// src/main.ts
import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 👈 importe le router (export default)
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia()) // (si tu utilises Pinia)
app.use(router) // 👈 installe le router AVANT mount
app.mount('#app')

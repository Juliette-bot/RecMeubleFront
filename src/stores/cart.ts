import { Furniture } from '@/types/Furniture'
import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  state: () => ({
    cart: [] as Furniture[],
    counter: 0,
  }),

  getters: {
    cartCount: (state) => state.cart.length,
    totalItems: (state) => state.counter,
  },

  actions: {
    // Initialiser depuis localStorage
    initCart() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart)
          this.cart = parsed.cart || []
          this.counter = parsed.counter || 0
        } catch (e) {
          console.error('Erreur lors du chargement du panier', e)
        }
      }
    },

    // Sauvegarder dans localStorage
    saveCart() {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cart: this.cart,
          counter: this.counter,
        }),
      )
    },

    addItems(furniture: Furniture) {
      if (!this.cart.find((f) => f.id === furniture.id)) {
        this.cart.push({
          id: furniture.id,
          name: furniture.name,
          price: furniture.price,
          pictures: furniture.pictures,
          quantity: 1,
          deliveryCosts: 15,
          description: '',
          height: 0,
          width: 0,
          typeName: null,
          cityName: null,
          zipcode: null,
          status: null,
        })
        this.counter++
        this.saveCart()
      }
      console.log('Cart après ajout:', this.cart)
      console.log('Counter:', this.counter)
    },

    removeItem(furniture: Furniture) {
      this.cart = this.cart.filter((i) => i !== furniture)
      this.counter--
      this.saveCart()
    },

    clearCart() {
      this.cart = []
      this.counter = 0
      this.saveCart()
    },
  },
  persist: true,
})

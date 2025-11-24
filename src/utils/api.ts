import { useAuth } from '@/stores/auth'

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const auth = useAuth()
  const headers = new Headers(init.headers || {})
  if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`)
  return fetch(input, { ...init, headers })
}

/*
Ce fichier est un wrapper autour de fetch qui ajoute automatiquement ton token d'authentification à toutes tes requêtes HTTP.
Laisse-moi t'expliquer son fonctionnement et pourquoi tu en as besoin.
Ce que fait ce code



Récupère le token JWT depuis ton store Pinia (useAuth())
Crée ou modifie les headers de ta requête HTTP
Ajoute automatiquement le header Authorization: Bearer [ton-token] si tu es connecté
Exécute la requête avec tous ces paramètres



Pourquoi c'est indispensable pour une route PUT
Ton backend Spring Boot protège certainement certaines routes avec l'authentification JWT.
Quand tu veux faire une requête PUT (par exemple pour modifier un produit), le backend va :


Vérifier que tu es connecté (présence du token)
Vérifier que tu as les droits nécessaires (rôle vendeur/admin)
Autoriser ou refuser l'opération


Sans ce token, ton backend va rejeter la requête avec une erreur 401 (Unauthorized) ou 403 (Forbidden).
Exemple concret

Sans apiFetch (mauvaise approche) :

typescript// Tu devrais TOUT répéter à chaque fois
const auth = useAuth()
fetch('/api/products/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth.token}` // répétitif et source d'erreurs
  },
  body: JSON.stringify(data)
})

Avec apiFetch (bonne approche) :

typescript// Le token est ajouté automatiquement !
apiFetch('/api/products/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})



Pourquoi c'est une bonne pratique

DRY (Don't Repeat Yourself) : tu n'écris le code d'authentification qu'une seule fois
Moins d'erreurs : impossible d'oublier d'ajouter le token
Centralisé : si tu dois changer quelque chose (ajouter un header, gérer le refresh token), tu ne modifies qu'un seul fichier
Sécurité : garantit que toutes tes requêtes protégées incluent bien l'authentification

En résumé : ce fichier automatise l'ajout de ton token JWT à chaque requête, ce qui est essentiel pour que ton backend accepte
tes opérations PUT/POST/DELETE sur des ressources protégées. */

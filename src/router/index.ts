/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/pages/index.vue"),
    meta: { requiresAuth: true }
  },
  {
    name: "Categories",
    path: "/categories",
    component: () => import("@/pages/categories.vue"),
    meta: { requiresAuth: true }
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/login.vue"),
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/register.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLogged) {
    return '/login'
  }

})

export default router

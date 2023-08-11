import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: () => import('../views/Home.vue')
        }, {
            path: '/register',
            name: 'Register',
            component: () => import('../views/Register.vue')
        }, {
            path: '/',
            name: 'Login',
            component: () => import('../views/Login.vue')
        }, {
            path: '/pindaro',
            name: 'Pindaro',
            component: () => import('../views/Pindaro.vue')
        }, {
            path: '/dificultad',
            name: 'Dificultad',
            component: () => import('../views/Dificultad.vue')
        }, {
            path: '/pindaro',
            name: 'Pindaro',
            component: () => import('../views/Pindaro.vue')
        }, {
            path: '/preguntas',
            name: 'Preguntas',
            component: () => import('../views/Preguntas.vue')
        }
    ]
})
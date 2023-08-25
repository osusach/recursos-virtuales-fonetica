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
            path: '/rima',
            name: 'Rima',
            component: () => import('../views/Rima.vue')
        }, {
            path: '/cat-acentual',
            name: 'Cat-acentual',
            component: () => import('../views/Cat-acentual.vue')
        }, {
            path: '/dificultad/:id',
            name: 'Dificultad',
            component: () => import('../views/Dificultad.vue')
        }, {
            path: '/pindaro-alt',
            name: 'Pindaro Alternativo',
            component: () => import('../views/Pindaro-slider.vue')
        }, {
            path: '/preguntas',
            name: 'Preguntas',
            component: () => import('../views/Preguntas.vue')
        }, {
            path: '/correccion/:id',
            name: 'Correccion',
            component: () => import('../views/Correccion.vue')
        }, {
            path: '/agregar-preguntas',
            name: 'AgregarPreguntas',
            component: () => import('../views/AgregarPreguntas.vue')
        }
        , {
            path: '/juegos',
            name: 'Juegos',
            component: () => import('../components/Carousel_index.vue')
        }
    ]
})
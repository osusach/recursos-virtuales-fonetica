<template>
    <header className="bg-usach-aqua-900 flex items-center p-1">

        <button className="flex-none">
            <router-link to="/">
                <img src="/UsachSB.png" alt="Logo Usach" className="logo-sb hidden xl:block" />
                <img src="/UsachPB.png" alt="Logo Usach" className="logo-pb xl:hidden block" />
            </router-link>
        </button>
        <div class="flex-grow text-center">
            <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-usach-bebas-title text-white ">
                Recursos virtuales para el aprendizaje del lenguaje</h1>
        </div>
        <div
            class="flex flex-row gap-2 font-usach-bebas-body items-center align-middle text-2xl mx-5 px-4 bg-usach-aqua-700 p-2 rounded-lg text-white">
            <div>
                <p>{{ store.user }}</p>
            </div>
            <div v-if="store.user !== 'Invitado'" class="flex flex-row align-middle items-center justify-center">
                <svg width="1" height="25" class=" fill-white">
                    <rect width="400" height="100" />
                </svg>
                <button @click="logout" class="align-middle pl-2"><img src="/logout.svg"
                        class="h-6 invert fill-usach-terra-900" /></button>
            </div>
        </div>
        <a href="/agregar-preguntas" class="flex bg-usach-aqua-700 rounded-lg text-2xl p-2 text-white font-usach-bebas-body">
            <img src="/agregar.svg" alt="+" class="invert">
            <p>Preguntas</p>
        </a>
    </header>
</template>

<script setup>
import { store } from '../store.js'
import { useRouter } from 'vue-router'
console.log(store);
const router = useRouter()

const logout = () => {
    store.user = "Invitado"
    store.email = null
    store.curso = null
    store.password = null
    router.push("/")
}
</script>

<style>
.logo-pb {
    height: 170px;
    width: 170px;
}

.logo-sb {
    height: 170px;
    width: 538px;
}
</style>

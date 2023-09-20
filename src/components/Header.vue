<template>
    <header className="bg-usach-aqua-900 flex items-center p-1">
        
        <button className="flex-none">
            <router-link to="/">
                <img src="/UsachSB.png" alt="Logo Usach" className="logo-sb hidden lg:block"/>
                <img src="/UsachPB.png" alt="Logo Usach" className="logo-pb lg:hidden block"/>
            </router-link>
        </button>
        <div class="flex-grow text-center">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-usach-bebas-title text-white ">Recursos virtuales para el aprendizaje del lenguaje</h1>
        </div>
        <h2>
            USUARIO: {{ store.user }}
        </h2>
        <button @click="logout">LOGOUT</button>
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
  router.push("/home")
}
</script>

<style>
.logo-pb{
    height: 170px;
    width: 170px;
}
.logo-sb{
    height: 170px;
    width: 538px;
}
</style>

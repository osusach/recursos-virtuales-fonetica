
<template>
    <Juego :title="titulo"
        :func="rimaQuestion" 
        :urlJuego="'rimas'"
        :idJuego="'2'">
    </Juego>
</template>

<script setup>
import Juego from '../components/Juego.vue'
let dificultad = Number(localStorage.getItem('dificultad'))
const titulo = dificultad === 1 ?
                "¿Qué tipo de rima se presenta entre las siguientes palabras?" :
                "¿Hay rima entre las siguientes palabras?"

function rimaQuestion(question) {
    let palabra0 = question.wordA
    let palabra1 = question.wordB
    return `<div class="flex flex-row gap-5">
                <div class="bg-usach-ultra-600 p-3 rounded-lg my-5">
                    <p class="font-usach-helvetica-bold text-7xl pt-4">${ palabra0 }</p>
                </div>
                <div class="bg-usach-ultra-600 p-3 rounded-lg my-5">
                    <p class="font-usach-helvetica-bold text-7xl pt-4">${ palabra1 }</p>
                </div>
            </div>`
}            
</script>
            
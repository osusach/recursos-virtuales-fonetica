
<template>
    <Juego title="¿Cuántas sílabas tiene esta palabra?" 
        :func="pindaroQuestion" 
        :urlJuego="'silabas'"
        :idJuego="'1'">
    </Juego>
</template>

<script setup>
import Juego from '../components/Juego.vue'

function pindaroQuestion(question) {
    let palabra = question.word
    return `<div class="bg-usach-ultra-600 text-7xl p-3 rounded-lg my-5 font-usach-helvetica-bold">
                <p class="pt-4 text-7xl font-usach-helvetica-bold">${ palabra }</p>
            </div>`
}            
</script>
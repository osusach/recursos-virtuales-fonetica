<template>
    <Juego title="¿A qué categoría acentual pertenece esta palabra?" 
        :func="acentualQuestion" 
        :urlJuego="'acentual'"
        :idJuego="'3'">
    </Juego>
</template>

<script setup>
import Juego from '../components/Juego.vue'

function acentualQuestion(question) {
    let palabra = question.word
    let frase = question.phrase.split(palabra)
    return `<div class="bg-usach-ultra-600 p-3 rounded-lg my-5">
                <p class="text-3xl sm:text-5xl max-w-[20ch] font-usach-helvetica-bold">
                    ${frase[0]}
                    <b class="bg-usach-cloudy-900 rounded-md px-2">
                        ${palabra}
                    </b>
                    ${frase[1]}
                </p>
            </div>`
}            
</script>
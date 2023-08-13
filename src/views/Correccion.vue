<template>
    <div class="grid grid-cols-5 gap-5">
        <div v-for="i in Array.from({length: cantPregs}, (v, i) => i)" class="bg-usach-ultra-600 rounded-lg p-5">
            <p> pregunta {{ i + 1 }}: {{ palabras[i] }} </p>
            <p> Correcta {{ respCorrecta[i] }} </p>
            <p v-if="facil"> Usuario {{ store.respuestas[i] }} </p>
        </div>
    </div>
</template>

<script setup>
    import { store } from '../store.js'
    import { ref } from 'vue'

    const facil = ref(1)
    const palabras = ref(['hola', 'adiós', 'casa', 'perro', 'gato', 'ratón', 'pájaro', 'pato', 'camello', 'elefante'])
    const respCorrecta = ref(['1', '3', '2', '2', '5', '4', '1', '3', '2', '1'])
    const cantPregs = palabras.value.length
    console.log(store.respuestas)
</script>
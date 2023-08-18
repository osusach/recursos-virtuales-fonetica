<template>
    <div class="flex flex-col gap-y-2 text-center bg-usach-aqua-300 rounded-lg p-5 w-1/4 font-usach-bebas-title">
        <p class=" font-usach-bebas-title text-3xl">Corección</p>
        <div v-for="i in Array.from({length: cantPregs}, (v, i) => i)" class="flex flex-row justify-between items-center bg-usach-aqua-800 rounded-lg py-4 px-4 gap-x-3"
            :class="{
                        'bg-usach-aqua-800': store.respuestas[i] === respCorrecta[i],
                        'bg-usach-rouge-700': store.respuestas[i] !== respCorrecta[i]
                    }">
            <div class="flex flex-row w-1/3 text-lg gap-2 items-center">
                <p class=" p-1 rounded-lg w-10" :class="{
                        'bg-usach-aqua-500': store.respuestas[i] === respCorrecta[i],
                        'bg-usach-rouge-500': store.respuestas[i] !== respCorrecta[i]
                    }">P{{ i + 1 }}</p>
                <p class=" font-usach-bebas-body text-xl text-left">{{ palabras[i] }} </p>
            </div>
            <div class="flex flex-row w-1/2 justify-between px-3 rounded-lg">
                <p class=" font-usach-bebas-body text-xl" v-if="facil"> Respuesta: {{ store.respuestas[i] }} </p>
                <p class=" font-usach-bebas-body text-xl"> Correcta: {{ respCorrecta[i] }} </p>
            </div>
        </div>
        <button class=" bg-usach-terra-700 mt-4 rounded-lg font-usach-bebas-title text-2xl p-3">Terminar</button>
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
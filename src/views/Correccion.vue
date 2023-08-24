<template>
    <div class="flex flex-col gap-y-2 text-center bg-usach-aqua-300 rounded-lg p-5 md:w-[60%] sm:w-[80%] lg:w-[40%] xl:w-[30%] font-usach-bebas-title">
        <p class=" font-usach-bebas-title text-3xl">Corrección</p>
        <div class="flex flex-row place-content-between bg-usach-terra-600 rounded-lg py-2 px-4 gap-x-5">
            <div class="flex flex-row text-lg gap-2 items-center">
                <p class="px-2 rounded-lg w-fit bg-usach-terra-300"> PX </p>
                <p class="text-left"> Pregunta </p>
            </div>
            <div class="flex flex-row w-fit justify-between items-center rounded-lg gap-5">
                <p> Tu respuesta: </p>
                <p> Respuesta correcta: </p>
            </div>
        </div>
        <div v-for="i in Array.from({length: cantPregs}, (v, i) => i)" class="flex flex-row place-content-between bg-usach-aqua-800 rounded-lg py-2 px-4 gap-x-5"
            :class="{
                        'bg-usach-aqua-800': respuestas[i] === respCorrecta[i],
                        'bg-usach-rouge-700': respuestas[i] !== respCorrecta[i]
                    }">
            <div class="flex flex-row text-lg gap-2 items-center">
                <p class=" px-2 rounded-lg w-fit" :class="{
                        'bg-usach-aqua-500': respuestas[i] === respCorrecta[i],
                        'bg-usach-rouge-500': respuestas[i] !== respCorrecta[i]
                    }">P{{ i + 1 }}</p>
                <p class="text-left">{{ preguntas[i] }} </p>
            </div>
            <div class="flex flex-col text-center   ">
                <p class=" font-usach-bebas-title text-xl rounded-lg" :class="{
                    'bg-usach-aqua-500 px-3': respuestas[i] === respCorrecta[i],
                    'bg-usach-rouge-500 px-3': respuestas[i] !== respCorrecta[i]
                }"> Tu respuesta: {{ respuestas[i] }} </p>
                <p class=" font-usach-bebas-body text-xl"> Correcta: {{ respCorrecta[i] }} </p>
            </div>
        </div>
        <router-link to="/home" class="bg-usach-terra-700 mt-4 rounded-lg font-usach-bebas-title text-2xl p-3 hover:bg-usach-terra-800">
            <button>
                Terminar
            </button>
		</router-link>
    </div>
</template>

<script setup>
    import { store } from '../store.js'
    import { ref } from 'vue'

    const facil = ref(1)
    const dificultad = Number(localStorage.getItem('dificultad'))
    const palabras = ref(['hola', 'adiós', 'casa', 'perro', 'gato', 'ratón', 'pájaro', 'pato', 'camello', 'elefante'])
    const respCorrecta = ref(['1', '3', '2', '2', '5', '4', '1', '3', '2', '1'])
    const cantPregs = palabras.value.length
    const respuestas = store.respuestas
    const preguntas = store.preguntas
    console.log(preguntas)
</script>

<style>
p {
    font-family: BebasNeuePro Regular, sans-serif;
    font-size: 1.25rem/* 20px */;
    line-height: 1.75rem/* 28px */;
}
</style>
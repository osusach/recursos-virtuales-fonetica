<template>
    <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg">
        <div class="flex flex-row p-10">
            <a> {{ countPregunta }}/{{ totalPreguntas }}</a>
            <button class="text-sm align-middle" @click="siguientePregunta"> siguiente pregunta </button>
        </div>
        <div>
            <p class="">pregunta: {{ pregunta }}?</p>
            <div v-for="respuesta in respuestas">
                <Boton :title="respuesta.text" @click="checkAnswer(respuesta.valor)"></Boton>
            </div>
            <a v-if="mostrar">cierto</a>
            <a v-if="!mostrar">mal</a>
        </div>
    </div>
</template>

<script setup>
    import Boton from './Boton.vue'
    import { ref } from 'vue'
    let mostrar = ref(false)
    let countPregunta = ref(0)
    let totalPreguntas = ref(6)
    let pregunta = ref(2)
    let correctAnswer = 2
    const respuestas = [
        { text: "resp 1", valor: 1 },
        { text: "resp 2", valor: 2 },
        { text: "resp 3", valor: 3 },
        { text: "resp 4", valor: 4 },
    ]

    const checkAnswer = (answer) => {
        if (answer === correctAnswer)
        {
            console.log(true);
            mostrar.value = true
            return;
        }
        console.log(false);
        mostrar.value = false
    }
    const siguientePregunta = () => {
        if (countPregunta === totalPreguntas)
            return;

        countPregunta.value = countPregunta.value + 1
        pregunta.value = pregunta.value + 1 % 4
        correctAnswer = pregunta.value
        mostrar.value = false
    }
</script>


<style>
    .bg-usach-aqua-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(50 181 173 / var(--tw-bg-opacity));
}
</style>
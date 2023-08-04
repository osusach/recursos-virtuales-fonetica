<template>
    <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg">
        <div class="flex flex-row p-10 gap-10">
            <a> {{ countPregunta }}/{{ totalPreguntas }}</a>
            <Boton title="siguiente pregunta" @click="siguientePregunta"></Boton>
        </div>
        <div class="flex flex-col p-10 gap-10">
            <p class="">pregunta: {{ pregunta }}?</p>
            <div class="flex flex-row gap-x-10">
                <Boton v-for="respuesta in respuestas" :title="respuesta.text" @click="checkAnswer(respuesta.valor)"></Boton>
            </div>
            <a v-if="mostrar && correcto">cierto</a>
            <a v-if="mostrar && !correcto">mal</a>
        </div>
    </div>
</template>

<script setup>
    import Boton from './Boton.vue'
    import { ref } from 'vue'
    // variables juego
    let pregunta
    let respuestaCorrecta
    let mostrar
    let correcto
    let respuestas

    const getQuestion = () => {
        const data = {
            pregunta: "Que numero es 2?",
            respuesta: 2,
            tipo: 1,
            dificultad: 1,
        }
        return data
    }

    const setQuestion = () => {
        const data = getQuestion()
        pregunta = data.pregunta
        respuestaCorrecta = data.respuesta
        mostrar = ref(false)
        correcto = ref(false)
        // cambiar por funcion que use la lista correcta segun tipo y dificultad
        respuestas = [
            { text: "resp 1", valor: 1 },
            { text: "resp 2", valor: 2 },
            { text: "resp 3", valor: 3 },
            { text: "resp 4", valor: 4 },
        ]
        
    }

    let countPregunta = ref(0)
    let totalPreguntas = ref(6)
    setQuestion()
    const checkAnswer = (answer) => {
        if (answer === respuestaCorrecta)
        {
            console.log(true);
            correcto.value = true
        } else {
            console.log(false);
            correcto.value = false
        }
        mostrar.value = true
    }
    
    const siguientePregunta = () => {
        if (countPregunta === totalPreguntas)
            return;

        setQuestion()
        mostrar.value = false
    }
</script>


<style>
    .bg-usach-aqua-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(50 181 173 / var(--tw-bg-opacity));
}
</style>
<template>
    <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg">
        <div class="flex flex-row p-10 gap-10">
            <a> {{ countPregunta }}/{{ totalPreguntas }}</a>
            <Boton label="siguiente pregunta" @click="siguientePregunta" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"></Boton>
        </div>
        <div class="flex flex-col p-10 gap-10">
            <p class="">pregunta: {{ pregunta }}?</p>
            <div class="flex flex-row gap-x-10">
                <div v-if="mostrarSlider">slider</div>
            </div>
            <a v-if="mostrar && correcto">cierto</a>
            <a v-if="mostrar && !correcto">mal</a>
        </div>
    </div>
</template>

<script setup>
    import Boton from './Boton.vue'
    import { ref } from 'vue'

    const props = defineProps({
        tipo: String,
        dificultad: String
    })

    // variables juego
    let pregunta
    let respuestaCorrecta
    let mostrar
    let mostrarBotones
    let mostrarSlider
    let correcto
    let respuestas

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

    const getQuestion = () => {
        const data = {
            pregunta: "Que numero es 2?",
            respuesta: 2,
            tipo: 1,
            dificultad: 1,
        }
        return data
    }

    const setQuestion = (tipo, dificultad) => {
        const data = getQuestion()
        pregunta = data.pregunta
        respuestaCorrecta = data.respuesta
        mostrar = ref(false)
        correcto = ref(false)
        mostrarBotones = ref(false)
        mostrarSlider = ref(false)
        // cambiar por funcion que use la lista correcta segun tipo y dificultad
        respuestas = generarRespuestas(parseInt(tipo), parseInt(dificultad))
    }

    // tipo: 1 = pindaro, 2 = rima, 3 = cat_acentual
    const generarRespuestas = (tipo, dificultad) => {
        const respRima = [
            { text: "Si", valor: 1 },
            { text: "No", valor: 2 },
            { text: "Consonante", valor: 3 },
            { text: "Asonante", valor: 4 },
            { text: "Sin rima", valor: 5 },
        ]
        const respCatAcentual = [
            { text: "Grave", valor: 1 },
            { text: "Aguda", valor: 2 },
            { text: "Esdrujula", valor: 3 },
            { text: "Monosilabo tónico", valor: 4 },
            { text: "Monosilabo átono", valor: 5 },
            { text: "Bisilabos átono", valor: 6 },
        ]
        let respuestas = []
        
        if (tipo === 1)
        {
            mostrarSlider.value = true
        }
    }

    let countPregunta = ref(0)
    let totalPreguntas = ref(6)
    console.log(props.tipo, props.dificultad)
    setQuestion(props.tipo, props.dificultad)
</script>
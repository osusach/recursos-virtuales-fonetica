<template>
    <div v-if="!loading" class="w-full sm:w-fit flex flex-col gap-4">
        <div class="hidden sm:flex flex-row h-14 rounded-lg bg-usach-ultra-900 align-middle items-center">
            <div class="flex static bg-usach-ultra-300 h-3 w-full rounded-xl mr-1 ml-6 justify-center items-center font-usach-bebas-title">
                <button v-for="num in Array.from({ length: cantPregs }, (v, i) => i)" @click="changeQuestion(num + 1)"
                class="mx-2 rounded-full h-7 w-10 text-lg" :class="{
                    'bg-usach-ultra-300 font-usach-bebas-body': respuestas[num] === undefined,
                    'bg-usach-terra-700 text-slate-100': respuestas[num] !== undefined
                }">
                    {{ num + 1 }}
                </button>
            </div>
            
            <button class="font-usach-bebas-title mx-3 bg-usach-terra-700 rounded-lg p-1 text-white text-lg" @click="endQuiz">
                {{ Fin }}
            </button>
        </div>
        <div class="flex flex-col rounded-lg bg-usach-ultra-900 p-10 text-center font-usach-helvetica-body text-white items-center">
            <div class=" font-usach-helvetica-bold text-lg">Pregunta {{ i + '/' + cantPregs }}</div>
            <div class="bg-usach-ultra-600 text-7xl p-3 rounded-lg my-5 font-usach-helvetica-bold">
                <p class="pt-4">{{ palabra }}</p>
            </div>
            <p class="text-center text-xl">¿Cuántas sílabas tiene esta palabra?</p>
            <div class="preguntas">
                <div v-for="opcion in opciones" class="flex">
                    <input type="radio" :id="'answer-' + opcion.answer" :value="opcion.value" v-model="respuesta" class="hidden" />
                    <label :for="'answer-' + opcion.answer"
                        class="min-w-[6ch] px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out pt-3"
                        :class="{
                            ' bg-usach-aqua-800 text-white': respuesta === opcion.value,
                            'bg-gray-200 text-gray-700 hover:bg-gray-300': respuesta !== opcion.value
                        }">
                        {{ opcion.answer }}
                    </label>
                </div>
            </div>

            <div class="text-2xl flex flex-row justify-center gap-4 font-usach-bebas-body">
                <button v-if="i > 1" @click="prevQuestion" class="nav-buttons">Atrás</button>
                <button @click="nextQuestion" class="nav-buttons"> {{ nextText }} </button>
            </div>
        </div>
    </div>
    <Loading v-if="loading"/>
</template>

<script setup>
import Loading from '../components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import axios from 'axios'

const router = useRouter()

// Constantes
const Fin = ref('Terminar')
const cantPregs = 10
const i = ref(1)
const loading = ref(true)
const url = 'https://pindaro.pindarousach.workers.dev'

let palabra = ref('')
let opciones = ref([])
let nextText = ref('Siguiente')
let respuesta = ref(-1)

let dificultad = Number(localStorage.getItem('dificultad')) - 1
let respuestas = []
let apiResponse = null

const changeQuestionApi = () => {
    if (apiResponse === null)
        { return }
    let question = apiResponse.questions[i.value - 1]
    palabra.value = question['word']
    opciones.value = question.options
    opciones.value.sort((a, b) => a.value - b.value)
    if (loading) { loading.value = false }
}

// get a db
onMounted(async () => {
    try {
        
        const response = await axios.get(url + '/silabas/start/' + (dificultad < 1 ? 0 : 1))  
        apiResponse = response.data
        console.log((dificultad < 1 ? 0 : 1));
        changeQuestionApi()
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})

const saveAnswer = () => {
    // no borrar respuesta al navegar
    if (respuesta.value !== -1) {
        respuestas[i.value - 1] = respuesta.value
    }
}

const nextTextVerify = () => {
    if (i.value == cantPregs) {
        nextText.value = 'Terminar'
    } else {
        nextText.value = 'Siguiente'
    }
    respuesta.value = -1
}

const nextQuestion = () => {
    saveAnswer()
    if (i.value < cantPregs) {
        i.value += 1
        changeQuestionApi()
        nextTextVerify()
    } else {
        endQuiz()
    }
}

const prevQuestion = () => {
    saveAnswer()
    if (i.value > 1) {
        i.value -= 1
        changeQuestionApi()
        nextTextVerify()
    }
}

const changeQuestion = (num) => {
    saveAnswer()
    i.value = num
    changeQuestionApi()
    nextTextVerify()
}

const endQuiz = () => {
    saveAnswer()
    const data = {
        "sessionId": apiResponse.sessionId,
        "answers": []
    }

    for (let index = 0; index < cantPregs; index++) {
        const resp = { "questionId": apiResponse.questions[index].id, "answer":  Number(respuestas[index]) } 
        data.answers.push(resp)
    }
    console.log(data);

    axios.post(url + '/silabas/submit', data)
    .then(response => {
        console.log('Respuesta del servidor:', response.data);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
    // router.push('/correccion')
}
</script>
<style>
@import '../assets/juegos.css';
</style>
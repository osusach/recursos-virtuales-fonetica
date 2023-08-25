<template>
    <div v-if="!loading">
        <div class="grid items-center">
            <div class="flex flex-col gap-4">
                <div class="hidden sm:flex flex-row h-14 w-fit rounded-lg bg-usach-ultra-900 align-middle items-center">
                    <div class="flex static bg-usach-ultra-300 h-3 w-full rounded-xl mr-1 ml-6 justify-center items-center font-usach-bebas-title">
                        <button v-for="num in Array.from({ length: cantPregs }, (v, i) => i)" @click="changeQuestion(num + 1)"
                        class="mx-2 rounded-full h-7 w-10 text-lg" :class="{
                            'bg-usach-ultra-300 font-usach-bebas-body': store.respuestas[num] === undefined,
                            'bg-usach-terra-700 text-slate-100': store.respuestas[num] !== undefined
                        }">
                            {{ num + 1 }}
                        </button>
                    </div>
                    
                    <button class="font-usach-bebas-title mx-3 bg-usach-terra-700 rounded-lg p-1 text-white text-lg" @click="endQuiz">
                        {{ Fin }}
                    </button>
                </div>
                <div class=" flex flex-col rounded-lg bg-usach-ultra-900 p-10 text-center font-usach-helvetica-body text-white items-center">
                    <div class=" font-usach-helvetica-bold text-lg">Pregunta {{ i + '/' + cantPregs }}</div>
                    <div class="bg-usach-ultra-600 text-7xl p-3 rounded-lg my-5 font-usach-helvetica-bold">
                        <p class=" pt-4">{{ palabra }}</p>
                    </div>
                    <p class="text-center text-xl">¿Cuántas sílabas tiene esta palabra?</p>
                    
                    <input type="range" v-model="respuesta" min="0" max="10" step="1" class="bg-transparent">
                        <p>Valor actual: {{ respuesta }}</p>

                    <div class="flex flex-row justify-center gap-4 font-usach-bebas-body">
                        <button v-if="i > 1" @click="prevQuestion" class="bg-usach-aqua-800 rounded-lg p-2">Atrás</button>
                        <button @click="nextQuestion" class="bg-usach-aqua-800 rounded-lg p-2"> {{ nextText }} </button>
                    </div>
                </div>
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

store.respuestas = []
let palabra = ref('')
let apiResponse = null

const changeQuestionApi = () => {
    if (apiResponse === null)
        { return }
        
    let question = apiResponse[i.value - 1]
    palabra.value = question['word']
    if (loading) { loading.value = false }
}

// get a db
onMounted(async () => {
    try {
        const response = await axios.get('https://pindaro.pindarousach.workers.dev/silabas/start/' + store.dificultad)  
        apiResponse = response.data
        console.log(apiResponse)
        store.preguntas = []
        apiResponse.forEach(element => {
            store.preguntas.push(element['word'])
        });
        changeQuestionApi()
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})

let respuesta = ref(5)
const nextText = ref('Siguiente')


const saveAnswer = () => {
    // no borrar respuesta al navegar
    if (respuesta.value !== '') {
        store.respuestas[i.value - 1] = respuesta.value
    }
}
const nextTextVerify = () => {
    if (i.value == cantPregs) {
        nextText.value = 'Terminar'
    } else {
        nextText.value = 'Siguiente'
    }
    respuesta.value = 5
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
    router.push('/correccion')
}
</script>
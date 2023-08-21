<template>
    <div v-if="!loading">
        <div class="grid items-center">
            <div class="flex flex-col gap-4">
                <div class="flex flex-row h-14 rounded-lg bg-usach-ultra-900 align-middle items-center">
                    <div class="flex static bg-usach-ultra-300 h-3 w-full rounded-xl mr-1 ml-6 justify-center items-center font-usach-bebas-title">
                        <button v-for="num in Array.from({ length: cantPregs }, (v, i) => i)" @click="changeQuestion(num + 1)"
                        class="mx-2 rounded-full h-7 w-10 text-lg" :class="{
                            'bg-usach-ultra-300 font-usach-bebas-body': store.respuestas[num] === undefined,
                            'bg-usach-terra-700 text-slate-100': store.respuestas[num] !== undefined
                        }">
                            {{ num + 1 }}
                        </button>
                    </div>
                    
                    <button class=" font-usach-bebas-title mx-3 bg-usach-terra-700 rounded-lg p-1 text-white text-lg" @click="endQuiz">
                        {{ Fin }}
                    </button>
                </div>
                <div class=" flex flex-col rounded-lg bg-usach-ultra-900 p-10 text-center font-usach-helvetica-body text-white items-center">
                    <div class=" font-usach-helvetica-bold text-lg">Pregunta {{ i + '/' + cantPregs }}</div>
                    <div class="flex flex-row gap-5">
                        <div class="bg-usach-ultra-600 text-7xl p-3 rounded-lg my-5 font-usach-helvetica-bold">
                            <p class=" pt-4">{{ palabra0 }}</p>
                        </div>
                        <div class="bg-usach-ultra-600 text-7xl p-3 rounded-lg my-5 font-usach-helvetica-bold">
                            <p class=" pt-4">{{ palabra1 }}</p>
                        </div>
                    </div>
                    <p class="text-center text-xl">¿Qué tipo de rima se presenta entre las siguientes palabras?</p>
                    <div class="flex flex-row p-5 rounded-lg bg-usach-ultra-600 mt-3 mb-7">
                        <div v-for="opcion in opciones" class="flex space-x-2">
                            <input type="radio" :id="'answer-' + opcion" :value="opcion" v-model="respuesta" class="hidden" />
                            <label :for="'answer-' + opcion"
                                class="px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out pt-3"
                                :class="{
                                    ' bg-usach-aqua-800 text-white': respuesta === opcion,
                                    'bg-gray-200 text-gray-700 hover:bg-gray-300': respuesta !== opcion
                                }">
                                {{ opcion }}
                            </label>
                        </div>
                    </div>

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

let palabra0 = ref('')
let palabra1 = ref('')
let opciones = ref([])

let apiResponse = null

const changeQuestionApi = () => {
    if (apiResponse === null)
        { return }
    let question = apiResponse[i.value - 1]
    palabra0.value = question['words'][0]
    palabra1.value = question['words'][1]
    opciones = ref([])
    question['answers'].forEach(answer => { opciones.value.push(answer['answer']) })
    if (loading) { loading.value = false }
}

// get a db
onMounted(async () => {
  try {
    const response = await axios.get('https://pindaro.pindarousach.workers.dev/rima/start/' + store.dificultad)  
    apiResponse = response.data
    changeQuestionApi()
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

let respuesta = ref('')
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
    respuesta.value = ''
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
<template>
    <div>
        <h1>Juego Seleccionado: {{ selectedGame }}</h1>
        <div class="flex justify-between">
            <div class="bg-white">
                <ul>
                    <li v-for="juego in Object.keys(preguntas)" @click="selectGame(juego)">
                        {{ juego }}
                    </li>
                </ul>
            </div>
            <div class="bg-slate-300">
                <ul>
                    <li v-for="pregunta in preguntas[selectedGame]">
                        <div> {{ pregunta }} </div>
                        <button @click="removeQuestion(pregunta)"> Borrar </button>
                        <button @click="setAction(false, pregunta)"> Update </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg-stone-500">
            <button @click="setAction(true)"> Agregar pregunta </button>
        </div>

        <div v-if="activeAction">
            <input type="text" id="newQuestion" v-model="newQuestion">
            <input type="text" id="solution" v-model="solution">
            <input type="text" id="dificult" v-model="dificult">
            <button v-on="action ? { click: addQuestion } : { click: () => {updateQuestion(questionUpdate)} }">Confirmar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const preguntas = ref({
    'Pindaro': ['Pregunta 1', 'Pregunta 2'],
    'Rima': ['Pregunta 3', 'Pregunta 4'],
    'Cat acentual': ['Pregunta 5', 'Pregunta 6']
})

const selectedGame = ref('Pindaro')

const activeAction = ref(false)
const action = ref(true) // true to add, false to update

const newQuestion = ref('')
const solution = ref('')
const dificult = ref('')

const questionUpdate = ref('')

const questionsToAdd = []
const questionsToRemove = []
const questionsToUpdate = []


const selectGame = (juego) => {
    selectedGame.value = juego
    console.log(selectedGame.value)
}

const setAction = (newAction, questionToUpdate) => {
    activeAction.value = true
    action.value = newAction
    if (!newAction) {
        questionUpdate.value = questionToUpdate
    }
}

const clearText = () => {
    newQuestion.value = ''
    solution.value = ''
    dificult.value = ''
    activeAction.value = false
}

const addQuestion = () => {
    preguntas.value[selectedGame.value].push(newQuestion.value)
    questionsToAdd.push({ 
        pregunta: newQuestion.value,
        solucion: solution.value,
        dificultad: dificult.value,
        categoria: selectedGame.value
    })
    clearText()
}

const removeQuestion = (pregunta) => {
    const index = preguntas.value[selectedGame.value].indexOf(pregunta)
    preguntas.value[selectedGame.value].splice(index, 1)
    questionsToRemove.push(pregunta)
}

const updateQuestion = (pregunta) => {
    const index = preguntas.value[selectedGame.value].indexOf(questionUpdate.value)
    preguntas.value[selectedGame.value][index] = newQuestion.value
    questionsToUpdate.push(pregunta)
    clearText()
}

</script>
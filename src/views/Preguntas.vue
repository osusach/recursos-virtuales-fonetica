<template>
    <div class="flex">
        <div class="bg-usach-aqua-700">
            <h1>Pregunta {{ i }}.</h1>
            <p>Cuantas silabas tiene esta palabra:</p>
            <p>{{ palabra }}</p>
    
            <p>Opciones</p>
            <div v-for="opcion in opciones">
                <input type="radio" :value="opcion" v-model="respuesta">
                <label>{{ opcion }}</label>
            </div>
    
            <div>
                <button v-if="i > 1" @click="prevQuestion">Atras</button>
                <button @click="nextQuestion"> {{ nextText }} </button>
            </div>
        </div>
        <div class="bg-usach-terra-700">
            <div>
                preguntas
            </div>
            <button v-for="num in [1,2,3,4,5,6,7,8,9,10]" @click="changeQuestion(num)" class="p-3">
                {{ num }}
            </button>
            <button @click="() => {Fin = Fin === 'Terminar' ? 'Terminado' : 'Terminar'}">
                {{ Fin }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    // TESTEO
    const Fin = ref('Terminar')

    const i = ref(1)
    const palabras = ref(['hola', 'adios', 'casa', 'perro', 'gato', 'raton', 'pajaro', 'pato', 'pato2', 'pato3'])
    const palabra = ref(palabras.value[i.value - 1])
    const opciones = ref(['1', '2', '3', '4'])
    const respuesta = ref('')
    const nextText = ref('Siguiente')
    
    const nextTextVerify = () => {
        if (i.value == 10) {
            nextText.value = 'Terminar'
        } else {
            nextText.value = 'Siguiente'
        }
        respuesta.value = ''
    }

    const nextQuestion = () => {
        if (i.value < 10) {
            i.value += 1
            palabra.value = palabras.value[i.value - 1]
            nextTextVerify()
        }
    }

    const prevQuestion = () => {
        if (i.value > 1) {
            i.value -= 1
            palabra.value = palabras.value[i.value - 1]
            nextTextVerify()
        }
    }

    const changeQuestion = (num) => {
        i.value = num
        palabra.value = palabras.value[i.value - 1]
        nextTextVerify()
    }

    console.log(i.value)
    console.log(palabra.value)
    console.log(opciones.value)
    console.log(respuesta.value)
</script>

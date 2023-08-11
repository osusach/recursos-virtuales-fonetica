<template>
    <div class="grid grid-cols-2">
        <div class="rounded-lg bg-usach-aqua-100 p-10">
            <h1>Pregunta {{ i }}.</h1>
            <label class="bg-usach-cloudy-700 text-5xl w-1/2">{{ palabra }}</label>
            
            <p class="text-center text-xl">Cuantas silabas tiene esta palabra:</p>
            <div class="flex flex-row p-5 rounded-lg bg-usach-daisy-800">
                <div v-for="opcion in opciones" class="flex space-x-2">
                    <input type="radio" :id=" 'id-'+opcion" :value="opcion" v-model="respuesta" class="hidden"/>
                    <label :for="'id-'+opcion" class="px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out" 
                    :class="{   
                        'bg-indigo-500 text-white': respuesta === opcion,
                        'bg-gray-200 text-gray-700 hover:bg-gray-300': respuesta !== opcion }">
                        {{ 'asdasdasd '+ opcion }}
                    </label>
                </div>
            </div>
    
            <div>
                <button v-if="i > 1" @click="prevQuestion">Atras</button>
                <button @click="nextQuestion"> {{ nextText }} </button>
            </div>
        </div>
        <div class="rounded-lg bg-usach-rouge-600 w-fit h-fit p-5">
            <div>
                preguntas
            </div>
            <div class="grid grid-cols-3 gap-5">
                <button v-for="num in [1,2,3,4,5,6,7,8,9,10]" @click="changeQuestion(num)" class="border rounded-lg p-3 bg-usach-rouge-100">
                    {{ num }}
                </button>
            </div>
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
            
            console.log(i.value)
            console.log(respuesta.value)
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

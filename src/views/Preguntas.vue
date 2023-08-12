<template>
    <div class="grid grid-cols-2">
        <div class="m-auto flex flex-col rounded-lg bg-usach-ultra-900 p-10 text-center font-usach-helvetica-body text-white items-center">
            <h1 class=" font-usach-helvetica-bold text-lg">Pregunta {{ i }}</h1>
            <div class="bg-usach-ultra-600 text-7xl p-3 rounded-lg my-5 font-usach-helvetica-bold">
                <p class=" pt-4">{{ palabra }}</p>
            </div>
            <p class="text-center text-xl">¿Cuántas sílabas tiene esta palabra?</p>
            <div class="flex flex-row p-5 rounded-lg bg-usach-ultra-600 mt-3 mb-7">
                <div v-for="opcion in opciones" class="flex space-x-2">
                    <input type="radio" :id=" 'id-'+opcion" :value="opcion" v-model="respuesta" class="hidden"/>
                    <label :for="'id-'+opcion" class="px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out pt-3" 
                    :class="{   
                        ' bg-usach-daisy-800 text-white': respuesta === opcion,
                        'bg-gray-200 text-gray-700 hover:bg-gray-300': respuesta !== opcion }">
                        {{ 'Alternativa '+ opcion }}
                    </label>
                </div>
            </div>
    
            <div class="flex flex-row justify-center gap-4">
                <button v-if="i > 1" @click="prevQuestion">Atrás</button>
                <button @click="nextQuestion"> {{ nextText }} </button>
            </div>
        </div>
        <div class="m-auto flex-col rounded-lg bg-usach-terra-800 w-fit h-fit p-5 font-usach-helvetica-body text-white items-center">
            <div class="text-center mb-3">
                <p class=" font-usach-helvetica-bold text-white text-lg">Preguntas</p>
            </div>
            <div class="grid grid-cols-3 gap-3 font-usach-helvetica-bold">
                <button v-for="num in [1,2,3,4,5,6,7,8,9,10]" @click="changeQuestion(num)" class="rounded-lg p-3 bg-usach-terra-600 pt-4 text-lg">
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
    const palabras = ref(['hola', 'adiós', 'casa', 'perro', 'gato', 'ratón', 'pájaro', 'pato', 'camello', 'elefante'])
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

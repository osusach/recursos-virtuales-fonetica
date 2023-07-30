<template>
    <Boton :class="[clase, clase2]" v-if="mostrar" v-for="num in [1, 2, 3, 4, 5]" @click="print(num)">
        {{ num }}
    </Boton>
</template>

<script setup>
import Boton from './Boton.vue';
import { ref } from 'vue';

let mostrar = ref(true);

const clase = ref('boton');
const clase2 = ref('boton3');

const print = (num) => {
    clase.value = 'boton2';
    clase2.value = 'boton4';
    console.log(num);
}
</script>

<style>
    .boton {
        background-color: red;
    }
    .boton2 {
        background-color: blue;
    }
    .boton3 {
        font-size: x-small;
    }
    .boton4 {
        font-size: x-large;
    }

</style>
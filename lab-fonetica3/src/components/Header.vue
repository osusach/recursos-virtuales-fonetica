<template>
    <Boton :class="[clase, clase2]" v-if="mostrar" @click="print(num)">
        {{ num }}
    </Boton>
</template>

<script setup>
import Boton from './Boton.vue';
import { ref } from 'vue';

let mostrar = ref(true);

const clase = ref('bg-blue-500');
const clase2 = ref('text-xl');

const print = (num) => {
    clase.value = 'bg-red-500';
    clase2.value = 'text-2xl';
    console.log(num);
}
</script>

<style>
</style>
<template>
    <input type="range" v-model="sliderValue" min="0" max="10" step="1">
    <p>Valor actual: {{ sliderValue }}</p>
</template>

<script setup>
    import { ref } from 'vue'
    
    let sliderValue = ref(5)
</script>
<template>
    <input type="range" v-model="sliderValue" min="0" max="100" step="1">
    <p>Valor actual: {{ sliderValue }}</p>
</template>

<script setup>
    import { ref } from 'vue'
    let sliderValue = ref(50)
</script>
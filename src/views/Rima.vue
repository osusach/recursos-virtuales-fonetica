<template>
    <Juego :tipo="$route.query.tipo" :dificultad="$route.query.dificultad"/>
</template>

<script setup>
    import Juego from "../components/Juego.vue"
    
</script>
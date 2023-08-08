<template>
    <Header></Header>
    <main class="bg-usach-aqua-200 flex flex-auto py-10 justify-center align-middle">
        <router-view></router-view>
    </main>
    <Footer></Footer>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

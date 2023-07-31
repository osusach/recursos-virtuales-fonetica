<template>
    <body class="min-h-screen max-h-screen flex flex-col">
        <Header />
        <main class="bg-usach-aqua-1000 flex flex-auto py-10 justify-center align-middle">
            <slot />
        </main>
        <Footer />
    </body>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
    <head>
        <meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="https://www.fcm.usach.cl/sites/fcm/files/favicon_0.ico" />
		<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="/src/global.css" />
    </head>
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

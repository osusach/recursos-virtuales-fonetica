<template>
    <div class="flex flex-col px-20 justify-center text-center text-white gap-3">
        <h1 class="pt-6 pb-4 text-5xl font-usach-bebas-title">{{label}}</h1>
        <div class="flex flex-col h-64">
            <img :src="image" class="m-auto w-full h-full object-contain"/>
        </div>
        <p class=" text-xl  font-usach-bebas-body my-2 ">En este juego debes contar la cantidad de sílabas que tiene cada palabra y seleccionar la respuesta correcta.</p>
        <div class="my-1">
            <button class="rounded-lg bg-usach-rouge-800 hover:bg-usach-rouge-900 drop-shadow h-full">
                <a class="text-5xl font-usach-bebas-title mx-7" href="/pindaro">JUGAR</a>
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        label: String,
        image: String
    })
</script>
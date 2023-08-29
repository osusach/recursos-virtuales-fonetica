<template>
    <div class="overflow-hidden flex flex-col rounded-lg w-[30%] bg-usach-industrial-900">
        <div class="flex flex-row px-5 py-3 pt-4 text-white text-xl justify-center gap-3">
            <img src="/crown_8.svg" class="h-5 invert">
            <h1 class="font-usach-helvetica-bold">{{ label }}</h1>
        </div>
        <ol class="text-white">
            <li v-for="(item, index) in items" :key="index"
                class="px-3 py-3 flex flex-row justify-between font-usach-helvetica-body"
                :class="{
                    'bg-usach-terra-600': index === 0,
                    'bg-usach-terra-700': index === 1,
                    'bg-usach-terra-800': index === 2,
                    'bg-usach-terra-900': index === 3,
                    'bg-usach-terra-1000': index === 4}">
                <p class="bg-transparent text-white font-usach-helvetica-body"> {{ index+1 }}. </p>
                <p class=" font-usach-helvetica-bold"> {{ item['nombre'] }} </p>
                <p> {{ item['score'] }} </p>
            </li>
        </ol>
    </div>
</template>


<script setup>
import { ref } from 'vue'
let items = ref([])

const props = defineProps({
        label: String,
		dbHttp: String
    })


const getLeaderboard = (tipo) => {
	// axios.get(dbHttp)
    return [ 
    { nombre: "ignacio", score: 2},
    { nombre: "juaquin", score: 3},
    { nombre: "maria123", score: 15},
    { nombre: "alex89", score: 10},
    { nombre: "leticia", score: 8},
    ]
}

items = getLeaderboard(1)
</script>
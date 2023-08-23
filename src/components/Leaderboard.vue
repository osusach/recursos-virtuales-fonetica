<template>
    <div class="rounded-xl border-usach-industrial-900 bg-usach-industrial-900 border overflow-hidden h-fit">
        <div class="px-5 py-4 text-white text-xl text-center">
            <h1 class="inline-block ml-1">Tabla de puntuaciones <br> {{ label }}</h1>
        </div>
        <ol class="body text-base text-white h-80 overflow-scroll">
            <li v-for="(item, index) in items" :key="index" 
                class="p-4 flex justify-between"
                :class="{
                    
                    'bg-usach-rouge-500': index % 2 === 0,
                    'bg-usach-rouge-800': index % 2 === 1 }">
                <mark class="bg-transparent text-white"> {{ index+1 }}. </mark>
                <p> {{ item['nombre'] }} </p>
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
    { nombre: "juanito", score: 6},
    { nombre: "pedro45", score: 4},
    { nombre: "carla77", score: 1},
    ]
}

items = getLeaderboard(1)
</script>
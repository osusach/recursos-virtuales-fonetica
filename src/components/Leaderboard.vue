<template>
    <div class="rounded-lg bg-usach-daisy-700 p-5">
        <label id="title" class="block font-bold mb-3">Tabla de Puntuaciones {{ label }}</label>
        <div class="max-h-80 overflow-y-auto rounded-lg border border-gray-300"> 
            <table id="table" class="table-auto min-w-full border-collapse bg-white w-full">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Puntaje </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.score }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        { nombre: "schlawg", score: 25}, 
        { nombre: "juaquin", score: 2},
        { nombre: "juaquin", score: 2},
        { nombre: "juaquin", score: 2},
        { nombre: "juaquin", score: 2},
        { nombre: "juaquin", score: 2}, 
        { nombre: "juaquin", score: 2},
        { nombre: "juaquin", score: 2},
        { nombre: "juaquin", score: 2},
        { nombre: "schlawg", score: 25}, 
        { nombre: "schlawg", score: 25}, 
        { nombre: "schlawg", score: 25}, 
        { nombre: "schlawg", score: 25}, 

    ]
}

items = getLeaderboard(1)
</script>


<style>
#title{
    display: flex;
    position: relative;
    background-color: white;
    border-radius: 10px;
    height: 5vh;
    text-align: center;
    align-items: center;
    justify-content: center;
}
th {
	position: sticky;
	top: 0;
    --tw-bg-opacity: 1;
    background-color: rgb(199 221 244 / var(--tw-bg-opacity));
}
th, td {
	padding-top: 0.5rem/* 8px */;
    padding-bottom: 0.5rem/* 8px */;
	padding-left: 1rem/* 16px */;
    padding-right: 1rem/* 16px */;
	--tw-border-opacity: 1;
    border-color: rgb(209 213 219 / var(--tw-border-opacity));
	border-width: 1px;
}
</style>
<template>
    <div class="rounded-lg bg-usach-daisy-700 p-5">
        <label id="title" class="block font-bold mb-3">Tabla de Puntajes</label>
        <div class="max-h-80 overflow-y-auto rounded-lg border border-gray-300"> 
            <table id="table" class="table-auto min-w-full border-collapse bg-white w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-4 py-2"> Nombre </th>
                        <th class="border border-gray-300 px-4 py-2"> Puntaje </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td class="border border-gray-300 px-4 py-2">{{ item.nombre }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ item.score }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
let items = ref([])

const getLeaderboard = (tipo) => {
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
</style>
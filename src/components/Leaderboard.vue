<template>
    <div class="rounded-lg bg-usach-daisy-700 p-5">
        <table class="table-auto min-w-full border-collapse bg-white">
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
</template>

<script setup>
import { ref } from 'vue'
let items = ref([])

const getLeaderboard = (tipo) => {
    return [ 
        { nombre: "schlawg", score: 25}, 
        { nombre: "juaquin", score: 2}, 
    ]
}

items = getLeaderboard(1)
</script>
<template>
    <div class="flex flex-col gap-10 items-center">
        <CarouselAlt></CarouselAlt>
        <div class="flex flex-col w-full justify-between lg:flex-row items-center gap-5">
            <Leaderboard :score-list="listaPindaro" label="Píndaro"></Leaderboard>
            <Leaderboard :score-list="listaRima" label="Rima"></Leaderboard>
            <Leaderboard :score-list="listaAcentual" label="Categoría acentual"></Leaderboard>
        </div>
    </div>
</template>

<script setup>
import Leaderboard from "../components/Leaderboard.vue"
import CarouselAlt from "../components/CarouselAlt.vue"
import { onMounted } from "vue"
import axios from 'axios'

let apiResponse
let listaAcentual
let listaRima
let listaPindaro
const url = 'https://pindarosql.pindarousach.workers.dev'

// get a db
onMounted(async () => {
  try {
    const response = await axios.get(url + '/scores/leaderboards')
    console.log(response);
    apiResponse = response.data.payload

    listaAcentual = apiResponse.acentualLeaderboard.leaderboard
    listaRima = apiResponse.rimasLeaderboard.leaderboard
    listaPindaro = apiResponse.silabaLeaderboard.leaderboard
    console.log(apiResponse);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})
</script>

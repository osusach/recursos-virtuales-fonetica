<template>
	<div class="flex flex-col gap-16 p-5">
		<div class="flex flex-row p-4 px-5 justify-between shadow-md font-usach-helvetica-bold items-center text-white bg-usach-aqua-800 rounded-xl">
			<div class="flex flex-row gap-4 items-center">
				<img
				class="invert"
				width="64"
				src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
				alt="user_icon"
			/>
			<div class="flex flex-col">
				<p class=" font-usach-bebas-title text-2xl">{{ store.user }}</p>
				<p v-if="correo != null">Correo: {{ store.email }}</p>
			</div>
			</div>
			<div class="flex flex-col h-20">
				<img class="invert" width="24" height="24" src="https://img.icons8.com/material-outlined/24/more.png" alt="more"/>
			</div>
		</div>
		<div class="flex flex-col gap-3 items-center ">
			<p class="w-full bg-usach-ultra-900 font-usach-bebas-title text-4xl text-white text-center rounded-xl py-1">Historial de partidas</p>
			<div class="flex flex-row w-fit justify-between lg:flex-row items-center gap-5">
				<Historial
					class="w-[300px]"
					:score-list="listaPindaro"
					label="Píndaro"
				></Historial>
				<Historial
					class="w-[300px]"
					:score-list="listaPindaro"
					label="Píndaro"
				></Historial>
				<Historial
					class="w-[300px]"
					:score-list="listaAcentual"
					label="Categoría acentual"
				></Historial>
			</div>
		</div>
		
	</div>
</template>

<script setup>
import Leaderboard from "../components/Leaderboard.vue";
import Historial from "../components/Historial.vue";
import { store } from "../store.js";
import { ref, onMounted } from "vue";
import axios from "axios";

let apiResponse;
let listaAcentual = ref(null);
let listaRima = ref(null);
let listaPindaro = ref(null);
const url = "https://pindarosql.pindarousach.workers.dev";

// get a db
onMounted(async () => {
	try {
		const response = await axios.get(url + "/scores/leaderboards");
		apiResponse = response.data.payload;

		listaAcentual.value = apiResponse.acentualLeaderboard.leaderboard;
		listaRima.value = apiResponse.rimasLeaderboard.leaderboard;
		listaPindaro.value = apiResponse.silabaLeaderboard.leaderboard;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
});
</script>

<template>
	<div class="bg-usach-aqua-900 rounded-lg p-5">
		<div
			class="p-4 mb-5 font-usach-helvetica-bold text-white bg-usach-terra-600 rounded-lg"
		>
			<img
				class="invert"
				width="64"
				src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
				alt="user_icon"
			/>
			<p>Usuario: {{ store.user }}</p>
			<p v-if="correo != null">Correo: {{ store.email }}</p>
		</div>
		<div
			class="flex flex-col w-fit justify-between lg:flex-row items-center gap-5"
		>
			<Leaderboard
				class="w-[300px]"
				:score-list="listaPindaro"
				label="Píndaro"
			></Leaderboard>
			<Leaderboard
				class="w-[300px]"
				:score-list="listaRima"
				label="Rima"
			></Leaderboard>
			<Leaderboard
				class="w-[300px]"
				:score-list="listaAcentual"
				label="Categoría acentual"
			></Leaderboard>
		</div>
	</div>
</template>

<script setup>
import Leaderboard from "../components/Leaderboard.vue";
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

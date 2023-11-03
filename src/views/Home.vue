<template>
	<div class="flex flex-col gap-10 items-center">
		<CarouselAlt></CarouselAlt>

		<Loading v-if="loading" />
		<div
			v-if="!loading"
			class="flex flex-col w-full justify-between lg:flex-row items-center gap-5"
		>
			<Leaderboard
				:score-list="listaPindaro"
				label="Píndaro"
			></Leaderboard>
			<Leaderboard :score-list="listaRima" label="Rima"></Leaderboard>
			<Leaderboard
				:score-list="listaAcentual"
				label="Categoría acentual"
			></Leaderboard>
		</div>
	</div>
</template>

<script setup>
import Leaderboard from "../components/Leaderboard.vue";
import CarouselAlt from "../components/CarouselAlt.vue";
import Loading from "../components/Loading.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "../store.js";

let loading = ref(true);
let apiResponse;
let listaAcentual = ref(null);
let listaRima = ref(null);
let listaPindaro = ref(null);
const url = "https://pindarosql.pindarousach.workers.dev";

// get a db
onMounted(async () => {
	try {
		const response = await axios.get(url + "scores/leaderboards");
		apiResponse = response.data.payload;

		listaAcentual.value = apiResponse.acentualLeaderboard.leaderboard;
		listaRima.value = apiResponse.rimasLeaderboard.leaderboard;
		listaPindaro.value = apiResponse.silabaLeaderboard.leaderboard;
		loading.value = false;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
});
</script>

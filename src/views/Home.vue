<template>
	<div class="flex flex-col gap-10 items-center">
		<CarouselAlt v-if="sm"></CarouselAlt>
		<CarUnfolded v-if="!sm"></CarUnfolded>
		<Loading v-if="loading" />
		<div
			v-if="!loading"
			class="flex flex-col w-full justify-between lg:flex-row items-center gap-5"
			:class="{ 'px-2': !sm }"
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
import CarUnfolded from "../components/CarUnfolded.vue";
import Loading from "../components/Loading.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

const sm = ref(true);
let loading = ref(true);
let apiResponse;
let listaAcentual = ref(null);
let listaRima = ref(null);
let listaPindaro = ref(null);
const url = import.meta.env.VITE_API_URL;

// get a db
onMounted(async () => {
	window.addEventListener("resize", actualizarMostrarElemento);
	actualizarMostrarElemento();
	try {
		const response = await axios.get(url + "/scores/leaderboards");
		apiResponse = response.data.payload;

		listaAcentual.value = apiResponse.acentualLeaderboard.leaderboard;
		listaRima.value = apiResponse.rimasLeaderboard.leaderboard;
		listaPindaro.value = apiResponse.silabaLeaderboard.leaderboard;
		loading.value = false;
	} catch (error) {
		console.error(error);
	}
});

const actualizarMostrarElemento = () => {
	sm.value = window.innerWidth >= 1000; // Cambia 640 al tamaño deseado
};

onBeforeUnmount(() => {
	window.removeEventListener("resize", actualizarMostrarElemento);
});
</script>

<style scoped>
.carousel-alt {
	display: none;
}
.carousel-unf {
	display: none;
}
</style>

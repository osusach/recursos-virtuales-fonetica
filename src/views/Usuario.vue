<template>
	<div class="flex flex-col gap-16 p-5">
		<div
			class="flex flex-row p-4 px-5 justify-between shadow-md font-usach-helvetica-bold items-center text-white bg-usach-aqua-800 rounded-xl"
		>
			<div class="flex flex-row gap-4 items-center">
				<img
					class="invert"
					width="64"
					src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
					alt="user_icon"
				/>
				<div class="flex flex-col">
					<p class="font-usach-bebas-title text-2xl">
						{{ store.user }}
					</p>
					<p v-if="store.email != null">Correo: {{ store.email }}</p>
					<p v-if="store.email == null">
						Registrate para guardar tus puntajes!
					</p>
				</div>
			</div>
			<div class="flex flex-col h-20">
				<img
					class="invert"
					width="24"
					height="24"
					src="https://img.icons8.com/material-outlined/24/more.png"
					alt="more"
				/>
			</div>
		</div>
		<div class="flex flex-col gap-3 items-center w-[940px]">
			<p
				class="w-full bg-usach-ultra-900 font-usach-bebas-title text-4xl text-white text-center rounded-xl py-1"
			>
				Historial de partidas
			</p>
			<div
				class="flex flex-row w-fit justify-between lg:flex-row items-center gap-5"
			>
				<Historial
					class="w-[300px]"
					:score-list="listaPindaro"
					label="Píndaro"
					:boton-grafico="cambiarGrafico"
				/>
				<Historial
					class="w-[300px]"
					:score-list="listaRima"
					label="Rima"
					:boton-grafico="cambiarGrafico"
				/>
				<Historial
					class="w-[300px]"
					:score-list="listaAcentual"
					label="Categoría acentual"
					:boton-grafico="cambiarGrafico"
				/>
			</div>
			<Graph
				class="p-4 bg-usach-daisy-600 text-xl rounded-xl"
				:data="chartData"
				:title="chartTitle"
			></Graph>
		</div>
	</div>
</template>

<script setup>
import Graph from "../components/Graph.vue";
import Historial from "../components/Historial.vue";
import { store } from "../store.js";
import { ref, onMounted } from "vue";
import axios from "axios";
import posthog from "posthog-js";

let apiResponse;
let listaAcentual = ref([]);
let listaRima = ref([]);
let listaPindaro = ref([]);
let chartData = ref({});
let chartTitle = ref("");

const url = import.meta.env.VITE_API_URL;

const userid = store.token;

const cambiarGrafico = (lista, label) => {
	if (lista === undefined) {
		return;
	}
	chartTitle.value = label;
	chartData.value = {
		labels: Array.from({ length: lista.length }, (_, i) => i + 1),
		datasets: [
			{
				label: label,
				borderColor: "#FFFFFF",
				backgroundColor: "#FFFFFF",
				data: lista.map((objeto) => objeto.score),
				tension: 0.1,
			},
		],
	};
};

// get a db
onMounted(async () => {
	if (userid === null) {
		
		cambiarGrafico(listaPindaro.value, "Píndaro");
		return;
	}

	axios
		.get(url + "/scores/history/" + String(userid))
		.then((response) => {
			apiResponse = response.data.payload;

			listaPindaro.value = apiResponse.history[0];
			listaAcentual.value = apiResponse.history[1];
			listaRima.value = apiResponse.history[2];
			cambiarGrafico(listaPindaro.value, "Píndaro");
		})
		.catch((error) => {
			posthog.capture("history error", { error: error });

			console.error("Error fetching data:", error);
		});
});
</script>

<template>
	<div class="flex flex-col gap-16 p-5 w-full sm:w-3/4">
		<div
			class="flex flex-row p-4 px-5 gap-4 w-full justify-between shadow-md font-usach-helvetica-bold items-center text-white bg-usach-aqua-800 rounded-xl"
		>
			<div class="flex flex-row gap-4 items-center">
				<img
					class="invert"
					width="64"
					src="/user_circle.svg"
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
					src="/more.svg"
					alt="more"
				/>
			</div>
		</div>
		<div class="flex flex-col gap-3 items-center">
			<p
				class="w-full bg-usach-ultra-900 font-usach-bebas-title text-4xl text-white text-center rounded-xl py-1"
			>
				Historial de partidas
			</p>
			<div
				class="flex flex-col lg:flex-row w-fit justify-between items-center gap-5"
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
				class="p-2 md:p-4 bg-usach-daisy-600 text-xl rounded-xl w-full max-w-full"
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
		.post(url + "/scores/history", { token: String(userid) })
		.then((response) => {
			apiResponse = response.data.payload;

			listaPindaro.value = apiResponse[0];
			listaAcentual.value = apiResponse[1];
			listaRima.value = apiResponse[2];
			cambiarGrafico(listaPindaro.value, "Píndaro");
		})
		.catch((error) => {
			console.log(error);
			posthog.capture("history error", {
				name: error.name,
				message: error.message,
				response: error.response,
				code: error.code,
				method: error.method,
				url: error.url,
				status: error.status,
			});
		});
});
</script>

<template>
	<div class="flex flex-col gap-y-2 text-center bg-usach-aqua-300 rounded-lg p-5 font-usach-bebas-body">
		<p class="font-usach-bebas-title text-3xl mb-2">
			Corrección - {{ nombreJuego }}
		</p>
		<!-- <p class="text-lg">Puntaje y porcentaje de logro</p> -->
		<div class="flex flex-row rounded-lg gap-1 justify-center text-xl bg-usach-terra-700">
			<p class="">{{ puntaje }}</p>
			<p>puntos</p>
		</div>
		<div class="flex flex-col bg-usach-aqua-100 h-7 w-[100%] rounded-lg mb-4">
			<div class="flex h-7 rounded-lg items-center justify-center align-middle" :style="{ width: percentage + '%' }"
				:class="{
					'bg-usach-rouge-700': percentage < 40,
					'bg-usach-terra-700': percentage >= 40 && percentage <= 60,
					'bg-usach-aqua-800': percentage > 60,
				}">
				<p class="font-usach-bebas-body text-xl" :class="{
					'w-full pl-4': percentage == 0,
				}">
					{{ percentage }}%
				</p>
			</div>
		</div>
		<div v-for="(item, index) in correccion"
			class="flex flex-row place-content-between bg-usach-aqua-800 rounded-lg py-2 px-4 gap-x-6" :class="{
				'bg-usach-aqua-800': item.is_correct === true,
				'bg-usach-rouge-700': item.is_correct !== true,
				hidden: item.is_correct === true && dificultad == 2,
			}">
			<div class="flex flex-row text-lg gap-2 items-center">
				<p class="px-2 rounded-lg w-fit" :class="{
					'bg-usach-aqua-500': item.is_correct === true,
					'bg-usach-rouge-500': item.is_correct !== true,
					hidden: item.is_correct === true && dificultad == 2,
				}">
					P{{ index + 1 }}
				</p>
				<div v-html="textFunc(item)"></div>
			</div>
			<div class="flex flex-col text-center">
				<p class="font-usach-bebas-body text-lg rounded-lg" :class="{
					'bg-usach-aqua-500 px-3': item.is_correct === true,
					'bg-usach-rouge-500 px-3': item.is_correct !== true,
				}">
					{{
						item.user_answer
						? "Tu respuesta: " + item.user_answer
						: "Sin Respuesta"
					}}
				</p>
				<p v-if="dificultad < 1 && juego === 1" class="font-usach-bebas-body text-lg">
					Correcta: {{ item.answer }} sílabas
				</p>
				<p v-if="dificultad < 1 && juego === 2" class="font-usach-bebas-body text-lg">
					Correcta: {{ item.answer }}
				</p>
				<p v-if="dificultad < 1 && juego === 3" class="font-usach-bebas-body text-lg">
					Correcta: {{ item.answer }}
				</p>
			</div>
		</div>
		<router-link to="/home"
			class="bg-usach-terra-700 mt-4 rounded-lg font-usach-bebas-body text-2xl p-3 hover:bg-usach-terra-800">
			<button>Terminar</button>
		</router-link>
	</div>
</template>

<script setup>
import { store } from "../store.js";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
import posthog from "posthog-js";

const router = useRouter();
// Función para alertar al usuario
function beforeUnload(event) {
	const message = "Si recargas ahora, perderás tu progreso!";
	event.preventDefault(); // para navegadores estándar
	event.returnValue = message; // para algunos navegadores
	return message; // para algunos otros navegadores
}

// Agregar y remover el event listener
window.addEventListener("beforeunload", beforeUnload);

onBeforeUnmount(() => {
	window.removeEventListener("beforeunload", beforeUnload);
});

let juego;
let nombreJuego = "error";
let data;
let puntaje;
let correccion;
var percentage;

const dificultad = Number(localStorage.getItem("dificultad"));
const idJuego = Number(localStorage.getItem("juego"));

try {
	juego = Number(router.currentRoute.value.params.id);
	data = store.correccion.payload;
	puntaje = data.score;
	correccion = data.corrections;
	let question_order = store.question_order;

	if (idJuego == 1)
		correccion.sort((a, b) => {
			return (
				question_order.findIndex((obj) => obj === a.silaba_id) -
				question_order.findIndex((obj) => obj === b.silaba_id)
			);
		});
	if (idJuego == 2)
		correccion.sort((a, b) => {
			return (
				question_order.findIndex((obj) => obj === a.game_id) -
				question_order.findIndex((obj) => obj === b.game_id)
			);
		});
	if (idJuego == 3)
		correccion.sort((a, b) => {
			return (
				question_order.findIndex((obj) => obj === a.word_id) -
				question_order.findIndex((obj) => obj === b.word_id)
			);
		});

	percentage = (data.correct * 100) / data.total;
	posthog.capture("juego_terminado", {
		juego: juego,
		nombreJuego: nombreJuego,
		dificultad: dificultad,
		puntaje: puntaje,
		percentage: percentage,
	});
} catch (error) {
	router.replace("/home");
}

let textFunc = () => {
	return "error";
};

const pindaroFunc = (item) => {
	return `<p> ${item.word}</p>`;
};
const rimaFunc = (item) => {
	return `<p> ${item.word_a} <br> ${item.word_b} </p>`;
};
const acentualFunc = (item) => {
	return `<p> ${item.word} </p>`;
};

switch (juego) {
	case 1:
		nombreJuego = "Píndaro";
		textFunc = pindaroFunc;
		break;
	case 2:
		nombreJuego = "Rima";
		textFunc = rimaFunc;
		break;
	case 3:
		nombreJuego = "Categoría Acentual";
		textFunc = acentualFunc;
		break;
	default:
		break;
}
</script>

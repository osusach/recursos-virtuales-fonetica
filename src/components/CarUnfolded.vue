<template>
	<div class="flex flex-col gap-3 items-center">
		<h1 class=" font-usach-helvetica-bold text-3xl text-slate-600">Selecciona un juego</h1>
		<div class="flex flex-row gap-2 font-usach-bebas-body text-lg">
			<button @click="showGame(1)" class=" bg-usach-aqua-500 p-2 px-4 rounded-lg shadow" 
			:class="{'bg-usach-aqua-900 text-white font-usach-bebas-title shadow-none': showPindaro == true}">Píndaro</button>
			<button @click="showGame(2)" class=" bg-usach-ultra-500 p-2 px-4 rounded-lg shadow"
			:class="{'bg-usach-ultra-900 text-white font-usach-bebas-title shadow-none': showRimas == true}">Rimas</button>
			<button @click="showGame(3)" class=" bg-usach-cloudy-500 p-2 rounded-lg shadow"
			:class="{'bg-usach-cloudy-900 text-white font-usach-bebas-title shadow-none': showAcentual == true}">Categoría Acentual</button>
		</div>

		<div v-if="showPindaro" class="bg-usach-aqua-900 carta-juego mx-2" :class="classCartas">
			<div class="flex flex-col gap-2 items-center">
				<p class="bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 mb-2 rounded-lg w-fit texto-sombra">Píndaro</p>
				<p class="font-usach-helvetica-bold rounded-lg text-xl text-center">¿Cómo jugar?</p>
				<p class="font-usach-helvetica-body rounded-lg text-lg text-center">
					En este juego debes contar la cantidad de sílabas que tiene cada
					palabra y seleccionar la alternativa correcta.
				</p>
			</div>
			<div
				class="flex flex-col items-center gap-2 bg-usach-aqua-600 p-2 sm:p-10 rounded-lg"
			>
				<p
					class="text-5xl font-usach-helvetica-bold bg-usach-aqua-600 pt-2 rounded-lg"
				>
					elefante
				</p>
				<p class="font-usach-helvetica-medium">
					¿Cuántas sílabas tiene esta palabra?
				</p>
				<div class="flex flex-row">
					<div v-for="num in 5" class="flex space-x-2 mx-1">
						<p
							class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg"
							:class="{
								'bg-usach-daisy-700': num !== 4,
								'bg-usach-ultra-800': num === 4,
							}"
						>
							{{ num }}
						</p>
					</div>
				</div>
			</div>
			<router-link
				to="/dificultad/1"
				@click="setJuego(1)"
				class="w-full rounded-lg text-center p-2 bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-900"
			>
				<a class="font-usach-helvetica-body w-full">Jugar</a>
			</router-link>
		</div>

		<div v-if="showRimas" class="bg-usach-ultra-800 carta-juego mx-2">
			<div class="flex flex-col gap-2 items-center">
				<p
					class="bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit mb-2"
				>
					Rimas
				</p>
				<p class="font-usach-helvetica-bold rounded-lg text-xl text-center">¿Cómo jugar?</p>
				<p class="font-usach-helvetica-body rounded-lg text-lg text-center">
					En este juego debes identificar el tipo de rima que existe entre
					ambas palabras, en caso de existir.
				</p>
			</div>
			<div
				class="flex flex-col items-center gap-2 bg-usach-ultra-600 p-2 sm:p-10 rounded-lg"
			>
				<div class="flex flex-row gap-10 text-4xl justify-between">
					<p class="font-usach-helvetica-bold">panzón</p>
					<p class="font-usach-helvetica-bold">amor</p>
				</div>
				<p class="font-usach-helvetica-medium text-center">
					¿Qué tipo de rima hay entre ambas palabras?
				</p>
				<div class="flex flex-row">
					<p
						class="px-4 mx-1 text-xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
					>
						asonante
					</p>
					<p
						class="px-4 mx-1 text-xl font-usach-bebas-title py-2 rounded-lg bg-usach-aqua-800"
					>
						consonante
					</p>
					<p
						class="px-4 mx-1 text-xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
					>
						no hay
					</p>
				</div>
			</div>
			<router-link
				to="/dificultad/2"
				@click="setJuego(2)"
				class="w-full rounded-lg text-center p-2 bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
			>
				<a class="font-usach-helvetica-body">Jugar</a>
			</router-link>
		</div>

		<div v-if="showAcentual" class="bg-usach-cloudy-900 carta-juego mx-2">
			<div class="flex flex-col gap-2 items-center">
				<p
					class="bg-usach-daisy-700 text-3xl font-usach-helvetica-bold pt-2 px-3 rounded-lg w-fit mb-2"
				>
					Categoría acentual
				</p>
				<p class="font-usach-helvetica-bold rounded-lg text-xl text-center">¿Cómo jugar?</p>
				<p class="font-usach-helvetica-body rounded-lg text-lg text-center">
					En este juego debes identificar el tipo de acentuación de la
					palabra y seleccionar la opción correcta.
				</p>
			</div>
			<div
				class="flex flex-col items-center gap-2 bg-usach-cloudy-700 p-2 sm:p-10 rounded-lg"
			>
				<p class="text-5xl font-usach-helvetica-bold pt-2 rounded-lg">
					plátano
				</p>
				<p class="font-usach-helvetica-medium text-center">
					¿Qué tipo de acentuación tiene esta palabra?
				</p>
				<div class="flex flex-row p-1 rounded-lg space-x-2">
					<p
						class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
					>
						aguda
					</p>
					<p
						class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-aqua-500"
					>
						grave
					</p>
					<p
						class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
					>
						esdrújula
					</p>
				</div>
			</div>
			<router-link
				to="/dificultad/3"
				@click="setJuego(3)"
				class="w-full rounded-lg text-center p-2 bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
			>
				<a class="font-usach-helvetica-body w-full">Jugar</a>
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const showPindaro = ref(true)
const showRimas = ref(false)
const showAcentual = ref(false)

const showGame = (num) => {
	if (num === 1) {
		showPindaro.value = true;
		showRimas.value = false;
		showAcentual.value = false;
	} else if (num === 2) {
		showPindaro.value = false;
		showRimas.value = true;
		showAcentual.value = false;
	} else {
		showPindaro.value = false;
		showRimas.value = false;
		showAcentual.value = true;
	}
};

const props = defineProps({
	classCartas: { type: String, required: false },
});

const setJuego = (num) => {
	console.log(num);
	localStorage.setItem("juego", num);
};
</script>

<style scoped>
.carta-juego {
	@apply flex flex-col p-5 gap-5 items-center text-white rounded-lg w-fit md:max-w-[60%];
}
.contenedor-ejemplo {
	@apply flex flex-col gap-5 items-center;
}
</style>

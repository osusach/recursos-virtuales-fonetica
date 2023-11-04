<template>
	<div class="bg-usach-aqua-800 carta-juego" :class="classCartas">
		<div class="flex flex-col gap-2 items-center">
			<p
				class="bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit texto-sombra"
			>
				Píndaro
			</p>
			<p class="font-usach-helvetica-body rounded-lg text-lg">
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
			class="w-fit rounded-lg text-center p-2 bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
		>
			<a class="font-usach-helvetica-body w-full">Jugar</a>
		</router-link>
	</div>

	<div class="bg-usach-ultra-800 carta-juego">
		<div class="flex flex-col gap-2 items-center">
			<p
				class="bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit"
			>
				Rimas
			</p>
			<p class="font-usach-helvetica-body rounded-lg text-lg">
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
			<p class="font-usach-helvetica-medium">
				¿Qué tipo de rima hay entre ambas palabras?
			</p>
			<div class="flex flex-row">
				<p
					class="px-4 mx-1 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
				>
					asonante
				</p>
				<p
					class="px-4 mx-1 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-aqua-800"
				>
					consonante
				</p>
				<p
					class="px-4 mx-1 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
				>
					no hay rima
				</p>
			</div>
		</div>
		<router-link
			to="/dificultad/1"
			@click="setJuego(2)"
			class="w-fit rounded-lg text-center p-2 bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
		>
			<a class="font-usach-helvetica-body w-full">Jugar</a>
		</router-link>
	</div>

	<div class="bg-usach-cloudy-900 carta-juego">
		<div class="flex flex-col gap-2 items-center">
			<p
				class="bg-usach-daisy-700 text-2xl font-usach-helvetica-bold pt-2 px-3 rounded-lg w-fit"
			>
				Categoría acentual
			</p>
			<p class="font-usach-helvetica-body rounded-lg text-lg">
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
			<p class="font-usach-helvetica-medium">
				¿Qué tipo de acentuación tiene esta palabra?
			</p>
			<div class="flex flex-row p-1 rounded-lg space-x-2">
				<p
					class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700"
				>
					aguda
				</p>
				<p
					class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-aqua-800"
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
			to="/dificultad/1"
			@click="setJuego(3)"
			class="w-fit rounded-lg text-center p-2 bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
		>
			<a class="font-usach-helvetica-body w-full">Jugar</a>
		</router-link>
	</div>
</template>

<script setup>
const props = defineProps({
	classCartas: { type: String, required: false },
});

const setJuego = (num) => {
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

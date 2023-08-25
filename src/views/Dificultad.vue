<template>
	<div class="m-auto flex flex-col p-10 justify-center items-center text-center font-usach-helvetica-bold bg-usach-aqua-800 rounded-lg text-white">
		<p class="mb-9 text-2xl">Juego Actual: {{ nombreJuego }}</p>
		<h1 class="text-3xl mb-1">
			Selecciona una dificultad
		</h1>
		<div class="flex flex-col w-full">
			<router-link :to='ruta'>
				<Boton label="Básico" type="submit" @click="setDificultad(1)" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl w-64"></Boton>
			</router-link>
			<router-link :to='ruta'>
				<Boton label="Medio" type="submit" @click="setDificultad(2)" class="bg-usach-terra-700 hover:bg-usach-terra-900 text-xl w-64"></Boton>
			</router-link>
			<router-link :to='ruta'>
				<Boton label="Avanzado" type="submit" @click="setDificultad(3)" class="bg-usach-ultra-700 hover:bg-usach-ultra-900 text-xl w-64"></Boton>
			</router-link>
		</div>
	</div>
</template>
  
<script setup>
	import Boton from "../components/Boton.vue"
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	const juego = Number(router.currentRoute.value.params.id)
	let ruta = ref('/home')
	let nombreJuego = ref('')

	switch (juego) {
			case 1:
				ruta.value = '/pindaro'
				nombreJuego = 'Píndaro'
				break;
			case 2:
				ruta.value = '/rima'
				nombreJuego = 'Rima'
				break;
			case 3:
				ruta.value = '/cat-acentual'
				nombreJuego = 'Categoría Acentual'
				break;
			default:
				break;
	}

	const setDificultad = (num) => {
		localStorage.setItem('dificultad', num)
	}
</script>
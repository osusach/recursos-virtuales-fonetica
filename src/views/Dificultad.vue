<template>
    <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 min-w-[35%]">
      	<div class="text-5xl h-fit text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg">
		  	<div class="flex flex-col p-10 justify-center items-center">
				<p>Juego Actual: {{ nombreJuego }}</p>
			  	<h1 class="text-3xl mb-5 font-usach-bebas-title">
				  	Selecciona una dificultad
				</h1>
				<div class="flex flex-col w-full">
					<router-link :to='ruta'>
						<Boton label="Básico" type="submit" @click="setDificultad(1)" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"></Boton>
					</router-link>
					<router-link :to='ruta'>
						<Boton label="Medio" type="submit" @click="setDificultad(2)" class="bg-usach-terra-700 hover:bg-usach-terra-900 text-xl"></Boton>
					</router-link>
					<router-link :to='ruta'>
						<Boton label="Avanzado" type="submit" @click="setDificultad(3)" class="bg-usach-ultra-700 hover:bg-usach-ultra-900 text-xl"></Boton>
					</router-link>
				</div>
			</div>
      	</div>
    </form>
  </template>
  
<script setup>
	import Boton from "../components/Boton.vue"
	import { ref } from 'vue'

	const juego = Number(localStorage.getItem('juego'))
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
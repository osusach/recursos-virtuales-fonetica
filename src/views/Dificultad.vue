<template>
    <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 w-[70%]">
      	<div class="text-5xl h-fit text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg">
		  	<div class="flex flex-col py-10 justify-center items-center">
			  	<h1 class="text-3xl mb-5 font-usach-bebas-title">
				  	Selecciona una dificultad
				</h1>
				<div class="flex flex-col w-1/3">
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
	import { store } from '../store.js'
	import { ref } from 'vue'

	store.dificultad = 0
  	let ruta = ref('/error')
	const setDificultad = (num) => {
		store.dificultad = num
		switch (store.juego) {
			case 1:
				ruta.value = '/pindaro'
				break;
			case 2:
				ruta.value = '/rima'
				break;
			case 3:
				ruta.value = '/cat-acentual'
				break;
		
			default:
				break;
		}
	}
</script>
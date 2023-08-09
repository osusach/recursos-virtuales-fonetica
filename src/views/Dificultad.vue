<template>
    <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 w-[70%]">
      <div class="text-5xl h-fit text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg">
		  <div class="flex flex-col py-10 justify-center items-center">
			  	<h1 class="text-3xl mb-5 font-usach-bebas-title">
				  	Selecciona una dificultad
				</h1>
			<div class="flex flex-col w-1/3">
				<Boton label="Básico" type="submit" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl">
					<router-link :to="{ path: '/pindaro', query: { tipo: 1, dificultad: 1}}"> bingbons</router-link>
				</Boton>
				<Boton label="Medio" type="submit" class="bg-usach-terra-700 hover:bg-usach-terra-900 text-xl">
				</Boton>
				<Boton label="Avanzado" type="submit" class="bg-usach-ultra-700 hover:bg-usach-ultra-900 text-xl">
				</Boton>
			</div>
		</div>
      </div>
    </form>
  </template>
  
<script setup>
import Input from "../components/Input.vue"
import Boton from "../components/Boton.vue"
</script>
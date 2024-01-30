<template>
	<div class="carousel w-[1000px] h-[400px] rounded-lg">
		<div id="slide1" class="carousel-item relative w-full h-full">

			<div class="bg-usach-aqua-800 h-full w-fit flex flex-col px-20 gap-10 items-center text-white">
				<div class="flex flex-row gap-20 h-[65%] justify-center items-center">
					<div class="flex flex-col gap-2 w-[40%]">
						<p
							class="bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit texto-sombra">
							Píndaro
						</p>
						<p class="font-usach-helvetica-body rounded-lg text-lg">
							En este juego debes contar la cantidad de
							sílabas que tiene cada palabra y seleccionar la
							alternativa correcta.
						</p>
					</div>
					<div class="flex flex-col w-[40%] items-center gap-2 bg-usach-aqua-600 py-10 rounded-lg">
						<p class="text-5xl font-usach-helvetica-bold bg-usach-aqua-600 pt-2 rounded-lg">
							elefante
						</p>
						<p class="font-usach-helvetica-medium">
							¿Cuántas sílabas tiene esta palabra?
						</p>
						<div class="flex flex-row">
							<div v-for="num in 5" class="flex space-x-2 mx-1">
								<p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg" :class="{
									'bg-usach-daisy-700': num !== 4,
									'bg-usach-ultra-800': num === 4,
								}">
									{{ num }}
								</p>
							</div>
						</div>
					</div>
				</div>
				<router-link 
				class="font-usach-helvetica-body w-full py-2 rounded-lg text-center bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
				to="/dificultad/1"
				@click="setJuego(1)">
						Jugar
				</router-link>
			</div>


			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide3" class="btn btn-circle">❮</a>
				<a href="#slide2" class="btn btn-circle">❯</a>
			</div>
		</div>
		<div id="slide2" class="carousel-item relative w-full h-full">

			<div class="bg-usach-ultra-800 h-full w-fit flex flex-col px-20 gap-10 items-center text-white">
				<div class="flex flex-row gap-20 h-[65%] justify-center items-center">
					<div class="flex flex-col gap-2 w-[30%]">
						<p class="bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit">
							Rimas
						</p>
						<p class="font-usach-helvetica-body rounded-lg text-lg">
							En este juego debes identificar el tipo de rima
							que existe entre ambas palabras, en caso de
							existir.
						</p>
					</div>
					<div class="flex flex-col w-[50%] items-center gap-2 bg-usach-ultra-600 py-10 rounded-lg">
						<div class="flex flex-row gap-10 text-4xl justify-between">
							<p class="font-usach-helvetica-bold">panzón</p>
							<p class="font-usach-helvetica-bold">amor</p>
						</div>
						<p class="font-usach-helvetica-medium">
							¿Qué tipo de rima hay entre ambas palabras?
						</p>
						<div class="flex flex-row">
							<p class="px-4 mx-1 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-aqua-800">
								asonante
							</p>
							<p class="px-4 mx-1 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">
								consonante
							</p>
							<p class="px-4 mx-1 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">
								no hay rima
							</p>
						</div>
					</div>
				</div>

				<router-link 
				class="font-usach-helvetica-body w-full py-2 rounded-lg text-center bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
				to="/dificultad/2"
				@click="setJuego(2)">
						Jugar
				</router-link>
			</div>


			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide1" class="btn btn-circle">❮</a>
				<a href="#slide3" class="btn btn-circle">❯</a>
			</div>
		</div>
		<div id="slide3" class="carousel-item relative w-full h-full">
			<div class="bg-usach-cloudy-900 h-full w-fit flex flex-col px-20 gap-10 items-center text-white">
				<div class="flex flex-row gap-20 h-[65%] justify-center items-center">
					<div class="flex flex-col gap-2 w-[35%]">
						<p class="bg-usach-daisy-700 text-2xl font-usach-helvetica-bold pt-2 px-3 rounded-lg w-fit">
							Categoría acentual
						</p>
						<p class="font-usach-helvetica-body rounded-lg text-lg">
							En este juego debes identificar el tipo de
							acentuación de la palabra y seleccionar la
							opción correcta.
						</p>
					</div>
					<div class="flex flex-col w-[50%] items-center gap-2 bg-usach-cloudy-700 py-10 rounded-lg">
						<p class="text-5xl font-usach-helvetica-bold pt-2 rounded-lg">
							plátano
						</p>
						<p class="font-usach-helvetica-medium">
							¿Qué tipo de acentuación tiene esta palabra?
						</p>
						<div class="flex flex-row p-1 rounded-lg space-x-2">
							<p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">
								aguda
							</p>
							<p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-aqua-800">
								grave
							</p>
							<p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">
								esdrújula
							</p>
						</div>
					</div>
				</div>
				<router-link 
				class="font-usach-helvetica-body w-full py-2 rounded-lg text-center bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800"
				to="/dificultad/3"
				@click="setJuego(3)">
						Jugar
				</router-link>
			</div>
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide2" class="btn btn-circle">❮</a>
				<a href="#slide1" class="btn btn-circle">❯</a>
			</div>
		</div>
	</div>
</template>

<script setup>
const setJuego = (num) => {
	localStorage.setItem("juego", num);
};
</script>

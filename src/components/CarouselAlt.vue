<template>
  <v-sheet :width="1000" class="rounded-lg">
    <v-carousel hide-delimiters show-arrows="hover" :height="400" class="rounded-lg">
      <v-carousel-item>
        <div class=" bg-usach-aqua-800 h-full w-full flex flex-col px-24 py-5 justify-end gap-10 items-center text-white">
          <div class="flex flex-row gap-20 h-[65%] justify-center items-center">
            <div class="flex flex-col gap-2 w-[40%]">
              <p class=" bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit">Píndaro</p>
              <p class=" font-usach-helvetica-body rounded-lg text-lg">
                En este juego debes contar la cantidad de sílabas que tiene cada palabra y seleccionar la alternativa correcta.</p>
            </div>
            <div class="flex flex-col w-[40%] items-center gap-2 bg-usach-aqua-600 py-10 rounded-lg">
              <p class=" text-5xl font-usach-helvetica-bold bg-usach-aqua-600 pt-2 rounded-lg">elefante</p>
              <p class=" font-usach-helvetica-medium">¿Cuántas sílabas tiene esta palabra?</p>
              <div class="flex flex-row">
                <div v-for="num in 5" class="flex space-x-2 mx-1">
                  <p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">{{ num }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full rounded-lg text-center">
            <router-link to='/dificultad/1' @click="setJuego(1)">
              <button class="p-2 w-full rounded-lg bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800">
                <a class="font-usach-helvetica-body w-full">Jugar</a>
              </button>
            </router-link>
          </div>
        </div>
      </v-carousel-item>

      <v-carousel-item>
        
        <div class=" bg-usach-ultra-800 h-full w-full flex flex-col px-24 py-5 justify-end gap-10 items-center text-white">
          <div class="flex flex-row gap-20 h-[65%] justify-center items-center">
            <div class="flex flex-col gap-2 w-[30%]">
              <p class=" bg-usach-daisy-700 text-4xl font-usach-helvetica-bold pt-2 px-2 rounded-lg w-fit">Rimas</p>
              <p class=" font-usach-helvetica-body rounded-lg text-lg">
                En este juego debes identificar el tipo de rima que existe entre ambas palabras, en caso de existir.</p>
            </div>
            <div class="flex flex-col w-[50%] items-center gap-2 bg-usach-ultra-600 py-10 rounded-lg">
              <div class="flex flex-row font-usach-helvetica-bold gap-10 text-4xl justify-between">
                <p>panzón</p>
                <p>amor</p>
              </div>
              <p class=" font-usach-helvetica-medium">¿Qué tipo de rima hay entre ambas palabras?</p>
              <div class="flex flex-row">
                <div v-for="rima in rimas" class=" mx-1">
                  <p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">{{ rima }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full rounded-lg text-center">
            <router-link to="/dificultad/2" @click="setJuego(2)">
              <button class="p-2 w-full rounded-lg text-2xl bg-usach-daisy-700 hover:bg-usach-daisy-800">
                <a class="font-usach-helvetica-body w-full">Jugar</a>
              </button>
            </router-link>
          </div>
        </div>

      </v-carousel-item>

      <v-carousel-item>

        <div class=" bg-usach-cloudy-900 h-full w-full flex flex-col px-24 py-5 justify-end gap-10 items-center text-white">
          <div class="flex flex-row gap-20 h-[65%] justify-center items-center">
            <div class="flex flex-col gap-2 w-[35%]">
              <p class=" bg-usach-daisy-700 text-2xl font-usach-helvetica-bold pt-2 px-3 rounded-lg w-fit">Categoría Acentual</p>
              <p class=" font-usach-helvetica-body rounded-lg text-lg">
                En este juego debes identificar el tipo de acentuación de la palabra y seleccionar la opción correcta.</p>
            </div>
            <div class="flex flex-col w-[50%] items-center gap-2 bg-usach-cloudy-700 py-10 rounded-lg">
              <p class=" text-5xl font-usach-helvetica-bold pt-2 rounded-lg">plátano</p>
              <p class=" font-usach-helvetica-medium">¿Qué tipo de acentuación tiene esta palabra?</p>
              <div class="flex flex-row p-1 rounded-lg">
                <div v-for="rima in categoria" class="flex space-x-2 mx-1">
                  <p class="px-4 text-2xl font-usach-bebas-title py-2 rounded-lg bg-usach-daisy-700">{{ rima }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-usach-aqua-800 rounded-lg text-center">
            <router-link to="/dificultad/3" @click="setJuego(3)">
              <button class="p-2 w-full rounded-lg bg-usach-daisy-700 text-2xl hover:bg-usach-daisy-800">
                <a class="font-usach-helvetica-body w-full">Jugar</a>
              </button>
            </router-link>
          </div>
        </div>

      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>
  
  <script setup>
  const rimas = ref(['asonante', 'consonante', 'no hay rima'])
  const categoria = ref(['aguda', 'grave', 'esdrújula'])
	import { ref } from 'vue'


	const setJuego = (num) => {
		localStorage.setItem('juego', num)
	};

</script>
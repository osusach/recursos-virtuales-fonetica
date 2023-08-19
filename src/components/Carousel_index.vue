<template>
  <div class="slider">
    <div class="navegacion px-6">
      <button class="icon-button prev-button" @click="prevSlide">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="icon-button next-button" @click="nextSlide">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="slide" :class="{ active: currentIndex === 0 }">
      <div class="Slide1 flex flex-col rounded-lg gap-2 p-10 text-center font-usach-helvetica-body text-white items-center">
        <div class=" font-usach-helvetica-bold bg-usach-terra-700 mb-4 p-3 pt-5 rounded-lg text-5xl">Píndaro</div>
        <p class="text-6xl font-usach-helvetica-bold pt-4"> plátano</p>
          <div class="flex flex-row p-3 rounded-lg">
              <div v-for="num in 5" class="flex space-x-2 mx-1">
                  <p class="px-4 text-2xl font-usach-bebas-title py-2 border rounded-lg bg-usach-daisy-700">
                      {{ num }}
              </p>
              </div>
          </div>
          <div class=" font-usach-helvetica-body bg-usach-aqua-600 p-3 rounded-lg text-xl w-2/3">
            En este juego debes contar la cantidad de sílabas que tiene cada palabra y seleccionar la alternativa correcta.</div>
          <router-link to="/dificultad" @click="setJuego(1)">
            <button @click="onClick" :type="type" class="default-button bg-usach-ultra-800 font-usach-bebas-body text-2xl hover:bg-usach-ultra-900">
              <a class="font-usach-helvetica-medium px-max">Jugar</a>
            </button>
		      </router-link>
	    </div>
  </div>

  <div class="slide" :class="{ active: currentIndex === 1 }">
    <div class="Slide2 flex flex-col rounded-lg gap-2 p-10 text-center font-usach-helvetica-body text-white items-center">
      <div class=" font-usach-helvetica-bold bg-usach-terra-700 mb-4 p-3 pt-5 rounded-lg text-5xl">Rimas</div>
      <div class="flex flex-row gap-20">
        <p class="text-6xl font-usach-helvetica-bold pt-4"> canción</p>
        <p class="text-6xl font-usach-helvetica-bold pt-4"> función</p>
      </div>
      <div class="flex flex-row p-3 rounded-lg">
          <div v-for="rima in rimas" class="flex space-x-2 mx-1">
              <p class="px-4 text-2xl font-usach-bebas-title py-2 border rounded-lg bg-usach-daisy-700">{{ rima }}</p>
          </div>
      </div>
      <div class=" font-usach-helvetica-body bg-usach-ultra-600 p-3 rounded-lg text-xl w-2/3">
            En este juego debes identificar el tipo de rima que existe entre las dos palabras y seleccionar la alternativa correcta.
      </div>
      <router-link to="/dificultad" @click="setJuego(2)">
            <button @click="onClick" :type="type" class="default-button bg-usach-aqua-800 font-usach-bebas-body text-2xl hover:bg-usach-aqua-900">
              <a class="font-usach-helvetica-medium px-max">Jugar</a>
            </button>
		      </router-link>
    </div>
  </div>

  <div class="slide" :class="{ active: currentIndex === 2 }">
	  <div class="Slide3 bg-usach-terra-900 flex flex-col rounded-lg gap-2 p-10 text-center font-usach-helvetica-body text-white items-center">
      <div class=" font-usach-helvetica-bold bg-usach-daisy-900 mb-4 p-3 pt-5 rounded-lg text-5xl">Categoría Acentual</div>
      <div class="flex flex-row gap-20">
        <p class="text-6xl font-usach-helvetica-bold pt-4">elefante</p>
      </div>
      <div class="flex flex-row p-3 rounded-lg">
        <div v-for="rima in categoria" class="flex space-x-2 mx-1">
          <p class="px-4 text-2xl font-usach-bebas-title py-2 border rounded-lg bg-usach-daisy-900">{{ rima }}</p>
        </div>
      </div>
      <div class=" font-usach-helvetica-body bg-usach-terra-700 p-3 rounded-lg text-xl w-2/3">
        En este juego debes identificar el tipo de acentuación de la palabra y seleccionar la opción correcta.
      </div>
      <router-link to="/dificultad" @click="setJuego(3)">
        <button @click="onClick" :type="type" class="default-button bg-usach-aqua-800 font-usach-bebas-body text-2xl hover:bg-usach-aqua-900">
          <a class="font-usach-helvetica-medium px-max">Jugar</a>
        </button>
		  </router-link>
	  </div>
  </div>

  </div>
</template>

<script setup>
  const rimas = ref(['asonante', 'consonante', 'no hay rima'])
  const categoria = ref(['aguda', 'grave', 'esdrújula'])
	import { store } from '../store.js'
	import Boton from "../components/Boton.vue"
	import { ref } from 'vue';
	store.juego = 0
	const currentIndex = ref(0);

	const prevSlide = () => {
		currentIndex.value = (currentIndex.value - 1 + 3) % 3;
	};

	const nextSlide = () => {
		currentIndex.value = (currentIndex.value + 1) % 3;
	};

	const setJuego = (num) => {
		store.juego = num;
	};
</script>

  
<style>
.slider {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 500px;
}

.slide {
  width: 1100px;
  height: 500px;
  position: relative;
  display: none;
  opacity: 0;
}

.slide.active {
  display: block;
  animation: fadeIn 1s ease;
  opacity: 1;
}

.navegacion {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  z-index: 1;
}

.prev-button,
.next-button {
  background: rgba(185, 185, 185, 0.5);
  border: none;
  cursor: pointer;
  font-size: 20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #ffffff;
  transition: background-color 0.3s;
}

.prev-button:hover,
.next-button:hover {
  background-color: rgba(185, 185, 185, 0.8);
}

.Slide1 {
  width: 1100px;
  height: 500px;
  background-color: #17aea4;
  border-radius: 50px;
}

.Slide1 h1{
  display: flex;
  position: absolute;
  text-align: center;
  justify-content: center;
  top: 8%;
  left: 50%;
  color: white;
  font-size: 45px;
  transform: translate(-50%, 0);
}

#title1 {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 20%; 
  left: 50%;
  color: white;
  font-size: 80px;
  transform: translate(-50%, 0);
}


#sub1{
  display: flex;
  position: absolute;
  text-align: center;
  justify-content: center;
  top: 43%;
  left: 50%;
  color: white;
  font-size: 20px;
  transform: translate(-50%, 0);
}

#sub2{
  display: flex;
  position: absolute;
  text-align: center;
  justify-content: center;
  top: 75%;
  left: 50%;
  color: white;
  font-size: 20px;
  transform: translate(-50%, 0);
}

.container-c {
  display: flex;
  position: absolute;
  text-align: center;
  justify-content: center;
  top: 53%;
  left: 50%;
  transform: translate(-50%, 0);
}

.cuadrados {
  width: 100px;
  height: 100px;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 0 15px;
  border-radius: 30px;
}

#boton1{
  display: flex;
  position: absolute;
  justify-content: center;
  top: 88%;
  left: 50%;
  transform: translate(-50%, 0);
}

.Slide2 {
  width: 1100px;
  height: 500px;
  background-color: #ae7eb6;
  border-radius: 50px;
}

.Slide3 {
  width: 1100px;
  height: 500px;
  border-radius: 50px;
}

@keyframes fadeIn{
  0% { opacity: 0.05;}
}

</style>
  
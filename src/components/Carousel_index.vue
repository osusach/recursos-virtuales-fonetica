<template>
  <div class="slider">
    <div class="navegacion">
      <button class="icon-button prev-button" @click="prevSlide">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="icon-button next-button" @click="nextSlide">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="slide" :class="{ active: currentIndex === 0 }">
      <div class="Slide1">
        <h1 class="text-3xl mb-5 font-usach-bebas-title">Píndaro</h1>
        <label id="title1" class="font-usach-helvetica-medium">Casa</label>
        <label id="sub1" class="font-usach-helvetica-medium">¿Cuántas sílabas tiene esta palabra?</label>
        <div class="font-usach-helvetica-medium">
          <div class="container-c">
            <div v-for="number in 5" :key="number" class="cuadrados">
            {{ number }}
            </div>
          </div>
        </div>
        <label id="sub2" class="font-usach-bebas-title">En este juego debes contar la cantidad de sílabas que tiene cada palabra y seleccionar la respuesta correcta</label>
        <Boton label="Jugar" id="boton1" class="bg-usach-ultra-700 hover:bg-usach-ultra-900 text-xl"/>
      </div>
    </div>
    <div class="slide" :class="{ active: currentIndex === 1 }">
      <div class="Slide2"></div>
    </div>
    <div class="slide" :class="{ active: currentIndex === 2 }">
      <div class="Slide3"></div>
    </div>
  </div>
</template>

<script setup>
  import Boton from "../components/Boton.vue"
  import { ref } from 'vue';

  const currentIndex = ref(0);

  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + 3) % 3;
  };

  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % 3;
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
  top: 8%;
  left: 45%;
  color: white;
  font-size: 45px;
}

#title1{
  display: flex;
  position: absolute;
  top: 20%;
  left: 41.5%;
  color: white;
  font-size: 80px;
}

#sub1{
  display: flex;
  position: absolute;
  top: 43%;
  left: 35.5%;
  color: white;
  font-size: 20px;
}

#sub2{
  display: flex;
  position: absolute;
  top: 75%;
  left: 21.5%;
  color: white;
  font-size: 20px;
}

.container-c {
  display: flex;
  position: absolute;
  top: 53%;
  left: 21.6%;
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
  top: 84%;
  left: 46%;
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
  background-color: #ecb21a;
  border-radius: 50px;
}

@keyframes fadeIn{
  0% { opacity: 0.05;}
}

</style>
  
<template>
    <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 w-[30%]">
      <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:">
        <h1 class="text-3xl mb-5 font-usach-bebas-title">
          Selecciona una dificultad
        </h1>
        <button :onclick="onClick" type="submit" class="rounded-lg bg-usach-daisy-700 hover:bg-usach-daisy-800 text-xl text-white my-2 drop-shadow p-2">
            <a className="font-usach-helvetica-medium px-max" :href="href">
                Básico
            </a>
        </button>
        <button :onclick="onClick" type="submit" class="rounded-lg bg-usach-terra-700 hover:bg-usach-terra-800 text-xl text-white my-2 drop-shadow p-2">
            <a className="font-usach-helvetica-medium px-max" :href="href">
                Medio
            </a>
        </button>
        <button :onclick="onClick" type="submit" class="rounded-lg bg-usach-ultra-800 hover:bg-usach-ultra-900 text-xl text-white my-2 drop-shadow p-2">
            <a className="font-usach-helvetica-medium px-max" :href="href">
                Avanzado
            </a>
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
    import Input from "../components/Input.vue"
    import Boton from "../components/Boton.vue"
  </script>
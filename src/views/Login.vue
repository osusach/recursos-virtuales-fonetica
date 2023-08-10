<template>
  <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 min-w-[35%]">
    <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:">
      <h1 class="text-3xl mb-5 font-usach-bebas-title">
        ¡Bienvenido!
      </h1>
      <Input Label="Correo" forLabel="email" type="text" placeholder="pindaro@usach.cl"/>
      <Input Label="Contraseña" forLabel="password" type="password" placeholder="Contraseña"/>
      <Boton label="Iniciar Sesión" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"/>
    </div>
  </form>
</template>

<script setup>
  import Input from "../components/Input.vue"
  import Boton from "../components/Boton.vue"
</script>
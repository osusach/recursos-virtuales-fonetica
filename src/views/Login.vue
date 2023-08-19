<template>
  <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 min-w-[35%]">
    <div class="flex flex-col text-5xl h-fit p-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:">
      <h1 class="text-3xl mb-5 font-usach-bebas-title">
        ¡Bienvenido!
      </h1>
      <Input Label="Correo" forLabel="email" type="text" placeholder="pindaro@usach.cl"/>
      <Input Label="Contraseña" forLabel="password" type="password" placeholder="Contraseña"/>
      <Boton label="Iniciar Sesión" href="/" @click="goToOtherView" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"/>
      <div className="font-usach-helvetica-medium rounded-lg  p-4 text-lg">
        ¿No tienes cuenta?<Enlaces to="/Register">Regístrate</Enlaces>
      </div>
      <div className="font-usach-helvetica-medium rounded-lg  px-6 text-lg">
        <label>¿No Quieres Registrarte?</label>
      </div>
      <Boton label="Invitado" @click="goToOtherView" class="bg-usach-ultra-700 hover:bg-usach-ultra-900 text-xl"/>
    </div>
  </form>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import Input from "../components/Input.vue"
  import Boton from "../components/Boton.vue"
  import Enlaces from "../components/Enlaces.vue"

  const router = useRouter()

  const goToOtherView = () => {
    router.push("/home")
  }
</script>

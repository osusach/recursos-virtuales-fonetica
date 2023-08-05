<template>
  <Layout title="Recursos Virtuales para el Lenguaje">
      <section class="m-auto grid xl:grid-cols-1 gap-10 p-10 w-[30%]">
        <div
          class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:"
        >
          <h1 class="text-3xl mb-5 font-usach-bebas-title">
            Bienvenida
          </h1>
          <Input Label="Usuario" forLabel="user" type="text" placeholder="Usuario"/>
          <Input Label="Contraseña" forLabel="password" type="password" placeholder="Contraseña"/>
          <Boton label="Iniciar Sesión" href="/"/>
          <div class="flex flex-row justify-center align-top">
            <h1 class="text-sm text-center mr-1">¿No tienes cuenta?</h1>
            <button class="text-sm font-usach-helvetica-bold">
              <a class="hover:text-usach-industrial-100" href="/register">Regístrate</a>
            </button>
          </div>
          <h1 class=" text-sm mt-7">¿No quieres registrarte?</h1>
          <button class="rounded-lg bg-usach-ultra-900 hover:bg-usach-ultra-1000 text-lg text-white my-2 drop-shadow p-2">
            <a class="font-usach-helvetica-medium" href="/home">Jugar como Invitado</a>
          </button>
        </div>
        <!--
        <div
          class="md:col-span-2 text-white bg-usach-aqua-700 rounded-lg min-h-[20rem]"
        >
          <h2 class="text-center text-3xl font-usach-bebas-title pt-10">Tabla de líderes</h2>
          <div
            class="grid md:grid-cols-3 gap-6 text-3xl p-10 text-center h-[80%]"
          >
            <Carta title="Píndaro" />
            <Carta title="Rima" />
            <Carta title="Cat. Acentual" />
          </div>
        </div> -->
      </section>
  </Layout>

</template>
<script setup>
    import Boton from "../components/Boton";
    import Carta from "../components/Carta";
    import Layout from "../layouts/Layout";
    import Input from "../components/Input";
</script>

<template>
  <Layout title="Lab. Fonetica">
    <form class="flex flex-col text-5xl text-white p-10 bg-usach-aqua-700 rounded-md w-4/12 justify-center">
      <h1 class="text-3xl font-usach-bebas-title text-center pb-4">
        Iniciar Sesión
      </h1>
      <Input Label="Correo" forLabel="email" type="text" placeholder="pindaro@usach.cl"/>
  
      <Input Label="Contraseña" forLabel="password" type="password" placeholder="•••••••••"/>
  
      <div class="flex justify-center">
        <button type="submit" class="text-white bg-usach-daisy-800 hover:bg-usach-daisy-900 
              focus:ring-4 focus:outline-none font-medium rounded-lg text-sm 
              sm:w-auto py-2.5 px-3.5 text-center">
          Iniciar Sesión
        </button>
      </div>
  
    </form>
  </Layout>
</template>

<script setup>
  import Layout from "../layouts/Layout";
  import Input from "../components/Input";
</script>
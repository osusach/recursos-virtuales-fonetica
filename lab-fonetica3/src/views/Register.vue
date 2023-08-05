<template>
  <Layout title="Lab. Fonetica">
    <section class="m-auto grid xl:grid-cols-1 gap-10 p-10 w-[30%]">
      <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:">
        <h1 class="text-3xl mb-5 font-usach-bebas-title">
          Registro
        </h1>
        <Input Label="Usuario" forLabel="user" type="text" placeholder="Usuario"/>
        <Input Label="Correo" forLabel="email" type="text" placeholder="Correo"/>
        <Input Label="Contraseña" forLabel="password" type="password" placeholder="Contraseña"/>
        <Input Label="Confirme Contraseña" forLabel="confirm_password" type="password" placeholder="Repetir contraseña"/>
        <Boton label="Registrarse" href="/"/>
      </div>
    </section>
  </Layout>
</template>

<script>
	import Input from "../components/Input";
	import Layout from "../layouts/Layout";
	import Boton from "../components/Boton";
</script>

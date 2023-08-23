<template>
    <form class="m-auto grid xl:grid-cols-1 gap-10 p-10 w-[30%]">
      <div class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:">
        <h1 class="text-3xl mb-5 font-usach-bebas-title">Registro</h1>
        <Input Label="Usuario" forLabel="user" type="text" placeholder="Usuario"/>
        <Input Label="Correo" forLabel="email" type="text" placeholder="Correo"/>
        <select v-model="selectedFirst" class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg text-usach-industrial-1000 border-white text-sm 
                                    focus:ring-usach-terra-700 focus:border-usach-terra-700" name="languages" id="lang">
          <option disabled value="">Nivel educativo</option>
          <option value="basica">Enseñanza Básica</option>
          <option value="media">Enseñanza Media</option>
          <option value="sup">Educación Superior</option>
        </select>
        <select v-if="selectedFirst == 'basica'" v-model="selectedSec" class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg text-usach-industrial-1000 border-white text-sm 
                                    focus:ring-usach-terra-700 focus:border-usach-terra-700" name="languages" id="lang">
          <option disabled value="">Grado</option>
          <option v-for="nivel in 8" value="nivel">{{ nivel + '° Básico' }}</option>
        </select>
        <select v-if="selectedFirst == 'media'" v-model="selectedSec" class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg text-usach-industrial-1000 border-white text-sm 
                                    focus:ring-usach-terra-700 focus:border-usach-terra-700" name="languages" id="lang">
          <option disabled value="">Grado</option>
          <option v-for="nivel in 4" value="nivel">{{ nivel + '° Medio' }}</option>
        </select>
        <Input Label="Contraseña" forLabel="password" type="password" placeholder="Contraseña"/>
        <Input Label="Confirme Contraseña" forLabel="confirm_password" type="password" placeholder="Repetir contraseña"/>
        <Boton label="Registrarse" class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"/>
        
      </div>
    </form>
</template>

<script setup>
  import { ref } from 'vue'
  import Input from "../components/Input.vue"
  import Boton from "../components/Boton.vue"

  const selectedFirst = ref('')
  const selectedSec = ref('')
</script>
<template>
    <div>
        Usuario: {{ store.user }}
    </div>
    <div>
        <h1>
            Historial de partidas
        </h1>
        <div v-for="item in historial">
          {{  item  }}
        </div>
    </div>
</template>

<script setup>
import { store } from "../store.js"
let historial = [1, 2, 3]

</script>

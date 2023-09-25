<template>
    <div class="bg-usach-industrial-900 rounded-lg p-10">
        <p>
            Usuario: {{ store.user }}
        </p>
        <div>
            <h1>
                Historial de partidas
            </h1>
            <div v-for="item in historial">
              {{  item  }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { store } from "../store.js"
let historial = [1, 2, 3]

</script>

<template>
    <div class="flex flex-col gap-y-2 text-center bg-usach-aqua-300 rounded-lg p-5 font-usach-bebas-title">
        <p class=" font-usach-bebas-title text-3xl">Corrección</p>
        <p>{{ nombreJuego }}</p>
        <p>puntaje {{ puntaje }}</p>
        <div v-for="(item, index) in correccion" class="flex flex-row place-content-between bg-usach-aqua-800 rounded-lg py-2 px-4 gap-x-5"
            :class="{
                        'bg-usach-aqua-800': item.answer === item.userAnswer,
                        'bg-usach-rouge-700': item.answer !== item.userAnswer
                    }">
            <div class="flex flex-row text-lg gap-2 items-center">
                <p class=" px-2 rounded-lg w-fit" :class="{
                        'bg-usach-aqua-500': item.answer === item.userAnswer,
                        'bg-usach-rouge-500': item.answer !== item.userAnswer
                    }">P{{ index + 1 }}</p>
                <div v-html="textFunc(item)"></div>
            </div>
            <div class="flex flex-col text-center   ">
                <p class=" font-usach-bebas-title text-xl rounded-lg" :class="{
                    'bg-usach-aqua-500 px-3': item.answer === item.userAnswer,
                    'bg-usach-rouge-500 px-3': item.answer !== item.userAnswer
                }"> Tu respuesta: {{ item.userAnswer }} </p>
                <p class=" font-usach-bebas-body text-xl"> Correcta: {{ item.answer }} </p>
            </div>
        </div>
        <router-link to="/home" class="bg-usach-terra-700 mt-4 rounded-lg font-usach-bebas-title text-2xl p-3 hover:bg-usach-terra-800">
            <button>
                Terminar
            </button>
		</router-link>
    </div>
</template>

<script setup>
    import { store } from '../store.js'
	import { useRouter } from 'vue-router'

	const router = useRouter()

    const juego = Number(router.currentRoute.value.params.id)
    const puntaje = store.correccion.score
    const correccion = store.correccion.answers
    const dificultad = Number(localStorage.getItem('dificultad'))
    console.log(correccion)

    let nombreJuego = 'error'
    let textFunc = () => { return 'error' }

    const pindaroFunc = (item) => {
        return `<p> ${item.word}</p>`
    }
    const rimaFunc = (item) => {
        return `<p> ${item.wordA} <br> ${item.wordB} </p>`
    }
    const acentualFunc = (item) => {
        return `<p> ${item.phrase} </p>`
    }
	switch (juego) {
			case 1:
				nombreJuego = 'Píndaro'
                textFunc = pindaroFunc
				break;
			case 2:
				nombreJuego = 'Rima'
                textFunc = rimaFunc
				break;
			case 3:
				nombreJuego = 'Categoría Acentual'
                textFunc = acentualFunc
				break;
			default:
				break;
	}

</script>

<style>
p {
    font-family: BebasNeuePro Regular, sans-serif;
    font-size: 1.25rem/* 20px */;
    line-height: 1.75rem/* 28px */;
}
</style>
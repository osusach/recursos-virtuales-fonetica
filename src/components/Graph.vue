<template>
	<canvas ref="lineChartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, watchEffect, watch } from "vue";
import {
	Chart,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	LineController,
	PointElement,
	LineElement,
} from "chart.js";

const props = defineProps({
	data: Object,
	title: String,
});

const lineChartCanvas = ref(null);
let myLineChart;

onMounted(() => {  
	window.addEventListener('resize', actualizarAnchoPagina);

	Chart.register(
		CategoryScale,
		LinearScale,
		Title,
		Tooltip,
		Legend,
		LineController,
		PointElement,
		LineElement,
	);

	Chart.defaults.color = "#000000";

	myLineChart = new Chart(lineChartCanvas.value, {
		type: "line",
		data: props.data,
		options: {
			responsive: true,
			maintainAspectRatio: true,
    		aspectRatio: 4 / 3,
			scales: {
				y: {
					min: 0,
					max: 1500,
					ticks: {
						stepSize: 100, // Establece el tamaño de paso a 100
					},
				},
			},
			plugins: {
				title: {
					font: { family: "BebasNeuePro Bold", size: 26 },
					display: true,
					text: "Últimos puntajes en " + props.title,
				},
				legend: {
					position: "bottom",
					labels: {
						font: {
							family: "BebasNeuePro Regular",
							size: 16,
						},
					},
				},
			},
		},
	});
});

function getAspectRatio() {
	if (anchoPagina.value <  640)
		return 4/3;
	else
		return 16/9;
}

function updateChartData(newData, newTitle) {
	if (myLineChart) {
		myLineChart.data = newData;
		myLineChart.options.plugins.title.text =
			"Últimos puntajes en " + newTitle;
		myLineChart.update();
	}
}


// Definir una referencia reactiva para el ancho de la página
const anchoPagina = ref(window.innerWidth);

// Función para actualizar el ancho de la página cuando cambie
const actualizarAnchoPagina = () => {
  anchoPagina.value = window.innerWidth;
};

// Limpiar el evento cuando el componente se desmonta
onUnmounted(() => {
  window.removeEventListener('resize', actualizarAnchoPagina);
});

// Observar cambios en el ancho de la página y ejecutar una acción
watch(anchoPagina, (nuevoAncho, antiguoAncho) => {
  console.log(`El ancho de la página cambió de ${antiguoAncho}px a ${nuevoAncho}px`);
  if (myLineChart) {
	console.log(getAspectRatio());
	  myLineChart.options.aspectRatio = getAspectRatio();
  }
});

watchEffect(() => {
	updateChartData(props.data, props.title);
});
</script>

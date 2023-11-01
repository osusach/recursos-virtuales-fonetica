<template>
	<canvas ref="lineChartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
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

const { data } = defineProps(["data"]);

const lineChartCanvas = ref(null);
let myLineChart;

onMounted(() => {
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
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: true,
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
					text: "Ultimos 5 Puntajes",
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
</script>

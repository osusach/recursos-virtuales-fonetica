<template>
	<canvas ref="lineChartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted, defineProps, watchEffect } from "vue";
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

function updateChartData(newData, newTitle) {
	if (myLineChart) {
		myLineChart.data = newData;
		myLineChart.options.plugins.title.text =
			"Últimos 5 Puntajes en " + newTitle;
		myLineChart.update();
	}
}

watchEffect(() => {
	updateChartData(props.data, props.title);
});
</script>

<template>
  <div>
    <canvas ref="lineChartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, PointElement, LineElement } from 'chart.js';

const { data } = defineProps(['data']);

const lineChartCanvas = ref(null);
let myLineChart;

onMounted(() => {
  Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, PointElement, LineElement);

  Chart.defaults.color = '#000';

  myLineChart = new Chart(lineChartCanvas.value, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 1500,
        },
      },
      plugins: {
        title: {
          font: {family: "font-usach-bebas-title", size: 26},      
          display: true,
          text: 'Ultimos 5 Puntajes'
          },
        legend: {
          position: "bottom",
          labels: {
            font: {
              family: "font-usach-helvetica-body",
              size: 16
            }
          }
        }
        }
    }
  });
});
</script>
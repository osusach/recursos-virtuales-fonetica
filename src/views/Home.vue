<template>
    <div class="flex flex-col gap-10">
        <Slide></Slide>
        <div class="flex flex-col lg:flex-row items-center gap-5">
            <Leaderboard label="Píndaro"></Leaderboard>
            <Leaderboard label="Rima"></Leaderboard>
            <Leaderboard label="Categoría acentual"></Leaderboard>
        </div>
    </div>
</template>

<script setup>
    import Slide from "../components/Carousel_index.vue";
    import Leaderboard from "../components/Leaderboard.vue";
</script>

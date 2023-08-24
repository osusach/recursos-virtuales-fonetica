<template>
    <div class="flex flex-col gap-10 items-center">
        <CarouselAlt></CarouselAlt>
        <div class="flex flex-col lg:flex-row items-center gap-5">
            <Leaderboard label="Píndaro"></Leaderboard>
            <Leaderboard label="Rima"></Leaderboard>
            <Leaderboard label="Categoría acentual"></Leaderboard>
        </div>
    </div>
</template>

<script setup>
    import Leaderboard from "../components/Leaderboard.vue";
    import CarouselAlt from "../components/CarouselAlt.vue";
</script>

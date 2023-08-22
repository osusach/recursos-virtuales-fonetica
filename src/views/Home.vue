<template>
    <div class="flex flex-col gap-10">
        <Slide></Slide>
        <div class="grid grid-flow-col gap-5">
            <Leaderboard label="Píndaro"></Leaderboard>
            <Leaderboard></Leaderboard>
            <Leaderboard></Leaderboard>
        </div>
    </div>
</template>

<script setup>
    import Slide from "../components/Carousel_index.vue";
    import Leaderboard from "../components/Leaderboard.vue";
</script>

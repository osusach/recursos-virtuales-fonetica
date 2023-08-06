<template>
    <div className=" font-usach-helvetica-medium rounded-lg bg-usach-terra-800 p-4 text-lg">
        <h1>{{title}}</h1>
        <p>{{description}}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        description: String
    })
</script>
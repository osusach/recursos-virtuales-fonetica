<template>
    <div class="flex flex-col mb-4 text-left font-usach-helvetica-medium">
        <input :type="type" :id="forLabel" 
            class="flex bg-white  
                 text-usach-industrial-1000 text-sm rounded-lg 
                focus:ring-usach-terra-800 focus:border-usach-terra-800
                w-full p-2.5 text-left font-usach-helvetica-body"
                :placeholder="placeholder" required />
    </div>
</template>

<script setup>
    const props = defineProps({
        label: String,
        forLabel: String,
        type: String,
        placeholder:  {
            type: String,
            required: false
        }
    })
</script>
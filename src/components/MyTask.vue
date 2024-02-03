<script setup>

const props = defineProps({
    id: Number,
    stageId: Number,
    name: String,
    description: String
})


</script>

<template>
    <div class="task">
        {{ props.name }}
    </div>
</template>

<style lang="sass">
    .task
        height: 50px
        margin: 10px
        padding: 3px
        border: 1px solid black
        border-radius: 5px

</style>
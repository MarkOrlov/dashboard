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
        <div class="task-name">
            <b>
                {{ props.name }}
            </b>
        </div>
        <div class="task-description">
            <p>
                {{ props.description }}
            </p>
        </div>
    </div>
</template>

<style lang="sass">
    .task
        margin: 10px
        padding: 3px
        border: 1px solid black
        border-radius: 5px

    .task-description
        word-wrap: break-word
</style>
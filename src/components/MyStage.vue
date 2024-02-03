<script setup>

import MyTask from '@/components/MyTask.vue';
import MyEmptyTask from '@/components/MyEmptyTask.vue';
import { useTasksStore } from '@/stores/taskStore';
// import { useStagesStore } from '@/stores/stageStore';

const tasks = useTasksStore();
// const stages = useStagesStore();

const props = defineProps({
    id: Number,
    number: Number,
    stagesLength: Number,
    name: String,
    color: String,
    goRight: Function,
    goLeft: Function,
    addNewTask: Function
})



const tasksList = tasks.getStageTasks(props.id)

</script>

<template>
    <div class="stage" :style="`background-color: ${color};`">
        <div class="stage-header border-bottom-secondary">
            <div class="stage-arrow">
                <img src="../assets/left.svg" alt="left" v-if="number !== 1" @click="goLeft(props.id)">
            </div>
            <div>
                {{ name }}
            </div>
            <div class="stage-arrow">
                <img src="../assets/right.svg" alt="right" v-if="stagesLength !== number" @click="goRight(props.id)">
            </div>
        </div>
        <div class="stage-items">
            <div>
                <MyTask v-for="(task) in tasksList" :key="task.id" :id="task.id" :stageId="task.stageId"
                    :description="task.description" :name="task.name" />
                <MyEmptyTask @click="addNewTask(id)" />
            </div>
        </div>
    </div>
</template>

<style lang="sass">
    .stage
        min-height: 500px
        width: 200px
        height: auto
        margin: 10px
        border-radius: 5px
    
    .stage-header
        margin: 10px
        padding: 10px
        text-align: center
        display: flex
        justify-content: space-between
        flex-direction: row

    .stage-arrow
        cursor: pointer
</style>
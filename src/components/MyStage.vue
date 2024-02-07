<script setup>

import { ref } from 'vue';

import MyTask from '@/components/MyTask.vue';
import MyEmptyTask from '@/components/MyEmptyTask.vue';
import MyTaskDialog from '@/components/MyTaskDialog.vue';
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
    openStageEditDialog: Function
})

const tasksList = ref([]);
const showTaskDialog = ref(false);
const taskIdToEdit = ref(undefined);

tasksList.value = tasks.getStageTasks(props.id);

const addNewTask = (id) => {
    tasks.addTask(id);
    tasksList.value = tasks.getStageTasks(props.id);
}

const deleteTask = (id) => {
    console.log(id);
    tasks.deleteTask(id);
    tasksList.value = tasks.getStageTasks(props.id);
}

const openTaskEditDialog = (id) => {
    showTaskDialog.value = true;
    taskIdToEdit.value = id;

}

const closeDialog = () => {
    showTaskDialog.value = false;
}

</script>

<template>
    <div class="stage" :style="`background-color: ${color};`">
        <div class="stage-header border-bottom-secondary">
            <div class="stage-arrow">
                <img src="../assets/left.svg" alt="left" v-if="number !== 1" @click="goLeft(props.id)">
            </div>
            <div class="stage-name" @click="openStageEditDialog(id)">
                {{ name }}
            </div>
            <div class="stage-arrow">
                <img src="../assets/right.svg" alt="right" v-if="stagesLength !== number" @click="goRight(props.id)">
            </div>
        </div>
        <div class="stage-items">
            <div>
                <MyTask v-for="(task) in tasksList" :key="task.id" :id="task.id" :stageId="task.stageId"
                    :description="task.description" :name="task.name" @click="openTaskEditDialog(task.id)" />
                <MyEmptyTask @click="addNewTask(id)" />
            </div>
        </div>
        <MyTaskDialog v-if="showTaskDialog" :id="taskIdToEdit" :deleteTask="deleteTask" :closeDialog="closeDialog" />
    </div>
</template>

<style lang="sass">
    .stage
        min-height: 500px
        min-width: 200px
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

    .stage-name
        cursor: pointer
</style>
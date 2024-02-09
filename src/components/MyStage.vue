<script setup>

import { ref } from 'vue';

import MyTask from '@/components/MyTask.vue';
import MyEmptyTask from '@/components/MyEmptyTask.vue';
import MyTaskDialog from '@/components/MyTaskDialog.vue';
import { useTasksStore } from '@/stores/taskStore';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const tasks = useTasksStore();

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

const showTaskDialog = ref(false);
const taskIdToEdit = ref(undefined);


const addNewTask = (id) => {
    tasks.addTask(id);
}

const deleteTask = (id) => {
    console.log(id);
    tasks.deleteTask(id);
}

const openTaskEditDialog = (id) => {
    showTaskDialog.value = true;
    taskIdToEdit.value = id;

}

const closeDialog = () => {
    showTaskDialog.value = false;
}

const onDragStart = (event, task) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('taskId', task.id.toString());
}

const onDrop = (event, stageId) => {
    const taskId = event.dataTransfer.getData('taskId');
    tasks.changeTaskStage(parseInt(taskId), stageId);
}

</script>



<template>
    <div class="stage" :style="`background-color: ${color};`" @dragover.prevent @dragenter.prevent
        @drop="onDrop($event, props.id)">
        <div class="stage-header">
            <ChevronLeftIcon :class="`size-8 ${number == 1 ? 'text-gray-500' : 'cursor-pointer'}`" disabled="number == 1"
                @click="goLeft(props.id)" />
            <div class="stage-name" @click="openStageEditDialog(id)">
                {{ name }}
            </div>
            <ChevronRightIcon :class="`size-8 ${number == stagesLength ? 'text-gray-500' : 'cursor-pointer'}`"
                disabled="number == stagesLength" @click="goRight(props.id)" />
        </div>
        <div class="stage-items">
            <div>
                <MyTask v-for="(task) in tasks.getStageTasks(props.id)" :key="task.id" :id="task.id" :stageId="task.stageId"
                    :description="task.description" :name="task.name" @click="openTaskEditDialog(task.id)" draggable="true"
                    @dragstart="onDragStart($event, task)" />
                <MyEmptyTask @click="addNewTask(id)" />
            </div>
        </div>
        <MyTaskDialog v-if="showTaskDialog" :id="taskIdToEdit" :deleteTask="deleteTask" :closeDialog="closeDialog" />
    </div>
</template>

<style lang="sass">
    .stage
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
        border-bottom: 1px solid black

    .stage-arrow
        cursor: pointer

    .stage-name
        cursor: pointer
</style>
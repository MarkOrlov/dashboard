<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyStage from '@/components/MyStage.vue';
import MyEmptyStage from '@/components/MyEmptyStage.vue';

import { useStagesStore } from '@/stores/stageStore';
import { useTasksStore } from '@/stores/taskStore';

const stages = useStagesStore();
const tasks = useTasksStore();
const myStages = stages.getSortedStages;

const goRight = (id) => {
    stages.goRight(id);
    // stages.getSortedStages;
}

const goLeft = (id) => {
    stages.goLeft(id);
    // stages.getSortedStages;
}

const addStage = () => {
    stages.addStage();
    // stages.getSortedStages;
}

const addNewTask = (stageId) => {
    tasks.addTask(stageId);
}


</script>

<template>
    <MyHeader />
    <div class="stage-wrapper">
        <MyStage v-for="(stage) in myStages" :key="stage.id" :id="stage.id" :number="stage.number" :name="stage.name"
            :color="stage.color" :stagesLength="myStages.length" :goRight="goRight" :goLeft="goLeft"
            :addNewTask="addNewTask" />
        <MyEmptyStage @click="addStage" />
    </div>
</template>


<style lang="sass">
    .stage-wrapper
        display: flex
        margin: 10px
</style>
<script setup>

import { ref } from 'vue';
import MyHeader from '@/components/MyHeader.vue';
import MyStageDialog from '@/components/MyStageDialog.vue';
import MyStage from '@/components/MyStage.vue';
import MyEmptyStage from '@/components/MyEmptyStage.vue';

import { useStagesStore } from '@/stores/stageStore';
import { useTasksStore } from '@/stores/taskStore';

const stages = useStagesStore();
const tasks = useTasksStore();
const stageIdToEdit = ref(undefined);
const myStages = ref([]);
myStages.value = stages.getSortedStages;

const showStageDialog = ref(false);

const goRight = (id) => {
    stages.goRight(id);
    stages.getSortedStages;
}

const goLeft = (id) => {
    stages.goLeft(id);
    stages.getSortedStages;
}

const addStage = () => {
    stages.addStage();
    stages.getSortedStages;
}

const deleteStage = (id) => {
    tasks.deleteTaskByStage(id);
    stages.deleteStage(id);
    myStages.value = stages.getSortedStages;
}

const openStageEditDialog = (id) => {
    stageIdToEdit.value = id;
    showStageDialog.value = true;
}

const closeDialog = () => {
    showStageDialog.value = false
}

</script>

<template>
    <MyHeader />
    <div class="stage-wrapper">
        <MyStage v-for="(stage) in myStages" :key="stage.id" :id="stage.id" :number="stage.number" :name="stage.name"
            :color="stage.color" :stagesLength="myStages.length" :goRight="goRight" :goLeft="goLeft"
            :openStageEditDialog="openStageEditDialog" />
        <MyEmptyStage @click="addStage" />
    </div>

    <MyStageDialog v-if="showStageDialog" :id="stageIdToEdit" :deleteStage="deleteStage" :closeDialog="closeDialog" />
</template>


<style lang="sass">
    .stage-wrapper
        display: flex
        margin: 10px
        z-index: 100
</style>
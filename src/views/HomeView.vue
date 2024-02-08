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

const showStageDialog = ref(false);

const goRight = (id) => {
    stages.goRight(id);
}

const goLeft = (id) => {
    stages.goLeft(id);
}

const addStage = () => {
    stages.addStage();
}

const deleteStage = (id) => {
    tasks.deleteTaskByStage(id);
    stages.deleteStage(id);
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
    <div class="main-wrapper">
        <MyHeader />
        <div class="stage-wrapper">
            <MyStage v-for="(stage) in stages.getSortedStages" :key="stage.id" :id="stage.id" :number="stage.number"
                :name="stage.name" :color="stage.color" :stagesLength="stages.stages.length" :goRight="goRight"
                :goLeft="goLeft" :openStageEditDialog="openStageEditDialog" />
            <MyEmptyStage @click="addStage" />
        </div>

        <MyStageDialog v-if="showStageDialog" :id="stageIdToEdit" :deleteStage="deleteStage" :closeDialog="closeDialog" />
    </div>
</template>


<style lang="sass">
    .main-wrapper
        display: grid
        grid-template-columns: 1fr
        grid-template-rows: 75px 1fr

    .stage-wrapper
        display: flex
        margin: 10px
        z-index: 100
</style>
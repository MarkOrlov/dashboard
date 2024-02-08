<script setup>
import { defineProps, ref } from 'vue';
import { useStagesStore } from '@/stores/stageStore';

const stages = useStagesStore();

const props = defineProps({
    id: Number,
    closeDialog: Function,
    deleteStage: Function
})

const showConfirmButtons = ref(false);

const stage = stages.getStage(props?.id);

</script>

<template>
    <div class="dialog-bg" @click="closeDialog">
    </div>
    <div class="dialog-wrapper">
        <div class="edit-dialog">
            <div>
                <label for="name">Stage name</label>
                <input name="name" class="stage-name-input" type="text" v-model="stage.name">
            </div>
            <div>
                <label for="color">Stage color</label>
                <input class="stage-color-input" type="color" name="color" v-model="stage.color">
            </div>
            <div class="dialog-buttons">
                <div v-if="showConfirmButtons">
                    <button class="my-btn btn-confirm" type="button"
                        @click="{ deleteStage(props.id); closeDialog() }">Yes</button>
                    <button class="my-btn btn-cancel" type="button" @click="showConfirmButtons = false">No</button>
                </div>
                <div v-else>
                    <button class="my-btn" type="button" @click="showConfirmButtons = true">Delete</button>
                    <button class="my-btn" type="button" @click="closeDialog">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>


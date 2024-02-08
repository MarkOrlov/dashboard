<script setup>
import { defineProps, ref } from 'vue';
import { useTasksStore } from '@/stores/taskStore';

const tasks = useTasksStore();

const props = defineProps({
    id: Number,
    closeDialog: Function,
    deleteTask: Function
})

const showConfirmButtons = ref(false);

const task = tasks.getTask(props?.id);

</script>

<template>
    <div class="dialog-bg" @click="closeDialog">
    </div>
    <div class="dialog-wrapper">
        <div class="edit-dialog">
            <div>
                <label for="name">Task name</label>
                <input name="name" class="task-name-input" type="text" v-model="task.name">
            </div>
            <div>
                <label for="description">Task description</label>
                <textarea name="description" id="description" v-model="task.description"></textarea>
            </div>
            <div class="dialog-buttons">
                <div v-if="showConfirmButtons">
                    <button class="my-btn btn-confirm" type="button"
                        @click="{ deleteTask(props.id); closeDialog() }">Yes</button>
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

<style lang="sass">
    .dialog-bg
        height: 100%
        width: 100%
        position: absolute
        top: 0
        left: 0
        z-index: 100
        background-color: black
        opacity: 0.5
    .dialog-wrapper
        height: 100%
        width: 100%
        position: absolute
        top: 0
        left: 0

    .edit-dialog
        position: relative
        z-index: 101
        opacity: 100%
        width: fit-content
        background-color: white
        margin: 300px auto
        border: 2px solid black
        border-radius: 10px
        display: flex
        flex-direction: column

    .edit-dialog>*
        margin: 10px
        display: flex
        flex-direction: column

    .dialog-buttons>div
        display: flex
        justify-content: flex-end

    .my-btn
        margin-left: 10px
        padding: 5px
        border: 1px solid black
        border-radius: 5px
        cursor: pointer

    .btn-confirm
        background-color: #9effb6
    
    .btn-cancel
        background-color: #ff5c5c


</style>
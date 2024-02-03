import { defineStore } from "pinia"; 

export const useTasksStore = defineStore("tasksStore", {
    state: () => ({
        tasks: [
            {
                id: 0,
                stageId: 0,
                name: "Task 1",
                description: "new task"
            },
            {
                id: 1,
                stageId: 1,
                name: "Task 2",
                description: "new task"
            },
            {
                id: 2,
                stageId: 1,
                name: "Task 3",
                description: "new task"
            }
        ],
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getStageTasks: (state) => (stageId) => state.tasks.filter(task => task.stageId === stageId),        
    },
    actions: {
        addTask(stageId) {
            this.tasks.push({id: this.tasks.length, stageId: stageId, name: `Task ${this.tasks.length+1}`, description: "new task"})
            this.getStageTasks(stageId)
            console.log(this.tasks)
        }
    }

});
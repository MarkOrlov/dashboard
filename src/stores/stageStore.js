import { defineStore } from "pinia"; 

export const useStagesStore = defineStore("stagesStore", {
    state: () => ({
        stages: [
            {
                id: 0,
                number: 1,
                name: "Stage 1",
                color: "#ff968f",
            },
            {
                id: 1,
                number: 2,
                name: "Stage 2",
                color: "#f3adff",
            },
            {
                id: 2,
                number: 3,
                name: "Stage 3",
                color: "#b4bbfe",
            }
        ],
    }),
    actions: {
        goRight(stageId) {
            let stage = this.stages.find(stage => stage.id === stageId);
            let number = stage.number;

            this.stages.find(stage => stage.number === number+1).number--;
            stage.number++;
        },
        goLeft(stageId) {
            let stage = this.stages.find(stage => stage.id === stageId);
            let number = stage.number;

            this.stages.find(stage => stage.number === number-1).number++;
            stage.number--;
        },
        addStage() {
            this.stages.push({id: this.stages.length, number: this.stages.length+1, name: `Stage ${this.stages.length+1}`, color: "#ffffff"})
        },
        deleteStage(id) {
            const number = this.stages.find(stage => stage.id === id).number;
            this.stages = this.stages.filter(stage => stage.id !== id);
            this.stages = this.stages.map(stage => ({id: stage.id, number: stage.number < number ? stage.number : stage.number - 1, name: stage.name, color: stage.color}));
        }
    },
    getters: {
        getSortedStages: (state) => state.stages.sort((a, b) => a.number - b.number),
        getStage: (state) => (stageId) => state.stages.find(stage => stage.id === stageId),
    }
});
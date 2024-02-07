import { defineStore } from "pinia"; 

export const useStagesStore = defineStore("stagesStore", {
    state: () => ({
        stages: [
            {
                id: 0,
                number: 1,
                name: "Stage 1",
                color: "#f44336",
            },
            {
                id: 1,
                number: 2,
                name: "Stage 2",
                color: "#9c27b0",
            },
            {
                id: 2,
                number: 3,
                name: "Stage 3",
                color: "#1122b2",
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
            this.stages = this.stages.filter(stage => stage.id !== id);
        }
    },
    getters: {
        getSortedStages: (state) => state.stages.sort((a, b) => a.number - b.number),
        getStage: (state) => (stageId) => state.stages.find(stage => stage.id === stageId),
    }
});
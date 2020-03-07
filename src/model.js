import {v4 as uuid} from "uuid";

export function defaultStory() {
    return {
        scenes: [defaultScene()],
        title: "",
        id: ""
    }
}

export function defaultScene() {
    return {
        title: 'Default Scene',
        id: uuid(),
        passages: [{
            id: "",
            title: "",
            subPassages: ""
        }]
    }
}

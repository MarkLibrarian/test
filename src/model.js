import uuid from "uuid/v4";

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
        }
        ]
    }
}
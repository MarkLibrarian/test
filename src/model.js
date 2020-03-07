import {v4 as uuid} from "uuid";

export function defaultStory() {
    return {
        id: uuid(),
        title: 'Default Story',
        scenes: [defaultScene()]
    }
}

export function defaultScene() {
    return {
        id: uuid(),
        title: 'Default Scene',
        passages: [defaultPassage()]
    }
}

export function defaultPassage() {
    return {
        id: uuid(),
        title: 'Default Passage',
        subPassages: []
    };
}

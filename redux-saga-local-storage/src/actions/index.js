import { INCREMENT, DECREMENT } from "./actionTypes.js"
// create action(object gồm type và step -có thể dùng payload)
export const incrementAction = (step) => {
    return { type: INCREMENT, step: step }
}

export const decrementAction = (step) => {
    return { type: DECREMENT, step: step }
}
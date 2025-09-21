import { INCREMENT, DECREMENT, LOG } from "./actionTypes.js"
// create action(object gồm type và step -có thể dùng payload)
export const incrementAction = (step) => {
    return { type: INCREMENT, step: step }
}

export const decrementAction = (step) => {
    return { type: DECREMENT, step: step }
}

export const logAction = (message) => {
    return { type: LOG, payload: message }
}
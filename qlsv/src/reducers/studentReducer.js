
const initialState = { search: "" };
export default function bankReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'fill':
            newState = { search: action.payload }
            return newState;

        default:
            return state;
    }
}

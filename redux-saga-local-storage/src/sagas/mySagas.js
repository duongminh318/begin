import { INCREMENT } from "../actions/actionTypes";
import { takeEvery } from "redux-saga/effects"

export function* incrementlog() {

    yield console.log("tăng");
}
export function* mySaga() {

    yield takeEvery(INCREMENT, incrementlog);
}
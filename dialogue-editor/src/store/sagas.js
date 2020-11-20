import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "./actions";
import { getJson, getText } from "../api";

const callDialogueApi = (id) =>
  getJson(`/api/v1/dialogue/${id}`)
    .then(({ result }) => ({ dialogue: result }))
    .catch((error) => ({ error }));

function* getDialogue(action) {
  console.log("GET DIALOGUE", action)
  const { dialogue, error } = yield call(callDialogueApi, action.payload);
  console.log(dialogue, error)
  if (dialogue) {
    yield put(actions.gotDialogue(dialogue));
  } else {
    yield put(actions.dialogueError(error));
  }
}

const helloServer = () =>
  getJson("/api/v1/hello")
    .then(({ result }) => ({ response: result }))
    .catch((error) => ({ error }));

function* testServer() {
  const { response, error } = yield call(helloServer);
  if (response) {
    yield put(actions.serverResponse(response));
  } else {
    yield put(actions.serverError(error));
  }
}
 
export default function* rootSaga() {
  yield takeEvery(actions.TEST_SERVER, testServer); 
  yield takeEvery(actions.GET_DIALOGUE, getDialogue);
}

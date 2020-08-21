import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "./actions";
import { get } from "../api";

const helloServer = () =>
  get("/api/v1/hello")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
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

const helloFirebase = (storageRef) =>
  storageRef
    .child("hello.txt")
    .getDownloadURL()
    .then((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text();
      })
    )
    .then((result) => ({ response: result }))
    .catch((error) => ({ error }));

function* testFirebase(action) { 
  const { response, error } = yield call(helloFirebase, action.payload);
  if (response) {
    yield put(actions.firebaseResponse(response));
  } else {
    yield put(actions.firebaseError(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(actions.TEST_SERVER, testServer);
  yield takeEvery(actions.TEST_FIREBASE, testFirebase);
}

import { call, take, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import createEventSourceConnection from "./eventSourceConnexion";
import * as types from "../store/constants/actionTypes";

function createEventSourceChannel(eventSource) {
  if (!(eventSource instanceof EventSource)) {
    throw new Error(
      `Le parametre passé n'est pas une instance de l'API EventSource`
    );
  }
  return eventChannel((emit) => {
    const messageHandler = ({ data }) => {
      console.log("__Payload__", data);
      emit(data);
    };

    const errorHandler = (errorEvent) => {
      emit(
        new Error(
          `[EventsSaga] Une erreur est survenue lors de la connexion avec le hub`
        )
      );
    };

    eventSource.onmessage = messageHandler;
    eventSource.onerror = errorHandler;

    eventSource.onopen = (e) => {
      console.log("[EventsSaga] La connexion est ouverte avec le hub");
    };

    const unsubscribe = () => {
      eventSource.close();
    };

    return unsubscribe;
  });
}

function* watchOnNewEvents() {
  const userInJson = yield call(
    [localStorage, localStorage.getItem],
    "__USER__"
  );
  const user = yield call([JSON, JSON.parse], userInJson);
  const eventSource = yield call(
    createEventSourceConnection,
    "http://localhost:8001/.well-known/mercure",
    `ping/${user._id}`
  );
  const eventSourceChannel = yield call(createEventSourceChannel, eventSource);
  while (true) {
    try {
      const payload = yield take(eventSourceChannel);
      console.log("🤯🤯", payload);
      yield put({ type: types.CREATE_PRODUCT_SUCCESS, payload });
    } catch (e) {
      console.error(e);
    }
  }
}

export default watchOnNewEvents;

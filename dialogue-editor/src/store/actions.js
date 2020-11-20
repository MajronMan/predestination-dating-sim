export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const TEST_SERVER = "TEST_SERVER";
export const SERVER_RESPONSE = "SERVER_RESPONSE";
export const SERVER_ERROR = "SERVER_ERROR";
export const TEST_FIREBASE = "TEST_FIREBASE";
export const FIREBASE_RESPONSE = "FIREBASE_RESPONSE";
export const FIREBASE_ERROR = "FIREBASE_ERROR";
export const GET_DIALOGUE = "GET_DIALOGUE";
export const GOT_DIALOGUE = "GOT_DIALOGUE";
export const DIALOGUE_ERROR = "DIALOGUE_ERROR";

export const mkAction = (type, payload) => ({ type, payload });

export const userLogin = (user) => mkAction(USER_LOGIN, user);

export const userLogout = () => mkAction(USER_LOGOUT);

export const testServer = () => mkAction(TEST_SERVER);

export const serverResponse = (response) => mkAction(SERVER_RESPONSE, response);

export const serverError = (error) => mkAction(SERVER_ERROR, error);

export const getDialogue = (id) => mkAction(GET_DIALOGUE, id);

export const gotDialogue = (dialogue) => mkAction(GOT_DIALOGUE, dialogue);

export const dialogueError = (error) => mkAction(FIREBASE_ERROR, error);

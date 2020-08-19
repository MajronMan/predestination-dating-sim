import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { userLogin, userLogout } from "../store/actions";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor(reduxStore) {
    firebase.initializeApp(config);

    this.storage = firebase.storage();
    this.reduxStore = reduxStore;

    firebase.auth().useDeviceLanguage();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleLogin(user);
      } else {
        this.handleLogout();
      }
    });
  }

  handleLogin = (user) => {
    this.reduxStore.dispatch(userLogin(user));
  };

  handleLogout = () => {
    this.reduxStore.dispatch(userLogout());
  };

  googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(this.googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user, token);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  register = (email, password, handle) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(handle);

  login = (email, password, handle) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(handle);
  };

  logout = () => {
    firebase.auth().signOut();
  };
}

export default Firebase;

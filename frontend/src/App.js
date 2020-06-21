import React from 'react';
import './App.css';
import { FirebaseContext } from './Firebase';

const backendUrl = process.env.REACT_APP_BACKEND_URL

async function callHello() {
  return fetch(`${backendUrl}/api/v1/hello`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json();
  })
}

async function testServer() {
  callHello().then(({ result }) => {
    const el = document.getElementById("serverResponse")
    if (el) {
      el.innerText = result
      el.style.color = ""
    }
  }).catch(() => {
    const el = document.getElementById("serverResponse")
    if (el) {
      el.innerText = "ERROR"
      el.style.color = "red"
    }
  });
}



const testFirebase = (storageRef) => () => {
  callFirebase(storageRef)
}

async function callFirebase(storageRef) {
  storageRef.child('hello.txt').getDownloadURL()
    .then((url) => fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      } 
      return response.text();
    })).then(
      result => {
        const el = document.getElementById("firebaseResponse")
        if (el) {
          el.innerText = result
        }
      }
    ).catch(() => {
      const el = document.getElementById("firebaseResponse")
      if (el) {
        el.innerText = "ERROR"
        el.style.color = "red"
      }
    });

}

const FirebaseEnabledComponent = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>
        Test connection to firebase
      <div>
          <button onClick={testFirebase(firebase.storage.ref())}>TEST</button>
          <p id="firebaseResponse"></p>
        </div>
      </div>;
    }}
  </FirebaseContext.Consumer>
);


const App = () => { 
  return <div className="App">
    <header className="App-header">
      <div>
        Test connection to server
          <div>
          <button onClick={testServer}>TEST</button>
          <p id="serverResponse"></p>
        </div>
      </div>

      <FirebaseEnabledComponent />
    </header>
  </div>
}

export default App;

import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCB9bKwJRDVtOZDyoQwsM0NyD44p2Vxgwk",
  authDomain: "datademo-701ad.firebaseapp.com",
  databaseURL: "https://datademo-701ad.firebaseio.com",
  projectId: "datademo-701ad",
  storageBucket: "datademo-701ad.appspot.com",
  messagingSenderId: "111194695219"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();

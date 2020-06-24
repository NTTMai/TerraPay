import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBsu96uw4NzWcOxf9kJhoimpPaMTmzyDrI",
  authDomain: "crwn-db-9b31f.firebaseapp.com",
  databaseURL: "https://crwn-db-9b31f.firebaseio.com",
  projectId: "crwn-db-9b31f",
  storageBucket: "crwn-db-9b31f.appspot.com",
  messagingSenderId: "1052458345029",
  appId: "1:1052458345029:web:44f12266deceabc4ff392c",
  measurementId: "G-SDMM7XGV8L",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const terraWallet = "terra1xmscr6yzp78w6zc2gdxjgyafjw4h6ec90h5mxw";
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        terraWallet,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

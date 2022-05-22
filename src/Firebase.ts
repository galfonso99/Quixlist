import {initializeApp} from "firebase/app"
import { getDatabase, ref, set } from "firebase/database";

const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
    appId: import.meta.env.VITE_FIREBASE_APP,
    measurementId: import.meta.env.VITE_FIREBASE_MEASURE
}

const app = initializeApp(config);

export const db = getDatabase(app);
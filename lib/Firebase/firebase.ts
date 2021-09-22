import {initializeApp} from 'firebase/app';

const config = {
    apiKey: "AIzaSyAQHlhtCp30u53J_DV5KuxcbvKI26AUZ-8",
    authDomain: "ecommerce-32fdb.firebaseapp.com",
    databaseURL: "https://ecommerce-32fdb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecommerce-32fdb",
    storageBucket: "ecommerce-32fdb.appspot.com",
    messagingSenderId: "25213121286",
    appId: "1:25213121286:web:72a8336a242a0fa7322487",
    measurementId: "G-4GGMQWR6E4"
  };

export const app = initializeApp(config);

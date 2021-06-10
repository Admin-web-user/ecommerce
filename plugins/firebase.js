import firebase from 'firebase/app'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAQHlhtCp30u53J_DV5KuxcbvKI26AUZ-8',
  authDomain: 'ecommerce-32fdb.firebaseapp.com',
  projectId: 'ecommerce-32fdb',
  storageBucket: 'ecommerce-32fdb.appspot.com',
  messagingSenderId: '25213121286',
  appId: '1:25213121286:web:72a8336a242a0fa7322487',
  measurementId: 'G-4GGMQWR6E4'
}

if (!firebase.apps.length) {
// Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export default firebase

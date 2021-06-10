import firebase from './firebase'
import db from './db'
import 'firebase/auth'

export default (context) => {
  const { store } = context
  const products = []
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.user) {
        user = user.user
      }
      const setUser = {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
        emailVerified: user.emailVerified,
        email: user.email,
        logged_at: firebase.firestore.FieldValue.serverTimestamp()
      }
      db.collection('users').doc(setUser.id).set(setUser)
        .catch(err => console.log(err))

      store.commit('setUser', setUser)
    } else {
      store.commit('setUser', null)
    }
  })
  db.collection('products')
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        return products.push({ ...doc.data() })
      })
      store.commit('setProducts', products)
    }).catch(err => console.log(err))
}

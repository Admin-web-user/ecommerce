import firebase from './firebase'
import 'firebase/auth'

export default (context) => {
  const { store } = context

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
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      }
      console.log(setUser)
      //   db.collection('users').doc(setUser.id).set(setUser)
      store.commit('setUser', setUser)
    } else {
      store.commit('setUser', null)
    }
  })
}

import firebase from './firebase'
import 'firebase/firestore'

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})
export default db

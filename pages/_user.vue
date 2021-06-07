<template>
  <div>
    {{ $route.params.user }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
import 'firebase/auth'

export default {
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    const loggedIn = (localStorage.getItem('isLoggedIn') === 'true')
    console.log(loggedIn)
    console.log(user)
    if (!loggedIn) {
      redirect('/login')
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'isLoggedIn'])
  }
}
</script>

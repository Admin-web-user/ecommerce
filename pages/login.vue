<template>
  <div class="h-80 justify-center align-center d-flex">
    <div v-if="user[0]" class="title pa-2" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      You are already logged in
    </div>
    <div v-if="!user[0]" class="login-form pa-2 w-100 max-w-500" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      <h1 class="text-center">
        LOGIN
      </h1>
      <v-form
        ref="form"
      >
        <v-text-field
          v-model="inputedUser.email"
          label="E-mail"
          required
        />
        <v-text-field
          v-model="inputedUser.password"
          label="Password"
          required
        />
        <h4 class="mb-2">
          <v-btn class="transparent-bg">
            Forgot Password?
          </v-btn>
        </h4>

        <v-btn
          color="red"
          class="mr-4 w-100"
          @click="login()"
        >
          Login
        </v-btn>
      </v-form>
      <div v-if="err">
        {{ err }}
      </div>
    </div>
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
    if (user || loggedIn) {
      redirect('/')
    }
  },
  data () {
    return {
      inputedUser: {
        email: '',
        password: ''
      },
      err: ''
    }
  },
  computed: {
    ...mapState('darkmode', ['mode']),
    ...mapState(['user', 'isLoggedIn'])
  },
  watch: {
    user () {
      const loggedIn = (localStorage.getItem('isLoggedIn') === 'true')
      if (this.user[0] || loggedIn) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.inputedUser.email, this.inputedUser.password)
        .then((userCredential) => {
          console.log(userCredential.user)
          this.$router.push({ name: 'user', params: { user: userCredential.user.uid } })
        })
        .catch((error) => {
          this.err = error.message
        })
    }
  }
}
</script>

<style>
.max-w-500 {
  max-width: 500px;
}
.transparent-bg {
    box-shadow: none;
    background: transparent!important;;
}
</style>

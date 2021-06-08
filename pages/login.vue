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
      <h3 class="text-center my-2">
        OR
      </h3>
      <v-btn class="deep-orange darken-3 w-100 rounded-pill py-5 my-2 mb-3 text-white">
        Sign in with Google
      </v-btn>

      <div class="my-2 text-center">
        Don't have any account? <v-btn class="grey lighten-5" @click="displayRegister = true">
          Create an account
        </v-btn>
      </div>
      <div v-if="displayRegister" class="fixed" transition="slide-x-transition">
        <register @click="hideRegister()" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Register from '~/components/Register.vue'
import firebase from '~/plugins/firebase'
import 'firebase/auth'

export default {
  components: { Register },
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
      err: '',
      displayRegister: false
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
      if (this.inputedUser.email.trim() && this.inputedUser.password.trim()) {
        firebase.auth().signInWithEmailAndPassword(this.inputedUser.email, this.inputedUser.password)
          .then((userCredential) => {
            console.log(userCredential.user)
            this.$router.push({ name: 'user', params: { user: userCredential.user.uid } })
          })
          .catch((error) => {
            this.err = error.message
          })
      }
    },
    hideRegister () { this.displayRegister = false }
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
.fixed {
  position: fixed;
  top: 0;
}
</style>

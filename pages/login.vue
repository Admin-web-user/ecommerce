<template>
  <div class="h-80 justify-center align-center d-flex">
    <div v-if="user[0] && user[0].emailVerified" class="title pa-2" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      You are logged in from <span style="color: firebrick">{{ user[0].email }}</span>. Log out from this id to login from another.
    </div>
    <div v-if="user[0] && !user[0].emailVerified" class="title pa-2" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      You are logged in from <span style="color: firebrick">{{ user[0].email }} </span> but not yet verified.<br>
      Please check your email <span style="color: firebrick">{{ user[0].email }} </span>for verification.
      <br>
      Didn't  receive an email?
      <v-btn @click="resendEmailVerification">
        Resend verification code
      </v-btn><br>
      <div>{{ resendNotification }}</div>
    </div>
    <div v-if="!user[0] && displayLogin" class="login-form pa-2 w-100 max-w-500" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
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
          type="password"
          required
        />
        <div data-app class="my-4">
          <reset-password />
        </div>

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
      <v-btn class="deep-orange darken-3 w-100 rounded-pill py-5 my-2 mb-3 text-white" @click="loginWithGoogle">
        Sign in with Google
      </v-btn>

      <div class="my-2 text-center">
        Don't have any account? <v-btn class="grey lighten-5" @click="showRegister">
          Create an account
        </v-btn>
      </div>
    </div>

    <div v-if="displayRegister" class="w-100 max-w-500" transition="slide-x-transition">
      <register @click="hideRegister()" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Register from '~/components/Register.vue'
import firebase from '~/plugins/firebase'
import 'firebase/auth'
import ResetPassword from '~/components/ResetPassword.vue'

export default {
  components: { Register, ResetPassword },
  data () {
    return {
      inputedUser: {
        email: '',
        password: ''
      },
      err: '',
      displayRegister: false,
      displayLogin: true,
      resendNotification: ''
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
        this.$router.push({ name: 'user-user', params: { user: this.user[0].id } })
      }
    }
  },
  methods: {
    login () {
      if (this.inputedUser.email.trim() && this.inputedUser.password.trim()) {
        firebase.auth().signInWithEmailAndPassword(this.inputedUser.email, this.inputedUser.password)
          .then((userCredential) => {
            console.log(userCredential.user)
            this.$router.push({ name: 'user-user', params: { user: userCredential.user.uid } })
          })
          .catch((error) => {
            this.err = error.message
          })
      }
    },
    showRegister () {
      this.displayRegister = true
      this.displayLogin = false
    },
    hideRegister () {
      this.displayRegister = false
      this.displayLogin = true
    },
    resendEmailVerification () {
      firebase.auth().sendEmailVerification().then(() => {
        this.resendNotification = 'Verification email was sent'
      })
    },
    async loginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
      localStorage.setItem('isLoggedIn', true)
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

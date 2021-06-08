<template>
  <div>
    <div :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      <p v-if="user[0].name" class="title">
        Welcome {{ user[0].name }}
      </p>
      {{ $route.params.user }}
      <div v-if="user[0] && !user[0].emailVerified" class="my-3 mx-2 pa-2 text-center title">
        You have not verified your email. Please check your email [{{ user[0].email }}] to verify your account and start shopping.
        <br> If you have not receive any verification email from us: <v-btn class="red text-white">
          Resend Verification Email
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
import 'firebase/auth'

export default {
  data () {
    return {
      resendNotification: ''
    }
  },
  computed: {
    ...mapState(['user', 'isLoggedIn']),
    ...mapState('darkmode', ['mode'])
  },
  watch: {
    user () {
      if (!this.user[0]) {
        this.$router.push('/login')
      } else if (this.user[0].id !== this.$route.params.user) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    if (!this.user[0]) {
      this.$router.push('/login')
    } else if (this.user[0].id !== this.$route.params.user) {
      this.$router.push('/')
    }
  },
  methods: {
    resendEmailVerification () {
      firebase.auth().sendEmailVerification().then(() => {
        this.resendNotification = 'Verification email was sent'
      })
    }
  }
}
</script>

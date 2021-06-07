<template>
  <div class="d-flex justify-center align-center h-80 flex-column">
    <div
      v-if="notification[0]"
      class="pa-3 title text-center"
      :class="{'dark-morph' : mode, 'glass-morph' : !mode}"
    >
      {{ notification[0] }} <br>
      Didn't  receive an email?
      <v-btn @click="resendEmailVerification">
        Resend verification code
      </v-btn><br>
      <div v-if="notification[1]">
        {{ notification[1] }}
      </div>
    </div>
    <v-form
      v-if="!submitted"
      ref="form"
      v-model="valid"
      class="pa-2 w-100"
      :class="{'dark-morph' : mode, 'glass-morph' : !mode}"
      lazy-validation
    >
      <h1>SIGN UP/REGISTER</h1>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Full name"
        required
      />

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />

      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="showPassword = !showPassword"
      />

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree to our Terms and Conditions?"
        required
      />
      <p>
        <nuxt-link to="Terms-and-conditions">
          <b>Terms and conditions</b>
        </nuxt-link>
      </p>

      <v-btn
        id="Submit"
        :disabled="!valid"
        color="dark"
        class="mr-4"
        @click="validate"
      >
        Submit
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Clear
      </v-btn>
    </v-form>
    <v-chip
      v-if="err"
      class="ma-2 text-center"
      close
      color="red"
      text-color="white"
      label
      @click:close="err = ''"
    >
      {{ err }}
    </v-chip>
    <pre>{{ user[0] }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      submitted: false,
      notification: [],
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      showPassword: false,
      passwordRules: [
        v => !!v.trim() || 'Password is required',
        v => (v && v.length >= 8) || 'Weak password'
      ],
      checkbox: false,
      err: ''
    }
  },
  computed: {
    ...mapState('darkmode', ['mode']),
    ...mapState(['user'])
  },
  mounted () {
  },
  methods: {
    async register () {
      const userCreds = await firebase.auth().createUserWithEmailAndPassword(this.email.trim(), this.password.trim())
      if (!userCreds.user.emailVerified) {
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            this.notification.push('An email with a verification link was sent. To verify, click the link sent to your email.')
            this.submitted = true
          })
          .catch((error) => {
            this.err = error
            console.log(error)
            userCreds.user.delete()
          })
      }
    },
    resendEmailVerification () {
      firebase.auth().currentUser.sendEmailVerification().then(() => {
        this.notification[1] = 'Verification email was resent'
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.register()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

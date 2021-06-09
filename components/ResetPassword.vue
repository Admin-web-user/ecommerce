<template>
  <v-row justify="start">
    <v-dialog
      v-model="dialog"
      class="pa-1"
      light
      persistent
      max-width="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          class="transparent-bg"
          v-bind="attrs"
          v-on="on"
        >
          Forgot password?
        </v-btn>
        <div
          v-show="notification && chip"
          class="ma-2 red accent-1 rounded-pill pa-1"
          close
        >
          {{ notification }}
          <span class="red accent-1 pa-0" style="cursor:pointer" @submit.prevent @click="chip = false">
            <v-icon>mdi-close-circle</v-icon>
          </span>
        </div>
      </template>
      <v-card class="pa-3">
        <p class="title">
          Fill out your email address. We will send you an email with a password reset link.
        </p>
        <div>
          <v-text-field
            v-model="emailResetPass"
            placeholder="Enter your email"
            type="email"
            hide-details="auto"
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red"
            text
            @click="resetPassword"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from '~/plugins/firebase'
import 'firebase/auth'

export default {
  data () {
    return {
      emailResetPass: '',
      dialog: false,
      notification: '',
      chip: true
    }
  },
  methods: {
    resetPassword () {
      if (this.emailResetPass) {
        firebase.auth().sendPasswordResetEmail(this.emailResetPass.trim()).then(() => {
          this.notification = `Password reset email to ${this.emailResetPass.trim()}. Please check your email`
        }).catch((error) => {
          this.notification = error
        }).finally(() => {
          this.dialog = false
          this.emailResetPass = ''
        })
      }
    }
  }
}
</script>

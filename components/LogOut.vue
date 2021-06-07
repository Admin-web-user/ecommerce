<template>
  <div>
    <button class="v-btn w-100 my-2 py-3 bg-firebrick" @click="dialog = !dialog">
      Log out
    </button>
    <div v-if="dialog" class="fixed glass-morph py-5 font-weight-bold">
      <div>
        Are you sure you want to log out?
        <br>
        <v-btn class="red mt-3 text-white" @click="dialog = false">
          NO
        </v-btn>
        <v-btn class="red mt-3 text-white" @click="logout">
          Yes
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import 'firebase/auth'

export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async logout () {
      await firebase.auth().signOut()
      this.dialog = false
      localStorage.setItem('isLoggedIn', false)
      window.location.reload()
    }
  }
}
</script>

<style>
    .fixed {
    position: fixed;
    top: 40%;
    left: 0px;
    right: 0px;
    text-align: center;
}
</style>

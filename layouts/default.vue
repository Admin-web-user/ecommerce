<template>
  <section class="v-application v-application--is-ltr">
    <v-navigation-drawer
      v-model="drawer"
      :style="{background: mode?bgColor:''}"
      :class="{'dark-morph' : mode, 'glass-morph' : !mode}"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <div class="pt-2 white d-grid searchbar-grid grid-md w-100" style="box-shadow: 0px 0px 11px -3px blueviolet">
          <v-text-field
            class="ma-0 py-2"
            label="Search for products"
            hide-details="auto"
          />
          <button class="mx-2 v-btn--icon" small>
            <v-icon>mdi-magnify</v-icon>
          </button>
        </div>
        <h2 class="text-center mt-2">
          <b><v-icon>mdi-format-list-bulleted</v-icon> Categories</b>
        </h2><hr>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          class="border-bottom"
          style="cursor: pointer"
        >
          <v-expansion-panels>
            <v-expansion-panel class=" transparent">
              <v-expansion-panel-header>
                <button class="v-btn">
                  <strong>{{ item.title }}</strong>
                </button>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="item.items">
                  <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.tag"
                  >
                    <v-expansion-panels class="pa-0">
                      <v-expansion-panel class="pa-0 transparent">
                        <v-expansion-panel-header class="pa-0">
                          <button class="v-btn w-100">
                            <strong>{{ subItem.tag }}</strong>
                          </button>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <div v-if="item.items">
                            <v-list-item
                              v-for="(sub_item, i) in subItem.subItems"
                              :key="i"
                            >
                              <nuxt-link
                                class="text-decoration-none"
                                :to="{name: 'category-subcategory', params: {
                                  category:item.title, subcategory: `${subItem.tag}/${sub_item}`
                                }}"
                              >
                                <button class="v-btn w-100">
                                  {{ sub_item }}
                                </button>
                              </nuxt-link>
                            </v-list-item>
                          </div>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-list-item>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>

        <button class="my-2 bg-skyBlue v-btn rounded-pill justify-center w-100">
          <v-list-item
            v-if="!user[0] && !isLoggedIn"
            style="cursor: pointer"
            to="/login"
            router
            exact
          >
            <strong class="flex-auto">Login/Register</strong>
          </v-list-item>
        </button>

        <log-out v-if="user[0]" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="flex-auto theme--dark" :clipped-left="clipped" fixed app>
      <h1 class=" ma-0 flex-auto w-100">
        <nuxt-link to="/" class="_title text-decoration-none text-white">
          <img id="logo" src="@/static/esmary.png" alt="esmary logo">
        </nuxt-link>
      </h1>

      <div class="pa-1 mx-2 d-grid searchbar-grid grid-sm">
        <input
          class="ma-0 white pa-2 rounded-pill"
          style="outline: transparent"
          placeholder="Search for products"
        >
        <button class="mx-2 v-btn--icon" small>
          <v-icon>mdi-magnify</v-icon>
        </button>
      </div>

      <button class="v-btn mx-2" @click="toggleMode">
        <v-icon class="theme--dark">
          mdi-moon-waning-crescent
        </v-icon>
        <v-icon class=" theme--dark" style="font-size: 2.8rem;" v-text="`mdi-toggle-switch${ mode ? '-off' : '' }`" />
        <v-icon class="theme--dark">
          mdi-white-balance-sunny
        </v-icon>
      </button>
      <v-app-bar-nav-icon class="text-white mx-1" @click.stop="drawer = !drawer" />
      <v-badge
        class="mr-1"
        :content="1"
        :value="1"
        color="red"
      >
        <button class="v-btn" @click="goToProfile">
          <v-icon class=" theme--dark">
            mdi-cart
          </v-icon>
        </button>
      </v-badge>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <div class="h-100">
        <v-progress-circular
          v-if="!loaded"
          :size="70"
          :width="8"
          class="text-center justify-center"
          color="red"
          indeterminate
        />
        <nuxt v-if="loaded" />
      </div>
    </v-main>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import LogOut from '~/components/LogOut.vue'
import firebase from '~/plugins/firebase'
import 'firebase/auth'

export default {
  components: { LogOut },
  data () {
    return {
      bgColor: 'rgba(255,255,255,0.7)',
      loaded: false,
      dialog: false,
      clipped: false,
      drawer: window.innerWidth >= 1264,
      fixed: false,
      items: [
        {
          icon: 'mdi-face-woman',
          title: 'Women',
          items: [{ tag: 'Upper wear', subItems: ['T-shirts', 'Shirts', 'Ethnic Wear', 'Caps & Hats'] },
            { tag: 'Bottom wear', subItems: [{ Jeans: ['Regular', 'Distorted'] }, 'Chinos', 'Gabadine', 'Cotton Trousers', 'Shorts'] },
            { tag: 'Inner wear', subItems: ['Trunks', 'Boxers', 'Briefs'] },
            { tag: 'Sports wear', subItems: ['Jerseys', 'Trousers', 'Shorts'] }],
          listIcon: 'mdi-chevron-right'
        },
        {
          icon: 'mdi-face',
          title: 'Men',
          items: [{ tag: 'Upper wear', subItems: ['T-shirts', 'Shirts', 'Ethnic Wear', 'Caps & Hats'] },
            { tag: 'Bottom wear', subItems: ['Jeans', 'Chinos', 'Gabadine', 'Cotton Trousers', 'Shorts'] },
            { tag: 'Inner wear', subItems: ['Trunks', 'Boxers', 'Briefs'] },
            { tag: 'Sports wear', subItems: ['Jerseys', 'Trousers', 'Shorts'] }],
          listIcon: 'mdi-chevron-right'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'IcaRus'
    }
  },
  computed: {
    ...mapState('darkmode', ['mode']),
    ...mapState(['user', 'isLoggedIn'])
  },
  mounted () {
    this.loaded = false
    firebase.auth().onAuthStateChanged(() => {
      this.loaded = true
    })
    if (this.mode) {
      document.body.style.background = '#272727'
    } else {
      document.body.style.background = 'white'
    }
  },
  methods: {
    ...mapMutations('darkmode', ['toggleMode']),
    goToProfile () {
      if (this.user[0]) {
        this.$router.push({ name: 'user-user', params: { user: this.user[0].id } })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
.v-list-item {
    padding: 0 5px;
}
.v-expansion-panel-content__wrap {
  padding: 0 0 0 0;
}
.v-toolbar .v-toolbar__content {gap:1vw;}
</style>

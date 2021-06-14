<template>
  <div class="container">
    <pre v-if="err" class="error text-white pa-2" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      {{ err }}
    </pre>
    <div v-if="product[0]">
      <div>
        <div id="for-pc-view" class="d-grid">
          <div :class="{'dark-morph' : mode, 'glass-morph' : !mode}" class="text-center mt-1">
            <img :src="product[0].imgURL" :alt="product[0].name" :class="{'dark-morph' : mode, 'glass-morph' : !mode}" class="product-img pa-2">
          </div>
          <div :class="{'dark-morph' : mode, 'glass-morph' : !mode}" class="pa-2 mt-1">
            <h1 class="title pa-2">
              {{ product[0].name }} <br>
              <small>Brand: <b>{{ product[0].manufacturer }}</b></small>
            </h1>
            <h2 class="pa-1 my-1">
              <strong>{{ `${product[0].price.currency}. ${product[0].price.number}` }}</strong>
            </h2>
            <p class="pa-1 my-1">
              color: <b>{{ `${product[0].color}` }}</b>
            </p>
            <div class="pa-1 my-1 text-capitalize">
              Categories: <span v-for="category in product[0].category" :key="category">
                {{ category }}
              </span>
            </div>
            <div>
              <div v-if="product[0].quantity === 0" class="no-stock">
                Out of stock
              </div>
              <div v-else class="cont">
                <div class="crtdiv">
                  <span class="qty">
                    <span class="dec" @click="decreaseQuantity">
                      <v-icon>mdi-minus</v-icon>
                    </span>
                    <input v-model="quantity_selected" type="number" class="num">
                    <span class="inc" @click="increaseQuantity">
                      <v-icon>mdi-plus</v-icon>
                    </span>
                  </span>
                  <button id="btn" type="button" class="cart">
                    <i class="fa fa-shopping-cart" aria-hidden="true" /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pa-2 my-1" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
          <h2 class="pa-2">
            Product details of {{ product[0].name }}
          </h2>
          <div class="text-justify ">
            {{ product[0].description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import firebase from '~/plugins/firebase'
import db from '~/plugins/db'

export default {
  data () {
    return {
      err: '',
      product: [],
      quantity_selected: 1
    }
  },
  computed: {
    ...mapState('darkmode', ['mode'])
  },
  mounted () {
    this.initProduct(this.$route.params.product)
  },
  methods: {
    async initProduct (id) {
      await db.collection('products').doc(id).get()
        .then((product) => {
          const data = product.data()
          if (!data) {
            this.err = `404\n
That's a shame. No product found.
It might be a server side issue but make sure you've entered the correct url`
          }
          this.product.push(data)
          console.log(this.product)
        }).catch((err) => { this.err = err })
    },
    decreaseQuantity () {
      if (this.quantity_selected !== 1) {
        this.quantity_selected--
      }
    },
    increaseQuantity () {
      if (this.quantity_selected !== this.product[0].quantity) {
        this.quantity_selected++
      }
    }
  }
}
</script>

<style>
.error {
    font-size: 2rem;
    text-align: center;
    white-space: break-spaces;
}
.product-img {
  max-width: 350px;
}
.quantity {
    width: 50px;
    height: 40px;
    background: white;
    padding: 0 5px;
    font-size: 16px;
}
.cont {
      position: relative;
      display: inline-block;
  }
  .cart {
      outline: none;
      border-radius: 5px;
      background: #a83939;
      padding: 5px 10px;
      color: #fff;
      width: 100%;
      position: relative;
      z-index: 2;
      cursor: pointer;
      transition: 0.5s width;
  }
  .cart_clk {
      width: calc(100% - 75px);
  }
  .crtdiv {
      border: 1px solid white;
      width: 200px;
      border-radius: 5px;
      position: relative;
      display: grid;
      background: #eee;
      grid-template-columns: auto auto;
      align-items: center;
  }
  .fa {
      font-size: 16px;
  }
  .cart .fa {
      font-size: 26px;
      position: relative;
      padding: 0 5px 0 0;
  }
  .cart .fa:after {
      position: absolute;
      content: attr(data-before);
      color: #000;
      font-family: 'Lato', sans-serif;
      left: 11px;
      font-weight: bold;
      top: 5px;
      font-size: 12px;
  }
  .dec,
  .inc {
    cursor: pointer;
    padding: 10px 0px;
    background: gainsboro;
    border-radius: 5px;
  }
  .num {
      width: 22px;
      display: inline-block;
      text-align: center; outline: none;
  }
  input[type=number] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-stock {
  background: #a83939;
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-weight: bolder;
  border: 1px solid white;
}
@media (min-width:768px) {
#for-pc-view {
  grid-template-columns: auto auto;
  gap: 5px;
}
}
</style>

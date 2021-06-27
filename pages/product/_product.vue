<template>
  <div class="container">
    <pre v-if="err" class="error text-white pa-2" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
      {{ err }}
    </pre>
    <div v-if="product[0]" class="pb-2">
      <div>
        <div class="d-grid for-pc-view">
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

        <div class="pa-2 my-1" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
          <h2>Ratings / Reviews</h2><hr>
          <div class="d-grid for-pc-review ma-1">
            <div>
              <form class="my-1" @submit.prevent>
                <v-rating
                  hover
                  background-color="orange darken-4"
                  color="orange"
                  length="5"
                  size="50"
                  :value="rating_given"
                />
                <textarea class="reviews" :class="{'text-white' : mode}" />
                <v-btn class="text-white red darken-4">
                  Submit
                </v-btn>
              </form>
            </div>
            <div style="align-items: center;display: grid;">
              <h2 class="text-center average-rating">{{ AverageRating }}/5</h2>
              <h3>{{ totalStar }} Ratings/ 1 Reviews</h3>
              <div v-for="rating in ratings" :key="rating.star" class="d-flex rating-bar my-1">
                <strong>{{ rating.star }}</strong><v-progress-linear
                  v-model="rating.rated_by"
                  color="red"
                  class=" rounded-pill"
                  height="15"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="d-grid given-reviews my-1" :class="{'dark-morph' : mode, 'glass-morph' : !mode}">
          <h2 class="text-center pa-1">
            No reviews
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
import { mapState } from 'vuex'
import db from '~/plugins/db'

export default {
  data () {
    return {
      err: '',
      product: [],
      quantity_selected: 1,
      rating_given: 0,
      ratings: [{ star: 5, rated_by: 0 }, { star: 4, rated_by: 0 }, { star: 3, rated_by: 0 }, { star: 2, rated_by: 0 },
        { star: 1, rated_by: 0 }],
      totalStar: 0
    }
  },
  computed: {
    ...mapState('darkmode', ['mode']),
    AverageRating () {
      let totalRating = 0
      for (let i = 0; i < this.ratings.length; i++) {
        totalRating += this.ratings[i].star * (this.ratings[i].rated_by / 100)
      }
      const AverageRating = this.totalStar !== 0 ? totalRating : 0
      return AverageRating
    }
  },
  mounted () {
    this.initReviews('products_reviews', this.$route.params.product)
    this.initProduct('products', this.$route.params.product)
  },
  methods: {
    async initProduct (collection, id) {
      await db.collection(collection).doc(id).get()
        .then((product) => {
          const data = product.data()
          if (!data) {
            this.err = `404\n
That's a shame. No product found.
It might be a server side issue but make sure you've entered the correct url`
          }
          this.product.push(data)
          console.log(this.product)
        }).catch((err) => { this.err = err.message })
    },
    async initReviews (collection, id) {
      await db.collection(collection).doc(id).get()
        .then((reviews) => {
          const data = reviews.data()
          if (!data) {
            this.err = 'There was an error'
          }
          console.log(data)
          let star5 = 0
          let star4 = 0
          let star3 = 0
          let star2 = 0
          let star1 = 0
          let totalstar = 0
          for (let i = 0; i < data.reviews.length; i++) {
            totalstar += data.reviews[i].star > 0 ? 1 : 0
          }
          for (let i = 0; i < data.reviews.length; i++) {
            console.log(`total_star = ${totalstar}`)
            if (data.reviews[i].star > 4) {
              star5 += ((star5 + 1) / totalstar) * 100
            } else if (data.reviews[i].star > 3) {
              star4 += ((star4 + 1) / totalstar) * 100
            } else if (data.reviews[i].star > 2) {
              star3 += ((star3 + 1) / totalstar) * 100
            } else if (data.reviews[i].star > 1) {
              star2 += ((star2 + 1) / totalstar) * 100
            } else if (data.reviews[i].star > 0) {
              star1 += ((star1 + 1) / totalstar) * 100
            }
          }
          this.totalStar = totalstar
          this.ratings[0].rated_by = star5
          this.ratings[1].rated_by = star4
          this.ratings[2].rated_by = star3
          this.ratings[3].rated_by = star2
          this.ratings[4].rated_by = star1
        }).catch((err) => { this.err = err.message })
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
.reviews {
    resize: none;
    width: 100%;
    outline: none;
    min-height: 150px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ghostwhite;
    background: rgba(114, 121, 116, 0.3);
}
.rating-bar {
    gap: 8px;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    max-width: 400px;
}
.error {
    font-size: 1.2rem;
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
.average-rating {
  font-size: 2rem;
}
@media (min-width:768px) {
.for-pc-view {
  grid-template-columns: auto auto;
  gap: 5px;
}
.for-pc-review {
  grid-template-columns: 50% 50%;
  gap: 10px;
}
}
</style>

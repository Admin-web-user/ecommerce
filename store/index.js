export const state = () => ({
  user: [],
  products: [],
  isLoggedIn: (localStorage.getItem('isLoggedIn') === 'true') || false
})

export const mutations = {
  setUser (state, user) {
    if (user) {
      state.user.push({ ...user })
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', true)
    } else {
      state.user = []
      state.isLoggedIn = false
      localStorage.setItem('isLoggedIn', false)
    }
  },
  setProducts (state, data) {
    if (data) {
      state.products = data
    } else {
      state.products = []
    }
  }
}

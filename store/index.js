export const state = () => ({
  user: [],
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
  }
}

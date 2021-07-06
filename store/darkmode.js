export const state = () => ({
  mode: (localStorage.getItem('darkMode') === 'true') || false
})

export const mutations = {
  toggleMode (state, _) {
    state.mode = !state.mode
    localStorage.setItem('darkMode', state.mode)
    if (state.mode) {
      document.body.style.background = '#272727'
    } else {
      document.body.style.background = 'white'
    }
  }
}

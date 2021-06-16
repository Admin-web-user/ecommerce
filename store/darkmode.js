export const state = () => ({
  mode: (localStorage.getItem('darkMode') === 'true') || false
})

export const mutations = {
  toggleMode (state, _) {
    state.mode = !state.mode
    localStorage.setItem('darkMode', state.mode)
    if (state.mode) {
      document.body.style.background = 'repeating-linear-gradient(rgb(25 31 1), rgb(28 46 24), rgb(63 93 45)) fixed rgb(6 31 1)'
      document.body.style.backgroundColor = '#12011f'
    } else {
      document.body.style.backgroundColor = 'rgb(59 166 79)'
      document.body.style.background = 'repeating-linear-gradient(0deg, rgb(59 166 79), transparent) fixed'
    }
  }
}

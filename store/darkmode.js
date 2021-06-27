export const state = () => ({
  mode: (localStorage.getItem('darkMode') === 'true') || false
})

export const mutations = {
  toggleMode (state, _) {
    state.mode = !state.mode
    localStorage.setItem('darkMode', state.mode)
    if (state.mode) {
      document.body.style.background = 'repeating-linear-gradient(rgb(25, 31, 1), rgb(82 60 0), #946f00) fixed rgb(18, 1, 31)'
      document.body.style.backgroundColor = '#12011f'
    } else {
      document.body.style.backgroundColor = 'rgb(59 166 79)'
      document.body.style.background = 'repeating-linear-gradient(0deg, rgb(175 144 21), transparent) fixed'
    }
  }
}

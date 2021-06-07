export const state = () => ({
  mode: (localStorage.getItem('darkMode') === 'true') || false
})

export const mutations = {
  toggleMode (state, _) {
    state.mode = !state.mode
    localStorage.setItem('darkMode', state.mode)
    if (state.mode) {
      document.body.style.background = 'repeating-linear-gradient(#12011f, rgb(36, 24, 46), rgb(80, 45, 93))'
      document.body.style.backgroundColor = '#12011f'
    } else {
      document.body.style.backgroundColor = '#a63b7e'
      document.body.style.background = 'repeating-linear-gradient(0deg, #a63b7e, transparent )'
    }
    document.body.style.backgroundAttachment = 'fixed'
  }
}

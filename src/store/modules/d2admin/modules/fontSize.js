
export default {
  namespaced: true,
  state: {
    // 字体大小
    fontSize: 'small'
  },
  mutations: {
    changeSize (state, fontSize) {
      state.fontSize = fontSize
      // if (state.fontSize === 'big') {
      //   var big = document.querySelectorAll('div')
      //   for (let i = 0; i < big.length; i++) {
      //     big[i].style.fontSize = '18px'
      //   }
      // }
      // if (state.fontSize === 'small') {
      //   var small = document.querySelectorAll('div')
      //   for (let i = 0; i < small.length; i++) {
      //     small[i].style.fontSize = ''
      //   }
      // }
    }
  }
}

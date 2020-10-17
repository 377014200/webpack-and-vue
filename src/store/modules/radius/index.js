export default {
  state: {
    count: 0,
  },
  getter: {

  },
  mutations: {
    increment ( state ) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++;
    }
  },
  actions: {
    doubleCount ( state ) {
      return state.count * 2;
    }
  },

};
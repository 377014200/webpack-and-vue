export default {
    namespaced: true,
    state: {
        count: 0,
    },
    getter: {

    },
    mutations: {
        increment ( state ) {
            console.log( 'in home ' );
            // 这里的 `state` 对象是模块的局部状态
            state.count++;
        }
    },
    actions: {
        doubleCount ( state ) {
            return state.count * 2;
        }
    }
};
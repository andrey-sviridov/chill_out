import { createStore } from 'vuex';

// Определите состояние, мутации, действия и геттеры вашего хранилища Vuex
const store = createStore({
    state: {
        userData:{

        }
    },
    mutations: {
        setUserData (state, data) {
            state.userData = data
        },
        clearUserData (state) {
            state.userData = {}
        }
    },
    actions: {
        // ваши действия
    },
    getters: {
        // ваши геттеры
    }
});

export default store;

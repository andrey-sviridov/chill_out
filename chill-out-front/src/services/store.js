import { createStore } from 'vuex';

// Определите состояние, мутации, действия и геттеры вашего хранилища Vuex
const store = createStore({
    state: {
        userData: null
    },
    mutations: {
        setUserData (data) {
            this.state.userData = data
        },
        clearUserData (store) {
            store.userData = null
        }
    },
    actions: {
        // ваши действия
    },
    getters: {
        getUserData(state){
            return state.userData
        }
    }
});

export default store;

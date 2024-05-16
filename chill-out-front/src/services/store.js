import { createStore } from 'vuex';
import axios from "axios";
import keys from "../../keys";

// Определите состояние, мутации, действия и геттеры вашего хранилища Vuex
const store = createStore({
    state: {
        userData: null,
        userDataLoaded: false
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        },
        setUserDataLoaded(state, loaded) {
            state.userDataLoaded = loaded;
        },
        clearData(state) {
            state.userData = null;
        }
    },
    actions: {
        async fetchUserData({ commit }) {
            try {
                const config = {
                    headers: {'Authorization': 'Bearer ' + keys.access_token}
                };
                const response = await axios.get('https://discord.com/api/users/@me', config);

                // Обновляем данные в хранилище Vuex
                commit('setUserData', response.data);
                // Сохраняем данные в localStorage
                localStorage.setItem('chillout-discord-info', JSON.stringify(response.data))

                // Устанавливаем флаг, что данные пользователя загружены
                commit('setUserDataLoaded', true);
                return response;
            } catch (error) {
                throw new Error('Ошибка при получении данных пользователя: ' + error.message);
            }
        },
        initializeUserData({ commit }) {
            const userData = JSON.parse(localStorage.getItem('chillout-discord-info'));
            if (userData) {
                commit('setUserData', userData);
            }
        }
    },
    getters: {
        getUserData(state){
            return state.userData
        }
    }
});

export default store;

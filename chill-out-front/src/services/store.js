import { createStore } from 'vuex';
import axios from "axios";
import keys from "../../keys";

// Определите состояние, мутации, действия и геттеры вашего хранилища Vuex
const store = createStore({
    state: {
        userData: null,
        guildData: null,
        userDataLoaded: false,
        guildDataLoaded: false
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
        },
        setGuildData(state, userData) {
            state.guildData = userData;
        },
        setGuildDataLoaded(state, loaded) {
            state.guildDataLoaded = loaded;
        },
        clearGuildData(state) {
            state.guildData = null;
        }
    },
    actions: {
        async fetchUserData({ commit }) {
            try {
                const config = {
                    headers: {
                        'Authorization': keys.access_token
                    }
                };

                const response = await axios.get('https://discord.com/api/users/@me', config);
                const guildResponse = await axios.get(`https://discord.com/api/users/@me/guilds/${response.data.id}/member`)

                localStorage.setItem('chillout-discord-info', JSON.stringify(response.data))
                commit('setUserData', response.data);
                commit('setGuildData', guildResponse.data);
                commit('setUserDataLoaded', true);
                commit('setGuildDataLoaded', true);

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
        },
        getGuildData(state){
            return state.guildData
        }
    }
});

export default store;

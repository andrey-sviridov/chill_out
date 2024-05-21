import { createStore } from 'vuex';
import axios from "axios";
import keys from "../../keys";

// Определите состояние, мутации, действия и геттеры вашего хранилища Vuex
const store = createStore({
    state: {
        guildData: null,
        guildDataLoaded: false,
        isFetchingGuildData: false
    },
    mutations: {
        setFetchingGuildData(state, loaded) {
            state.isFetchingGuildData = loaded;
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
                //const response = await axios.get('https://discord.com/api/users/@me', config);
                commit('setFetchingGuildData', true)
                const guildResponse = await axios.get(`https://discord.com/api/users/@me/guilds/466655473635164167/member`, config)
                localStorage.setItem('chillout-discord-info', JSON.stringify(guildResponse.data.user))
                commit('setGuildData', guildResponse.data);
                commit('setUserDataLoaded', true);
                commit('setGuildDataLoaded', true);

                return guildResponse;
            } catch (error) {
                throw new Error('Ошибка при получении данных пользователя: ' + error.message);
            }
        }
    },
    getters: {
        getIsLoadingGuild(state){
            return state.guildDataLoaded
        },
        getGuildData(state){
            return state.guildData
        },
        getFetchingGuildData(state){
            return state.isFetchingGuildData
        }
    }
});

export default store;

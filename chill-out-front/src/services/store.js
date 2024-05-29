import { createStore } from 'vuex';
import axios from "axios";

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
            let returnData = {}
            commit('setFetchingGuildData', true)

                //Получение Bearer-токена
                await axios.post('https://discord.com/api/oauth2/token',
                    new URLSearchParams({
                        'client_id': process.env.VUE_APP_CLIENT_ID,
                        'client_secret': process.env.VUE_APP_CLIENT_SECRET,
                        'grant_type': 'authorization_code',
                        'redirect_uri': process.env.VUE_APP_REDIRECT_URI,
                        'code': new URL(location.href).searchParams.get('code')
                    }),
                    {
                        headers:
                            {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                    }).then(async res =>{

                    //Получение информации по пользователю
                    await axios.get(`https://discord.com/api/users/@me/guilds/466655473635164167/member`, {
                        headers: {
                            'Authorization': `${res.data.token_type} ${res.data.access_token}`
                        }
                    }).then(async responseInfo => {
                        localStorage.setItem('chillout-discord-info', JSON.stringify(responseInfo.data.user));
                        commit('setGuildData', responseInfo.data);
                        commit('setGuildDataLoaded', true);

                        returnData = responseInfo.data;
                    })

                    commit('setFetchingGuildData', false)


                })
            return returnData
        },
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

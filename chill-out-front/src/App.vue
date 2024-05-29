<template>
  <login-dialog ref="loginDialog" @authorized="setAuthorizedInfo"/>
<div>
  <video id="background-video" autoplay loop muted>
    <source :src="require('@/assets/dragonflight_animation.mp4')" type="video/mp4">
    Ваш браузер не поддерживает видео.
  </video>

  <v-app>
    <v-app-bar
        id="appBar"
        app
        style="background: none;"
        class="app-bar notSticky"
        :class="[{'change-app-bar':  useWinScroll > 64}, {'sticky': useWinScroll > 64}]"
    >
      <div class="d-flex justify-center">
        <v-btn class="app-bar-buttons" variant="plain">Главная</v-btn>
        <v-btn class="app-bar-buttons" variant="plain">О гильдии</v-btn>
        <v-btn class="login app-bar-buttons" @click="openLogin" v-if="!userData && !getIsFetchingGuildDataInfo">Войти</v-btn>
        <div class="app-bar-buttons text-center align-content-center"
             v-else>

          <div class="d-flex justify-center align-center" v-if="getIsFetchingGuildDataInfo">
            <v-progress-circular indeterminate :size="35" />
          </div>
          <div class="container"
               :class="[{'container-changed':  useWinScroll > 64}]" v-else>
            <v-avatar :image="getAvatar" :size="getAvatarSize" class="avatar"
                      :class="[{'avatar-changed':  useWinScroll > 64}]" />

            <div class="content-wrapper text-white">
              {{this.userData.user.global_name}} ({{userData.nick}}) <br/>
            <v-chip v-for="role in filteredRoles"
                    :key="role.id"
                    :style="[{'background': getRoleColor(role.color)}]"
                    variant="elevated" style="font-size: 13px; height: 25px; place-content: center"
                    class="chip-role"
                    :class="[{'chip-role-changed':  useWinScroll > 64}]"
            >
              {{ role.name }}
            </v-chip>
            </div>

            <v-btn style="color: #940202" icon="mdi-logout" class="btn-logout"
                   :class="[{'btn-logout-changed':  useWinScroll > 64}]"
                   @click="logout" />
          </div>
        </div>
        <v-btn class="app-bar-buttons" variant="plain">Лента активности</v-btn>
        <v-btn class="app-bar-buttons" variant="plain">Галерея</v-btn>
      </div>
    </v-app-bar>
    <div style="margin-top: 100px; cursor: default" class="welcome-text">
      Добро пожаловать на страницу гильдии “Chill Out”!
    </div>
    <!--  Заглушка для чего-нибудь (чтобы было расстояние между заголовком и контентом  -->
    <div style="height: 250px">

    </div>
    <gallery class="pt-16" />
    <gallery class="pt-16" />
  </v-app>
</div>
</template>

<script>

import Gallery from "@/components/Gallery";
import { useWindowScroll } from "@vueuse/core"
import LoginDialog from "@/components/LoginDialog";

export default {
  name: 'App',
  components: {
    LoginDialog,
    Gallery
  },
  data(){
    return{
      y: 0,
      avatarSize: 50,
      userData: null,
      guildRoles: [
        {
          "id": "466655473635164167",
          "name": "@everyone",
          "description": null,
          "permissions": 104324673,
          "permissions_new": "1122573558996545",
          "position": 0,
          "color": 0,
          "hoist": false,
          "managed": false,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "flags": 0
        },
        {
          "id": "466704088990613504",
          "name": "GM",
          "description": null,
          "permissions": 1878523463,
          "permissions_new": "8804413996615",
          "position": 8,
          "color": 87766,
          "hoist": true,
          "managed": false,
          "mentionable": true,
          "icon": null,
          "unicode_emoji": null,
          "flags": 0
        },
        {
          "id": "466704095529402409",
          "name": "Багонайзер",
          "description": null,
          "permissions": 104324673,
          "permissions_new": "6546775617",
          "position": 6,
          "color": 7419530,
          "hoist": true,
          "managed": false,
          "mentionable": true,
          "icon": null,
          "unicode_emoji": null,
          "flags": 0
        },
        {
          "id": "470510397737271306",
          "name": "script_access_to_room",
          "description": null,
          "permissions": 104324672,
          "permissions_new": "6546775616",
          "position": 5,
          "color": 0,
          "hoist": false,
          "managed": false,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "flags": 0
        },
        {
          "id": "470614942324621312",
          "name": "Music Bot",
          "description": null,
          "permissions": 520,
          "permissions_new": "6442451464",
          "position": 4,
          "color": 16777215,
          "hoist": true,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "235088799074484224"
          },
          "flags": 0
        },
        {
          "id": "470616602329743363",
          "name": "Team",
          "description": null,
          "permissions": 104324673,
          "permissions_new": "6546775617",
          "position": 3,
          "color": 87766,
          "hoist": true,
          "managed": false,
          "mentionable": true,
          "icon": null,
          "unicode_emoji": null,
          "flags": 0
        },
        {
          "id": "470992603396177950",
          "name": "ilililililililililili",
          "description": null,
          "permissions": 104324673,
          "permissions_new": "6546775617",
          "position": 7,
          "color": 15166263,
          "hoist": true,
          "managed": false,
          "mentionable": true,
          "icon": null,
          "unicode_emoji": null,
          "flags": 0
        },
        {
          "id": "473476674122678272",
          "name": "Dyno",
          "description": null,
          "permissions": 2134208183,
          "permissions_new": "8804669681335",
          "position": 2,
          "color": 16777215,
          "hoist": false,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "155149108183695360"
          },
          "flags": 0
        },
        {
          "id": "480773840847503362",
          "name": "MEE6",
          "description": null,
          "permissions": 66584191,
          "permissions_new": "6509035135",
          "position": 1,
          "color": 0,
          "hoist": false,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "159985870458322944"
          },
          "flags": 0
        },
        {
          "id": "1043917371577991241",
          "name": "GenAi",
          "description": null,
          "permissions": 378944,
          "permissions_new": "378944",
          "position": 1,
          "color": 0,
          "hoist": false,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "974297735559806986"
          },
          "flags": 0
        },
        {
          "id": "1087233938893836360",
          "name": "Midjourney Bot",
          "description": null,
          "permissions": 117824,
          "permissions_new": "2147601472",
          "position": 1,
          "color": 0,
          "hoist": false,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "936929561302675456"
          },
          "flags": 0
        },
        {
          "id": "1174206658122088470",
          "name": "Minerea♪",
          "description": null,
          "permissions": 53865536,
          "permissions_new": "53865536",
          "position": 1,
          "color": 0,
          "hoist": false,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "365594481594204161"
          },
          "flags": 0
        },
        {
          "id": "1240637419104112723",
          "name": "chillOutTest",
          "description": null,
          "permissions": 8,
          "permissions_new": "8",
          "position": 1,
          "color": 0,
          "hoist": false,
          "managed": true,
          "mentionable": false,
          "icon": null,
          "unicode_emoji": null,
          "tags": {
            "bot_id": "1162432797579952212"
          },
          "flags": 0
        }
      ],
    }
  },
  methods:{
    setAuthorizedInfo(data){
      localStorage.setItem('chillout-discord-info', JSON.stringify(data))
      this.userData = data
    },
    openLogin(){
      this.$refs.loginDialog.showLoginDialog()
    },
    logout(){
      localStorage.removeItem('chillout-discord-info')
      this.$store.commit('clearUserData');
      location.reload();
    },
    getRoleColor(color) {
      let hexValue = color.toString(16);
      while (hexValue.length < 6) {
        hexValue = '0' + hexValue;
      }
      return '#' + hexValue;
    }
  },
  computed:{
    filteredRoles() {
      return this.guildRoles.filter(role => role.id === this.userData.roles[0])
    },
    getAvatarSize() {
      return this.useWinScroll > 64 ? 40 : 50;
    },
    getIsFetchingGuildDataInfo(){
      return this.$store.getters.getFetchingGuildData
    },
    isloadedGuildInfo(){
      return this.$store.state.getIsLoadingGuild
    },
    getAvatar(){
      if(!this.userData) return ''
      return `https://cdn.discordapp.com/avatars/${this.userData.user.id}/${this.userData.user.avatar}.png `
    },
    useWinScroll(){
      return useWindowScroll().y.value
    },
    getLocalStorage(){
      let data = localStorage.getItem('chillout-discord-info');
      if (data)
        return JSON.parse(localStorage.getItem('chillout-discord-info'))
      else
          return null;
    }

  },
  watch: {
    getLocalStorage: {
      handler(newValue) {
        if(newValue)
          this.userData = newValue;
          this.$store.commit('setGuildData', newValue)
      },
      immediate: true,
      deep: true
    }
  }

}
</script>

<style scoped>

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* центрирование по горизонтали */
  justify-content: center; /* центрирование по вертикали */
  padding: 0 20px 0 20px;
  cursor: default;
}

.container {
  transition: all .5s ease-in-out;
  display: flex; /* Включаем флексбокс */
  justify-content: space-between; /* Распределяем пространство между элементами равномерно */
}
.container-changed.container{

}

.avatar {
  transition: all .5s ease-in-out;
}
.avatar-changed.avatar{
  margin-top: 4px;
  margin-left: 10px;
}

.info {
  flex-grow: 1; /* Растягиваем блок с информацией, чтобы занимал всё доступное пространство */
}

#background-video {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}
.d-flex.justify-center {
  display: flex;
  justify-content: center;
  width: 100%;
}
.notSticky{
  z-index: 1 !important;
  position: fixed !important;
  width: 100% !important;
  justify-items: center !important;
  transition: all .5s ease;
  left: 0 !important;
  top: 0 !important;
}
.notSticky.sticky{
  width: 98% !important;
  z-index: 6 !important;
}
.app-bar{
  transition: all .5s ease;
  background-color: rgba(255, 255, 255, 0.1) !important;
  height: 65px;
}
.change-app-bar.app-bar{
  transition: all .5s ease;
  background-color: rgba(169, 156, 156, 0.4) !important;
  backdrop-filter: blur(3px) !important;
  border-radius: 0 0 10px 10px;
  height: 55px;
  margin: -8px 20px 0 20px;
}
.main{
  background: url("assets/back.png");
}
.login{
  width: 250px;
  background: rgba(217, 217, 217, 0.20);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.38);
}
.app-bar-buttons{
  height: 58px !important;
  transition: all .5s ease;
  color: white;
  margin: 10px;
  vertical-align: center !important;
}
.welcome-text{
  white-space: pre-wrap;
  color: #FFF;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 50px;
  text-align: center;
}
.chip-role{
  transition: max-height .5s ease-in-out, opacity .3s ease-in-out;
  opacity: 1;
  max-height: 100%;
}
.chip-role-changed.chip-role{
  transition: max-height .3s ease-in-out, opacity .5s ease-in-out;
  opacity: 0;
  max-height: 0;
}
.btn-logout{
  transition: all .3s ease-in-out;
}
.btn-logout-changed.btn-logout{
  transition: all .3s ease-in-out;
  padding-right: 10px;
  --v-btn-size: 14px;
}
</style>
<style>

body {
  font-family: 'Neucha', cursive;
}
::-webkit-scrollbar {
  display: none;
}
</style>

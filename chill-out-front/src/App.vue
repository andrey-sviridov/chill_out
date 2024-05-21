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
        <v-btn class="app-bar-buttons" >Главная</v-btn>
        <v-btn class="app-bar-buttons">О гильдии</v-btn>
        <v-btn class="login app-bar-buttons" @click="openLogin" v-if="!userData && !getIsFetchingGuildDataInfo">Войти</v-btn>
        <div class="logged app-bar-buttons text-center align-content-center" v-else>

          <div class="d-flex justify-center align-center" v-if="getIsFetchingGuildDataInfo">
            <v-progress-circular indeterminate :size="35" />
          </div>
          <div class="container" v-else>
            <v-avatar :image="getAvatar" :size="getAvatarSize" class="avatar" />

            <div class="info">{{this.userData.user.global_name}} ({{userData.nick}})</div>

            <v-btn icon="mdi-logout" @click="logout" />
          </div>
        </div>
        <v-btn class="app-bar-buttons" >Лента активности</v-btn>
        <v-btn class="app-bar-buttons" >Галерея</v-btn>
      </div>
    </v-app-bar>
    <div style="margin-top: 100px;" class="welcome-text">
      Добро пожаловать на страницу гильдии “Chill Out”!
    </div>
    <!--  Заглушка для чего-нибудь (чтобы было расстояние между заголовком и контентом  -->
    <div style="height: 250px">

    </div>
    <gallery class="pt-16"/>
    <gallery class="pt-16"/>
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
      userData: null
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
    }
  },
  computed:{
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
      },
      immediate: true,
      deep: true
    }
  }

}
</script>

<style scoped>
.container {
  display: flex; /* Включаем флексбокс */
  align-items: center; /* Выравниваем элементы по вертикали по центру */
  justify-content: space-between; /* Распределяем пространство между элементами равномерно */
}

.avatar {
  margin-left: 5px;
  transition: all .5s ease;

}
.avatar.avatar-changed{
  margin-left: 5px;
  height: 40px !important;
  width: 40px !important;
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
  left: 1.05% !important;
}
.app-bar{
  transition: all .5s ease;
  background-color: rgba(255, 255, 255, 0.1) !important;
  height: 63px;
}
.app-bar.change-app-bar{
  transition: all .5s ease;
  background-color: rgba(169, 156, 156, 0.4) !important;
  backdrop-filter: blur(3px) !important;
  border-radius: 0 0 10px 10px;
  height: 50px;
}
.change-app-bar .app-bar-buttons{
  transition: all .5s ease;
  height: 52px !important;
  margin: -20px 5px 0;
}
.main{
  background: url("assets/back.png");
}
.login{
  width: 250px;
  background: rgba(217, 217, 217, 0.20);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.38);
}
.logged{
  width: 300px;
  background: rgba(217, 217, 217, 0.20);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.38);
}
.app-bar-buttons{
  height: 58px !important;
  transition: all .5s ease;
  color: white;
  margin: 10px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.38);
  vertical-align: center !important;
}
.welcome-text{
  white-space: pre-wrap;
  color: #FFF;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 50px;
  text-align: center;
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

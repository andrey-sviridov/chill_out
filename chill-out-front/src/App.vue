<template>
<div>
  <video id="background-video" autoplay loop muted>
    <source :src="require('@/assets/video_animation.mp4')" type="video/mp4">
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
      <div class="d-flex justify-center ">
        <v-btn class="app-bar-buttons" >Главная</v-btn>
        <v-btn class="app-bar-buttons" >О гильдии</v-btn>
        <v-btn class="login app-bar-buttons" @click="openLogin" v-if="userData.id === undefined">Войти</v-btn>
        <div class="login app-bar-buttons text-center align-content-center" v-else>
          {{userData.global_name}}<br/>
          <v-btn
              @click="logout"
          >
            Выйти
          </v-btn>
        </div>
        <v-btn class="app-bar-buttons" >Лента активности</v-btn>
        <v-btn class="app-bar-buttons" >Галерея</v-btn>
      </div>
    </v-app-bar>
    <div style="margin-top: 250px; padding-left: 200px;" class="welcome-text">
      Добро пожаловать <br/> на страницу гильдии “Chill Out”!
    </div>
    <gallery class="pt-16"/>
  </v-app>
  <login-dialog ref="loginDialog"/>
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
      userData:{
        id: ''
      }
    }
  },
  mounted() {
  },
  methods:{
    openLogin(){
      this.$refs.loginDialog.showLoginDialog()
    },
    logout(){
      this.$store.commit('clearUserData')
    }
  },
  computed:{

    useWinScroll(){
      return useWindowScroll().y.value
    },
  },
  watch: {
    '$store.state.userData': {
      handler(newValue) {
        console.log(newValue);
        this.userData = newValue;
      },
      immediate: true // Для того чтобы сработал обработчик при инициализации
    }
  }

}
</script>

<style scoped>
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
  margin-left: 3%;
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
  font-style: normal;
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

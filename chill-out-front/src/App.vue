<template>
  <v-app>
    <v-parallax :src="require('@/assets/back.png')" class="main" >
      <v-app-bar app style="background: none;">
        <div class="d-flex justify-center appbar">
          <v-btn class="app-bar-buttons" height="60" >Главная</v-btn>
          <v-btn class="app-bar-buttons" height="60" >О гильдии</v-btn>
          <v-btn class="login app-bar-buttons" height="60" width="250" >Войти</v-btn>
          <v-btn class="app-bar-buttons" height="60" >Лента активности</v-btn>
          <v-btn class="app-bar-buttons" height="60" >Галерея</v-btn>
        </div>
      </v-app-bar>
      <div style="margin-top: 250px; padding-left: 200px;" class="welcome-text">
        Добро пожаловать <br/> на страницу гильдии “Chill Out”!
      </div>
      <gallery class="pt-16"/>
    </v-parallax>
  </v-app>
</template>

<script>

import Gallery from "@/components/Gallery";
export default {
  name: 'App',
  components: {
    Gallery

  }
}
</script>

<style scoped>
.d-flex.justify-center {
  display: flex;
  justify-content: center;
  width: 100%;
}
.appbar{
  width: 1366px;
  height: 60px;
  flex-shrink: 0;
  background: rgba(217, 217, 217, 0.20);
}
.main{
  /*background: url("assets/back.png");*/
}
.login{
  background: rgba(217, 217, 217, 0.20);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.38);
}
.app-bar-buttons{
  color: white;
  margin-right: 20px;
  background: rgba(255, 255, 255, 0.05);
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
</style>

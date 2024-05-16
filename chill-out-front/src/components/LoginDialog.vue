<template>
<div>
  <v-dialog
      v-model="isShow"
      width="450px"
  >
    <v-card>
      <v-card-title class="text-center">
        Авторизация
      </v-card-title>
      <v-divider />
      <v-card-text class="text-center">
        <v-form ref="loginForm">
          <v-text-field
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
              label="Логин" />
          <v-text-field aria-required="true" variant="outlined" density="compact" label="Пароль" type="password"/>
        </v-form>

        <div class="mt-n2">
          <a class="text-blue-accent-3" style="cursor: pointer">Забыли пароль?</a>
        </div>
        <v-btn color="green" variant="outlined" class="ma-5" @click="login">
          Авторизоваться
        </v-btn>

        <v-row class="justify-center pt-3 pb-6">
          <v-divider length="150px" />
          <span style="margin-top: -13px" class="pl-2 pr-2">
          или
        </span>
          <v-divider length="150px"/>
        </v-row>
        <div>
          <button @click="loginWithDiscord">
            <img src="../assets/discord.png"  alt="icon"/>
          </button>
        </div>

        <div class="mt-6 mb-6">
          <v-row class="justify-center"> <span>Новый член гильдии?</span> <a class="ml-3 text-blue-accent-3" style="cursor: pointer" @click="openRegister">Зарегистрироваться</a></v-row>
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-center">
        <v-btn width="100%" @click="isShow = false">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <register-dialog ref="registerDialog" />
</div>
</template>

<script>
import {mdiPipeDisconnected} from '@mdi/js'
import {required} from '@/services/require'
import RegisterDialog from "@/components/RegisterDialog";
export default {
  name: "login-dialog",
  components: {RegisterDialog},
  created() {
    if (!this.$store.state.userDataLoaded) {
      this.checkAndFetchUserData();
    }
  },
  data(){
    return{
      icons: {
        mdiPipeDisconnected
      },
      rules:[
          required
      ],
      isShow: false
    }
  },
  methods:{
    async checkAndFetchUserData() {
      if (new URL(location.href).searchParams.get('code') !== null) {
        try {
          await this.$store.dispatch('fetchUserData').then(response =>{
            this.$emit('authorized', response.data)
            this.removeParam('code')
          })
        } catch (error) {
          console.error('Ошибка при вызове fetchUserData:', error);
        }
      }
    },
    removeParam(parameter) {
      console.log('removeParam is called')
        let url=document.location.href;
        let urlparts= url.split('?');

        if (urlparts.length>=2)
        {
          let urlBase=urlparts.shift();
          let queryString=urlparts.join("?");

          let prefix = encodeURIComponent(parameter)+'=';
          let pars = queryString.split(/[&;]/g);
          for (let i= pars.length; i-->0;)
            if (pars[i].lastIndexOf(prefix, 0)!==-1)
              pars.splice(i, 1);
          url = urlBase+'?'+pars.join('&');
          window.history.pushState('',document.title,url); // added this line to push the new url directly to url bar .
        }
        return url;
      },
    showLoginDialog(){
      this.isShow = true;
    },
    openRegister(){
      this.isShow = false;
      this.$refs.registerDialog.showRegisterDialog()
    },
    login(){
      if(!this.$refs.loginForm.validate()){
        alert('not validated')
      }
    },
    loginWithDiscord(){
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1162432797579952212&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=identify+connections+guilds+gdm.join+guilds.join+guilds.members.read';
    }
  },
}
</script>

<style scoped>

</style>
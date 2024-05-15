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
import axios from "axios";
export default {
  name: "login-dialog",
  components: {RegisterDialog},
  mounted() {
    if(new URL(location.href).searchParams.get('code') !== undefined){
      let config = {
        headers: {'Authorization': 'Bearer CQKG9UGNWEScJHvyrxNV1HmLSa86Gr'}
      }
      axios.get('https://discord.com/api/users/@me', config).then(response=>{
        this.$store.commit('setUserData', response.data)
      })
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
      //this.$router.go({ path: "https://discord.com/oauth2/authorize?client_id=1162432797579952212&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=identify" })
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1162432797579952212&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=identify'
    }
  }
}
</script>

<style scoped>

</style>
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
          <button>
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
    }
  }
}
</script>

<style scoped>

</style>
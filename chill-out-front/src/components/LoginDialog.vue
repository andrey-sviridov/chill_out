<template>
<v-dialog
  v-model="isShow"
  width="400px"
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
      <v-btn color="green" variant="outlined" class="ma-3" @click="login">
        Авторизоваться
      </v-btn>
    </v-card-text>
    <v-divider />
    <v-card-actions class="justify-center">
      <v-btn width="100%" @click="isShow = false">
        Закрыть
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import {mdiPipeDisconnected} from '@mdi/js'
import {required} from '@/services/require'
export default {
  name: "login-dialog",
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
    login(){
      // eslint-disable-next-line no-debugger
      debugger
      if(!this.$refs.loginForm.validate()){
        alert('not validated')
      }
    }
  }
}
</script>

<style scoped>

</style>
<template>
<v-dialog
  v-model="isShow"
  width="450px"
>
  <v-card>
    <v-card-title class="text-center">
      Регистрация
    </v-card-title>
    <v-divider />
    <v-card-text class="text-center">
      <v-form ref="registerForm">
        <v-text-field
            :rules="[rules.required]"
            variant="outlined"
            density="compact"
            label="Логин" />
        <v-text-field variant="outlined" density="compact" label="Пароль" type="password"/>
        <v-text-field variant="outlined" density="compact" label="Никнейм" type="text"/>
        <v-text-field variant="outlined" density="compact" label="Электронная почта" type="email"/>
      </v-form>

      <v-btn color="green" variant="outlined" class="ma-6 mt-n1">
        Зарегистрироваться
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
  name: "register-dialog",
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
    showRegisterDialog(){
      this.isShow = true;
    },
    register(){
      // eslint-disable-next-line no-debugger
      debugger
      if(!this.$refs.registerForm.validate()){
        alert('not validated')
      }
    }
  }
}
</script>

<style scoped>

</style>
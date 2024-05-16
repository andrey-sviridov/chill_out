import {createApp} from 'vue'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.css";
import store from './services/store'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { Plugin } from 'vue-responsive-video-background-player'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).use(Plugin).use(store).mount('#app')

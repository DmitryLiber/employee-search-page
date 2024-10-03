import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import routers from './routers'
import { Btn, Container, Loader, Typography, Field, Grid } from '@shared/ui'
import { useEmployeesStore, useNotificationsStore } from '@shared/model'

const app = createApp(App)

const store = new Vuex.Store({
  modules: {
    useEmployeesStore,
    useNotificationsStore
  }
})

app.use(store)

app.use(routers)

app.component('Btn', Btn)
app.component('Loader', Loader)
app.component('Typography', Typography)
app.component('Container', Container)
app.component('Field', Field)
app.component('Grid', Grid)

app.mount('#app')

import {createApp} from 'vue'
import '@popperjs/core'
import 'bootstrap'
import './style.css'
import './assets/app.scss'
import App from './App.vue'
import './globals'
import {router} from './routes/routes'

createApp(App)
  .use(router)
  .mount('#app')

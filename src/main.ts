import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './index.css'
const v = createApp(App)
v.use(router)
v.mount('#app')

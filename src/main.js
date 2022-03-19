import {createApp} from 'vue'
import App from './App.vue'
const apiurl = process.env.API_URL

createApp(App).use(apiurl).mount('#app')

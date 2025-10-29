import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import './styles/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.use(ToastPlugin, {
    position: 'top-right',
    duration: 4000,
    dismissible: true,
    pauseOnHover: true,
    queue: true,
})

app.mount('#app')

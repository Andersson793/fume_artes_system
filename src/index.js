import App from './app.vue'
import {router} from 'vue-router'

import { createApp } from 'vue'

const app = createApp(App)

app.use(router)

app.mount("#app")
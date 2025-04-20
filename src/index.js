import App from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createApp } from "vue";

import 'virtual:uno.css'

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

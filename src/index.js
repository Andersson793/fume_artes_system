import App from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueNumberFormat from "@coders-tm/vue-number-format";

import "virtual:uno.css";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueNumberFormat, { precision: 4 });

app.mount("#app");

import { createMemoryHistory, createRouter } from "vue-router";

import Dashboard from "./pages/dashboard.vue";
import Manager from "./pages/manager.vue";
import Tables from "./pages/tables.vue";
import Account from "./pages/account.vue";
import Home from "./pages/home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
  { path: "/manager", component: Manager },
  { path: "/tables", component: Tables },
  { path: "/account", component: Account },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;

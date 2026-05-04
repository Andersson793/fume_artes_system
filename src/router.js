import { createMemoryHistory, createRouter } from "vue-router";

import Dashboard from "@/pages/dashboard.vue";
import Manager from "@/pages/manager.vue";
import Tables from "@/pages/tables.vue";
import Account from "@/pages/account.vue";
import Home from "@/pages/home.vue";
import View from "@/pages/view.vue";
import Products from "@/pages/products.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
  { path: "/manager", component: Manager },
  { path: "/tables", component: Tables },
  { path: "/products", component: Products },
  { path: "/account", component: Account },
  { path: "/view/:id", component: View },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;

import { createMemoryHistory, createRouter } from 'vue-router';

import dashboard from '/pages/dashboard.vue'
import maneger from '/pages/dashboard.vue'
import config from '/pages/dashboard.vue'
import account from '/pages/dashboard.vue'
import home from '/pages/dashboard.vue'


const routes = [
    {path: '/', component: home},
    {path: '/dashboard', component: dashboard},
    {path: '/maneger', component: maneger},
    {path: '/config', component: config},
    {path: '/account', component: account}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
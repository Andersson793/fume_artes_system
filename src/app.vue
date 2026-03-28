<script>
import { RouterLink, RouterView, routerViewLocationKey } from "vue-router";
import MenuItem from "./components/MenuOption.vue";
import { AvatarFallback, AvatarImage, AvatarRoot } from "reka-ui";
import { useWebsiteStore } from "@stores/store.js";
import { KeepAlive } from "vue";
import Login from "@/pages/login.vue";
import View from "@/pages/view.vue";

export default {
    data() {
        return {
            store: useWebsiteStore(),
        };
    },

    methods: {
        Logout() {
            this.store.$reset();

            sessionStorage.clear();
        },
    },

    mounted() {},
    components: {
        MenuItem,
        RouterLink,
        RouterView,
        AvatarRoot,
        AvatarImage,
        AvatarFallback,
        Login,
        KeepAlive,
        View,
    },
};
</script>
<template>
    <div
        class="grid grid-cols-9 max-h-screen h-screen w-full"
        v-if="store.loged"
    >
        <!-- menu -->
        <div
            class="border-gray-2 h-full col-span-1 flex justify-center items-center"
        >
            <div class="grid grid-cols-1 gap-3 w-fit">
                <RouterLink to="/">
                    <MenuItem>
                        <template #icon>
                            <div class="i-basil:home-outline text-2xl"></div>
                        </template>
                    </MenuItem>
                </RouterLink>

                <RouterLink to="/tables">
                    <MenuItem class="text-black outline-hidden">
                        <template #icon>
                            <div class="i-basil:box-outline text-2xl"></div>
                        </template>
                    </MenuItem>
                </RouterLink>

                <RouterLink to="/manager">
                    <MenuItem class="text-black outline-hidden">
                        <template #icon>
                            <div class="i-basil:wallet-outline text-2xl"></div>
                        </template>
                        Gerenciar caixa
                    </MenuItem>
                </RouterLink>

                <RouterLink to="/dashboard">
                    <MenuItem class="text-black outline-hidden">
                        <template #icon>
                            <div
                                class="i-basil:chart-pie-alt-outline text-2xl"
                            ></div>
                        </template>
                    </MenuItem>
                </RouterLink>

                <RouterLink to="/account">
                    <MenuItem class="text-black outline-hidden">
                        <template #icon>
                            <div class="i-basil:user-outline text-2xl"></div>
                        </template>
                    </MenuItem>
                </RouterLink>

                <MenuItem class="text-black outline-hidden">
                    <template #icon>
                        <div
                            @click="Logout"
                            class="i-basil:logout-outline text-red text-2xl"
                        ></div>
                    </template>
                </MenuItem>
            </div>
        </div>

        <!-- pagers -->
        <div class="col-span-7 overflow-scroll max-h-screen">
            <header class="px-10 flex justify-between items-center">
                <h2>Fume Artes System</h2>
            </header>

            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
    </div>

    <Login v-else />
</template>

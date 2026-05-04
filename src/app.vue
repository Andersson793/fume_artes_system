<script>
import { RouterLink, RouterView } from "vue-router";
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
            selectedPage: 0,
            sidebar: [
                {
                    router: "/",
                    icon: "i-basil:home-outline",
                    class: "text-2xl",
                },

                {
                    router: "/tables",
                    icon: "i-basil:box-outline",
                    class: "text-2xl",
                },

                {
                    router: "/manager",
                    icon: "i-basil:wallet-outline",
                    class: "text-2xl",
                },

                {
                    router: "/dashboard",
                    icon: "i-basil:chart-pie-alt-outline",
                    class: "text-2xl",
                },

                {
                    router: "/products",
                    icon: "i-basil:clipboard-alt-outline",
                    class: "text-2xl",
                },

                {
                    router: "/account",
                    icon: "i-basil:user-outline",
                    class: "text-2xl",
                },
            ],
        };
    },

    methods: {
        SystemLogout() {
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
        <!-- side menu -->
        <div
            class="border-gray-2 h-full col-span-1 flex justify-center items-center"
        >
            <div class="grid grid-cols-1 gap-3 w-fit bg-blue-100 rounded-full">
                <template v-for="(item, index) in sidebar">
                    <RouterLink
                        :to="item.router"
                        class="inline-flex items-center"
                    >
                        <MenuItem @click="() => (selectedPage = index)">
                            <template #icon>
                                <div :class="[item.class, item.icon]"></div>
                                <div
                                    v-if="index == selectedPage"
                                    class="relative left-1 w-1 h-1 bg-blue-500 rounded-full"
                                ></div>
                            </template>
                        </MenuItem>
                    </RouterLink>
                </template>

                <MenuItem class="text-black outline-hidden">
                    <template #icon>
                        <div
                            @click="SystemLogout()"
                            class="i-basil:logout-outline text-red text-2xl"
                        ></div>
                    </template>
                </MenuItem>
            </div>
        </div>

        <!-- app -->
        <div class="col-span-7 overflow-scroll max-h-screen">
            <header class="px-10 flex justify-between items-center">
                <h2
                    class="after:p-1 after:bg-red-500 before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500"
                >
                    Fume Artes System
                </h2>
            </header>

            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
    </div>

    <Login v-else />
</template>

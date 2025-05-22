<script>
import { RouterLink, RouterView, routerViewLocationKey } from "vue-router";
import MenuItem from "./components/MenuOption.vue";
import { AvatarFallback, AvatarImage, AvatarRoot } from "reka-ui";
import { useWebsiteStore } from "@stores/store.js";
import { Key } from "lucide-vue-next";
import { KeepAlive } from "vue";
import Login from "@/pages/login.vue";

export default {
    data() {
        return {
            store: useWebsiteStore(),
            enabled: true,
        };
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
    },
};
</script>
<template>
    <div
        class="grid grid-cols-7 max-h-screen h-screen w-full"
        v-if="store.loged"
    >
        <div>
            <div class="border-r-solid border-gray-2 h-full">
                <div
                    class="flex flex-col items-center py-3 align-center border-b-solid border-gray-200"
                >
                    <AvatarRoot
                        class="inline-flex h-15 w-15 select-none items-center justify-center overflow-hidden rounded-full align-middle border-solid border-.5"
                    >
                        <AvatarImage
                            class="h-full w-full ronded-full object-cover"
                            src="https://avatars.githubusercontent.com/u/94249557?v=4"
                        />
                        <AvatarFallback />
                    </AvatarRoot>

                    <p>andersson793</p>

                    <input
                        type="button"
                        class="bg-white hover:bg-red-100 text-red rounded-md p-1 w-fit h-fit font-bold border-solid border-1 border-red cursor-pointer inline-flex items-center"
                        value="Logout"
                    />
                </div>

                <div class="p-6 grid grid-cols-1 gap-5">
                    <RouterLink to="/">
                        <MenuItem class="text-black outline-hidden">
                            <template #icon>
                                <div
                                    class="i-basil:home-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Home
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/manager">
                        <MenuItem class="text-black outline-hidden">
                            <template #icon>
                                <div
                                    class="i-basil:wallet-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Manager
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/dashboard">
                        <MenuItem class="text-black outline-hidden">
                            <template #icon>
                                <div
                                    class="i-basil:chart-pie-alt-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Dashboard
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/config">
                        <MenuItem class="text-black outline-hidden">
                            <template #icon>
                                <div
                                    class="i-basil:settings-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Configs
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/account">
                        <MenuItem class="text-black outline-hidden">
                            <template #icon>
                                <div
                                    class="i-basil:user-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Account
                        </MenuItem>
                    </RouterLink>
                </div>
            </div>
        </div>

        <div class="col-span-6 overflow-scroll max-h-screen">
            <header class="px-10 flex justify-between items-center">
                <h2>Fume Artes System</h2>
            </header>

            <router-view v-slot="{ Component }">
                <KeepAlive>
                    <component :is="Component" />
                </KeepAlive>
            </router-view>
        </div>
    </div>

    <Login v-else />
</template>

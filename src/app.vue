<script>
import { RouterLink, RouterView } from "vue-router";
import MenuItem from "./components/MenuItem.vue";
import { AvatarFallback, AvatarImage, AvatarRoot } from "reka-ui";
import { useWebsiteStore } from "@stores/store.js";

export default {
    data() {
        return {
            enabled: true,
            currentPage: useWebsiteStore().currentPage,
        };
    },

    mounted() {
        this.currentPage = this.$route.name;
    },
    components: {
        MenuItem,
        RouterLink,
        RouterView,
        AvatarRoot,
        AvatarImage,
        AvatarFallback,
    },
};
</script>
<template>
    <div class="grid grid-cols-7 max-h-screen h-screen w-full">
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

                    <input type="button" class="bg-red-300 py-1 px-2 rounded-md">
                        Logout
                    </input>
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

                <!--
              <div class="relative">
                <div class="i-basil:notification-outline text-3xl"></div>

                    <div class="bg-red-300 w-6 h-6 rounded-full flex justify-center items-center text-sm absolute ">
                      12
                    </div>

              </div>

            --></header>

            <RouterView />
        </div>
    </div>
</template>

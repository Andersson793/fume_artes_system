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
        
            <div class="border-gray-2 h-full col-span-1 flex justify-center items-center">

                <!--
                <div
                    class="flex flex-col items-center align-center border-b-solid border-gray-200"
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

                    <p>{{ store.name }}</p>

                    <input
                        type="button"
                        class="bg-red-400 hover:bg-red-300 text-white rounded-sm p-2 w-fit h-fit font-bold border-none cursor-pointer inline-flex items-center"
                        value="Saír da conta"
                        @click="Logout"
                    />
                
                </div>
                -->

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
                                <div
                                    class="i-basil:box-outline text-2xl"
                                ></div>
                            </template>
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/manager">
                        <MenuItem class="text-black outline-hidden">
                            <template #icon>
                                <div
                                    class="i-basil:wallet-outline text-2xl"
                                ></div>
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
                                <div
                                    class="i-basil:user-outline text-2xl"
                                ></div>
                            </template>
                        
                        </MenuItem>
                    </RouterLink>

                    <MenuItem class="text-black outline-hidden">
                        <template #icon>
                                <div @click="Logout" class='i-basil:logout-outline text-red text-2xl'>
                                    
                                </div>
                        </template>
                    </MenuItem>        
                </div>
                
            </div>
                    

        <div class="col-span-8 overflow-scroll max-h-screen">
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

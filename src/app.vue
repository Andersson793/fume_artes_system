<script >
import { RouterLink, RouterView } from 'vue-router';
import MenuItem from '/componenets/MenuItem.vue'


export default {

    data() {
        return {
            enabled: true,
            
            
        };
    },
    
    mounted() {},
    components: {
        MenuItem
    },
};
</script>
<template>
    <div class="grid grid-cols-7 max-w-full max-h-screen h-screen w-full">
        <div class="bg-blue-200">
            <div>
                <div class="bg-blue-300 h-32 flex items-center justify-center">
                    [logo]
                </div>
                <div class="">
                    <ul class="grid grid-cols-1 gap-6 p-4">
                        <RouterLink to="/">
                            <MenuItem>
                                <template #icon>
                                    <HomeIcon />
                                </template>
                                Home
                            </MenuItem>
                        </RouterLink>
                        <RouterLink to="/manager">
                            <MenuItem>
                                <template #icon>
                                    i
                                </template>
                                Manager
                            </MenuItem>
                        </RouterLink>

                        <RouterLink to="/dashboard">
                            <MenuItem>
                                <template #icon>
                                    i
                                </template>

                                Dashboard
                            </MenuItem>
                        </RouterLink>
                        <RouterLink to="/config">
                            <MenuItem>
                                <template #icon>
                                    i
                                </template>
                                Configs
                            </MenuItem>
                        </RouterLink>
                        <RouterLink to="/account">
                            <MenuItem>
                                <template #icon>
                                    i
                                </template>
                                Account
                            </MenuItem>
                        </RouterLink>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bg-red-200 col-span-6 overflow-scroll max-h-screen">
            <header
                class="bg-red-300 m-2 rounded-md py-5 grid grid-cols-2 px-5"
            >
                <span class="text-lg font-bold capitalize">{{
                    
                }}</span>
                <div class="text-right capitalize" data-allow-mismatch>
                    
                </div>
            </header>

            <RouterView/>
        </div>
    </div>
</template>

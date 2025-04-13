<script>
import { RouterLink, RouterView } from "vue-router";
import MenuItem from "./components/MenuItem.vue";
import { HomeIcon } from "lucide-vue-next";
import { AvatarFallback, AvatarImage, AvatarRoot } from "reka-ui";

export default {
    data() {
        return {
            enabled: true,
        };
    },

    mounted() {},
    components: {
        MenuItem,
        HomeIcon,
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
        <div class="bg-blue-200">
            <div>
                <div class="bg-blue-300 h-32 flex items-center justify-center">
                    [logo]
                </div>

                <div class="p-6 grid grid-cols-1 gap-5">
                    <RouterLink to="/">
                        <MenuItem>
                            <template #icon>
                                <div
                                    class="i-basil:home-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Home
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/manager">
                        <MenuItem>
                            <template #icon>
                                <div
                                    class="i-basil:wallet-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Manager
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/dashboard">
                        <MenuItem>
                            <template #icon>
                                <div
                                    class="i-basil:chart-pie-alt-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Dashboard
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/config">
                        <MenuItem>
                            <template #icon>
                                <div
                                    class="i-basil:settings-outline text-2xl pr-5"
                                ></div>
                            </template>
                            Configs
                        </MenuItem>
                    </RouterLink>

                    <RouterLink to="/account">
                        <MenuItem>
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

        <div class="bg-red-200 col-span-6 overflow-scroll max-h-screen">
            <header
                class="bg-red-300 m-2 rounded-md py-4 grid grid-cols-2 px-5 flex justify-between"
            >
                <span class="text-lg font-bold capitalize">any</span>

                <div>
                    <div
                        class="inline-flex pr-10 text-green-500 text-sm font-semibold"
                    >
                        12 minutes ago
                    </div>
                    <AvatarRoot
                        class="bg-blackA3 inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle"
                    >
                        <AvatarImage
                            class="h-full w-full ronded-full object-cover"
                            src="https://avatars.githubusercontent.com/u/94249557?v=4"
                        />
                        <AvatarFallback />
                    </AvatarRoot>
                </div>
            </header>

            <RouterView />
        </div>
    </div>
</template>

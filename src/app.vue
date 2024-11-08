<script lang="ts">
import {
    BoltIcon,
    ChartSplineIcon,
    HomeIcon,
    UserSearchIcon,
    SquareChartGantt,
} from "lucide-vue-next";

export default {
    data() {
        return {
            enabled: true,
            route: useWebsiteStore(),
            date: new Intl.DateTimeFormat("en-UE", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date()),
        };
    },
    beforeMount() {
        // Use SSR-safe IDs for Headless UI
        provideHeadlessUseId(() => useId());

        //change the font
    },
    mounted() {},
    components: {
        HomeIcon,
        ChartSplineIcon,
        BoltIcon,
        UserSearchIcon,
        SquareChartGantt,
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
                        <NuxtLink to="/">
                            <MenuItem>
                                <template #icon>
                                    <HomeIcon />
                                </template>
                                Home
                            </MenuItem>
                        </NuxtLink>
                        <NuxtLink to="/manager">
                            <MenuItem>
                                <template #icon>
                                    <SquareChartGantt />
                                </template>
                                Manager
                            </MenuItem>
                        </NuxtLink>

                        <NuxtLink to="/dashboard">
                            <MenuItem>
                                <template #icon>
                                    <ChartSplineIcon />
                                </template>

                                Dashboard
                            </MenuItem>
                        </NuxtLink>
                        <NuxtLink to="/config">
                            <MenuItem>
                                <template #icon>
                                    <BoltIcon />
                                </template>
                                Configs
                            </MenuItem>
                        </NuxtLink>
                        <NuxtLink to="/account">
                            <MenuItem>
                                <template #icon>
                                    <UserSearchIcon />
                                </template>
                                Account
                            </MenuItem>
                        </NuxtLink>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bg-red-200 col-span-6 overflow-scroll max-h-screen">
            <header
                class="bg-red-300 m-2 rounded-md py-5 grid grid-cols-2 px-5"
            >
                <span class="text-lg font-bold capitalize">{{
                    route.currentPage
                }}</span>
                <div class="text-right capitalize" data-allow-mismatch>
                    {{ date }}
                </div>
            </header>

            <NuxtPage />
        </div>
    </div>
</template>

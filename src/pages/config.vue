<script>
import AppPanel from "@/components/AppPanel.vue";
import AppMain from "@/components/app/AppMain.vue";

import { useWebsiteStore } from "@/stores/store";

export default {
    mounted() {
        useWebsiteStore().currentPage = this.$route.name;
    },
    components: {
        AppPanel,
        AppMain,
    },
};
</script>
<template>
    <AppMain>
        <AppPanel class="col-span-4 col-start-3 text-center">
            This page is under development
        </AppPanel>
    </AppMain>
</template>

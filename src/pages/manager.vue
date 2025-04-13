<script>
import ManegerForm from "@components/ManegerForm.vue";
import AppMain from "@components/app/AppMain.vue";
import { useWebsiteStore } from "@stores/store";

export default {
    mounted() {
        useWebsiteStore().currentPage = this.$route.name;
    },
    components: {
        ManegerForm,
        AppMain,
    },
};
</script>
<template>
    <AppMain>
        <ManegerForm />
    </AppMain>
</template>

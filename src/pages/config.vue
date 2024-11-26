<script>
export default {
    mounted() {
        useWebsiteStore().currentPage = this.$route.name;
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

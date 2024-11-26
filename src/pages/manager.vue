<script>
export default {
    mounted() {
        useWebsiteStore().currentPage = this.$route.name;
    },
};
</script>
<template>
    <AppMain>
        <ManegerForm />
    </AppMain>
</template>

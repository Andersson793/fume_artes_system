<script>
export default {
    data() {
        return {
            alerts: [
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
                {
                    user: "andersson793",
                    date: "12/12/2001 10:23",
                    body: "Any text !!!!",
                },
            ],
        };
    },
    mounted() {
        useWebsiteStore().currentPage = this.$route.name;
    },
    methods: {
        removeAlert(index) {
            this.alerts.splice(index, 1);
        },
    },
};
</script>
<template>
    <AppMain>
        <AppPanel title_panel="Title panel" class="col-span-5">
            <AppTable />
        </AppPanel>

        <AppPanel title_panel="Alerts" class="col-span-3">
            <div class="overflow-y-scroll" v-if="alerts.length > 0">
                <AlertItem
                    v-for="(alert, index) in alerts"
                    :index="index"
                    :user="alert.user"
                    :date="alert.date"
                    :body="alert.body"
                    :remove="removeAlert"
                    :key="index"
                />
            </div>

            <div v-else class="text-center font-bold">Nothing here !</div>
        </AppPanel>
    </AppMain>
</template>

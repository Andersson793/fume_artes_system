<script>
import AppMain from "@/components/AppMain.vue";
import AppPanel from "@/components/AppPanel.vue";
import AlertItem from "@/components/AlertItem.vue";
import AppTable from "@/components/AppTable.vue";
import { useWebsiteStore } from "@stores/store.js";

export default {
    data() {
        return {
            data: [],
            store: useWebsiteStore(),
        };
    },
    mounted() {
        this.store.$patch({
            user_name: this.getCookie("name"),
        });
    },
    methods: {
        /*
          removeAlert(index) {
              this.data.splice(index, 1);
          },

*/

        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
    },
    components: {
        AppMain,
        AppPanel,
        AlertItem,
        AppTable,
    },
};
</script>
<template>
    <AppMain>
        <div class="col-span-5">
            <AppPanel title_panel="Title panel">
                <!-- rework on AppTable component-->
                <AppTable />
            </AppPanel>
        </div>

        <AppPanel title_panel="Financial information" class="col-span-3">
        </AppPanel>
    </AppMain>
</template>

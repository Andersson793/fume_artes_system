<script>
import AppMain from "@/components/AppMain.vue";
import AppPanel from "@/components/AppPanel.vue";
import AlertItem from "@/components/AlertItem.vue";
import AppTable from "@/components/AppTable.vue";
import { instance } from "@/axios.js";

export default {
    data() {
        return {
            data: [],
        };
    },
    mounted() {
        //removed function
        /*
          instance.get("/api/pending_services").then((response) => {
              this.data = response.data;
          });
        */
    },
    methods: {
        /*
          removeAlert(index) {
              this.data.splice(index, 1);
          },

        */
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
                <AppTable />
            </AppPanel>
        </div>

        <AppPanel title_panel="Pending services" class="col-span-3">
            <div class="overflow-y-scroll" v-if="data.length > 0">
                <p>Outra coisa</p>
                <p>E altere essa fonte !</p>

                <!--
                    <AlertItem
                        v-for="(data, index) in data"
                        :index="index"
                        :user="data.user_name"
                        :date="data.created_at"
                        :body="data.description"
                        :remove="removeAlert"
                        :key="index"
                    />
                -->
            </div>

            <div v-else class="text-center font-bold">Nothing here !</div>
        </AppPanel>
    </AppMain>
</template>

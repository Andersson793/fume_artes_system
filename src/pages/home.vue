<script>
import AppMain from "@/components/AppMain.vue";
import AppPanel from "@/components/AppPanel.vue";
import AlertItem from "@/components/AlertItem.vue";
import AppTable from "@/components/AppTable.vue";
import { useWebsiteStore } from "@stores/store.js";
import { instance } from "@/axios.js";

export default {
    data() {
        return {
            result: [],
            loading: false,
            store: useWebsiteStore(),
        };
    },
    mounted() {
        instance
            .get("/api/hgbrasil", {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((resp) => {
                this.result = resp.data.results;

                this.loading = true;
            });
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
        <div class="col-span-6">
            <AppPanel title_panel="Title panel">
                <!-- rework on AppTable component-->
                <AppTable />
            </AppPanel>
        </div>

        <AppPanel title_panel="Financial information" class="col-span-2">
            <div v-if="loading">
                <p class="text-lg">
                    <span class="text-bold">CDI: </span>
                    {{ result.taxes[0].cdi }}
                </p>
                <p class="text-lg">
                    <span class="text-bold">SELIC: </span>
                    {{ result.taxes[0].selic }}
                </p>

                <p class="text-lg">
                    <span class="text-bold">IBOVESPA: </span>
                    {{ result.stocks.IBOVESPA.points }}
                    <span
                        v-if="result.stocks.IBOVESPA.variation > 0"
                        class="text-sm text-green-500"
                        >{{ result.stocks.IBOVESPA.variation }}
                    </span>
                    <span v-else class="text-sm text-red-400">{{
                        result.stocks.IBOVESPA.variation
                    }}</span>
                </p>

                <p class="text-lg">
                    <span class="text-bold">Dolar hoje: </span>
                    {{ result.currencies.USD.buy }}

                    <span
                        v-if="result.currencies.USD.variation > 0"
                        class="text-sm text-green-500"
                        >{{ result.currencies.USD.variation }}</span
                    >
                    <span v-else class="text-sm text-red-400">{{
                        result.currencies.USD.variation
                    }}</span>
                </p>

                <p class="text-lg">
                    <span class="text-bold">BTC: </span>
                    {{ result.bitcoin.bitstamp.buy }}

                    <span
                        v-if="result.bitcoin.bitstamp.variation > 0"
                        class="text-sm text-green-500"
                        >{{ result.bitcoin.bitstamp.variation }}</span
                    >
                    <span v-else class="text-sm text-red-400">{{
                        result.bitcoin.bitstamp.variation
                    }}</span>
                </p>
            </div>
        </AppPanel>
    </AppMain>
</template>

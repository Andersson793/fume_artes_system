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
            data: [],
            store: useWebsiteStore(),
        };
    },
    mounted() {
        this.store.$patch({
            user_name: this.getCookie("name"),
        });

        instance
            .get("/api/hgbrasil", {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((resp) => {
                this.data = resp.data.results;

                console.log(this.data);
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
        <div class="col-span-6">
            <AppPanel title_panel="Title panel">
                <!-- rework on AppTable component-->
                <AppTable />
            </AppPanel>
        </div>

        <AppPanel title_panel="Financial information" class="col-span-2">
            <div>
                <p class="text-lg">
                    <span class="text-bold">CDI: </span>
                    {{ data.taxes[0].cdi }}
                </p>
                <p class="text-lg">
                    <span class="text-bold">SELIC: </span>
                    {{ data.taxes[0].selic }}
                </p>

                <p class="text-lg">
                    <span class="text-bold">IBOVESPA: </span>
                    {{ data.stocks.IBOVESPA.points }}
                    <span
                        v-if="data.stocks.IBOVESPA.variation > 0"
                        class="text-sm text-green-500"
                        >{{ data.stocks.IBOVESPA.variation }}
                    </span>
                    <span v-else class="text-sm text-red-400">{{
                        data.stocks.IBOVESPA.variation
                    }}</span>
                </p>

                <p class="text-lg">
                    <span class="text-bold">Dolar hoje: </span>
                    {{ data.currencies.USD.buy }}

                    <span
                        v-if="data.currencies.USD.variation > 0"
                        class="text-sm text-green-500"
                        >{{ data.currencies.USD.variation }}</span
                    >
                    <span v-else class="text-sm text-red-400">{{
                        data.currencies.USD.variation
                    }}</span>
                </p>

                <p class="text-lg">
                    <span class="text-bold">BTC: </span>
                    {{ data.bitcoin.bitstamp.buy }}

                    <span
                        v-if="data.bitcoin.bitstamp.variation > 0"
                        class="text-sm text-green-500"
                        >{{ data.bitcoin.bitstamp.variation }}</span
                    >
                    <span v-else class="text-sm text-red-400">{{
                        data.bitcoin.bitstamp.variation
                    }}</span>
                </p>
            </div>
        </AppPanel>
    </AppMain>
</template>

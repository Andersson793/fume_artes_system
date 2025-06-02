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
            financialData: [],
            ordersData: [],
            tableHeaders: ["#", "Description", "Date", "Customer", "Value", ""],
            loading: false,
            store: useWebsiteStore(),
        };
    },
    mounted() {
        this.getFinancial();
        this.getOrders();
    },
    methods: {
        async removeItem(id) {
            await instance
                .delete(`/api/orders/${id}`, {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    if (response.status == 200) {
                        this.getOrders();
                    } else {
                        alert("error");
                    }
                });
        },

        async getFinancial() {
            await instance
                .get("/api/hgbrasil", {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((resp) => {
                    this.financialData = resp.data.results;

                    this.loading = true;
                });
        },

        async getOrders() {
            await instance
                .get("/api/orders", {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((resp) => {
                    this.ordersData = resp.data;
                });
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
            <AppPanel title_panel="Title panel" :reload="getOrders">
                <AppTable
                    :data="ordersData"
                    :headers="tableHeaders"
                    :removeItem="removeItem"
                />
            </AppPanel>
        </div>

        <AppPanel
            title_panel="Financial information"
            class="col-span-2"
            :reload="getFinancial"
        >
            <div v-if="loading">
                <p class="text-lg">
                    <span class="text-bold">CDI: </span>
                    {{ financialData.taxes[0].cdi }}
                </p>
                <p class="text-lg">
                    <span class="text-bold">SELIC: </span>
                    {{ financialData.taxes[0].selic }}
                </p>

                <p class="text-lg">
                    <span class="text-bold">IBOVESPA: </span>
                    {{ financialData.stocks.IBOVESPA.points }}
                    <span
                        v-if="financialData.stocks.IBOVESPA.variation > 0"
                        class="text-sm text-green-500"
                        >{{ financialData.stocks.IBOVESPA.variation }}
                    </span>
                    <span v-else class="text-sm text-red-400">{{
                        financialData.stocks.IBOVESPA.variation
                    }}</span>
                </p>

                <p class="text-lg">
                    <span class="text-bold">Dolar hoje: </span>
                    {{ financialData.currencies.USD.buy }}

                    <span
                        v-if="financialData.currencies.USD.variation > 0"
                        class="text-sm text-green-500"
                        >{{ financialData.currencies.USD.variation }}</span
                    >
                    <span v-else class="text-sm text-red-400">{{
                        financialData.currencies.USD.variation
                    }}</span>
                </p>

                <p class="text-lg">
                    <span class="text-bold">BTC: </span>
                    {{ financialData.bitcoin.bitstamp.buy }}

                    <span
                        v-if="financialData.bitcoin.bitstamp.variation > 0"
                        class="text-sm text-green-500"
                        >{{ financialData.bitcoin.bitstamp.variation }}</span
                    >
                    <span v-else class="text-sm text-red-400">{{
                        financialData.bitcoin.bitstamp.variation
                    }}</span>
                </p>
            </div>
        </AppPanel>
    </AppMain>
</template>

<script>
import AppMain from "@/components/AppMain.vue";
import AppPanel from "@/components/AppPanel.vue";
import AlertItem from "@/components/AlertItem.vue";
import AppTable from "@/components/AppTable.vue";
import Pagination from "@/components/Pagination.vue";
import { useWebsiteStore } from "@stores/store.js";
import { instance } from "@/axios.js";
import { useLocalCurrency } from "@/useLocalCurrency";

export default {
    data() {
        return {
            financialData: [],
            ordersData: [],
            tableHeaders: [
                "#",
                "Descrição",
                "Pagamento",
                "Cliente",
                "Data",
                "Valor",
                "",
            ],
            loading: false,
            page: 0,
            itemsPerPage: 15,
            pageItems: [],
            useLocalCurrency: useLocalCurrency,

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

        changeCurrentPage(p) {
            this.page = p;
        },

        changeData(e) {
            this.pageItems = e;
        },
    },
    components: {
        AppMain,
        AppPanel,
        AlertItem,
        AppTable,
        Pagination,
    },
};
</script>
<template>
    <AppMain>
        <div class="col-span-6">
            <AppPanel title_panel="Movimento do caixa" :reload="getOrders">
                <AppTable :headers="tableHeaders">
                    <tr
                        v-for="(row, index) in pageItems[page]"
                        :key="row.id"
                        class="odd:bg-white even:bg-gray-100"
                    >
                        <td class="whitespace-nowrap text-left p-4">
                            {{ index + 1 + itemsPerPage * page }}
                        </td>
                        <td class="whitespace-nowrap text-left p-4 w-full">
                            {{ row.description }}
                        </td>
                        <td class="whitespace-nowrap text-center p-4">
                            {{ row.payment }}
                        </td>
                        <td class="whitespace-nowrap text-left p-4">
                            {{ row.customer }}
                        </td>
                        <td class="whitespace-nowrap text-left p-4">
                            {{
                                new Date(row.created_at).toLocaleString(
                                    "pt-BR",
                                    {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                    },
                                )
                            }}
                        </td>

                        <td class="whitespace-nowrap text-left p-4 text-bold">
                            {{ useLocalCurrency(row.total_items) }}
                        </td>
                        <td @click="removeItem(row.id)">
                            <div
                                class="i-basil:trash-alt-solid text-2xl text-red cursor-pointer"
                            ></div>
                        </td>
                    </tr>
                </AppTable>

                <div class="flex justify-center">
                    <Pagination
                        :items="ordersData"
                        :page="page"
                        :changeCurrentPage="changeCurrentPage"
                        :changeData="changeData"
                        :itemsPerPage="itemsPerPage"
                        v-if="ordersData.length > 0"
                    />
                </div>
            </AppPanel>
        </div>

        <div class="col-span-2">
            <AppPanel
                title_panel="Informação financeira"
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
                            >{{ financialData.stocks.IBOVESPA.variation }}%
                        </span>
                        <span v-else class="text-sm text-red-400"
                            >{{
                                financialData.stocks.IBOVESPA.variation
                            }}%</span
                        >
                    </p>

                    <p class="text-lg">
                        <span class="text-bold">Dólar hoje: </span>
                        {{ financialData.currencies.USD.buy }}

                        <span
                            v-if="financialData.currencies.USD.variation > 0"
                            class="text-sm text-green-500"
                            >{{ financialData.currencies.USD.variation }}%</span
                        >
                        <span v-else class="text-sm text-red-400"
                            >{{ financialData.currencies.USD.variation }}%</span
                        >
                    </p>

                    <p class="text-lg">
                        <span class="text-bold">BTC: </span>
                        {{ financialData.bitcoin.bitstamp.buy }}

                        <span
                            v-if="financialData.bitcoin.bitstamp.variation > 0"
                            class="text-sm text-green-500"
                            >{{
                                financialData.bitcoin.bitstamp.variation
                            }}%</span
                        >
                        <span v-else class="text-sm text-red-400"
                            >{{
                                financialData.bitcoin.bitstamp.variation
                            }}%</span
                        >
                    </p>
                </div>
            </AppPanel>
        </div>
    </AppMain>
</template>

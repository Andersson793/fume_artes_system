<script>
import AppMain from "@/components/AppMain.vue";
import AppPanel from "@/components/AppPanel.vue";
import { Bar } from "vue-chartjs";
import {
    Chart,
    DoughnutController,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Legend,
    Title,
    Tooltip,
    SubTitle,
} from "chart.js";
import { useWebsiteStore } from "@stores/store.js";
import { instance } from "@/axios.js";
import FinancialIndicator from "../components/FinancialIndicator.vue";

Chart.register(
    DoughnutController,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    SubTitle,
    Legend,
);

Chart.defaults.color = "black";

export default {
    data() {
        return {
            financialData: [],
            Bar: {
                data: {
                    title: "mode",
                    labels: ["janeiro", "fevereiro", "marco", "abril", "maio"],

                    datasets: [
                        {
                            data: [],
                            backgroundColor: [
                                "oklch(70.7% 0.165 254.624)",
                                "oklch(88.2% 0.059 254.128)",
                            ],
                            borderColor: "white",
                            borderWidth: 2,
                            borderRadius: 3,
                            color: "blue",
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: "Entrada no caixa por dia",
                        },
                    },
                },
            },

            loaded: false,

            financialDataLoaded: false,

            store: useWebsiteStore(),
        };
    },
    mounted() {
        this.getFinancial();
        this.getData();
    },
    methods: {
        async getFinancial() {
            await instance
                .get("/api/hgbrasil", {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((resp) => {
                    this.financialData = resp.data.results;
                    this.financialDataLoaded = true;
                });
        },

        async getData() {
            await instance
                .get("/api/historical_data", {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((resp) => {
                    var indices = [];
                    var labels = [];

                    resp.data.map((element) => {
                        indices.push(element.TotalItems);

                        let day = new Date(
                            element.Year,
                            element.Month - 1,
                            element.Day,
                        );

                        labels.push(
                            day.toLocaleDateString("pt-BR", {
                                month: "short",
                                day: "numeric",
                            }),
                        );
                    });

                    this.Bar.data.datasets[0].data = indices.reverse();
                    this.Bar.data.labels = labels.reverse();

                    this.loaded = true;
                });
        },
    },
    components: {
        AppMain,
        AppPanel,
        Bar,
        FinancialIndicator,
    },
};
</script>
<template>
    <AppMain>
        <div class="col-span-full flex justify-end" v-if="financialDataLoaded">
            <div class="flex gap-5">
                <FinancialIndicator>
                    <template #label>CDI:</template>
                    <template #value>
                        {{ financialData.taxes[0].cdi }}
                    </template>
                </FinancialIndicator>
                <FinancialIndicator>
                    <template #label>SELIC:</template>
                    <template #value>
                        {{ financialData.taxes[0].selic }}
                    </template>
                </FinancialIndicator>
                <FinancialIndicator>
                    <template #label>Bitcoin:</template>
                    <template #value>
                        {{ financialData.bitcoin.bitstamp.buy }}
                    </template>
                </FinancialIndicator>

                <FinancialIndicator>
                    <template #label>Dólar: </template>
                    <template #value>
                        {{ financialData.currencies.USD.buy }}
                    </template>
                </FinancialIndicator>
            </div>
        </div>

        <div class="col-span-full">
            <AppPanel
                title_panel="Registro do caixa"
                class="col-span-5 col-start-2"
                v-if="loaded"
            >
                <Bar :data="Bar.data" :options="Bar.options" />
            </AppPanel>
        </div>
    </AppMain>
</template>

<script>
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

import { Doughnut, Bar } from "vue-chartjs";
import { instance } from "@/axios.js";
import AppPanel from "@/components/AppPanel.vue";

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
            charts: {
                Doughnut: {
                    data: {
                        title: "test",
                        datasets: [
                            {
                                data: [200, 50],
                                backgroundColor: [
                                    "oklch(72.3% 0.219 149.579)",
                                    "oklch(64.5% 0.246 16.439)",
                                ],
                            },
                        ],
                        labels: ["Too", "Bar"],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: true,
                                text: "Custom Chart Title",
                            },
                        },
                    },
                },

                Bar: {
                    data: {
                        title: "mode",
                        labels: [
                            "janeiro",
                            "fevereiro",
                            "marco",
                            "abril",
                            "maio",
                        ],

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
            },
            data: [],
            loaded: false,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
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

                        //labels.push(element.Day + "/" + element.Month);
                        labels.push(
                            day.toLocaleDateString("pt-BR", {
                                month: "short",
                                day: "numeric",
                            }),
                        );
                    });

                    this.charts.Bar.data.datasets[0].data = indices.reverse();
                    this.charts.Bar.data.labels = labels.reverse();

                    this.loaded = true;
                });
        },
    },
    components: { Doughnut, Bar, AppPanel },
};
</script>
<template>
    <main class="grid grid-cols-7 gap-10 p-10">
        <AppPanel
            title_panel="Registro do caixa"
            class="col-span-5 col-start-2"
            v-if="loaded"
        >
            <Bar :data="charts.Bar.data" :options="charts.Bar.options" />
        </AppPanel>

        <AppPanel title_panel="Title panel" v-if="false">
            <Doughnut
                :data="charts.Doughnut.data"
                :options="charts.Doughnut.options"
            />
            <div class="mt-5 flex justify-center">
                <div
                    class="p-1 cursor-pointer inline-flex items-center"
                    v-for="(value, index) in charts.Doughnut.data.labels"
                    :title="charts.Doughnut.data.datasets[0].data[index]"
                >
                    <div
                        class="rounded-full w-5 h-5 mr-2"
                        :style="{
                            backgroundColor:
                                charts.Doughnut.data.datasets[0]
                                    .backgroundColor[index],
                        }"
                    ></div>
                    <span class="p-1">{{ value }}</span>
                </div>
            </div>
        </AppPanel>
    </main>
</template>

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
                                backgroundColor: ["red", "green"],
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
                            "junio",
                            "julio",
                            "agosto",
                            "setembro",
                            "outubro",
                            "novembro",
                            "dezembro",
                        ],

                        datasets: [
                            {
                                data: [
                                    10, 14, 20, 30, 10, 14, 20, 31, 14, 20, 30,
                                    45,
                                ],
                                backgroundColor: [
                                    "red",
                                    "blue",
                                    "pink",
                                    "gray",
                                    "orange",
                                    "cian",
                                    "green",
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
                                text: "Custom Chart Title",
                            },
                        },
                    },
                },
            },
        };
    },
    mounted() {
        useWebsiteStore().currentPage = this.$route.name;
    },
    components: { Doughnut, Bar },
};
</script>
<template>
    <main class="grid grid-cols-4 gap-10 p-10">
        <AppPanel title_panel="Title panel" class="col-span-3 row-span-2">
            <Bar
                :data="charts.Bar.data"
                :options="charts.Bar.options"
                class="col-span-5"
            />
        </AppPanel>

        <AppPanel title_panel="Title panel">
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

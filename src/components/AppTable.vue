<script>
import { EllipsisVerticalIcon } from "lucide-vue-next";
import Pagination from "./Pagination.vue";
import { instance } from "@/axios.js";

export default {
    data() {
        return {
            table: {
                headers: ["#", "Description", "Date", "Customer", "Value"],
            },
            data: [],
            page: 0,
        };
    },
    mounted() {
        instance.get("/orders").then((response) => {
            this.data = response.data;
        });
    },

    methods: {
        changeCurrentPage(i) {
            this.page = i;
        },
    },
    computed: {
        PageSlice() {
            const itemsPerPage = 5;
            const tableItems = this.data;

            let pageItems = [];

            for (let i = 0; i < tableItems.length; i += itemsPerPage) {
                pageItems.push(tableItems.slice(i, i + itemsPerPage));
            }

            return pageItems;
        },
    },
    components: { EllipsisVerticalIcon, Pagination },
};
</script>
<template>
    <table class="table-auto w-full mb-5 border-collapse">
        <thead class="bg-blue-100">
            <tr>
                <th
                    class="font-semibold whitespace-nowrap text-left p-4 border-y border-blue-red-100"
                    v-for="item in table.headers"
                >
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, index) in data"
                :key="row.id"
                class="odd:bg-white even:bg-gray-100"
            >
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ index + 1 }}
                </td>
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ row.description }}
                </td>
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{
                        new Date(row.created_at).toLocaleString("pt-BR", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })
                    }}
                </td>
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ row.customer }}
                </td>

                <td class="font-semibold whitespace-nowrap text-left p-4">
                    R$ {{ row.total_items }}
                </td>
            </tr>
        </tbody>
    </table>

    <div class="flex justify-center">
        <Pagination
            :pages="PageSlice.length"
            :currentPage="page"
            :changeCurrentPage="changeCurrentPage"
        />
    </div>
</template>

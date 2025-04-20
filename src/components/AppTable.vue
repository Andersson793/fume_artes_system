<script>
import { EllipsisVerticalIcon } from "lucide-vue-next";
import Pagination from "./Pagination.vue";
export default {
    data() {
        return {
            table: {
                headers: ["#", "Description", "Date", "Customer", "Value"],
                itemsMenu: [
                    {
                        label: "Item menu",
                        action: null,
                    },
                    {
                        label: "Item menu",
                        action: null,
                    },
                    {
                        label: "Item menu",
                        action: null,
                    },
                ],
                items: [
                    {
                        id: 1,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 2,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 3,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 4,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 5,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 6,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 7,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                    {
                        id: 8,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        customer: "FRIBOM",
                        value: 230,

                    },
                ],
            },
            currentPage: 0,
        };
    },
    methods: {
        changeCurrentPage(i) {
            this.currentPage = i;
        },
    },
    computed: {
        TablePagination() {
            const itemsPerPage = 5;
            const tableItems = this.table.items;

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
            <tr >
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
                v-for="item in TablePagination[currentPage]"
                :key="item.id"
                class="odd:bg-white even:bg-gray-100"
            >
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ item.id }}
                </td>
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ item.item }}
                </td>
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ item.date }}
                </td>
                <td class="font-semibold whitespace-nowrap text-left p-4">
                    {{ item.customer }}
                </td>

                <td class="font-semibold whitespace-nowrap text-left p-4">
                  R$ {{ item.value }}
                </td>
            </tr>
        </tbody>
    </table>

    <div class="flex justify-center">
        <Pagination
            :pages="TablePagination.length"
            :currentPage="currentPage"
            :changeCurrentPage="changeCurrentPage"
        />
    </div>
</template>
<style scoped>
table{

}
</style>

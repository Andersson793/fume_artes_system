<script>
import { EllipsisVerticalIcon } from "lucide-vue-next";
import Pagination from "./Pagination.vue";
export default {
    data() {
        return {
            table: {
                headers: ["#", "Item", "Date", "Value", ""],
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
                        value: 230,
                        tag: "tag",
                    },
                    {
                        id: 2,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "tag",
                    },
                    {
                        id: 3,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "up",
                    },
                    {
                        id: 4,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "up",
                    },
                    {
                        id: 5,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "up",
                    },
                    {
                        id: 6,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "up",
                    },
                    {
                        id: 7,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "up",
                    },
                    {
                        id: 8,
                        item: "Película fume parabrisa",
                        date: "12/12/2001",
                        value: 230,
                        tag: "up",
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
    <table class="table-auto bg-blue-200 w-full mb-5">
        <thead>
            <tr>
                <th
                    class="font-semibold whitespace-nowrap text-left p-4"
                    v-for="item in table.headers"
                >
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="bg-pink-100"
                v-for="item in TablePagination[currentPage]"
                :key="item.id"
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
                    R$ {{ item.value }}
                </td>

                <td class="font-semibold whitespace-nowrap text-left p-4">
                    <div
                        class="py-0.5 px-2 rounded-sm bg-yellow-300 flex items-center justify-center w-fit"
                    >
                        <small>{{ item.tag }}</small>
                    </div>
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

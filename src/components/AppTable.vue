<script>
import Pagination from "./Pagination.vue";
//import { instance } from "@/axios.js";

export default {
    data() {
        return {
            //get headers by props
            //table: {
            //    headers: ["#", "Description", "Date", "Customer", "Value", ""],
            //},
            //data: [],
            page: 0,
        };
    },
    props: {
        data: Array,
        headers: Array,
        removeItem: Function,
    },
    mounted() {
        /*
        instance
            .get("/api/orders", {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                this.data = response.data;
            });
        */
    },

    methods: {
        changeCurrentPage(i) {
            this.page = i;
        },

        /*
        removeItem(id) {
            instance
                .delete(`/api/orders/${id}`, {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    alert(response.message);

                    //reload table
                });
        },
        */
    },
    computed: {
        PageSlice() {
            const itemsPerPage = 5;
            const tableItems = this.$props.data;

            let pageItems = [];

            for (let i = 0; i < tableItems.length; i += itemsPerPage) {
                pageItems.push(tableItems.slice(i, i + itemsPerPage));
            }

            return pageItems;
        },
    },
    components: { Pagination },
};
</script>
<template>
    <table class="table-auto w-full mb-5 border-collapse">
        <thead class="bg-blue-100">
            <tr>
                <th
                    class="font-semibold whitespace-nowrap text-left p-4 border-y border-blue-red-100"
                    v-for="item in $props.headers"
                >
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, index) in $props.data"
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
                <td @click="$props.removeItem(row.id)">
                    <div
                        class="i-basil:trash-alt-solid text-2xl text-red cursor-pointer"
                    ></div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="flex justify-center">
        <Pagination
            :pages="PageSlice.length"
            :items="$props.data"
            :currentPage="page"
            :changeCurrentPage="changeCurrentPage"
        />
    </div>
</template>

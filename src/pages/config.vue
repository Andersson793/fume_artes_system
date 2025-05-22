<script>
import AppPanel from "@/components/AppPanel.vue";
import AppMain from "@/components/AppMain.vue";

import { instance } from "@/axios.js";

export default {
    data() {
        return {
            users: {
                headers: [
                    "#",
                    "Name",
                    "Email",
                    "Type",
                    "Created_at",
                    "Deleted",
                ],
                data: [],
            },

            customers: {
                headers: ["#", "name", "cnpj", "created at", "deleted"],
                data: [],
            },
        };
    },

    mounted() {
        instance
            .get("/api/users", {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                this.users.data = response.data;
            });

        instance
            .get("/api/customers", {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                this.customers.data = response.data;
            });
    },
    components: {
        AppPanel,
        AppMain,
    },
};
</script>
<template>
    <AppMain>
        <AppPanel class="col-span-4 col-start-3" title_panel="Users">
            <table class="table-auto w-full mb-5 border-collapse">
                <thead class="bg-blue-100">
                    <tr>
                        <th
                            class="font-semibold whitespace-nowrap text-left p-4 border-y border-blue-red-100"
                            v-for="item in users.headers"
                        >
                            {{ item }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in users.data"
                        :key="row.id"
                        class="odd:bg-white even:bg-gray-100"
                    >
                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ index + 1 }}
                        </td>
                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ row.name }}
                        </td>
                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ row.email }}
                        </td>

                        <td
                            class="font-semibold whitespace-nowrap text-center p-4"
                        >
                            {{ row.type }}
                        </td>

                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
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

                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ row.deleted_at ? "true" : "false" }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </AppPanel>

        <AppPanel class="col-span-4 col-start-3" title_panel="Customres">
            <table class="table-auto w-full mb-5 border-collapse">
                <thead class="bg-blue-100">
                    <tr>
                        <th
                            class="font-semibold whitespace-nowrap text-left p-4 border-y border-blue-red-100"
                            v-for="item in customers.headers"
                        >
                            {{ item }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in customers.data"
                        :key="row.id"
                        class="odd:bg-white even:bg-gray-100"
                    >
                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ index + 1 }}
                        </td>
                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ row.name }}
                        </td>
                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ row.cnpj ? row.cnpj : "00.000.000/0000-00" }}
                        </td>

                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
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

                        <td
                            class="font-semibold whitespace-nowrap text-left p-4"
                        >
                            {{ row.deleted_at ? "true" : "false" }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </AppPanel>
    </AppMain>
</template>

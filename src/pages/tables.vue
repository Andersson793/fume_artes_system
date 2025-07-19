<script>
import AppPanel from "@/components/AppPanel.vue";
import AppMain from "@/components/AppMain.vue";

import { instance } from "@/axios.js";
import AppTable from "../components/AppTable.vue";

export default {
    data() {
        return {
            users: {
                headers: ["#", "Nome", "Login", "Tipo", "Criado em"],
                data: [],
            },

            customers: {
                headers: ["#", "Name", "Cnpj", "Created at"],
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
        AppTable,
    },
};
</script>
<template>
    <AppMain>
        <AppPanel class="col-span-6 col-start-2" title_panel="Usuários">
            <AppTable :headers="users.headers">
                <tr
                    v-for="(row, index) in users.data"
                    :key="row.id"
                    class="odd:bg-white even:bg-gray-100"
                >
                    <td class="whitespace-nowrap text-left p-4">
                        {{ index + 1 }}
                    </td>
                    <td class="whitespace-nowrap text-left p-4">
                        {{ row.name }}
                    </td>
                    <td class="whitespace-nowrap text-left p-4">
                        {{ row.email }}
                    </td>

                    <td class="whitespace-nowrap text-center p-4">
                        {{ row.type }}
                    </td>

                    <td class="whitespace-nowrap text-left p-4">
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
                </tr>
            </AppTable>
        </AppPanel>
    </AppMain>
</template>

<script>
import AppPanel from "@/components/AppPanel.vue";
import AppMain from "@/components/AppMain.vue";
import { instance } from "@/axios.js";
import { useLocalCurrency } from "@/utils/useLocalCurrency";
import AppTable from "@/components/AppTable.vue";
import AppButton from "@/components/form/AppButton.vue";
import Pagination from "@/components/Pagination.vue";
import { RouterLink } from "vue-router";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    CheckboxIndicator,
    CheckboxRoot,
} from "reka-ui";
import DialogModal from "../components/DialogModal.vue";
import useDifDate from "@/utils/useDifDate";
import todayFilter from "@/utils/useTodayCheck.js";
import PrimaryButton from "../components/Buttons/PrimaryButton.vue";
import WarningButton from "../components/Buttons/WarningButton.vue";

export default {
    data() {
        return {
            useDifDate: useDifDate,
            users: {
                headers: ["#", "Nome", "Login", "Tipo", "Criado em"],
                data: [],
            },

            customers: {
                headers: ["#", "Name", "Cnpj", "Created at"],
                data: [],
            },

            ordersData: [],
            todayTableFilter: true,
            tableHeaders: [
                "#",
                "Descrição",
                "",
                "Pagamento",
                "Cliente",
                "Valor",
                "",
                "",
            ],
            loading: false,
            page: 0,
            itemsPerPage: 15,
            pageItems: [],
            useLocalCurrency: useLocalCurrency,
            dialog: false,
            modal: false,
            modal_item: "",
            modal_date: "",
            modal_item_id: "",
        };
    },

    mounted() {
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

        openModal(item, date, item_id) {
            this.modal_item = item;
            this.modal_date = date;
            this.modal_item_id = item_id;

            console.log(this.modal_date);

            this.modal = true;
        },

        todayDataFilter() {
            const filtered = this.ordersData.filter((order) =>
                todayFilter(order.created_at),
            );

            return filtered;
        },

        dateToNumericFormat() {
            const newDate = new Date(this.modal_date);
            const formated = newDate.toLocaleString("pt-BR", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            });

            return formated;
        },
    },
    components: {
        AppPanel,
        AppMain,
        AppTable,
        AppButton,
        Pagination,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogOverlay,
        DialogPortal,
        DialogRoot,
        DialogTitle,
        DialogTrigger,
        RouterLink,
        DialogModal,
        CheckboxIndicator,
        CheckboxRoot,
        PrimaryButton,
        WarningButton,
    },
};
</script>
<template>
    <AppMain>
        <AppPanel
            class="col-span-full"
            title_panel="Movimento do caixa"
            :reload="getOrders"
        >
            <div class="flex justify-end gap-3 mb-5">
                <CheckboxRoot
                    v-model="todayTableFilter"
                    class="hover:bg-stone-50 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white shadow-sm border outline-none"
                >
                    <CheckboxIndicator
                        class="bg-white h-full w-full rounded flex items-center justify-center"
                    >
                        <div class="i-basil:check-outline"></div>
                    </CheckboxIndicator>
                </CheckboxRoot>
                <span>Criados hoje.</span>
            </div>

            <AppTable :headers="tableHeaders">
                <tr
                    v-for="(row, index) in pageItems[page]"
                    :key="row.id"
                    class="odd:bg-white even:bg-gray-100"
                >
                    <td class="whitespace-nowrap text-left p-4">
                        {{ index + 1 + itemsPerPage * page }}
                    </td>
                    <td
                        class="case-upper whitespace-nowrap overflow-hidden text-left p-4 w-full"
                    >
                        {{ row.description }}
                    </td>
                    <td class="whitespace-nowrap text-left p-4">
                        {{ useDifDate(row.created_at, new Date()) }}
                    </td>
                    <td class="whitespace-nowrap text-center p-4">
                        {{ row.payment }}
                    </td>
                    <td class="whitespace-nowrap text-left p-4">
                        {{ row.customer }}
                    </td>

                    <td class="whitespace-nowrap text-left p-4 text-bold">
                        {{ useLocalCurrency(row.total_items) }}
                    </td>
                    <td>
                        <div
                            @click="
                                openModal(
                                    row.description,
                                    row.created_at,
                                    row.id,
                                )
                            "
                            class="i-basil:trash-alt-solid text-2xl text-red cursor-pointer"
                        ></div>
                    </td>

                    <td>
                        <RouterLink :to="'/view/' + row.id">
                            <div
                                class="i-basil:eye-solid text-2xl text-blue-300 cursor-pointer"
                            ></div>
                        </RouterLink>
                    </td>
                </tr>
            </AppTable>

            <div class="flex justify-center">
                <Pagination
                    :items="todayTableFilter ? todayDataFilter() : ordersData"
                    :page="page"
                    :changeCurrentPage="(p) => (page = p)"
                    :changeData="(e) => (pageItems = e)"
                    :itemsPerPage="itemsPerPage"
                    v-if="ordersData.length > 0"
                />
            </div>
        </AppPanel>
    </AppMain>

    <DialogModal :open="modal" title="Deseja deletar este item ?">
        <p>
            Deseja deletar o item <b>{{ modal_item }}</b> criado em
            <b>{{ dateToNumericFormat() }}</b>
        </p>

        <template #footer>
            <PrimaryButton @click="modal = !modal">Fechar</PrimaryButton>

            <WarningButton @click="removeItem(modal_item_id)"
                >Deletar</WarningButton
            >
        </template>
    </DialogModal>
</template>

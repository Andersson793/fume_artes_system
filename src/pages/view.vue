<script>
import AppMain from "@components/AppMain.vue";
import AppPanel from "@components/AppPanel.vue";
import AppInput from "@components/form/AppInput.vue";
import AppButton from "@components/form/AppButton.vue";
import AppTable from "@components/AppTable.vue";
import Select from "@components/Select.vue";
import { instance } from "@/axios.js";
import { useLocalCurrency } from "@/utils/useLocalCurrency";
import DialogModal from "../components/DialogModal.vue";
import { useWebsiteStore } from "@stores/store.js";
import {
    ToastTitle,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastViewport,
} from "reka-ui";

export default {
    data() {
        return {
            table_headers: ["Item", "Preço", ""],
            store: useWebsiteStore(),
            localData: {},
            useLocalCurrency: useLocalCurrency,
            dialogOpen: false,
            dialog: {
                itemIndex: 0,
                item: "",
                price: 0,
            },
            toast: false,
            toast_sucess: true,
            toast_content: "",
            select_options: [
                "Pix",
                "Cartão de crédito",
                "Cartão de débito",
                "Dinheiro",
            ],
        };
    },

    beforeMount() {
        this.GetOrder();
    },

    mounted() {
        console.log(this.store.user_id);
    },

    methods: {
        async GetOrder() {
            await instance
                .get("/api/orders_full/" + this.$route.params.id, {
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                })
                .then((resp) => {
                    this.localData = resp.data;
                });
        },

        OpenDialogModal(index) {
            this.dialog.itemIndex = index;

            this.dialogOpen = true;
        },

        DiscardChages() {
            this.GetOrder();
        },

        async SaveOrder() {
            await instance
                .put(
                    "/api/orders",
                    {
                        id: this.localData.id,
                        customer: this.localData.customer,
                        description: this.localData.description,
                        payment: this.localData.payment,
                        user_id: this.store.user_id,
                        created_at: this.localData.created_at,
                        order_items: this.localData.order_items,
                    },
                    {
                        headers: {
                            Authorization: sessionStorage.getItem("token"),
                        },
                    },
                )
                .then((resp) => {
                    this.toast_sucess = true;
                    this.toast_content = "Salvo com sucesso.";
                    this.toast = true;

                    console.log(resp);

                    this.DiscardChages();
                })
                .catch((err) => {
                    utils;
                    this.toast_content = err;
                    this.toast_sucess = false;
                    this.toast = true;

                    console.log(err);
                });
        },
    },
    components: {
        AppMain,
        AppPanel,
        AppInput,
        AppTable,
        Select,
        AppButton,
        DialogModal,
        ToastTitle,
        ToastAction,
        ToastClose,
        ToastDescription,
        ToastProvider,
        ToastRoot,
        ToastViewport,
    },
};
</script>
<template>
    <AppMain>
        <AppPanel title_panel="Visualizar ordem" class="col-start-3 col-span-4">
            <div class="grid cols-1 gap-10">
                <small class="text-slate-500">ID: {{ localData.id }}</small>
                <small
                    >Criado em:
                    {{ new Date(localData.created_at).toLocaleString() }}</small
                >

                <div>
                    <label for="customer">Cliente</label>
                    <div>
                        <AppInput id="customer" v-model="localData.customer" />
                    </div>
                </div>

                <div>
                    <label for="payment">Pagamento</label>
                    <div>
                        <Select v-model="localData.payment" />
                    </div>
                </div>

                <AppTable :headers="table_headers">
                    <tr
                        v-for="(item, index) in localData.order_items"
                        class="odd:bg-white even:bg-gray-100"
                    >
                        <td class="p-3 w-full">{{ item.name }}</td>
                        <td>{{ useLocalCurrency(item.price) }}</td>
                        <td>
                            <div
                                class="i-basil:edit-alt-outline text-blue-400 text-2xl cursor-pointer"
                                @click="OpenDialogModal(index)"
                            ></div>
                        </td>
                    </tr>
                </AppTable>

                <div>
                    <label for="description">Descrição</label>
                    <div>
                        <textarea
                            maxlength="200"
                            placeholder="Description"
                            id="description"
                            class="w-[-moz-available] w-full h-48 resize-none p-2 rounded-sm outline-none bg-gray-100 font-semibold border-none"
                            v-model="localData.description"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-10">
                <AppButton @click="DiscardChages()" class="bg-red-400">
                    Descartar
                </AppButton>

                <AppButton @click="SaveOrder()" class="bg-blue-400">
                    Salvar
                </AppButton>
            </div>
        </AppPanel>
        <DialogModal title="Editar" :open="dialogOpen">
            <small class="text-slate-500"
                >ID: {{ localData.order_items[dialog.itemIndex].id }}</small
            >

            <div>
                <label for="item">Item</label>
                <AppInput
                    id="item"
                    v-model="localData.order_items[dialog.itemIndex].name"
                />
            </div>

            <div>
                <label for="price">Preço</label>
                <AppInput
                    v-model.number="
                        localData.order_items[dialog.itemIndex].price
                    "
                />
            </div>

            <template #footer>
                <AppButton @click="dialogOpen = false" class="bg-blue-400"
                    >Fechar</AppButton
                >
            </template>
        </DialogModal>
    </AppMain>
    <ToastProvider duration="5000">
        <ToastRoot
            class="bg-white border-1 border-solid border-gray-200 rounded-lg shadow-sm border p-2 list-none"
            v-model:open="toast"
        >
            <ToastTitle>
                <span class="text-green-400" v-if="toast_sucess">Sucesso</span>
                <span class="text-red-400" v-else>Erro</span>
            </ToastTitle>
            <ToastDescription>
                <p>{{ toast_content }}</p>
            </ToastDescription>
        </ToastRoot>

        <ToastViewport class="fixed bottom-5 right-5" />
    </ToastProvider>
</template>

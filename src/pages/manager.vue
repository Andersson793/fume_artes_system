<script>
import AppButton from "@components/form/AppButton.vue";
import AppInput from "@components/form/AppInput.vue";
import AppCombobox from "@components/form/AppCombobox.vue";
import AppPanel from "@components/AppPanel.vue";
import {
    ComboboxAnchor,
    ComboboxArrow,
    ComboboxCancel,
    ComboboxContent,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxLabel,
    ComboboxPortal,
    ComboboxRoot,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxViewport,
    ToastTitle,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastViewport,
} from "reka-ui";
import { options, component as VueNumber } from "@coders-tm/vue-number-format";
import { instance } from "@/axios.js";
import { localCurrency } from "@/localCurrency.js";

export default {
    data() {
        return {
            form: {
                combobox: "",
                price: 0,
                items: {
                    items: [],
                    total: 0,
                },
                customer: "",
                description: "",
            },
            input_currency_config: {
                decimal: ",",
                separator: ".",
                prefix: "R$ ",
                precision: 2,
                masked: false,
            },
            data: undefined,
            options: [
                "Pel. fumê 35% parabrisa",
                "Pel. fumê 25% parabrisa",
                "Pel. fumê 50% parabrisa",
                "Pel. fumê 50% portas",
                "Pel. fumê 75% portas",
                "Pel. fumê 100% portas",
                "Pel. fumê degradê 100% portas",
                "Adesivo tara",
                "Adesivo de parabrisa",
                "Adesivo '25,50' para placa zebrada",
                "Faixa de parabrisa",
                "Restauração e adesivação de placa zebrada",
                "Adesivo impresso",
                "adesivo de recorte",
            ],
            selected_option: options[0],
            new_option: "",
            localCurrency: localCurrency,
            toast: false,
            toastContent: "",
            toastTitle: "",
        };
    },

    computed: {
        ItemsGetTotal() {
            let total = 0;

            this.form.items.items.forEach((item) => {
                total += item.price;
            });

            return total;
        },
    },
    methods: {
        clearForm() {
            this.form.combobox = "";
            this.form.price = 0;
            this.form.items.items = [];
            this.form.items.total = 0;
            this.form.customer = "";
            this.customer_cnpj = "";
            this.form.date = "";
            this.form.description = "";
        },

        addItem() {
            const item = {
                name: this.form.combobox,
                price: this.form.price,
            };

            this.form.combobox && this.form.price
                ? this.form.items.items.push(item)
                : alert("The form is empity");

            this.form.items.total = this.ItemsGetTotal;
            this.form.combobox = "";
            this.form.price = 0;
        },

        removeItem(index) {
            this.form.items.items.splice(index, 1);
        },

        postData() {
            instance
                .post(
                    "/api/orders",
                    {
                        customer: this.form.customer,
                        user_id: "71e8f588-30ae-4fe3-b98f-0f31242de31f",
                        description: this.form.description,
                        order_items: this.form.items.items,
                    },
                    {
                        headers: {
                            Authorization: sessionStorage.getItem("token"),
                        },
                    },
                )
                .then((resp) => {
                    console.log(resp);

                    resp.status == 200
                        ? (this.toastTitle = "Sucess")
                        : (this.ToastTitle = "Fail");

                    this.toastContent = resp.data;

                    this.toast = true;

                    this.clearForm();
                });
        },

        saveForm() {
            this.clearForm();
        },
    },
    components: {
        AppButton,
        AppInput,
        VueNumber,
        AppCombobox,
        AppPanel,
        ComboboxAnchor,
        ComboboxArrow,
        ComboboxCancel,
        ComboboxContent,
        ComboboxGroup,
        ComboboxInput,
        ComboboxItem,
        ComboboxItemIndicator,
        ComboboxLabel,
        ComboboxPortal,
        ComboboxRoot,
        ComboboxSeparator,
        ComboboxTrigger,
        ComboboxViewport,
        ToastAction,
        ToastClose,
        ToastDescription,
        ToastProvider,
        ToastRoot,
        ToastTitle,
        ToastViewport,
    },
};
</script>
<template>
    <main class="grid grid-cols-4 gap-10 p-10">
        <AppPanel title_panel="Create service" class="col-span-2 col-start-2">
            <div class="grid grid-col-1 gap-30">
                <div class="grid grid-col-1">
                    <ComboboxRoot v-model="form.combobox" class="relative">
                        <ComboboxInput
                            class="w-72 px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold"
                            placeholder="Item descrition"
                            v-model="new_option"
                        />

                        <ComboboxContent
                            class="absolute z-10 mt-1 bg-white border-solid border-gray-300 border-0.5 rounded-md max-h-50"
                        >
                            <ComboboxViewport class="grid grid-cols-1 gap-1">
                                <div
                                    class="cursor-pointer hover:bg-blue-100 py-2 px-2"
                                    :value="new_option"
                                    @click="
                                        form.combobox = new_option;
                                        options.push(new_option);
                                    "
                                >
                                    Criar {{ new_option }}
                                </div>

                                <ComboboxItem
                                    v-for="(option, index) in options"
                                    :key="index"
                                    :value="option"
                                    class="cursor-pointer hover:bg-blue-100 py-2 px-2"
                                >
                                    {{ option }}
                                </ComboboxItem>
                            </ComboboxViewport>
                        </ComboboxContent>
                    </ComboboxRoot>

                    <div>
                        <vue-number
                            placeholder="Price"
                            class="px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold"
                            v-model.number="form.price"
                            v-bind="input_currency_config"
                        ></vue-number>
                    </div>

                    <div class="flex justify-end">
                        <AppButton
                            class="bg-blue-400 hover:bg-blue-300"
                            @click="addItem"
                        >
                            <span class="mr-3">Create new item</span>
                            <div class="i-basil:plus-solid text-3xl"></div>
                        </AppButton>
                    </div>
                </div>

                <table class="table-auto border-collapse">
                    <thead
                        class="border-y-solid border-gray-400 border-0.5 bg-gray-50"
                    >
                        <tr>
                            <th class="text-left py-3 pl-3">Item</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="form.items.items.length > 0">
                            <tr
                                v-for="(item, index) in form.items.items"
                                class="odd:bg-white even:bg-gray-100"
                            >
                                <td class="pl-3">{{ item.name }}</td>
                                <td class="text-center py-3">
                                    {{ localCurrency(item.price) }}
                                </td>
                                <td
                                    @click="removeItem(index)"
                                    class="i-basil:cross-outline text-2xl cursor-pointer"
                                ></td>
                            </tr>
                        </template>

                        <tr v-else class="p-5">
                            <td class="pl-3 py-3">No service items here !</td>
                        </tr>
                    </tbody>
                    <tfoot
                        class="border-y-solid border-gray-400 border-0.5 bg-gray-50"
                    >
                        <tr class="font-bold">
                            <td colspan="1" class="pl-3 py-3">Total</td>
                            <td class="text-center">
                                {{ localCurrency(form.items.total) }}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

                <div>
                    <label for="customer">Customer</label>
                    <br />
                    <AppInput
                        id="customer"
                        class="w-78"
                        v-model="form.customer"
                        placeholder="Customer name"
                    />
                </div>

                <div class="grid grid-col-1">
                    <label for="description" class="mb-2">Description</label>
                    <br />

                    <textarea
                        maxlength="200"
                        name="description"
                        placeholder="Description"
                        id="description"
                        class="col-span-1 h-48 resize-none p-2 rounded-sm outline-none bg-gray-100 font-semibold border-none"
                        v-model="form.description"
                    ></textarea>
                </div>
            </div>

            <div class="flex justify-end items-end mt-10">
                <AppButton
                    @click="clearForm()"
                    class="bg-rose-500 hover:bg-rose-400 mr-10"
                >
                    Discart
                </AppButton>
                <AppButton
                    @click="postData()"
                    class="bg-green-500 hover:bg-green-400"
                >
                    Save
                </AppButton>
            </div>
        </AppPanel>
    </main>

    <ToastProvider duration="5000">
        <ToastRoot
            class="bg-white border-1 border-solid border-gray-200 rounded-lg shadow-sm border p-2 list-none"
            v-model:open="toast"
        >
            <ToastTitle class="text-green-500"> {{ toastTitle }} </ToastTitle>
            <ToastDescription> {{ toastContent }} </ToastDescription>
        </ToastRoot>

        <ToastViewport class="fixed bottom-5 right-5" />
    </ToastProvider>
</template>

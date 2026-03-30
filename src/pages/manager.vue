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
    ToastViewport,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport,
    AutocompleteAnchor,
    AutocompleteArrow,
    AutocompleteCancel,
    AutocompleteContent,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteLabel,
    AutocompletePortal,
    AutocompleteRoot,
    AutocompleteTrigger,
    AutocompleteViewport,
} from "reka-ui";
import { options, component as VueNumber } from "@coders-tm/vue-number-format";
import { instance } from "@/axios.js";
import { useLocalCurrency } from "@/useLocalCurrency.js";
import { useWebsiteStore } from "@stores/store.js";

export default {
    data() {
        return {
            store: useWebsiteStore(),
            form: {
                combobox: "",
                price: 0,
                items: {
                    items: [],
                    total: 0,
                },
                payment: "Pix",
                customer: "Indefinido",
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
                "Adesivo de recorte",
            ],
            selected_option: options[0],
            new_option: "",
            useLocalCurrency: useLocalCurrency,
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
            this.form.payment = "";
            this.form.items.items = [];
            this.form.items.total = 0;
            this.form.customer = "Indefinido";
            this.customer_cnpj = "";
            this.form.date = "";
            this.form.description = "";
        },

        addItem() {
            const item = {
                name: this.form.combobox,
                price: this.form.price,
            };

            if (this.form.combobox && this.form.price) {
                this.form.items.items.push(item);
            } else {
                this.toast_content = "Existem campos vazios";
                this.toast_sucess = false;
                this.toast = true;
            }

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
                        user_id: "c186964f-18c9-4f41-bf37-87e49d86e032",
                        description: this.form.description,
                        order_items: this.form.items.items,
                        payment: this.form.payment,
                        user_id: this.store.user_id,
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

                    this.clearForm();
                })
                .catch((err) => {
                    this.toast_content = err;
                    this.toast_sucess = false;
                    this.toast = true;
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
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemIndicator,
        SelectItemText,
        SelectLabel,
        SelectPortal,
        SelectRoot,
        SelectScrollDownButton,
        SelectScrollUpButton,
        SelectSeparator,
        SelectTrigger,
        SelectValue,
        SelectViewport,
        AutocompleteAnchor,
        AutocompleteArrow,
        AutocompleteCancel,
        AutocompleteContent,
        AutocompleteEmpty,
        AutocompleteInput,
        AutocompleteItem,
        AutocompleteLabel,
        AutocompletePortal,
        AutocompleteRoot,
        AutocompleteTrigger,
        AutocompleteViewport,
    },
};
</script>
<template>
    <main class="grid grid-cols-6 gap-8 p-10">
        <AppPanel title_panel="Lancar no caixa" class="col-span-4 col-start-2">
            <div class="grid grid-col-1 gap-30">
                <div class="grid grid-col-1 gap-5">
                    <AutocompleteRoot v-model="form.combobox" class="relative">
                        <AutocompleteAnchor>
                            <AutocompleteInput
                                class="w-72 px-2 py-4 rounded-sm outline-none border-none bg-gray-100 font-semibold"
                                placeholder="Descrição do item"
                            />
                        </AutocompleteAnchor>

                        <AutocompleteContent
                            class="absolute z-10 bg-white border-solid border-gray-300 border-0.5 rounded-md max-h-50"
                        >
                            <AutocompleteViewport
                                class="grid grid-cols-1 gap-1"
                            >
                                <AutocompleteItem
                                    class="cursor-pointer hover:bg-blue-100 py-2 px-2"
                                    v-for="(item, index) in options"
                                    :key="index"
                                    :value="item"
                                >
                                    {{ item }}
                                </AutocompleteItem>
                            </AutocompleteViewport>

                            <AutocompleteArrow />
                        </AutocompleteContent>
                    </AutocompleteRoot>

                    <div>
                        <vue-number
                            placeholder="Preço"
                            class="px-2 py-4 rounded-sm outline-none border-none bg-gray-100 font-semibold"
                            v-model.number="form.price"
                            v-bind="input_currency_config"
                        ></vue-number>
                    </div>

                    <AppButton
                        class="bg-blue-400 hover:bg-blue-300"
                        @click="addItem"
                    >
                        <span class="mr-3">Criar novo item</span>
                        <div class="i-basil:plus-solid text-3xl"></div>
                    </AppButton>
                </div>

                <table class="table-auto border-collapse">
                    <thead
                        class="border-y-solid border-gray-400 border-0.5 bg-gray-50"
                    >
                        <tr>
                            <th class="text-left py-3 pl-3">Item</th>
                            <th>Preço</th>
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
                                    {{ useLocalCurrency(item.price) }}
                                </td>
                                <td
                                    @click="removeItem(index)"
                                    class="i-basil:cross-outline text-2xl cursor-pointer"
                                ></td>
                            </tr>
                        </template>

                        <tr v-else class="p-5">
                            <td class="pl-3 py-3">Sem items aqui !</td>
                        </tr>
                    </tbody>
                    <tfoot
                        class="border-y-solid border-gray-400 border-0.5 bg-gray-50"
                    >
                        <tr class="font-bold">
                            <td colspan="1" class="pl-3 py-3">Total</td>
                            <td class="text-center">
                                {{ useLocalCurrency(form.items.total) }}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

                <div>
                    <label for="customer">Cliente</label>
                    <br />
                    <AppInput
                        id="customer"
                        class="w-78"
                        v-model="form.customer"
                        placeholder="Customer name"
                    />
                </div>

                <div>
                    <label for="payment">Pagamento</label>
                    <br />
                    <SelectRoot id="payment" v-model="form.payment">
                        <SelectTrigger
                            class="min-w-32 px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold text-left cursor-pointer"
                            aria-label="Customise options"
                        >
                            <SelectValue placeholder="Forma de pagamento" />
                        </SelectTrigger>

                        <SelectPortal>
                            <SelectContent
                                class="absolute z-10 mt-1 bg-white border-solid border-gray-300 border-0.5 rounded-md max-h-50"
                            >
                                <SelectViewport class="grid grid-cols-1 gap-1">
                                    <SelectItem
                                        v-for="item in select_options"
                                        class="leading-none text-grass11 rounded-[3px] flex items-center select-none cursor-pointer py-2 px-1 hover:bg-blue-100"
                                        :value="item"
                                    >
                                        <SelectItemText>
                                            {{ item }}
                                        </SelectItemText>
                                        <SelectItemIndicator
                                            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                                        />
                                    </SelectItem>
                                </SelectViewport>
                            </SelectContent>
                        </SelectPortal>
                    </SelectRoot>
                </div>

                <div class="grid grid-col-1">
                    <label for="description" class="mb-2">Descrição</label>
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
                    Salvar
                </AppButton>
            </div>
        </AppPanel>
    </main>

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

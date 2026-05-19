<script>
import AppMain from "@/components/AppMain.vue";
import AppPanel from "@/components/AppPanel.vue";
import AppTable from "@/components/AppTable.vue";
import { useLocalCurrency } from "@/utils/useLocalCurrency";
import AppInput from "@/components/form/AppInput.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import { options, component as VueNumber } from "@coders-tm/vue-number-format";

export default {
    data() {
        return {
            useLocalCurrency: useLocalCurrency,
            table: {
                headers: ["ID", "Produto", "Preço"],
                products: [
                    {
                        id: 1,
                        name: "PEL. FUMÊ PARABRISA 35% PROFISSIONAL",
                        price: 200.0,
                    },
                    {
                        id: 2,
                        name: "PEL. FUMÊ PARABRISA 30% TERMICA",
                        price: 350.0,
                    },
                ],
            },
            form: {
                product_name: "",
                product_price: 0,
            },
            input_currency_config: {
                decimal: ",",
                separator: ".",
                prefix: "R$ ",
                precision: 2,
                masked: false,
            },
        };
    },
    mounted() {},
    methods: {
        clearForm() {
            this.form.product_name = "";
            this.form.product_price = 0;
        },
    },
    components: {
        AppMain,
        AppPanel,
        AppTable,
        AppInput,
        VueNumber,
        PrimaryButton,
    },
};
</script>
<template>
    <AppMain>
        <AppPanel
            title_panel="Criar novo registro de produtos"
            class="col-span-4 col-start-3"
        >
            <div class="flex gap-10 items-center">
                <AppInput
                    v-model="form.product_name"
                    placeholder="Nome do produto"
                />
                <VueNumber
                    placeholder="Preço"
                    class="px-2 h-12 my-3 rounded-sm outline-none border-none bg-gray-100 font-semibold"
                    v-model.number="form.product_price"
                    v-bind="input_currency_config"
                ></VueNumber>
                <PrimaryButton @click="clearForm()"> Registrar </PrimaryButton>
            </div>
        </AppPanel>
        <AppPanel
            title_panel="Registro de produtos"
            class="col-span-6 col-start-2"
        >
            <AppTable :headers="table.headers">
                <tr
                    v-for="row in table.products"
                    :key="row.id"
                    class="odd:bg-white even:bg-gray-100"
                >
                    <td class="whitespace-nowrap text-left p-4">
                        {{ row.id }}
                    </td>
                    <td class="whitespace-nowrap text-left p-4">
                        {{ row.name }}
                    </td>
                    <td class="whitespace-nowrap text-left p-4">
                        {{ useLocalCurrency(row.price) }}
                    </td>
                </tr>
            </AppTable>
        </AppPanel>
    </AppMain>
</template>

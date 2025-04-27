<script>

import AppButton from "@components/form/AppButton.vue";
import AppInput from "@components/form/AppInput.vue";
import AppCombobox from "@components/AppCombobox.vue";
import AppPanel from "@components/AppPanel.vue";
import {useWebsiteStore} from '@stores/store.js';
import { component as VueNumber } from '@coders-tm/vue-number-format'

export default {
    data() {
        return {
            currentPage: useWebsiteStore().currentPage,
            form: {
                combobox: "",
                price: 0,
                items: {
                    items: [],
                    total: 0,
                },
                customer: "",
                customer_cnpj: "",
                date: "",
                description: "",
            },
            input_currency_config: {
              decimal: ',',
              separator: '.',
              prefix: 'R$ ',
              precision: 2,
              masked: false,
            },
        }
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

        /*

        //adicionar removeItem()  !!!!!!!!!

        removeTag(index) {
            this.form.tags.splice(index, 1);
        },

        */

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
    },
};
</script>
<template>
    <AppPanel title_panel="Create service" class="col-span-4 col-start-3">
      <p>{{this.currentPage}}</p>
        <div class="grid grid-col-1 gap-30">
            <div class="grid grid-col-1">
                <AppCombobox placeholder='Item descrition' class="col-span-1" v-model="form.combobox" />

                <div >
                  <vue-number placeholder='Price' class="px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold" v-model.number="form.price" v-bind="input_currency_config"></vue-number>

                </div>


                <div class="flex justify-end">
                    <AppButton
                        class="bg-blue-400"
                        @click="addItem"
                    >
                        <span class="mr-3">Create new item</span>
                        <div class="i-basil:plus-solid text-3xl">

                        </div>
                    </AppButton>
                </div>
            </div>

            <table class='table-auto border-collapse'>
              <thead class="border-y-solid border-gray-400 border-0.5 bg-gray-50">
                <tr>
                  <th class='text-left py-3 pl-3'>Item</th>
                  <th>Price</th>
                </tr>

              </thead>
              <tbody>
                <template v-if="form.items.items.length > 0">
                  <tr v-for="item in form.items.items" class='odd:bg-white even:bg-gray-100'>
                    <td class='pl-3'>{{item.name}}</td>
                    <td class='text-center py-3'>R$ {{item.price}}</td>
                  </tr>
                </template>

                <tr v-else class="p-5">
                  <td class='pl-3 py-3'>No service items here !</td>
                </tr>

              </tbody>
              <tfoot class="border-y-solid border-gray-400 border-0.5 bg-gray-50">
                <tr class="font-bold">
                  <td colspan="1" class='pl-3 py-3'>Total</td>
                  <td class="text-center">R$ {{ form.items.total }}</td>
                </tr>
              </tfoot>
            </table>

            <div class="">
              <label for="customer">Customer</label>
              <br>
              <AppInput id="customer" class="w-78" v-model='form.customer' placeholder='Customer name'/>

              <div class="mt-5">
                <label for="customer_cnpj">CNPJ</label>
                <br>
                <AppInput id="customer_cnpj" class="w-78" v-model='form.customer_cnpj' placeholder='00000000-00/0000-0'/>
              </div>

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
                    v-model="form.descrition"
                ></textarea>
            </div>
        </div>

        <div class="flex justify-end items-end mt-10">
            <AppButton @click="clearForm()" class="bg-rose-500 mr-10">
                Discart
            </AppButton>
            <AppButton class='bg-green-500'> Save </AppButton>
        </div>
    </AppPanel>
</template>

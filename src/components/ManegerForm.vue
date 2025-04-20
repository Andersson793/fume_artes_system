<script>

import AppButton from "@components/form/AppButton.vue";
import AppInput from "@components/form/AppInput.vue";
import AppCombobox from "@components/AppCombobox.vue";
import AppPanel from "@components/AppPanel.vue";
import {useWebsiteStore} from '@stores/store.js'

export default {
    data() {
        return {
            currentPage: useWebsiteStore().currentPage,
            form: {
                combobox: "",
                price: "",
                items: {
                    items: [],
                    total: 0,
                },
                customer: "",
                customer_cnpj: "",
                date: "",
                description: "",
                finished: true,
            },
        };
    },

    mounted() {

        console.log(this.currentPage)

        this.currentPage = this.$route.name;
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
            this.form.price = "";
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
            this.form.price = "";
        },

        /*
        addTag(i) {
            if (i != "") {
                if (this.form.tags.length > 3) {
                    alert("To many tags");
                } else {
                    this.form.tags.push(i);
                }
            }
        },


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
                <AppCombobox class="col-span-1" v-model="form.combobox" />

                <div class="">
                  <input
                      type="number"
                      class="px-2 py-4 rounded-sm mt-5 grid-span-1"
                      placeholder="Price"
                      min="0"
                      v-model="form.price"
                  />
                </div>


                <div class="flex justify-end">
                    <button
                        class="bg-blue-200 rounded-sm p-3 w-fit inline-flex items-center mt-5 "
                        @click="addItem"
                    >
                        <span class="mr-3">Create new item</span>
                        <p> + </p>
                    </button>
                </div>
            </div>

            <div class="bg-fuchsia-200 ">
              <header class="bg-green-100 p-3 flex whitespace-nowrap">
                  Service items
              </header>
              <div class="text-lg">

                  <template v-if="form.items.items.length > 0">
                      <div
                          class="bg-red-100 rounded-sm p-2 flex whitespace-nowrap"
                          v-for="item in form.items.items"
                      >
                          <span class="mr-10 w-full uppercase">{{
                              item.name
                          }}</span>
                          <span> R$ {{ item.price }} </span>
                      </div>
                  </template>

                  <div v-else class="p-5">No service items here !</div>

              </div>

              <div class="bg-green-100 p-2 flex whitespace-nowrap">
                  <span class="font-bold mr-10 w-full">Total </span>
                  <span class="font-bold">
                      R$ {{ form.items.total }}</span
                  >
              </div>

            </div>

            <div class="">
              <label for="customer">Customer</label>
              <br>
              <AppInput id="customer" class="w-78" v-model='form.customer'/>

              <div class="mt-5">
                <label for="customer_cnpj">CNPJ</label>
                <br>
                <AppInput id="customer_cnpj" class="w-78" v-model='form.customer_cnpj'/>
              </div>

            </div>

            <div class="grid grid-col-1">
                <label for="description" class="mb-2">Description</label>
                <br />

                <textarea
                    maxlength="120"
                    name="description"
                    id="description"
                    class="col-span-1 h-48 resize-none p-2 rounded-sm"
                    v-model="form.descrition"
                ></textarea>
            </div>
        </div>

        <div class="flex justify-end items-end mt-10">
            <AppButton @click="clearForm" class="bg-rose-900 mr-10">
                Discart
            </AppButton>
            <AppButton> Save </AppButton>
        </div>
    </AppPanel>
</template>

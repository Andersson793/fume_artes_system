<script>
import {
    CircleEllipsis,
    Ellipsis,
    LucideEclipse,
    BirdIcon,
    Plus,
    CircleX,
} from "lucide-vue-next";
import AppButton from "@components/form/AppButton.vue";
import AppInput from "@components/form/AppInput.vue";
import AppCombobox from "@components/AppCombobox.vue";
import AppPanel from "@components/AppPanel.vue";
import { useWebsiteStore } from "@stores/store.js";

export default {
    data() {
        return {
            form: {
                combobox: "",
                price: "",
                items: {
                    items: [],
                    total: 0,
                },
                tags: [],
                date: "",
                description: "",
                finished: true,
            },
        };
    },

    mounted() {
        useWebsiteStore().currentPage = "manager";
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
            this.form.tags = [];
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

        addTag(i) {
            if (i != "") {
                if (this.form.tags.length > 3) {
                    alert("To many tags");
                } else {
                    this.form.tags.push(i);
                }
            }
        },

        removeTag(index) {
            this.form.tags.splice(index, 1);
        },

        saveForm() {
            this.clearForm();
        },
    },
    components: {
        CircleEllipsis,
        LucideEclipse,
        Ellipsis,
        BirdIcon,
        Plus,
        AppButton,
        AppInput,
        CircleX,
        AppCombobox,
        AppPanel,
    },
};
</script>
<template>
    <AppPanel title_panel="Create service" class="col-span-4 col-start-3">
        <div>
            <AppCombobox v-model="form.combobox" />

            <input
                type="number"
                class="px-2 py-4 rounded-sm mt-5"
                placeholder="Price"
                min="0"
                v-model="form.price"
            />

            <div class="flex justify-end">
                <button
                    class="bg-blue-200 rounded-sm p-3 w-fit inline-flex items-center mt-5 mb-14"
                    @click="addItem"
                >
                    <span class="mr-3">Create new item</span>
                    <Plus size="19" />
                </button>
            </div>
        </div>

        <div class="bg-fuchsia-200 my-10">
            <ul>
                <li class="bg-green-100 p-2 flex whitespace-nowrap">
                    Service items
                </li>
                <div></div>

                <template v-if="form.items.items.length > 0">
                    <li
                        class="bg-red-100 rounded-sm p-2 flex whitespace-nowrap"
                        v-for="item in form.items.items"
                    >
                        <span class="mr-10 w-full uppercase">{{
                            item.name
                        }}</span>
                        <span> R$ {{ item.price }} </span>
                    </li>
                </template>

                <li v-else class="p-5">No service items here !</li>

                <li class="bg-green-100 p-2 flex whitespace-nowrap">
                    <span class="font-bold mr-10 w-full">Total </span>
                    <span class="font-bold"> R$ {{ form.items.total }}</span>
                </li>
            </ul>
        </div>

        <div class="mt-10">
            <label for="description" class="mb-2">Description</label>
            <textarea
                maxlength="120"
                name="desciption"
                id="description"
                class="w-full h-48 resize-none p-2 rounded-sm"
                v-model="form.description"
            ></textarea>
        </div>

        <div class="flex justify-end items-end mt-10">
            <AppButton @click="clearForm" class="bg-rose-900 mr-10">
                Discart
            </AppButton>
            <AppButton> Save </AppButton>
        </div>
    </AppPanel>
</template>

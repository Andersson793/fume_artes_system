<script>
import {
    CircleEllipsis,
    Ellipsis,
    LucideEclipse,
    BirdIcon,
    Plus,
    CircleX,
} from "lucide-vue-next";
import AppButton from "~/components/form/AppButton.vue";
import AppInput from "~/components/form/AppInput.vue";
import { Switch } from "@headlessui/vue";

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
        Switch,
    },
};
</script>
<template>
    <AppPanel title_panel="Create service" class="col-span-8">
        <div class="flex flex-col">
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-2">
                    <div>
                        <AppCombobox v-model="form.combobox" />

                        <input
                            type="number"
                            class="px-2 py-4 w-48 mr-3 rounded-sm mt-5"
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
                                <span class="font-bold mr-10 w-full"
                                    >Total
                                </span>
                                <span class="font-bold">
                                    R$ {{ form.items.total }}</span
                                >
                            </li>
                        </ul>
                    </div>

                    <div class="mt-10">
                        <label for="description" class="mb-2"
                            >Description</label
                        >
                        <textarea
                            maxlength="120"
                            name="desciption"
                            id="description"
                            class="w-full h-48 resize-none p-2 rounded-sm"
                            v-model="form.description"
                        ></textarea>
                    </div>
                </div>

                <div>
                    <div>
                        <div class="bg-blue-300 py-3 px-2 font-bold">Tags</div>

                        <div
                            class="bg-blue-200 flex flex-wrap items-center min-h-16 px-2 mb-5"
                        >
                            <div
                                v-for="(item, index) in form.tags"
                                :key="index"
                                class="py-2 px-3 rounded-3xl bg-yellow-300 flex items-center justify-center w-fit mx-2"
                            >
                                <small>{{ item }}</small>
                                <div
                                    class="w-5 h-5 bg-blue-100 rounded-full flex justify-center items-center cursor-pointer ml-2"
                                    @click="removeTag(index)"
                                >
                                    <CircleX />
                                </div>
                            </div>
                        </div>
                        <AppInput
                            placeholder="Add new tag"
                            :action="addTag"
                            maxLength="15"
                        />
                    </div>

                    <div class="my-10">
                        <div
                            class="flex items-center justify-between bg-green-200 p-2"
                        >
                            <p class="font-bold">It's already finished</p>
                            <Switch
                                v-model="form.finished"
                                :class="
                                    form.finished
                                        ? 'bg-teal-900'
                                        : 'bg-teal-700'
                                "
                                class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="
                                        form.finished
                                            ? 'translate-x-5'
                                            : 'translate-x-0'
                                    "
                                    class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                                />
                            </Switch>
                        </div>
                    </div>
                    <div class="flex justify-end items-end mt-10">
                        <AppButton @click="clearForm" class="bg-rose-900 mr-10">
                            Discart
                        </AppButton>
                        <AppButton> Save </AppButton>
                    </div>
                </div>
            </div>
        </div>
    </AppPanel>
</template>

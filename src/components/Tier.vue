<script>
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from "@headlessui/vue";

export default {
    data() {
        return {
            value: "",
            query: "",
            items: [
                "model",
                "test",
                "mono",
                "pong",
                "ping",
                "meta",
                "mutant",
                "motor",
            ],
        };
    },
    props: {
        change: Function,
    },
    computed: {
        newValue() {
            if (this.query != "") {
                return this.query;
            }
        },

        filteredItems() {
            if (this.value) {
                return this.items.slice(0, 5);
            } else {
                const filtered = this.items.filter((item) =>
                    item.toLowerCase().includes(this.query.toLowerCase()),
                );

                return filtered.slice(0, 5);
            }
        },
    },
    components: {
        Combobox,
        ComboboxInput,
        ComboboxOption,
        ComboboxOptions,
    },
};
</script>
<template>
    <Combobox v-model="value">
        <ComboboxInput
            class="bg-green-100 border-none rounded-sm p-4 text-sm leading-5 text-gray-900 focus:ring-0 w-full"
            @change="
                query = $event.target.value;
                change(value);
            "
            name="ident"
            placeholder="Item name"
        />
        <ComboboxOptions>
            <ComboboxOption :value="newValue">
                Create item: {{ newValue }}
            </ComboboxOption>
            <ComboboxOption
                v-for="item in filteredItems"
                :value="item"
                :key="item"
            >
                {{ item }}
            </ComboboxOption>
        </ComboboxOptions>
    </Combobox>
</template>

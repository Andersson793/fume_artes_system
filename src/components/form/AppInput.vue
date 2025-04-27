<script>
import { useWebsiteStore } from "@stores/store";

export default {
    data() {
        return {
            id: useWebsiteStore().id,
            inputValue: undefined,
        };
    },
    props: {
        value: {
            type: String,
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
        },
        label: {
            type: String,
        },
        action: {
            type: Function,
        },
    },
};
</script>
<template>
    <input
        :id="id"
        :type="$props.type"
        :placeholder="$props.placeholder"
        class="px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold"
        v-model="inputValue"
    />
</template>

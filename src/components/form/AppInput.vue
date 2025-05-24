<script>
import { useWebsiteStore } from "@stores/store";

export default {
    data() {
        return {
            id: useWebsiteStore().id,
        };
    },
    props: ["modelValue"],
    emits: ["update:modelValue"],
};
</script>
<template>
    <input
        :id="id"
        class="px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

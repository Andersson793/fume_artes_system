<script>
import { useWebsiteStore } from "@stores/store";

export default {
    data() {
        return {
            id: useWebsiteStore().id,
        };
    },
};
</script>
<template>
    <input
        :id="id"
        class="px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold"
    />
</template>

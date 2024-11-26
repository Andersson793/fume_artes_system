<script>
import { HouseIcon } from "lucide-vue-next";

export default {
    data() {
        return {
            icon: "HouseIcon",
        };
    },
    components: { HouseIcon },
};
</script>
<template>
    <li
        class="hover:bg-blue-400 py-3 pl-5 rounded-md cursor-pointer inline-flex items-center w-full"
    >
        <slot name="icon" />
        <span class="ml-5 font-bold">
            <slot />
        </span>
    </li>
</template>

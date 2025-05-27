<script>
export default {
    data() {
        return {};
    },
    props: {
        title_panel: String,
        cols: {
            type: Number,
            default: 1,
        },
        reload: Function,
    },
};
</script>
<template>
    <div class="rounded-md max-h-fit border-solid border-gray-300">
        <header class="flex items-center justify-between px-5 py-5 font-bold">
            <h3 v-if="title_panel">{{ title_panel }}</h3>
            <div v-if="reload">
                <div
                    class="i-basil:refresh-outline cursor-pointer text-lg"
                    @click="reload"
                ></div>
            </div>
        </header>
        <div class="py-6 px-5">
            <slot />
        </div>
    </div>
</template>

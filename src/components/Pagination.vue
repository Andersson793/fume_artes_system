<script>
export default {
    props: {
        pages: {
            type: Number,
            require: true,
        },
        currentPage: {
            type: Number,
            default: 0,
        },
        changeCurrentPage: {
            type: Function,
        },
    },
    methods: {
        changePage(i) {
            if (i >= 0 && i <= this.$props.pages) {
                this.$props.changeCurrentPage(i);
            }
        },
    },
};
</script>
<template>
    <div class="inline-flex">
        <div
            v-for="(item, index) in $props.pages"
            class="hover:bg-blue-200 w-8 h-8 mx-2 rounded-full cursor-pointer select-none flex justify-center items-center"
            :class="{ 'bg-gray-200': index === $props.currentPage }"
            @click="changeCurrentPage(index)"
        >
            {{ index + 1 }}
        </div>
    </div>
</template>

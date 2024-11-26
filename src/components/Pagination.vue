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
    <div>
        <span
            v-for="(item, index) in $props.pages"
            class="hover:bg-purple-200 py-2 px-3 mx-2 rounded-md cursor-pointer select-none"
            :class="{ 'bg-red-500': index === $props.currentPage }"
            @click="changeCurrentPage(index)"
        >
            {{ index + 1 }}
        </span>
    </div>
</template>

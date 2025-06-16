<script>
export default {
    mounted() {
        this.$props.changeData(this.PageSlice());
    },
    updated() {
        this.$props.changeData(this.PageSlice());
    },
    props: {
        items: Array,
        page: Number,
        changeCurrentPage: Function,
        changeData: Function,
    },
    methods: {
        changePage(i) {
            if (i >= 0 && i <= this.PageSlice().length) {
                this.$props.changeCurrentPage(i);
            }
        },

        PageSlice() {
            //change this
            const itemsPerPage = 5;

            const tableItems = this.$props.items;

            let pageItems = [];

            for (let i = 0; i < tableItems.length; i += itemsPerPage) {
                pageItems.push(tableItems.slice(i, i + itemsPerPage));
            }

            return pageItems;
        },
    },
};
</script>
<template>
    <div class="flex items-center">
        <div
            v-for="(item, index) in PageSlice().length"
            class="hover:bg-blue-200 w-8 h-8 mx-3 rounded-full cursor-pointer select-none flex justify-center items-center"
            :class="{ 'bg-gray-200': index === $props.page }"
            @click="changePage(index)"
        >
            {{ index + 1 }}
        </div>

        <div class="ml-6">{{ $props.items.length }} Items</div>
    </div>
</template>

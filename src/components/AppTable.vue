<script>
import Pagination from "./Pagination.vue";

export default {
    data() {
        return {
            page: 0,
            pageItems: [],
        };
    },
    props: {
        data: Array,
        headers: Array,
        removeItem: Function,
    },

    methods: {
        changeCurrentPage(i) {
            this.page = i;
        },
    },
    computed: {
        /*
      PageSlice() {
          const itemsPerPage = 5;
          const tableItems = this.$props.data;

          let pageItems = [];

          for (let i = 0; i < tableItems.length; i += itemsPerPage) {
              pageItems.push(tableItems.slice(i, i + itemsPerPage));
          }

          this.pageItems = pageItems;

          return pageItems;
      },

      */
    },
    components: { Pagination },
};
</script>
<template>
    <table class="table-auto w-full mb-5 border-collapse">
        <thead class="bg-blue-100">
            <tr>
                <th
                    class="font-semibold whitespace-nowrap text-left py-4 px-5 border-y border-blue-red-100"
                    v-for="item in $props.headers"
                >
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <slot />
        </tbody>
    </table>
</template>

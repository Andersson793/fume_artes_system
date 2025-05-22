import { defineStore } from "pinia";
import { useId } from "vue";

export const useWebsiteStore = defineStore("store", {
  state: () => ({
    id: useId(),
    currentPage: "any",
    loged: false,
  }),
  actions: {
    changePage(value) {
      this.currentPage = value;
    },
  },
});

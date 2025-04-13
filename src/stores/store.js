import { defineStore } from "pinia";
import { useId } from "vue";

export const useWebsiteStore = defineStore("store", {
  state: () => ({
    id: useId(),
    currentPage: "Home",
  }),
});

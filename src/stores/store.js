import { defineStore } from "pinia";
import { useId } from "vue";

export const useWebsiteStore = defineStore("store", {
  state: () => ({
    name: "",
    id: useId(),
    loged: false,
    email: "",
  }),
});

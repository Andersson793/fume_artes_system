import { defineStore } from "pinia";
import { useId } from "vue";

export const useWebsiteStore = defineStore("store", {
  state: () => ({
    email: "",
    name: "",
    user_id: "",
    loged: false,
  }),
});

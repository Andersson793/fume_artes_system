import { defineStore } from "pinia";

export const useWebsiteStore = defineStore("store", {
  state: () => ({
    email: "",
    name: "",
    user_id: "",
    loged: false,
  }),
});

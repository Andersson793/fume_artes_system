<script>
import AppMain from "@/components/app/AppMain.vue";
import AppButton from "@/components/form/AppButton.vue";
import AppInput from "@/components/form/AppInput.vue";
import AppPanel from "@/components/AppPanel.vue";
import { useWebsiteStore } from "@stores/store.js";
import { instance } from "@/axios";

export default {
    data() {
        return {
            store: useWebsiteStore(),
            data: {},
        };
    },
    mounted() {
        instance
            .get("/users/71e8f588-30ae-4fe3-b98f-0f31242de31f")
            .then((response) => {
                this.data = response.data;
            });
    },
    components: { AppInput, AppButton, AppMain, AppPanel },
};
</script>
<template>
    <AppMain>
        <AppPanel title_panel="User information" class="col-span-4 col-start-3">
            <div>
                <div class="py-5">
                    <span>User name</span>
                    <p class="text-lg">{{ data.name }}</p>
                </div>
                <div class="py-5">
                    <span>Email</span>
                    <p class="text-lg">{{ data.email }}</p>
                </div>
                <div class="py-5">
                    <span>Account</span>
                    <p class="text-lg">type: {{ data.type }}</p>
                    <p class="text-lg">
                        Created at
                        {{
                            new Date(data.created_at).toLocaleString("pt-BR", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            })
                        }}
                    </p>
                </div>
            </div>
        </AppPanel>
    </AppMain>
</template>

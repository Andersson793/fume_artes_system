<script>
import AppMain from "@/components/AppMain.vue";
import AppButton from "@/components/form/AppButton.vue";
import AppInput from "@/components/form/AppInput.vue";
import AppPanel from "@/components/AppPanel.vue";
import { useWebsiteStore } from "@stores/store.js";
import { instance } from "@/axios.js";

export default {
    data() {
        return {
            store: useWebsiteStore(),
            data: {},
        };
    },
    mounted() {
        //fix this -> the component fetch the api for each mount

        instance
            .get("/api/users/c186964f-18c9-4f41-bf37-87e49d86e032", {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                this.data = response.data;
            });
    },
    components: { AppInput, AppButton, AppMain, AppPanel },
};
</script>
<template>
    <AppMain>
        <AppPanel
            title_panel="Informações do usuário"
            class="col-span-4 col-start-3"
        >
            <div>
                <div class="py-5">
                    <span>Nome</span>
                    <p class="text-lg">{{ data.name }}</p>
                </div>
                <div class="py-5">
                    <span>Login</span>
                    <p class="text-lg">{{ data.email }}</p>
                </div>
                <div class="py-5">
                    <span>Conta</span>
                    <p class="text-lg">tipo: {{ data.type }}</p>
                    <p class="text-lg">
                        Criado em
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

<script>
import AppInput from "@components/form/AppInput";
import AppButton from "@components/form/AppButton";
import { instance } from "@/axios.js";
import { useWebsiteStore } from "@stores/store.js";

import {
    ToastTitle,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastViewport,
} from "reka-ui";

export default {
    data() {
        return {
            email: "anderssonsilva793@gmail.com",
            password: "",
            toastOpen: false,
            toastContent: "",
        };
    },
    methods: {
        Login() {
            instance
                .post("/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    if (response.status === 200) {
                        sessionStorage.setItem("token", response.data.token);

                        this.toastOpen = true;

                        let store = useWebsiteStore();

                        store.$patch({
                            loged: true,
                            email: response.data.user_email,
                            name: response.data.user_name,
                        });
                    } else {
                        alert(response.message);
                    }
                })
                .catch((err) => {
                    this.toastOpen = true;
                    this.toastContent = err;
                });
        },
    },
    components: {
        AppInput,
        AppButton,
        ToastTitle,
        ToastAction,
        ToastClose,
        ToastDescription,
        ToastProvider,
        ToastRoot,
        ToastViewport,
    },
};
</script>
<template>
    <div class="h-screen flex justify-center items-center">
        <div
            class="w-fit px-10 py-3 rounded-md max-h-fit border-solid border-gray-300"
        >
            <div class="text-center">
                <h3>Login</h3>
            </div>
            <form @submit.prevent="onsubmit" class="">
                <div>
                    <label>Login</label>
                    <br />
                    <AppInput v-model="email" placeholder="Login" />
                </div>
                <div class="mt-10">
                    <label>Senha</label>
                    <br />
                    <AppInput v-model="password" placeholder="Senha" />
                </div>

                <div class="text-center mt-10">
                    <AppButton class="bg-blue-400" @click="Login"
                        >Entrar</AppButton
                    >
                </div>
            </form>
        </div>
    </div>

    <ToastProvider>
        <ToastRoot
            class="bg-white border-1 border-solid border-gray-300 rounded-lg shadow-sm border p-2 list-none"
            v-model:open="toastOpen"
        >
            <ToastTitle class="text-red-500"> Erro ! </ToastTitle>
            <ToastDescription>
                <p>Algo deu errado com seu login, tente novamente</p>

                <p class="text-yellow-600">{{ toastContent }}</p>
            </ToastDescription>
        </ToastRoot>

        <ToastViewport class="fixed bottom-5 right-5" />
    </ToastProvider>
</template>

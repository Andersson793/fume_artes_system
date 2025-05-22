<script>
import AppInput from "@components/form/AppInput";
import AppButton from "@components/form/AppButton";
import { instance } from "@/axios.js";
import { useWebsiteStore } from "@stores/store.js";
import AInput from "../components/form/AInput.vue";

export default {
    data() {
        return {
            email: "anderssonsilva793@gmail.com",
            password: "admin27",
        };
    },
    methods: {
        async Login() {
            await instance
                .get("/login", {
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                })
                .then((response) => {
                    if (response.status == 200) {
                        sessionStorage.setItem("token", response.data);
                        let store = useWebsiteStore();

                        store.$patch({
                            loged: true,
                        });

                        console.log(store.loged);
                    }
                });
        },
    },
    components: {
        AppInput,
        AppButton,
        AInput,
    },
};
</script>
<template>
    <div class="h-screen flex justify-center items-center">
        <div
            class="w-fit px-10 py-3 rounded-md max-h-fit border-solid border-gray-300"
        >
            <div class="text-center">
                <h3>Login here</h3>
            </div>
            <form @submit.prevent="onsubmit" class="">
                <div>
                    <label>Email</label>
                    <br />
                    <AppInput v-model="email" placeholder="Email" />
                </div>
                <div class="mt-10">
                    <label>Password</label>
                    <br />
                    <AInput v-model="password" placeholder="Password" />
                </div>

                <div class="text-center mt-10">
                    <AppButton class="bg-blue-300" @click="Login"
                        >Entrar</AppButton
                    >
                </div>
            </form>
        </div>
    </div>
</template>

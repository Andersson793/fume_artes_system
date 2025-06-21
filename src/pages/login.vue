<script>
import AppInput from "@components/form/AppInput";
import AppButton from "@components/form/AppButton";
import { instance } from "@/axios.js";
import { useWebsiteStore } from "@stores/store.js";

export default {
    data() {
        return {
            email: "anderssonsilva793@gmail.com",
            password: "",
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
                    if (response.status == 200) {
                        sessionStorage.setItem("token", response.data.token);

                        console.log(response.data.user_name);

                        let store = useWebsiteStore();

                        store.$patch({
                            loged: true,
                            email: response.data.user_email,
                            name: response.data.user_name,
                        });
                    } else {
                        alert("Login Failed");
                    }
                });
        },
    },
    components: {
        AppInput,
        AppButton,
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
                    <AppInput v-model="password" placeholder="Password" />
                </div>

                <div class="text-center mt-10">
                    <AppButton class="bg-blue-400" @click="Login"
                        >Entrar</AppButton
                    >
                </div>
            </form>
        </div>
    </div>
</template>

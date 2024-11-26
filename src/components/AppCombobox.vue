<script>
import AppInput from "./form/AppInput.vue";

export default {
    props: {
        value: String,
    },
    components: {
        AppInput,
    },
};
</script>
<template>
    <AppInput />
</template>

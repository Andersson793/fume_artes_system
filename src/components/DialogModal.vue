<script>
export default {
    props: {
        open: Boolean,
        title: String,
        content: String,
    },
};
</script>
<template>
    <div
        v-if="$props.open"
        class="fixed w-fit p-5 bg-white rounded-md max-h-fit border-solid border-gray-300 top-50% left-50% translate-x-[-50%] translate-y-[-50%] z-10"
    >
        <p class="text-lg font-bold">{{ $props.title }}</p>
        <div class="grid gap-7">
            <slot />
        </div>
        <div class="flex justify-end mt-8">
            <slot name="footer" />
        </div>
    </div>
</template>

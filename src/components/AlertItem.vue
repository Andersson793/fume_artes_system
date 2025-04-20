<script>
export default {
    props: {
        user: {
            type: String,
            default: "user undefined",
        },
        date: {
            type: String,
        },
        body: {
            type: String,
            default: "",
        },
        index: {
            type: Number,
        },
        remove: {
            type: Function,
        },
    },

};
</script>
<template>
    <div class="bg-gray-200 p-1 rounded-md mb-10">
        <div class="flex justify-end items-center py-1.5 text-sm">
            <span>
                {{ $props.date }}
            </span>
            <span class="mx-5">
                {{ $props.user }}
            </span>
            <span class="cursor-pointer i-basil:cross-solid text-3xl" @click="$props.remove($props.index)">

            </span>
        </div>
        <div class="p-2 bg-white rounded-md">
            <p>{{ $props.body }}</p>
        </div>
    </div>
</template>

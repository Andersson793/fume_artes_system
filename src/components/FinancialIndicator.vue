<template>
    <div class="flex">
        <div class="p-2 bg-gray-200 rounded-tl-md rounded-bl-md">
            <slot name="label" />
        </div>
        <div
            class="bg-blue-400 w-full h-full flex px-2 font-bold text-lg text-white items-center justify-center rounded-tr-md rounded-br-md"
        >
            <slot name="value" />
        </div>
    </div>
</template>

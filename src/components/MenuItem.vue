<template>
    <div
        class="hover:bg-blue-400 py-3 rounded-md cursor-pointer inline-flex items-center w-full"
    >
        <slot name="icon" />
        <span class="ml-5 font-bold">
            <slot />
        </span>
    </div>
</template>

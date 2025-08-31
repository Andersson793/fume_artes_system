<script>
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from "reka-ui";
export default {
    data() {
        return {
            payment: "",
            select_options: [
                "Pix",
                "Cartão de crédito",
                "Cartão de débito",
                "Dinheiro",
            ],
        };
    },
    components: {
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemIndicator,
        SelectItemText,
        SelectLabel,
        SelectPortal,
        SelectRoot,
        SelectScrollDownButton,
        SelectScrollUpButton,
        SelectSeparator,
        SelectTrigger,
        SelectValue,
        SelectViewport,
    },
};
</script>
<template>
    <SelectRoot id="payment" v-model="payment">
        <SelectTrigger
            class="min-w-32 px-2 py-4 mt-3 rounded-sm outline-none border-none bg-gray-100 font-semibold text-left cursor-pointer"
            aria-label="Customise options"
        >
            <SelectValue placeholder="Forma de pagamento" />
        </SelectTrigger>

        <SelectPortal>
            <SelectContent
                class="absolute z-10 mt-1 bg-white border-solid border-gray-300 border-0.5 rounded-md max-h-50"
            >
                <SelectViewport class="grid grid-cols-1 gap-1">
                    <SelectItem
                        v-for="item in select_options"
                        class="leading-none text-grass11 rounded-[3px] flex items-center select-none cursor-pointer py-2 px-1 hover:bg-blue-100"
                        :value="item"
                    >
                        <SelectItemText>
                            {{ item }}
                        </SelectItemText>
                        <SelectItemIndicator
                            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                        />
                    </SelectItem>
                </SelectViewport>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>

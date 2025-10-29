<script setup>
import { computed } from 'vue';
import IconAwesome from './IconAwesome.vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'danger', 'success', 'warning', 'ghost'].includes(value)
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['square', 'sm', 'md', 'lg'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
    iconColor: {
        type: String,
        default: null
    },
    iconSize: {
        type: String,
        default: null
    },
    iconPosition: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'right'].includes(value)
    },
    type: {
        type: String,
        default: 'button'
    }
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
};

const buttonClasses = computed(() => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';
    
    const variantClasses = {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
        danger: 'bg-[#F64E70] text-white hover:bg-[#e53f61]',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border border-gray-300',
        neutral: 'bg-light-100 text-gray-500 hover:bg-light-200 border border-gray-300',
    };

    const sizeClasses = {
        square: 'p-2 aspect-square',
        sm: 'px-2.5 py-2 text-sm gap-1',
        md: 'px-4 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2'
    };

    return [
        baseClasses,
        variantClasses[props.variant],
        sizeClasses[props.size],
        props.disabled || props.loading ? 'opacity-60 cursor-not-allowed' : ''
    ];
});
</script>

<template>
    <button
        :type="type"
        :class="buttonClasses"
        :disabled="disabled || loading"
        @click="handleClick"
    >
        <template v-if="loading">
            <IconAwesome icon-name="spinner" class="animate-spin" :color="iconColor" :size="iconSize" />
            <span v-if="size !== 'square'">Carregando...</span>
        </template>

        <template v-else>
            <IconAwesome 
                v-if="icon && iconPosition === 'left'" 
                :icon-name="icon" 
                :color="iconColor"
                :size="iconSize"
                class="shrink-0"
            />
            
            <span v-if="$slots.default || size !== 'square'" class="whitespace-nowrap">
                <slot></slot>
            </span>

            <IconAwesome 
                v-if="icon && iconPosition === 'right'" 
                :icon-name="icon" 
                :color="iconColor"
                :size="iconSize"
                class="shrink-0"
            />
        </template>
    </button>
</template>
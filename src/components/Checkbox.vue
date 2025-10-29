<script setup>
import { computed } from 'vue';
import IconAwesome from './IconAwesome.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'success', 'danger', 'warning'].includes(value)
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const variantClasses = computed(() => {
    const variants = {
        primary: 'checked:bg-primary checked:border-primary focus:ring-primary-200',
        success: 'checked:bg-secondary checked:border-secondary focus:ring-secondary-200',
        danger: 'checked:bg-red-500 checked:border-red-500 focus:ring-red-200',
        warning: 'checked:bg-yellow-500 checked:border-yellow-500 focus:ring-yellow-200'
    };
    return variants[props.variant];
});

const handleChange = (event) => {
    if (!props.disabled) {
        emit('update:modelValue', event.target.checked);
        emit('change', event.target.checked);
    }
};
</script>

<template>
    <label 
        :class="[
            'inline-flex items-center cursor-pointer transition-all duration-200',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80',
            $attrs.class
        ]"
    >
        <div class="relative flex items-center">
            <input
                type="checkbox"
                :checked="modelValue"
                :disabled="disabled"
                :class="[
                    'w-5 h-5 appearance-none border-2 rounded transition-all duration-200',
                    'border-gray-300 bg-white focus:outline-none focus:ring-2',
                    variantClasses,
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                ]"
                @change="handleChange"
                v-bind="$attrs"
            />
            
            <div
                v-if="modelValue"
                class="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <IconAwesome
                    icon-name="check"
                    icon-style="solid"
                    size="12px"
                    color="white"
                />
            </div>
        </div>

        <span 
            v-if="label"
            :class="[
                'ml-2 select-none transition-colors duration-200 text-base',
                disabled ? 'text-gray-500' : 'text-gray-700'
            ]"
        >
            {{ label }}
        </span>
    </label>
</template>

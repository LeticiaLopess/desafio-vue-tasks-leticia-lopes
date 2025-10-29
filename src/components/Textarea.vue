<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    rows: {
        type: Number,
        default: 4
    },
    maxlength: {
        type: Number,
        default: null
    },
    showCharCount: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'blur']);

const textareaClasses = computed(() => {
    const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors';
    
    if (props.error) {
        return `${baseClasses} border-red-500`;
    }

    if (props.disabled) {
        return `${baseClasses} border-gray-300 bg-gray-100 text-gray-500`;
    }
    
    return `${baseClasses} border-gray-300`;
});

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};

const handleBlur = (event) => {
    emit('blur', event);
};
</script>

<template>
    <div>
        <div v-if="label || showCharCount" class="flex justify-between items-center mb-1">
            <label v-if="label" :for="label" class="block text-sm font-medium text-gray-700">
                {{ label }} <span v-if="required" class="text-red-500">*</span>
            </label>
            <span 
                v-if="showCharCount && maxlength" 
                class="text-xs text-gray-500" 
                :class="modelValue.length > maxlength ? 'text-red-500' : ''"
            >
                {{ modelValue.length }}/{{ maxlength }}
            </span>
        </div>
        
        <textarea
            :id="label"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :rows="rows"
            :maxlength="maxlength"
            :class="textareaClasses"
            @input="handleInput"
            @blur="handleBlur"
        />
        
        <p v-if="error" class="mt-1 text-sm text-red-600">
            {{ error }}
        </p>
    </div>
</template>
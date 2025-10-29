<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'md', 
        validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
});

const emit = defineEmits(['update:show', 'close']);

const close = () => {
    emit('update:show', false);
    emit('close');
};

const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
        close();
    }
};

const handleEscapeKey = (event) => {
    if (event.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
});

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
};
</script>

<template>
    <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-50"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-50"
        leave-to-class="opacity-0"
    >
        <div
            v-if="show"
            class="fixed inset-0 z-50 bg-black opacity-60!"
        ></div>
    </transition>

    <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
    >
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click="handleBackdropClick"
        >
            <div
                :class="[
                    'w-full bg-white rounded-lg shadow-xl',
                    sizeClasses[size]
                ]"
            >
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">
                        {{ title }}
                    </h3>
                    <button
                        @click="close"
                        class="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-6">
                    <slot></slot>
                </div>

                <div v-if="$slots.footer" class="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import IconAwesome from '../IconAwesome.vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: 'all'
    },
    label: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    showFilterIcon: {
        type: Boolean,
        default: true
    },
    taskCounts: {
        type: Object,
        default: () => ({
            total: 0,
            pending: 0,
            finished: 0
        })
    }
});

const emit = defineEmits(['update:modelValue', 'blur']);

const isOpen = ref(false);

const selectedLabel = computed(() => {
    switch (props.modelValue) {
        case 'pending':
            return 'Pendentes';

        case 'finished':
            return 'Concluídas';
            
        case 'all':
        default:
            return 'Todas as tarefas';
    }
});

const totalCount = computed(() => props.taskCounts.total || 0);
const pendingCount = computed(() => props.taskCounts.pending || 0);
const finishedCount = computed(() => props.taskCounts.finished || 0);

const toggleDropdown = () => {
    if (!props.disabled) {
        isOpen.value = !isOpen.value;
    }
};

const selectOption = (value) => {
    emit('update:modelValue', value);
    isOpen.value = false;
};

const handleBlur = (event) => {
    setTimeout(() => {
        isOpen.value = false;
    }, 150);

    emit('blur', event);
};

const handleClickOutside = (event) => {
    const dropdown = event.target.closest('.relative');
    if (!dropdown) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="relative inline-block text-left">
        <button
            type="button"
            :id="label"
            :disabled="disabled"
            :class="[
                'inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-md focus:outline-none transition-all duration-200',
                'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                error ? 'border-red-500' : '',
                disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer',
                $attrs.class
            ]"
            @click="toggleDropdown"
            @blur="handleBlur"
        >
            <span class="flex items-center mr-2">
                <IconAwesome
                    v-if="showFilterIcon"
                    icon-name="filter"
                    icon-style="solid"
                    size="14px"
                    color="#6B7280"
                    class="mr-2"
                />
                {{ selectedLabel }}
            </span>
            <IconAwesome
                icon-name="chevron-down"
                icon-style="solid"
                size="12px"
                color="#6B7280"
                :class="['transition-transform duration-200', isOpen ? 'rotate-180' : '']"
            />
        </button>

        <div
            v-if="isOpen"
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none"
        >
            <div class="py-1">
                <button
                    type="button"
                    :class="[
                        'flex items-center w-full px-4 py-2 text-sm transition-colors duration-150 cursor-pointer',
                        modelValue === 'all' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    ]"
                    @mousedown="selectOption('all')"
                >
                    <IconAwesome
                        icon-name="bars"
                        icon-style="solid"
                        size="14px"
                        :color="modelValue === 'all' ? '#3B82F6' : '#6B7280'"
                        class="mr-3"
                    />
                    <span>Todas as tarefas</span>
                    <span class="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {{ totalCount }}
                    </span>
                </button>

                <button
                    type="button"
                    :class="[
                        'flex items-center w-full px-4 py-2 text-sm transition-colors duration-150 cursor-pointer',
                        modelValue === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'text-gray-700 hover:bg-gray-100'
                    ]"
                    @mousedown="selectOption('pending')"
                >
                    <IconAwesome
                        icon-name="clock"
                        icon-style="solid"
                        size="14px"
                        :color="modelValue === 'pending' ? '#F59E0B' : '#6B7280'"
                        class="mr-3"
                    />
                    <span>Pendentes</span>
                    <span class="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {{ pendingCount }}
                    </span>
                </button>

                <button
                    type="button"
                    :class="[
                        'flex items-center w-full px-4 py-2 text-sm transition-colors duration-150 cursor-pointer',
                        modelValue === 'finished' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'
                    ]"
                    @mousedown="selectOption('finished')"
                >
                    <IconAwesome
                        icon-name="check-circle"
                        icon-style="solid"
                        size="14px"
                        :color="modelValue === 'finished' ? '#10B981' : '#6B7280'"
                        class="mr-3"
                    />
                    <span>Concluídas</span>
                    <span class="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {{ finishedCount }}
                    </span>
                </button>
            </div>
        </div>

        <p v-if="error" class="mt-1 text-sm text-red-600">
            {{ error }}
        </p>
    </div>
</template>
<script setup>
    import { computed } from "vue";
import IconAwesome from "./IconAwesome.vue";

    const props = defineProps({
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        itemsPerPage: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        emptyMessage: {
            type: String,
            default: "Nenhum dado encontrado."
        },
        loadingMessage: {
            type: String,
            default: "Carregando..."
        }
    });

    const emit = defineEmits(['page-change', 'item-action']);

    const paginatedData = computed(() => {
        if (!props.showPagination) return props.data;
        
        const start = (props.currentPage - 1) * props.itemsPerPage;
        const end = start + props.itemsPerPage;
        return props.data.slice(start, end);
    });

    const totalPages = computed(() => {
        return Math.ceil(props.data.length / props.itemsPerPage);
    });

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            emit('page-change', page);
        }
    };

    const getCellValue = (item, column) => {
        if (column.field) {
            return item[column.field];
        }
        return '';
    };

    const handleItemAction = (action, item, extraData = null) => {
        emit('item-action', { action, item, extraData });
    };
</script>

<template>
    <div class="w-full border border-gray-200 rounded-lg overflow-hidden">
        <div class="hidden md:block overflow-x-auto">
            <table class="w-full min-w-full">
                <thead class="bg-gray-100">
                    <tr>
                        <th 
                            v-for="column in columns" 
                            :key="column.key"
                            :class="[
                                'py-3 px-4 border-b border-gray-300 whitespace-nowrap',
                                column.align === 'center' ? 'text-center' : 
                                column.align === 'right' ? 'text-right' : 'text-left',
                                column.headerClass || ''
                            ]"
                        >
                            {{ column.title }}
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-if="loading">
                        <td
                            :colspan="columns.length"
                            class="py-8 px-4 text-center text-gray-500 border-b border-gray-200"
                        >
                            <div class="flex items-center justify-center gap-2">
                            <IconAwesome
                                iconName="spinner"
                                iconStyle="solid"
                                size="18px"
                                color="#7A9B31"
                                class="animate-spin"
                            />
                            <span>{{ loadingMessage }}</span>
                            </div>
                        </td>
                    </tr>

                    <tr v-else-if="paginatedData.length === 0">
                        <td :colspan="columns.length" class="py-8 px-4 text-center text-gray-500 border-b border-gray-200">
                            {{ emptyMessage }}
                        </td>
                    </tr>

                    <tr
                        v-else
                        v-for="(item, index) in paginatedData"
                        :key="item.id || index"
                        class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <td
                            v-for="column in columns"
                            :key="column.key"
                            :class="[
                                'py-2 px-4 border-b border-gray-200',
                                column.align === 'center' ? 'text-center' : 
                                column.align === 'right' ? 'text-right' : 'text-left',
                                column.cellClass || ''
                            ]"
                        >
                            <slot 
                                v-if="column.slot" 
                                :name="column.slot" 
                                :item="item" 
                                :value="getCellValue(item, column)"
                                :action="handleItemAction"
                            ></slot>
                            
                            <template v-else>
                                {{ getCellValue(item, column) }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="md:hidden space-y-3 p-3">
            <div v-if="loading" class="text-center py-8 text-gray-500">
                <div class="flex items-center justify-center gap-2">
                    <IconAwesome
                        iconName="spinner"
                        iconStyle="solid"
                        size="18px"
                        color="#7A9B31"
                        class="animate-spin"
                    />
                    <span>{{ loadingMessage }}</span>
                </div>
            </div>

            <div v-else-if="paginatedData.length === 0" class="text-center py-8 text-gray-500">
                {{ emptyMessage }}
            </div>

            <slot 
                name="mobile-card" 
                :items="paginatedData" 
                :action="handleItemAction"
                v-if="$slots['mobile-card']"
            ></slot>

            <template v-else>
                <div
                    v-for="(item, index) in paginatedData"
                    :key="item.id || index"
                    class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                >
                    <div class="space-y-2">
                        <div 
                            v-for="column in columns.filter(col => !col.hideOnMobile)"
                            :key="column.key"
                            class="flex justify-between items-start"
                        >
                            <span class="text-sm font-medium text-gray-700">
                                {{ column.title }}:
                            </span>
                            <span class="text-sm text-gray-900 text-right flex-1 ml-2">
                                <slot 
                                    v-if="column.slot" 
                                    :name="column.slot" 
                                    :item="item" 
                                    :value="getCellValue(item, column)"
                                    :action="handleItemAction"
                                >
                                    {{ getCellValue(item, column) }}
                                </slot>
                                <template v-else>
                                    {{ getCellValue(item, column) }}
                                </template>
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <div 
            v-if="showPagination && !loading && totalPages > 1" 
            class="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 bg-gray-50 gap-4 sm:gap-0"
        >
            <div class="text-sm text-gray-600 order-2 sm:order-1">
                Mostrando {{ paginatedData.length }} de {{ data.length }} itens
            </div>
            
            <div class="flex items-center space-x-2 order-1 sm:order-2">
                <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-1 text-sm border border-gray-300 cursor-pointer rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Anterior
                </button>
                
                <div class="flex space-x-1 flex-wrap justify-center gap-1">
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        @click="goToPage(page)"
                        :class="[
                            'px-3 py-1 text-sm rounded transition-colors cursor-pointer min-w-[2.5rem]',
                            currentPage === page 
                                ? 'bg-primary-500 text-white' 
                                : 'border border-gray-300 hover:bg-gray-100'
                        ]"
                    >
                        {{ page }}
                    </button>
                </div>
                
                <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-1 text-sm border border-gray-300 cursor-pointer rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Próxima
                </button>
            </div>
        </div>
    </div>
</template>
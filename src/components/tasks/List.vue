<script setup>
import { onMounted, ref, computed } from "vue";
import { useTaskStore } from "../../stores/taskStore";
import { useToast } from "vue-toast-notification";
import Table from "../Table.vue";
import IconAwesome from "../IconAwesome.vue";
import Button from "../Button.vue";
import Checkbox from "../Checkbox.vue";
import FilterSelect from "./FilterSelect.vue";
import Modal from "../Modal.vue";

const emit = defineEmits(['editTask']);

const taskStore = useTaskStore();
const toast = useToast();

const currentPage = ref(1);
const itemsPerPage = 10;
const selectedCategory = ref('all');
const showDeleteModal = ref(false);
const taskToDelete = ref(null);

const taskCounts = computed(() => ({
    total: taskStore.tasks.length,
    pending: taskStore.pendingTasks.length,
    finished: taskStore.completedTasks.length
}));

const filteredTasks = computed(() => {
    let tasks = [...taskStore.tasks];
    
    switch (selectedCategory.value) {
        case 'finished':
            tasks = tasks.filter(task => task.is_completed);
            break;
            
        case 'pending':
            tasks = tasks.filter(task => !task.is_completed);
            break;

        case 'all':
        default:
            break;
    }
    
    return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

const tableColumns = [
    {
        key: 'id',
        title: 'ID',
        field: 'id',
        align: 'center',
        slot: 'id',
        hideOnMobile: true 
    },
    {
        key: 'title',
        title: 'Título',
        field: 'title',
        align: 'left',
        slot: 'title'
    },
    {
        key: 'description',
        title: 'Descrição', 
        field: 'description',
        align: 'left',
        slot: 'description' 
    },
    {
        key: 'completed',
        title: 'Concluída',
        align: 'center',
        slot: 'completed'
    },
    {
        key: 'actions', 
        title: 'Ações',
        align: 'center',
        slot: 'actions',
        hideOnMobile: true 
    }
];

const handlePageChange = (page) => {
    currentPage.value = page;
};

const handleItemAction = ({ action, item, extraData }) => {
    switch (action) {
        case 'toggle':
            handleToggle(item.id);
            break;

        case 'edit':
            handleEdit(item);
            break;

        case 'delete':
            openDeleteModal(item);
            break;
    }
};

const openDeleteModal = (task) => {
    taskToDelete.value = task;
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    taskToDelete.value = null;
};

onMounted(() => {
    taskStore.fetchTasks();
});

const handleToggle = async (id) => {
    try {
        await taskStore.toggleCompleted(id);
        const task = taskStore.tasks.find(task => task.id === id);

        if (task) {
            const status = task.is_completed ? "concluída" : "pendente";
            toast.success(`Tarefa marcada como ${status}!`);
        }

    } catch (error) {
        toast.error("Erro ao atualizar tarefa");
    }
};

const handleEdit = (task) => {
    emit('editTask', task);
};

const handleDelete = async () => {
    if (!taskToDelete.value) return;

    try {
        await taskStore.deleteTask(taskToDelete.value.id);
        toast.success("Tarefa excluída com sucesso!");
        closeDeleteModal();
        
        if (filteredTasks.value.length === 0 && currentPage.value > 1) {
            currentPage.value--;
        }

    } catch (error) {
        toast.error("Erro ao excluir tarefa");
        closeDeleteModal();
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-start">
        <div class="w-full flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Lista de Tarefas</h2>
            <FilterSelect
                v-model="selectedCategory"
                :task-counts="taskCounts"
            />
        </div>

        <Table
            :columns="tableColumns"
            :data="filteredTasks"
            :loading="taskStore.loadingFetch"
            :current-page="currentPage"
            :items-per-page="itemsPerPage"
            :show-pagination="true"
            empty-message="Nenhuma tarefa encontrada."
            loading-message="Carregando"
            @page-change="handlePageChange"
            @item-action="handleItemAction"
        >
            <template #id="{ item }">
                <span 
                    :class="[
                        'transition-all duration-200 font-mono text-sm',
                        item.is_completed ? 'line-through text-gray-500' : 'text-gray-900'
                    ]"
                >
                    {{ item.id }}
                </span>
            </template>

            <template #title="{ item }">
                <span 
                    :class="[
                        'transition-all duration-200 font-medium',
                        item.is_completed ? 'line-through text-gray-500' : 'text-gray-900'
                    ]"
                >
                    {{ item.title }}
                </span>
            </template>

            <template #description="{ item }">
                <div class="max-w-[600px]">
                    <span 
                        :class="[
                            'transition-all duration-200 break-words whitespace-normal text-sm leading-relaxed',
                            item.is_completed ? 'line-through text-gray-400' : 'text-gray-600'
                        ]"
                    >
                        {{ item.description }}
                    </span>
                </div>
            </template>

            <template #completed="{ item, action }">
                <Checkbox
                    :model-value="item.is_completed"
                    @change="action('toggle', item)"
                    variant="success"
                />
            </template>

            <template #actions="{ item, action }">
                <div class="flex justify-center space-x-2">
                    <Button
                        variant="primary"
                        size="square"
                        icon="pencil"
                        icon-size="15px"
                        @click="action('edit', item)"
                    />
                    <Button
                        variant="danger"
                        size="square"
                        icon="trash"
                        icon-size="15px"
                        @click="action('delete', item)"
                        :disabled="taskStore.loadingDelete"
                    />
                </div>
            </template>

            <template #mobile-card="{ items, action }">
                <div
                    v-for="item in items"
                    :key="item.id"
                    class="bg-white border border-gray-200 rounded-lg p-4 transition-all"
                >
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1 min-w-0"> 
                            <h3 
                                :class="[
                                    'lowercase first-letter:uppercase font-semibold text-lg mb-1 transition-all duration-200 wrap-break-word',
                                    item.is_completed ? 'line-through text-gray-500' : 'text-gray-900'
                                ]"
                            >
                                {{ item.title }}
                            </h3>
                            <p 
                                :class="[
                                    'text-sm transition-all duration-200 wrap-break-word whitespace-normal leading-relaxed',
                                    item.is_completed ? 'line-through text-gray-400' : 'text-gray-600'
                                ]"
                            >
                                {{ item.description }}
                            </p>
                        </div>
                        <div class="flex items-center space-x-2 ml-3 shrink-0">
                            <Checkbox
                                :model-value="item.is_completed"
                                @change="action('toggle', item)"
                                variant="success"
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span class="text-xs text-gray-500 font-mono">
                            ID: {{ item.id }}
                        </span>
                        <div class="flex space-x-2">
                            <Button
                                variant="primary"
                                size="square"
                                icon="pencil"
                                icon-size="15px"
                                @click="action('edit', item)"
                            />
                            <Button
                                variant="danger"
                                size="square"
                                icon="trash"
                                icon-size="15px"
                                @click="action('delete', item)"
                                :disabled="taskStore.loadingDelete"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </Table>

        <Modal
            :show="showDeleteModal"
            title="Confirmar Exclusão"
            size="md"
            @update:show="closeDeleteModal"
            @close="closeDeleteModal"
        >
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <IconAwesome
                        icon-name="exclamation-triangle"
                        icon-style="solid"
                        size="24px"
                        color="#EF4444"
                    />
                </div>
                
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                    Excluir Tarefa
                </h3>
                
                <p class="text-gray-500 mb-6">
                    Tem certeza que deseja excluir a tarefa 
                    <strong>"{{ taskToDelete?.title }}"</strong>? 
                    Esta ação não pode ser desfeita.
                </p>

                <div class="flex justify-center space-x-3">
                    <Button
                        variant="secondary"
                        @click="closeDeleteModal"
                        :disabled="taskStore.loadingDelete"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        @click="handleDelete"
                        :loading="taskStore.loadingDelete"
                        :disabled="taskStore.loadingDelete"
                    >
                        <template v-if="!taskStore.loadingDelete">
                            <IconAwesome
                                icon-name="trash"
                                icon-style="solid"
                                size="14px"
                                color="white"
                                class="mr-2"
                            />
                            Excluir
                        </template>
                        <template v-else>
                            Excluindo...
                        </template>
                    </Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
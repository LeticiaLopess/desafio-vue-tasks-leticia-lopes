<script setup>
import { ref } from 'vue'; 
import { useToast } from 'vue-toast-notification';
import List from '@/components/tasks/List.vue';
import Modal from '@/components/Modal.vue';
import Form from '@/components/tasks/Form.vue';

const toast = useToast();
const showTaskModal = ref(false);
const showEditModal = ref(false);
const editingTask = ref(null);

const openTaskModal = () => {
    showTaskModal.value = true;
};

const closeTaskModal = () => {
    showTaskModal.value = false;
};

const openEditModal = (task) => {
    editingTask.value = task;
    showEditModal.value = true;
};

const closeEditModal = () => {
    editingTask.value = null;
    showEditModal.value = false;
};

const handleTaskSuccess = () => {
    toast.success('Tarefa adicionada com sucesso!');
    closeTaskModal();
};

const handleEditSuccess = () => {
    toast.success('Tarefa atualizada com sucesso!');
    closeEditModal();
};

defineExpose({
    openTaskModal
});
</script>

<template>
    <div class="w-full">
        <List @edit-task="openEditModal" />
        
        <Modal
            :show="showTaskModal"
            title="Nova Tarefa"
            size="md"
            @update:show="showTaskModal = $event"
            @close="closeTaskModal"
        >
            <Form
                :show="showTaskModal"
                @update:show="showTaskModal = $event"
                @success="handleTaskSuccess"
            />
        </Modal>

        <Modal
            :show="showEditModal"
            :title="`Editando a tarefa #${editingTask?.id}`"
            size="md"
            @update:show="showEditModal = $event"
            @close="closeEditModal"
        >
            <Form
                :show="showEditModal"
                :task="editingTask"
                @update:show="showEditModal = $event"
                @success="handleEditSuccess"
            />
        </Modal>
    </div>
</template>
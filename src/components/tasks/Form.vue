<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { isEmpty } from '@/utils/validators';
import { useTaskStore } from '@/stores/taskStore';
import Input from '../Input.vue';
import Textarea from '../Textarea.vue';
import Button from '../Button.vue';

const taskStore = useTaskStore();
const toast = useToast();

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    task: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['update:show', 'success']);

const form = ref({
    title: '',
    description: ''
});

const errors = reactive({
    title: '',
    description: ''
});

const isEditing = computed(() => !!props.task);

const close = () => {
    emit('update:show', false);
};

const resetForm = () => {
    form.value = {
        title: '',
        description: ''
    };
    errors.title = '';
    errors.description = '';
};

const validateForm = () => {
    let isValid = true;

    if (isEmpty(form.value.title)) {
        errors.title = 'Título é obrigatório';
        isValid = false;

    } else if (form.value.title.length > 40) {
        errors.title = 'Título deve ter no máximo 40 caracteres';
        isValid = false;

    } else {
        errors.title = '';
    }

    if (isEmpty(form.value.description)) {
        errors.description = 'Descrição é obrigatória';
        isValid = false;

    } else if (form.value.description.length > 200) {
        errors.description = 'Descrição deve ter no máximo 200 caracteres';
        isValid = false;

    } else {
        errors.description = '';
    }

    return isValid;
};

const validateField = (fieldName) => {
    if (isEmpty(form.value[fieldName])) {
        errors[fieldName] = `${fieldName === 'title' ? 'Título' : 'Descrição'} é obrigatório`;

    } else if (fieldName === 'title' && form.value.title.length > 40) {
        errors.title = 'Título deve ter no máximo 40 caracteres';

    } else if (fieldName === 'description' && form.value.description.length > 200) {
        errors.description = 'Descrição deve ter no máximo 200 caracteres';

    } else {
        errors[fieldName] = '';
    }
};

const handleSubmit = async () => {
    if (!validateForm()) {
        toast.error('Preencha todos os campos corretamente');
        return;
    }

    try {
        if (isEditing.value) {
            await taskStore.updateTask(props.task.id, {
                title: form.value.title.trim(),
                description: form.value.description.trim()
            });

        } else {
            await taskStore.addTask({
                title: form.value.title.trim(),
                description: form.value.description.trim(),
                is_completed: false
            });
        }

        resetForm();
        close();
        emit('success');

    } catch (error) {
        toast.error(`Erro ao ${isEditing.value ? 'atualizar' : 'adicionar'} tarefa`);
    }
};

watch(() => props.task, (newTask) => {
    if (newTask) {
        form.value = {
            title: newTask.title,
            description: newTask.description
        };

    } else {
        resetForm(); 
    }
}, { immediate: true });
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input
            v-model="form.title"
            label="Título"
            placeholder="Digite o título da tarefa (máx. 40 caracteres)"
            :error="errors.title"
            :required="true"
            :maxlength="40"
            :show-char-count="true"
            @blur="validateField('title')"
        />

        <Textarea
            v-model="form.description"
            label="Descrição"
            placeholder="Digite a descrição da tarefa (máx. 200 caracteres)"
            :error="errors.description"
            :required="true"
            :maxlength="200"
            :show-char-count="true"
            :rows="4"
            @blur="validateField('description')"
        />

        <div class="flex justify-end gap-3 pt-2">
            <Button
                type="button"
                variant="ghost"
                size="md"
                @click="close"
            >
                Cancelar
            </Button>
            
            <Button
                type="submit"
                variant="primary"
                size="md"
                :disabled="taskStore.loadingAdd || taskStore.loadingUpdate || form.title.length > 40 || form.description.length > 200"
                :loading="taskStore.loadingAdd || taskStore.loadingUpdate"
            >
                {{ isEditing ? 'Atualizar Tarefa' : 'Adicionar Tarefa' }}
            </Button>
        </div>
    </form>
</template>
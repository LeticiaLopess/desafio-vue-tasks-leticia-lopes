<script setup>
import { ref, provide } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import TasksView from './views/TasksView.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const tasksViewRef = ref();

const openTaskModal = () => {
  if (tasksViewRef.value && tasksViewRef.value.openTaskModal) {
    tasksViewRef.value.openTaskModal();
  }
};

provide('openTaskModal', openTaskModal);
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <TasksView ref="tasksViewRef" />

        <template #footer>
            <Footer />
        </template>
    </MainLayout>
</template>
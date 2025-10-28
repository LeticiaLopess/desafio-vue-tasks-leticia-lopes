<script setup>
import MainLayout from './layouts/MainLayout.vue';
import TasksView from './views/TasksView.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <TasksView />

        <template #footer>
            <Footer />
        </template>
    </MainLayout>
</template>

<style scoped>
</style>

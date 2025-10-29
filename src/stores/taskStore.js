import { defineStore } from "pinia";
import { getAll, create, update, remove } from "../services/taskService";

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [],
        loadingFetch: false,
        loadingAdd: false,
        loadingUpdate: false,
        loadingDelete: false,
        error: null,
    }),

    getters: {
        completedTasks: (state) => state.tasks.filter(task => task.is_completed),
        pendingTasks: (state) => state.tasks.filter(task => !task.is_completed),
        tasksCount: (state) => state.tasks.length,
    },

    actions: {
        setError(message) {
            this.error = message;
        },

        async fetchTasks() {
            this.loadingFetch = true;
            this.error = null;

            try {
                const response = await getAll();
                this.tasks = response.data;

            } catch (error) {
                this.error = "Erro ao carregar tarefas";
                console.error("Fetch tasks error:", error);

                throw error;

            } finally {
                this.loadingFetch = false;
            }
        },

        async addTask(task) {
            this.loadingAdd = true;
            this.error = null;

            try {
                const taskWithDate = {
                    ...task,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                const response = await create(taskWithDate);
                this.tasks.push(response.data);
                
                return { 
                    success: true, 
                    data: response.data,
                    message: "Tarefa adicionada com sucesso!"
                };

            } catch (error) {
                this.error = "Erro ao adicionar tarefa";
                console.error("Add task error:", error);

                throw error;

            } finally {
                this.loadingAdd = false;
            }
        },

        async updateTask(id, updates) {
            this.loadingUpdate = true;
            this.error = null;

            const index = this.tasks.findIndex(task => task.id === id);
            
            if (index === -1) {
                throw new Error("Tarefa não encontrada");
            }

            const previousTask = { ...this.tasks[index] };
            
            try {
                const updatesWithDate = {
                    ...updates,
                    updated_at: new Date().toISOString()
                };

                this.tasks[index] = { ...previousTask, ...updatesWithDate };
                
                const taskToUpdate = { ...previousTask, ...updatesWithDate };
                const response = await update(id, taskToUpdate);
                
                this.tasks[index] = response.data;
                
                return { 
                    success: true, 
                    data: response.data,
                    message: "Tarefa atualizada com sucesso!"
                };

            } catch (error) {
                this.tasks[index] = previousTask;
                this.error = "Erro ao atualizar tarefa";
                console.error("Update task error:", error);
                
                throw error;

            } finally {
                this.loadingUpdate = false;
            }
        },

        async deleteTask(id) {
            this.loadingDelete = true;
            this.error = null;
            
            const index = this.tasks.findIndex(task => task.id === id);
            
            if (index === -1) return;

            const deletedTask = this.tasks[index];
            this.tasks.splice(index, 1);

            try {
                await remove(id);
                
                return { 
                    success: true,
                    message: "Tarefa excluída com sucesso!"
                };

            } catch (error) {
                this.tasks.splice(index, 0, deletedTask);
                this.error = "Erro ao excluir tarefa";
                console.error("Delete task error:", error);

                throw error;

            } finally {
                this.loadingDelete = false;
            }
        },

        async toggleCompleted(id) {
            const task = this.tasks.find(task => task.id === id);
            if (!task) return;

            await this.updateTask(id, { is_completed: !task.is_completed });
        },
    },
});
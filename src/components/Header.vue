<script setup>
import { ref, inject } from 'vue'
import IconAwesome from './IconAwesome.vue'
import vueLogo from '@/assets/images/vue-logo-neutral.png'

const mobileMenuOpen = ref(false)
const openTaskModal = inject('openTaskModal') 

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleOpenTaskModal = () => {
    if (openTaskModal) {
        openTaskModal()
    }
    mobileMenuOpen.value = false
}
</script>

<template>
    <header class="bg-light-100 border-b border-light-200 sticky top-0 z-50">
        <div class="container mx-auto max-w-[1300px]">
            <div class="flex items-center justify-between h-16 px-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <img :src="vueLogo" alt="Vue logo" class="w-5 h-5 invert brightness-1" />
                    </div>
                    <h1 class="text-2xl font-bold text-cloudy">Vue Tasks</h1>
                </div>

                <div class="hidden md:flex items-center gap-3">
                    <button 
                        @click="handleOpenTaskModal"
                        class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                    >
                        <IconAwesome icon-name="plus" color="#ffffff" size="16px" />
                        Nova Tarefa
                    </button>
                </div>

                <button 
                    @click="toggleMobileMenu"
                    class="md:hidden p-2 text-cloudy-300 hover:text-primary transition-colors cursor-pointer"
                >
                    <IconAwesome 
                        :icon-name="mobileMenuOpen ? 'times' : 'bars'" 
                        size="24px" 
                    />
                </button>
            </div>

            <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
            >
                <div 
                    v-show="mobileMenuOpen"
                    class="md:hidden py-4 border-t border-light-500"
                >
                    <div class="px-4">
                        <button 
                            @click="handleOpenTaskModal"
                            class="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <IconAwesome icon-name="plus" color="#ffffff" size="16px" />
                            Nova Tarefa
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </header>
</template>
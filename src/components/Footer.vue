<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="bg-cloudy text-light border-t border-cloudy-700">
        <div class="container mx-auto px-4 py-5">
            <div class="text-center">
                <p class="text-light-600 text-sm">
                    © {{ currentYear }} Vue Tasks.
                </p>
            </div>
        </div>
    </footer>
</template>
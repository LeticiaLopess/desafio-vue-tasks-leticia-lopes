<script setup>
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="shrink-0">
      <slot name="header" />
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="shrink-0">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
</style>
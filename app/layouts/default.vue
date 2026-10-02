<script setup lang="ts">
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteHeader />
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>

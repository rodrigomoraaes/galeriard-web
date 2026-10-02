<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
</script>

<template>
  <footer class="border-t border-border/50">
    <div
      class="mx-auto flex w-full max-w-page flex-col gap-3 px-4 py-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-6"
    >
      <p>
        Criado por <span class="font-medium text-primary">Rodrigo Moraes</span>
      </p>

      <a
        href="https://rodrigoprojetos.com"
        target="_blank"
        rel="noopener"
        class="group inline-flex w-fit items-center gap-1 rounded-sm font-medium text-primary/70 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        rodrigoprojetos.com
        <ArrowUpRight
          class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
        <span class="sr-only">(abre em nova aba)</span>
      </a>
    </div>
  </footer>
</template>

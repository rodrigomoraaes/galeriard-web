<script setup lang="ts">
import SugestaoBotao from '@/components/sugestao/SugestaoBotao.vue'
</script>

<template>
  <header class="border-border/50 border-b">
    <nav
      aria-label="Principal"
      class="flex justify-between items-center gap-4 mx-auto px-4 lg:px-6 w-full max-w-page h-header"
    >
      <div class="flex items-center gap-6">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background font-semibold text-[17px] text-primary tracking-tight"
        >
          <!-- Máscara em vez de <img>: o R assume a cor do tema (preto no claro, branco no escuro) -->
          <span
            aria-hidden="true"
            class="bg-primary w-[22px] h-5 [mask:url(/logo-mark.png)_center/contain_no-repeat]"
          />
          Galeria RD
        </NuxtLink>

        <NuxtLink
          to="/"
          active-class="text-primary"
          class="px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-[13px] text-primary/70 hover:text-primary transition-colors"
        >
          Explorar
        </NuxtLink>
      </div>

      <SugestaoBotao />
    </nav>
  </header>
</template>

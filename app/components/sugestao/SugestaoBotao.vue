<script setup lang="ts">
import type { ButtonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

defineProps<{ size?: ButtonVariants['size'] }>()
</script>

<template>
  <Tooltip :delay-duration="150">
    <!--
      Botão desativado não recebe mouse nem foco, então o tooltip
      fica no span em volta dele (e o span entra na ordem do Tab).
    -->
    <TooltipTrigger as-child>
      <span
        tabindex="0"
        class="inline-flex cursor-not-allowed rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        <Button variant="soft" :size="size" disabled tabindex="-1">Sugerir um site</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent :side-offset="6">Em breve</TooltipContent>
  </Tooltip>
</template>

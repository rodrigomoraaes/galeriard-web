<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// A classe vai para o span: o Tooltip não renderiza elemento próprio
const props = defineProps<{ size?: ButtonVariants['size'], class?: HTMLAttributes['class'] }>()
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
        :class="cn('inline-flex cursor-not-allowed rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none', props.class)"
      >
        <Button variant="soft" :size="size" disabled tabindex="-1" class="w-full">Sugerir um site</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent :side-offset="6">Em breve</TooltipContent>
  </Tooltip>
</template>

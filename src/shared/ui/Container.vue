<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  tag?: 'section' | 'div' | 'main' | 'nav'
  mods?: string
}

const { tag = 'section', mods = '' } = defineProps<IProps>()
</script>

<template>
  <component :is="tag || 'section'" :class="['container', modifiersJoin(mods, 'container')]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@layer block {
  .container {
    --pad: var(--gap-s);

    width: 100%;
    max-width: 1366px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 var(--pad);

    @include mq($m) {
      --pad: var(--gap-m);
    }

    @include mq($l) {
      --pad: var(--gap-l);
    }
  }
}
</style>

<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'
  mods?: string
}

const { tag, mods = '' } = defineProps<IProps>()
</script>

<template>
  <component :is="tag" :class="['typography', modifiersJoin(mods, 'typography')]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@layer block {
  .typography {
    @include font(16px, normal, 400);
  }
}

@layer mod {
  .typography {
    &--heading2 {
      line-height: 1.4;
      font-weight: 600;
    }

    &--heading3 {
      @include font(14px, normal, 600);
    }

    &--desc {
      font-size: 14px;
      color: cl(text-alt);
    }
  }
}
</style>

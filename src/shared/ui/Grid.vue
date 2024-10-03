<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'
interface IProps {
  columns?: '2' | '3' | '4' | '5' | '6'
  mods?: string
  tag?: string
}

const { columns = '4', mods = '', tag } = defineProps<IProps>()
</script>

<template>
  <component
    :is="tag ? tag : 'div'"
    :class="[
      'grid',
      columns ? 'grid--' + columns : '',
      tag === 'ul' ? 'grid--list' : '',
      modifiersJoin(mods, 'grid')
    ]"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
@layer block {
  .grid {
    --columns: 4;

    display: grid;
    gap: var(--gap-s);
    grid-template-columns: repeat(var(--columns), 1fr);
  }
}

@layer mod {
  .grid--list {
    @include reset-list();
  }
  .grid--2 {
    --columns: 2;
  }
  .grid--3 {
    --columns: 3;
  }
  .grid--4 {
    --columns: 4;
  }
  .grid--5 {
    --columns: 5;
  }
  .grid--6 {
    --columns: 6;
  }
  .grid--gap-bottom-m {
    margin-bottom: var(--gap-m);
  }
}
</style>

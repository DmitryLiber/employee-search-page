<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  mods?: string
  size?: string
  color?: string
}

const { size, color = 'white', mods = '' } = defineProps<IProps>()
</script>

<template>
  <span :class="['loader', modifiersJoin(mods, 'loader')]"></span>
</template>

<style lang="scss">
@layer block {
  .loader {
    width: v-bind(size);
    aspect-ratio: 1;
    border: 3px solid v-bind(color);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation $time-10 linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

@layer mod {
  .loader--center {
    margin-left: calc(50% - v-bind(size) / 2);
  }
}
</style>
@/shared/utils

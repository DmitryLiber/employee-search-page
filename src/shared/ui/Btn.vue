<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  href?: string | null
  mods?: string
  type?: string
  loading?: boolean
}

const { href = null, mods = '', type, loading = 'false' } = defineProps<IProps>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="type ? type : 'button'"
    :class="['btn', modifiersJoin(mods, 'btn'), { loading }]"
  >
    <slot v-if="!loading" />
    <Loader size="14px" color="white" v-else />
  </component>
</template>

<style lang="scss" scoped>
@layer block {
  .btn {
    @include font(12px, 1.67, 700);

    background-color: cl(primary);
    border-radius: 10px;
    padding: 14px 50px;
    color: cl(whte);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    flex-shrink: 0;
    transition:
      border-color $time,
      background-color $time,
      color $time,
      opacity $time;

    @include mq-hover() {
      background-color: cl(primary, 0.85);
    }
  }
}

@layer mod {
  .btn--icon {
    border-radius: var(--radius-xxs);
    padding: 9px;

    &::before {
      @include variable-icon(var(--icon), 24px, currentColor);
    }
  }

  .btn--icon-prepend {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 9px 18px;

    &::before {
      @include variable-icon(var(--icon), 24px, currentColor);
    }
  }

  .btn--outline {
    background-color: transparent;
    border: 1px solid cl(surface-secondary);
    color: cl(surface-secondary);

    @include mq-hover() {
      border: 1px solid cl(primary);
      color: cl(primary);
    }
  }

  .btn--outline-ghost {
    background-color: transparent;
    border: 1px solid cl(surface-alt);
    color: cl(text, 0.8);

    @include mq-hover() {
      border: 1px solid cl(primary);
      color: cl(primary);
    }
  }

  .btn--small {
    @include font(13px, 1.47, 400);

    padding: 5px 15px;
  }
}

@layer state {
  .btn {
    &.loading {
      pointer-events: none;
    }
  }
}
</style>
@/shared/utils

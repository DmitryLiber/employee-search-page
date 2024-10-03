<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  mods?: string
  required?: boolean
  placeholder?: string
  value?: string | number | null
  type?: 'text' | 'email' | 'password' | 'number'
  icon?: string
}

const {
  mods = '',
  required = false,
  placeholder,
  value = null,
  type = 'text',
  icon = ''
} = defineProps<IProps>()
</script>

<template>
  <div :class="['field', modifiersJoin(mods, 'field')]" :style="`--icon: url(/images/${icon})`">
    <input
      class="field__input"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>

<style lang="scss" scoped>
@layer block {
  .field {
    width: 100%;

    &__input {
      @include font(14px, normal);

      color: cl(text-alt);
      border-radius: var(--radius-xs);
      padding: 14px 16px;
      width: 100%;
      border: 1px solid cl(secondary-alt);

      outline: none;
      transition:
        border $time,
        color $time;

      &::placeholder {
        color: cl(bg-secondary);
      }

      @include mq-hover() {
        border: 1px solid cl(blck, 0.5);
      }
    }
  }
}

@layer state {
  .field {
    &__input {
      &:focus {
        border: 1px solid cl(blck);
      }
    }
  }
}
</style>

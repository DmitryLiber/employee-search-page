<script lang="ts" setup>
import { useStore } from 'vuex'
import { modifiersJoin } from '@shared/utils'
import { computed } from 'vue'

const store = useStore()
const msgList = computed(() => store.state.useNotificationsStore.msgList)

interface Props {
  mods?: string
}

const { mods = '' } = defineProps<Props>()
</script>

<template>
  <ul :class="['notifications', modifiersJoin(mods, 'notifications')]" v-if="msgList.length > 0">
    <li
      class="notifications__item"
      :data-status="msg.status"
      data-show="true"
      v-for="msg in msgList"
      :key="msg.id"
    >
      {{ msg.text }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@layer block {
  .notifications {
    @include reset-list();

    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: var(--index-1);
    width: 100%;
    max-width: 200px;
    font-size: 20px;
    text-align: center;

    @include mq($xs) {
      max-width: 330px;
    }
  }

  .notifications__item {
    --color: #{cl(blck)};
    --bg-color: #{cl(whte)};

    width: 100%;
    max-height: 0;
    transform: translateY(100%);
    opacity: 0;
    will-change: transform, opacity;
    background-color: var(--bg-color);
    border-radius: var(--radius-s);

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    &[data-status='success'] {
      --color: #155724;
      --bg-color: #d4edda;
    }

    &[data-status='warning'] {
      --color: #856404;
      --bg-color: #fff3cd;
    }

    &[data-status='error'] {
      --color: #721c24;
      --bg-color: #f8d7da;
    }

    &[data-show='true'] {
      animation: anim-show 4s ease 0s 1;
    }
  }

  @keyframes anim-show {
    0% {
      max-height: 0;
      transform: translateY(100%);
      opacity: 0;
    }

    10% {
      max-height: 200px;
      transform: translateY(0);
      opacity: 1;
      padding: 10px 15px;
    }

    80% {
      max-height: 200px;
      transform: translateY(0);
      opacity: 1;
      padding: 10px 15px;
    }

    100% {
      max-height: 200px;
      transform: translateY(100%);
      opacity: 0;
    }
  }
}
</style>

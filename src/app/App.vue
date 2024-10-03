<script lang="ts" setup>
import Container from '@/shared/ui/Container.vue'
import { AppHeader, Sidebar } from '@widgets/ui'
import { Notifications } from '@shared/ui'
</script>

<template>
  <AppHeader />
  <Container tag="main">
    <div class="app-content">
      <Sidebar />
      <RouterView class="app-content__body" />
    </div>
  </Container>
  <Notifications />
</template>

<style lang="scss" scoped>
@layer block {
  .app-content {
    display: grid;
    grid-template-columns: 292px 1fr;
    box-shadow: 0 0 10px 0 cl(blck, 0.1);
    border-radius: var(--radius-s);
    height: calc(100vh - var(--header-height) - var(--gap-xl));

    &__body {
      padding: var(--gap-m) var(--gap-m) var(--gap-m) var(--gap-xxxm);
    }
  }
}
</style>

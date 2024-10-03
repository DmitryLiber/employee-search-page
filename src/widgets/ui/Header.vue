<template>
  <header class="header">
    <Container tag="div" class="header__container">
      <a class="header__logo" href="./">
        <img width="171" height="39" alt="Логотип Жилфонд" src="/images/logo.svg" />
      </a>
      <span class="header__user">Пользователь</span>
    </Container>
  </header>
</template>

<style lang="scss" scoped>
@layer block {
  .header {
    padding: var(--gap-l) 0 var(--gap-xm);

    &__container {
      display: flex;
      align-items: center;
    }

    &__logo img {
      display: block;
    }

    &__user {
      margin-left: auto;
    }
  }
}
</style>

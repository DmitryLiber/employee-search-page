<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { debounce } from '@shared/utils'

const router = useRouter()
const store = useStore()
const searchEmployeesInput = ref('')

const isSearchingEmployees = computed(() => store.state.useEmployeesStore.isSearchingEmployees)
const employees = computed(() => store.state.useEmployeesStore.employees)

const onErrorLoadingEmployees = () => {
  store.commit('useNotificationsStore/add', {
    status: 'error',
    text: 'Не удалось загрузить сотрудников'
  })
}

const onSearchEmployee = debounce((e: InputEvent) => {
  searchEmployeesInput.value = (e.target as HTMLInputElement).value

  router.push('/')
  store.commit('useEmployeesStore/resetEmployees')

  if (searchEmployeesInput.value === '') return

  store.dispatch('useEmployeesStore/searchingEmployees', [
    searchEmployeesInput.value,
    onErrorLoadingEmployees
  ])
}, 1000)

onMounted(() => {
  if (!document.querySelector('.sidebar')) return
  const sidebar = document.querySelector('.sidebar') as HTMLElement

  sidebar.addEventListener('scroll', (e) => {
    if (!(sidebar.scrollTop + sidebar.clientHeight >= sidebar.scrollHeight)) return
    if (store.state.useEmployeesStore.isDisabledLazyLoading) return

    store.dispatch('useEmployeesStore/searchingEmployees', [
      searchEmployeesInput.value,
      onErrorLoadingEmployees
    ])
  })
})
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <Typography tag="h2" mods="heading2" class="sidebar__title">Поиск сотрудников</Typography>
      <Field
        placeholder="Введите Id или имя"
        class="sidebar__search"
        type="search"
        :value="searchEmployeesInput"
        @input="onSearchEmployee"
      />
    </div>
    <Typography tag="h2" mods="heading2" class="sidebar__title">Результаты</Typography>

    <Typography
      tag="span"
      mods="desc"
      v-if="searchEmployeesInput === '' && !store.state.isLoadingEmployee"
      >начните поиск</Typography
    >

    <Typography
      tag="span"
      mods="desc"
      v-if="searchEmployeesInput !== '' && employees.length === 0 && !isSearchingEmployees"
      >ничего не найдено</Typography
    >

    <div class="sidebar__cards">
      <RouterLink
        :to="`/employee/${employee.id}`"
        :class="[
          'sidebar__card',
          { active: store.state.useEmployeesStore.currentIdEmployee === employee.id }
        ]"
        v-for="employee in employees"
      >
        <Typography tag="h3" mods="heading3" class="sidebar__card-name">{{
          employee.name
        }}</Typography>
        <Typography tag="span" mods="desc" class="sidebar__card-desc">{{
          employee.email
        }}</Typography>
      </RouterLink>
    </div>

    <Loader
      v-if="isSearchingEmployees"
      mods="center"
      size="30px"
      color="var(--color-bg)"
      class="sidebar__loader"
    />
  </aside>
</template>

<style lang="scss" scoped>
@layer block {
  .sidebar {
    padding: 0 var(--gap-xm) var(--gap-xm) var(--gap-xxxm);
    border-right: 1px solid cl(secondary);
    overflow-y: scroll;

    &__header {
      position: sticky;
      top: 0;
      background: linear-gradient(180deg, cl(whte, 1) 80%, cl(whte, 0) 100%);
      padding: var(--gap-xm) var(--gap-xm) var(--gap-xm) var(--gap-xxxm);
      margin-left: calc(var(--gap-xm) * -1);
      margin-right: calc(var(--gap-xm) * -1);
    }

    &__title {
      margin-bottom: var(--gap-s);
    }

    &__search {
      margin-bottom: var(--gap-s);
    }

    &__cards {
      display: grid;
      gap: var(--gap-s);
    }

    &__card {
      border-radius: var(--radius-s);
      box-shadow: 0 0 10px 0 cl(blck, 0.1);
      display: grid;
      grid-template-columns: 70px 1fr;
      gap: 0 var(--gap-xs);
      transition: background-color $time;

      &::before {
        content: '';
        width: 70px;
        height: 100%;
        background-image: url('/images/avatar-little.png');
        background-size: cover;
        background-position: center;
        border-radius: var(--radius-s) 0 0 var(--radius-s);
        overflow: hidden;
        grid-column: 1;
        grid-row: span 2;
        border-right: 1px solid cl(surface-alt);
        background-color: cl(whte);
      }

      @include mq-hover() {
        background-color: cl(surface-alt, 0.6);
      }
    }

    &__card-name,
    &__card-desc {
      grid-column: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: var(--gap-xxs);
    }

    &__card-name {
      margin-top: var(--gap-xs);
      margin-bottom: var(--gap-xxxs);
    }

    &__card-desc {
      margin-bottom: var(--gap-xs);
    }

    &__loader {
      margin-top: var(--gap-s);
    }
  }
}

@layer state {
  .sidebar {
    &__card {
      &.active {
        background-color: cl(surface-alt);
      }
    }
  }
}
</style>

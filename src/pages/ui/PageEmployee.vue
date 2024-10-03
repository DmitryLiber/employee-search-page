<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Loader } from '@shared/ui'
import { client } from '@shared/api'
import { type IEmployee } from '@shared/model'

const store = useStore()
const router = useRouter()
const route = useRoute()

const employee = ref({} as IEmployee)
const isLoadingEmployee = ref(true)

const idEmployee = computed(() => route.params.employeeId)

const onSearchEmployee = () => {
  isLoadingEmployee.value = true

  const onSuccess = (response: any) => {
    employee.value = response[0]
    isLoadingEmployee.value = false
  }

  const onError = () => {
    store.commit('useNotificationsStore/add', {
      status: 'error',
      text: 'Не удалось загрузить сотрудника'
    })

    router.push('/')
  }

  client.get(`/users?id=${idEmployee.value}`, onSuccess, onError, () => {
    isLoadingEmployee.value = false
  })
}

onMounted(() => onSearchEmployee())
watch(idEmployee, () => onSearchEmployee())
</script>

<template>
  <Container>
    <Loader v-if="isLoadingEmployee" mods="center" size="50px" color="var(--color-bg)" />
    <div class="employee" v-else>
      <picture class="employee__avatar">
        <img width="424" height="286" src="/images/avatar-big.png" alt="employee" />
      </picture>

      <div class="employee__info">
        <Typography tag="h2" mods="heading2" class="employee__title">{{
          employee.name
        }}</Typography>

        <dl class="employee__contacts">
          <div class="employee__contacts-item">
            <dt class="employee__contacts-key">email:</dt>
            <dd class="employee__contacts-value">{{ employee.email }}</dd>
          </div>
          <div class="employee__contacts-item">
            <dt class="employee__contacts-key">phone:</dt>
            <dd class="employee__contacts-value">{{ employee.phone }}</dd>
          </div>
        </dl>

        <Typography tag="h2" mods="heading2" class="employee__title">О себе:</Typography>

        <div class="employee__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  </Container>
</template>

<style lang="scss" scoped>
@layer block {
  .employee {
    display: grid;
    grid-template-columns: 424px 1fr;
    gap: var(--gap-xl);

    &__avatar {
      width: 424px;
      aspect-ratio: 424 / 286;
    }

    &__title {
      margin-bottom: var(--gap-xxs);
    }

    &__text {
      @include font(14px, normal);

      color: cl(text-alt);
    }

    &__contacts {
      @include font(14px, 1.4);

      margin: 0 0 var(--gap-xxxxm);
    }

    &__contacts-item {
      display: flex;
      gap: var(--gap-xxs);

      &:not(:last-child) {
        margin-bottom: var(--gap-xxs);
      }
    }

    &__contacts-key {
      font-weight: 600;
    }
    &__contacts-value {
      margin: 0;
    }
  }
}
</style>

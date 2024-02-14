<script setup lang="ts">
const {locale} = useI18n()
const locales = ["English", "German"]

const localeCookie = useCookie("locale")

onMounted(() => {
  if (!localeCookie.value) {
    localeCookie.value = "English"
  }
  locale.value = localeCookie.value
})

watch(locale, () => {
  localeCookie.value = locale.value
})
</script>

<template>
  <div class="flex flex-col gap-2 justify-start w-full">
    <USelect v-model="locale" :options="locales" class="w-full sm:w-36">
      <template #trailing>
        <UIcon v-if="locale === 'English'" name="i-flag-us-4x3"/>
        <UIcon v-else name="i-flag-de-4x3"/>
      </template>
    </USelect>
    <p>{{ $t("welcome") }}</p>
  </div>
</template>

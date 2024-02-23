<script setup lang="ts">
import type {FormError, FormSubmitEvent} from "#ui/types"

const teacher = reactive({
  name: "",
})

const MIN_TEACHERS = 2
const showErrorModal = ref<boolean>(false)
const {teachers} = storeToRefs(useTeacherStore())

async function onSubmit() {
  teachers.value.push(teacher.name)
  teacher.name = ""
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({path: "name", message: "Required"})
  return errors
}
</script>

<template>
  <p class="text-xl my-3"> {{ $t("addTeacherTitle") }}</p>
  <UModal v-model="showErrorModal">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold text-red-600 leading-6 dark:text-white">
            {{ $t("addTeacherErrorTitle") }}
          </p>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="showErrorModal = false"/>
        </div>
      </template>
      {{ $t("addTeacherErrorBody") }}
    </UCard>
  </UModal>
  <UForm :state="teacher" :validate="validate" @submit="onSubmit" class="mb-5">
    <UFormGroup label="Name" name="name">
      <UInput v-model="teacher.name" size="sm" color="primary" variant="outline" :placeholder="$t('teacherPlaceholder')"/>
    </UFormGroup>
    <UButton class="mt-3 w-full sm:w-24 justify-center" type="submit">{{ $t("SubmitTeacher") }}</UButton>
  </UForm>
  <TeacherTable class="mt-3"/>
</template>
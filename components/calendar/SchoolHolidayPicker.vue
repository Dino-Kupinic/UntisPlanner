<script setup lang="ts">
import {sub, format} from "date-fns"
import type {FormError, FormSubmitEvent} from "#ui/types"
import type {ExportHoliday, InputHoliday} from "~/model/holiday"
import {useHolidayExportStore} from "~/stores/holidayExportStore"

const customDay: InputHoliday = reactive({
  name: "",
  date: {start: sub(new Date(), {days: 0}), end: new Date()},
})

const {holidays} = storeToRefs(useHolidayExportStore())

const MAX_HOLIDAYS = 5
const showErrorModal = ref<boolean>(false)
async function onSubmit(event: FormSubmitEvent<any>) {
  if (holidays.value.length === MAX_HOLIDAYS) {
    showErrorModal.value = true
    return
  }
  const temp: ExportHoliday = {
    name: customDay.name,
    start: customDay.date.start,
    end: customDay.date.end,
  }
  holidays.value.push(temp)
  customDay.name = ""
  customDay.date = {start: sub(new Date(), {days: 0}), end: new Date()}
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({path: "name", message: "Required"})
  if (!state.date) errors.push({path: "date", message: "Required"})
  return errors
}
</script>

<template>
  <p class="text-xl my-3"> {{ $t("addCustomHolidayTitle") }}</p>
  <UModal v-model="showErrorModal">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold text-red-600 leading-6 dark:text-white">
            {{ $t("addCustomHolidayErrorTitle") }}
          </p>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="showErrorModal = false"/>
        </div>
      </template>
      {{ $t("addCustomHolidayErrorBody") }}
    </UCard>
  </UModal>
  <UForm :state="customDay" :validate="validate" @submit="onSubmit" class="mb-5">
    <UFormGroup label="Name" name="name">
      <UInput v-model="customDay.name" size="sm" color="primary" variant="outline" :placeholder="$t('holidayPlaceholder')"/>
    </UFormGroup>
    <UFormGroup class="space-y-3 mt-3" :label="$t('addCustomHolidayDateLabel')" name="date">
      <UPopover :popper="{ placement: 'bottom-start' }" :open-delay="0">
        <UButton icon="i-heroicons-calendar-days-20-solid" class="w-full sm:w-auto justify-center">
          {{ format(customDay.date.start, "d MMM, yyy") }} - {{ format(customDay.date.end, "d MMM, yyy") }}
        </UButton>
        <template #panel="{ close }">
          <div class="flex items-center divide-x divide-gray-200 dark:divide-gray-800">
            <DatePicker v-model="customDay.date" @close="close"/>
          </div>
        </template>
      </UPopover>
    </UFormGroup>
    <UButton class="mt-3 w-full sm:w-24 justify-center" type="submit">{{ $t("SubmitHoliday") }}</UButton>
  </UForm>
  <SchoolHolidayTable class="mt-3"/>
</template>
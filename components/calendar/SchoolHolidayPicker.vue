<script setup lang="ts">
import {sub, format} from "date-fns"
import type {FormError, FormSubmitEvent} from "#ui/types"
import type {ExportHoliday, InputHoliday} from "~/model/holiday"

const customDay: InputHoliday = reactive({
  name: "",
  date: {start: sub(new Date(), {days: 0}), end: new Date()},
})

const customHolidays = ref<ExportHoliday[]>([])

async function onSubmit(event: FormSubmitEvent<any>) {
  const temp: ExportHoliday = {
    name: customDay.name,
    start: customDay.date.start,
    end: customDay.date.end,
  }
  customHolidays.value.push(temp)
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
  <p class="text-xl my-3">Add custom holidays</p>
  <UForm :state="customDay" :validate="validate" @submit="onSubmit" class="mb-5">
    <UFormGroup label="Name" name="name">
      <UInput v-model="customDay.name" size="sm" color="primary" variant="outline" placeholder="Name of Holiday"/>
    </UFormGroup>
    <UFormGroup class="space-y-3 mt-3" label="Date" name="date">
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
    <UButton class="mt-3 w-full sm:w-24 justify-center" type="submit">Submit</UButton>
  </UForm>
  <SchoolHolidayTable :holiday="customHolidays"/>
</template>
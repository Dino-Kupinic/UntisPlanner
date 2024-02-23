import {DEFAULT_STATE, MAXIMUM_YEAR, MINIMUM_PERIOD, MINIMUM_YEAR} from "~/model/constants"

export const useConfigStore = defineStore("configExport", () => {
  const federalState = ref<string>(DEFAULT_STATE)
  const selectedWeekday = ref<string[]>([])
  const selectedTeacher = ref<string[]>([])

  const years = ref<number[]>([])
  for (let year = MINIMUM_YEAR + 1; year <= MAXIMUM_YEAR; year++) {
    years.value.push(year)
  }
  const selectedYear = ref<number>(years.value[0])
  const period = ref<number>(MINIMUM_PERIOD)

  return {federalState, selectedWeekday, selectedTeacher, selectedYear, period, years}
})
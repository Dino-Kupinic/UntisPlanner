import {DEFAULT_STATE, MINIMUM_PERIOD} from "~/model/constants"

export const useConfigStore = defineStore("configExport", () => {
  const federalState = ref<string>(DEFAULT_STATE)
  const selectedWeekday = ref<string[]>([])
  const selectedTeacher = ref<string[]>([])
  const selectedYear = ref<string[]>([])
  const period = ref<number>(MINIMUM_PERIOD)

  return {federalState, selectedWeekday, selectedTeacher, selectedYear, period}
})
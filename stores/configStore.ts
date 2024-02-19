export const useConfigStore = defineStore("configExport", () => {
  const DEFAULT_STATE: string = "Upper Austria"
  const federalState = ref<string>(DEFAULT_STATE)

  const selectedWeekday = ref<string[]>([])
  const selectedTeacher = ref<string[]>([])

  const MINIMUM_PERIOD: number = 2
  const period = ref<number>(MINIMUM_PERIOD)

  return {federalState, selectedWeekday, selectedTeacher, period}
})
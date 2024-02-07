import type {ExportHoliday} from "~/model/holiday"

export const useHolidayExportStore = defineStore("holidayExport", () => {
  const holidays = ref<ExportHoliday[]>([])
  return {holidays}
}, {
  persist: true
})
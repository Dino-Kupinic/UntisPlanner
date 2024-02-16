import type {ExportHoliday} from "~/model/holiday"

export const useConfigStore = defineStore("configExport", () => {
  const federalState = ref('')

  return {federalState}
}, {
  persist: true
})
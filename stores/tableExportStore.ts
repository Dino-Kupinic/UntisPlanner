import type {Teacher} from "~/model/teacher"

export const useTableExportStore = defineStore("tableExport", () => {
  const teachers = ref<Teacher[]>([])


  return {teachers}
})